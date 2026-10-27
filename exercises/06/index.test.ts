import assert from "node:assert/strict";
import { test } from "node:test";
import { leaderboard, sampleInput } from "./index.ts";

test("ranking and duplicate records", () => {
    assert.deepEqual(
        leaderboard(
            sampleInput.users,
            sampleInput.quests,
            sampleInput.completions,
        ),
        [
            {
                rank: 1,
                userId: "lin",
                name: "Lin",
                completedCount: 1,
                totalXp: 40,
            },
            {
                rank: 2,
                userId: "ada",
                name: "Ada",
                completedCount: 0,
                totalXp: 0,
            },
        ],
    );
});
test("missing relationships", () => {
    assert.deepEqual(
        leaderboard(
            [{ id: "a", name: "A" }],
            [{ id: "q", xp: 10 }],
            [
                { userId: "missing", questId: "q" },
                { userId: "a", questId: "missing" },
            ],
        ),
        [{ rank: 1, userId: "a", name: "A", completedCount: 0, totalXp: 0 }],
    );
});
test("empty users", () => {
    assert.deepEqual(
        leaderboard([], sampleInput.quests, sampleInput.completions),
        [],
    );
});
test("all tie breakers and no mutation", () => {
    const users = [
        { id: "c", name: "C" },
        { id: "b", name: "B" },
        { id: "a", name: "A" },
        { id: "d", name: "D" },
    ];
    const quests = [
        { id: "q", xp: 10 },
        { id: "z", xp: 0 },
    ];
    const completions = [
        { userId: "a", questId: "q" },
        { userId: "b", questId: "q" },
        { userId: "b", questId: "z" },
        { userId: "c", questId: "q" },
        { userId: "d", questId: "q" },
        { userId: "d", questId: "z" },
    ];
    const before = structuredClone({ users, quests, completions });
    assert.deepEqual(leaderboard(users, quests, completions), [
        { rank: 1, userId: "b", name: "B", completedCount: 2, totalXp: 10 },
        { rank: 2, userId: "d", name: "D", completedCount: 2, totalXp: 10 },
        { rank: 3, userId: "a", name: "A", completedCount: 1, totalXp: 10 },
        { rank: 4, userId: "c", name: "C", completedCount: 1, totalXp: 10 },
    ]);
    assert.deepEqual({ users, quests, completions }, before);
});
