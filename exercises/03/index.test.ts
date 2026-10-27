import assert from "node:assert/strict";
import { test } from "node:test";
import { difficultySummary, sampleInput } from "./index.ts";

const zero = {
    easy: { count: 0, totalXp: 0 },
    medium: { count: 0, totalXp: 0 },
    hard: { count: 0, totalXp: 0 },
};
test("completed quests grouped", () => {
    assert.deepEqual(difficultySummary(sampleInput), {
        ...zero,
        easy: { count: 2, totalXp: 30 },
    });
});
test("empty", () => {
    assert.deepEqual(difficultySummary([]), zero);
});
test("all incomplete", () => {
    assert.deepEqual(
        difficultySummary([
            { id: "a", difficulty: "hard", xp: 50, completed: false },
        ]),
        zero,
    );
});
test("all difficulties, zero XP, no mutation", () => {
    const quests = [
        ...sampleInput,
        { id: "m", difficulty: "medium" as const, xp: 0, completed: true },
        { id: "h", difficulty: "hard" as const, xp: 90, completed: true },
    ];
    const before = structuredClone(quests);
    assert.deepEqual(difficultySummary(quests), {
        easy: { count: 2, totalXp: 30 },
        medium: { count: 1, totalXp: 0 },
        hard: { count: 1, totalXp: 90 },
    });
    assert.deepEqual(quests, before);
});
