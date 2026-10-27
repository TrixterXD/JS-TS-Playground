import assert from "node:assert/strict";
import { test } from "node:test";
import { processEvents, sampleInput } from "./index.ts";

test("ordered valid transitions and no mutation", () => {
    const before = structuredClone(sampleInput);
    assert.deepEqual(processEvents(sampleInput.initial, sampleInput.events), {
        quests: [{ id: "bridge", xp: 40, status: "completed" }],
        totalXp: 50,
        processedEventIds: ["e1", "e2"],
    });
    assert.deepEqual(sampleInput, before);
});
test("completed quests never award again or cancel", () => {
    const events = [
        ...sampleInput.events,
        { id: "e2", questId: "bridge", type: "complete" as const },
        { id: "e3", questId: "bridge", type: "complete" as const },
        { id: "e4", questId: "bridge", type: "cancel" as const },
    ];
    assert.deepEqual(processEvents(sampleInput.initial, events), {
        quests: [{ id: "bridge", xp: 40, status: "completed" }],
        totalXp: 50,
        processedEventIds: ["e1", "e2", "e3", "e4"],
    });
});
test("empty event list and empty state", () => {
    assert.deepEqual(
        processEvents(sampleInput.initial, []),
        sampleInput.initial,
    );
    assert.deepEqual(
        processEvents({ quests: [], totalXp: 0, processedEventIds: [] }, []),
        { quests: [], totalXp: 0, processedEventIds: [] },
    );
});
test("invalid first event still consumes its ID", () => {
    assert.deepEqual(
        processEvents(sampleInput.initial, [
            { id: "", questId: "bridge", type: "start" },
            { id: "bad", questId: "missing", type: "start" },
            { id: "bad", questId: "bridge", type: "start" },
            { id: "early", questId: "bridge", type: "complete" },
            { id: "start", questId: "bridge", type: "start" },
            { id: "early", questId: "bridge", type: "complete" },
        ]),
        {
            quests: [{ id: "bridge", xp: 40, status: "active" }],
            totalXp: 10,
            processedEventIds: ["bad", "early", "start"],
        },
    );
});
test("cancel, persisted IDs, and no duplicate rewards", () => {
    const initial = {
        quests: [{ id: "q", xp: 0, status: "active" as const }],
        totalXp: 7,
        processedEventIds: ["old"],
    };
    assert.deepEqual(
        processEvents(initial, [
            { id: "old", questId: "q", type: "complete" },
            { id: "cancel", questId: "q", type: "cancel" },
            { id: "invalid", questId: "q", type: "cancel" },
            { id: "start", questId: "q", type: "start" },
            { id: "finish", questId: "q", type: "complete" },
            { id: "again", questId: "q", type: "complete" },
            { id: "restart", questId: "q", type: "start" },
        ]),
        {
            quests: [{ id: "q", xp: 0, status: "completed" }],
            totalXp: 7,
            processedEventIds: [
                "old",
                "cancel",
                "invalid",
                "start",
                "finish",
                "again",
                "restart",
            ],
        },
    );
});
