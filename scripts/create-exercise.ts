import {
    constants,
    copyFileSync,
    mkdirSync,
    mkdtempSync,
    readdirSync,
    rmdirSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const usage = 'Usage: npm run new-exercise -- 11 "Array Practice"';

function createExercise(args: string[]): string {
    const [rawNumber, rawTitle] = args;
    if (args.length !== 2 || !rawNumber || !rawTitle) {
        throw new Error(usage);
    }
    const value = Number(rawNumber);
    if (!/^\d+$/.test(rawNumber) || !Number.isSafeInteger(value) || value < 1) {
        throw new Error(
            `Exercise number must be a positive safe integer. ${usage}`,
        );
    }
    const title = rawTitle.trim();
    if (
        !title ||
        title.length > 100 ||
        [...rawTitle].some((character) => {
            const code = character.charCodeAt(0);
            return code < 32 || code === 127;
        })
    ) {
        throw new Error(
            "Title must contain 1–100 characters without control characters.",
        );
    }
    const slug = title
        .normalize("NFKD")
        .replace(/\p{M}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    if (!slug) {
        throw new Error(
            "Title must contain an ASCII letter or digit to form a directory name.",
        );
    }
    const number = String(value).padStart(2, "0");
    const name = `${number}-${slug}`;
    const exercises = fileURLToPath(new URL("../exercises/", import.meta.url));
    if (
        readdirSync(exercises).some(
            (entry) => entry === number || entry.startsWith(`${number}-`),
        )
    ) {
        throw new Error(
            `Exercise number ${number} already exists; nothing was changed.`,
        );
    }
    const files = {
        "PROBLEM.md": `# ${number} — ${title}

Status: template only — not ready for the student.

## Description

TODO: State the practical problem and learning objective. Record difficulty (1–5) and prerequisites.

## Input and output

TODO: Define the data model, function parameters, return value, and input guarantees.

## Business rules

TODO: Specify ordering, ties, duplicates, validation, and mutation rules where relevant.

## Examples

TODO: Supply realistic input and exact expected output, consistent with the tests.

## Edge cases

TODO: Define meaningful boundary cases without revealing an algorithm.

## Run tests

\`\`\`sh
npm run exercise -- --test exercises/${name}/index.test.ts
\`\`\`
`,
        "index.ts": `/** TODO: Replace this template with the authored problem summary and signature. */
export function exercise(_input: unknown): unknown {
    throw new Error("Not implemented");
}
`,
        "index.test.ts": `import assert from "node:assert/strict";
import { test } from "node:test";

test("TODO: author normal and edge-case tests from PROBLEM.md", () => {
    assert.fail(
        "Exercise tests are not authored. Replace this placeholder before teaching the task.",
    );
});
`,
    };
    const staging = mkdtempSync(join(exercises, ".create-exercise-"));
    const target = join(exercises, name);
    const copied: string[] = [];
    let created = false;
    try {
        for (const [filename, content] of Object.entries(files)) {
            writeFileSync(join(staging, filename), content, { flag: "wx" });
        }
        // Exclusive mkdir also protects against another process creating the target.
        mkdirSync(target);
        created = true;
        for (const filename of Object.keys(files)) {
            const destination = join(target, filename);
            copyFileSync(
                join(staging, filename),
                destination,
                constants.COPYFILE_EXCL,
            );
            copied.push(destination);
        }
    } catch (error) {
        for (const filename of copied) rmSync(filename);
        if (created) {
            try {
                rmdirSync(target);
            } catch {
                // Preserve any unexpected files instead of deleting someone else's work.
                console.error(
                    `Cleanup left ${target}; inspect it before retrying.`,
                );
            }
        }
        throw error;
    } finally {
        rmSync(staging, { recursive: true, force: true });
    }
    return `exercises/${name}`;
}

try {
    const directory = createExercise(process.argv.slice(2));
    console.log(
        `Created ${directory}. Templates only: author the problem, signature, data, and tests separately.`,
    );
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
}
