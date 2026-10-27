import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
    copyFileSync,
    mkdirSync,
    mkdtempSync,
    readdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

function sandbox(
    check: (
        root: string,
        run: (args: string[]) => ReturnType<typeof spawnSync>,
    ) => void,
) {
    const root = mkdtempSync(join(tmpdir(), "playground-scaffold-"));
    mkdirSync(join(root, "scripts"));
    mkdirSync(join(root, "exercises"));
    writeFileSync(join(root, "package.json"), '{"type":"module"}');
    const script = join(root, "scripts/create-exercise.ts");
    copyFileSync(new URL("./create-exercise.ts", import.meta.url), script);
    try {
        check(root, (args) =>
            spawnSync(process.execPath, ["--import", "tsx", script, ...args], {
                encoding: "utf8",
            }),
        );
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
}

test("creates three templates with a failing placeholder test", () => {
    sandbox((root, run) => {
        const result = run(["11", "Array Practice"]);
        assert.equal(result.status, 0, String(result.stderr));
        assert.match(String(result.stdout), /exercises\/11-array-practice/);
        const directory = join(root, "exercises/11-array-practice");
        assert.deepEqual(readdirSync(directory).sort(), [
            "PROBLEM.md",
            "index.test.ts",
            "index.ts",
        ]);
        assert.match(
            readFileSync(join(directory, "index.ts"), "utf8"),
            /throw new Error\("Not implemented"\)/,
        );
        const tests = spawnSync(
            process.execPath,
            ["--import", "tsx", "--test", join(directory, "index.test.ts")],
            {
                encoding: "utf8",
                // Run a real child test runner, not an inherited worker of this suite.
                env: { ...process.env, NODE_TEST_CONTEXT: undefined },
            },
        );
        assert.equal(tests.status, 1, String(tests.stderr));
        assert.match(String(tests.stdout), /Exercise tests are not authored/);
        assert.deepEqual(readdirSync(join(root, "exercises")), [
            "11-array-practice",
        ]);
    });
});

test("rejects duplicates and preserves student content", () => {
    sandbox((root, run) => {
        assert.equal(run(["11", "Array Practice"]).status, 0);
        const directory = join(root, "exercises/11-array-practice");
        writeFileSync(
            join(directory, "index.ts"),
            "student solution stays unchanged\n",
        );
        const before = readdirSync(directory).map((file) => [
            file,
            readFileSync(join(directory, file), "utf8"),
        ]);
        for (const args of [
            ["11", "Array Practice"],
            ["011", "Different Title"],
        ]) {
            const result = run(args);
            assert.equal(result.status, 1);
            assert.match(String(result.stderr), /already exists/);
            assert.deepEqual(
                readdirSync(directory).map((file) => [
                    file,
                    readFileSync(join(directory, file), "utf8"),
                ]),
                before,
            );
        }
        assert.deepEqual(readdirSync(join(root, "exercises")), [
            "11-array-practice",
        ]);
    });
});

test("rejects numbers already used by legacy directories or files", () => {
    sandbox((root, run) => {
        mkdirSync(join(root, "exercises/02"));
        writeFileSync(join(root, "exercises/03-existing"), "do not touch");
        assert.equal(run(["2", "New Title"]).status, 1);
        assert.equal(run(["3", "New Title"]).status, 1);
        assert.deepEqual(readdirSync(join(root, "exercises")).sort(), [
            "02",
            "03-existing",
        ]);
        assert.equal(
            readFileSync(join(root, "exercises/03-existing"), "utf8"),
            "do not touch",
        );
    });
});

test("invalid arguments never create folders", () => {
    sandbox((root, run) => {
        const invalid = [
            [],
            ["11"],
            ["11", "Title", "extra"],
            ["0", "Title"],
            ["-1", "Title"],
            ["1.5", "Title"],
            ["1e2", "Title"],
            ["0x10", "Title"],
            ["NaN", "Title"],
            ["9007199254740992", "Title"],
            ["../11", "Title"],
            ["11", "   "],
            ["11", "../"],
            ["11", "任务"],
            ["11", "a".repeat(101)],
            ["11", "Bad\nTitle"],
            ["11", "\nTitle"],
            ["11", "Title\t"],
        ];
        for (const args of invalid) {
            const result = run(args);
            assert.equal(result.status, 1, JSON.stringify(args));
            assert(String(result.stderr).trim().length > 0);
            assert.deepEqual(readdirSync(join(root, "exercises")), []);
        }
    });
});

test("normalizes accents, punctuation, whitespace, and path separators", () => {
    sandbox((root, run) => {
        assert.equal(run(["011", "  Café / Array & Objects!  "]).status, 0);
        assert.equal(run(["12", "../../Owned"]).status, 0);
        assert.deepEqual(readdirSync(join(root, "exercises")).sort(), [
            "11-cafe-array-objects",
            "12-owned",
        ]);
    });
});
