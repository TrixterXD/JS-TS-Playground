import assert from "node:assert/strict";
import { test } from "node:test";
import { sampleInput, statistics } from "./index.ts";

test("completed quests only", () => {
    assert.deepEqual(statistics(sampleInput), {
        completedCount: 2,
        totalXp: 60,
        averageXp: 30,
        hardestQuest: sampleInput[1],
    });
});
test("empty input", () => {
    assert.deepEqual(statistics([]), {
        completedCount: 0,
        totalXp: 0,
        averageXp: 0,
        hardestQuest: null,
    });
});
test("no completed quests", () => {
    assert.deepEqual(
        statistics([{ id: "a", title: "Scout", xp: 10, completed: false }]),
        { completedCount: 0, totalXp: 0, averageXp: 0, hardestQuest: null },
    );
});
test("ties, fractional average, and no mutation", () => {
    const quests = [
        { id: "a", title: "A", xp: 5, completed: true },
        { id: "b", title: "B", xp: 5, completed: true },
        { id: "c", title: "C", xp: 0, completed: true },
    ];
    const before = structuredClone(quests);
    assert.deepEqual(statistics(quests), {
        completedCount: 3,
        totalXp: 10,
        averageXp: 10 / 3,
        hardestQuest: quests[0],
    });
    assert.deepEqual(quests, before);
});
