import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateProgress, sampleInput } from "./index.ts";

test("capped progress, weighted percentage, no mutation", () => {
    const before = structuredClone(sampleInput);
    assert.deepEqual(
        calculateProgress(
            sampleInput.players,
            sampleInput.quests,
            sampleInput.assignments,
            sampleInput.completions,
        ),
        [
            {
                playerId: "ada",
                quests: [
                    {
                        questId: "herbs",
                        progress: 3,
                        target: 3,
                        completed: true,
                        earnedXp: 30,
                    },
                    {
                        questId: "scout",
                        progress: 1,
                        target: 2,
                        completed: false,
                        earnedXp: 0,
                    },
                ],
                completedCount: 1,
                earnedXp: 30,
                percent: 80,
            },
        ],
    );
    assert.deepEqual(sampleInput, before);
});
test("no players and no assignments", () => {
    assert.deepEqual(
        calculateProgress(
            [],
            sampleInput.quests,
            sampleInput.assignments,
            sampleInput.completions,
        ),
        [],
    );
    assert.deepEqual(
        calculateProgress(
            sampleInput.players,
            sampleInput.quests,
            [],
            sampleInput.completions,
        ),
        [
            {
                playerId: "ada",
                quests: [],
                completedCount: 0,
                earnedXp: 0,
                percent: 0,
            },
        ],
    );
});
test("duplicates, invalid records, and missing relationships", () => {
    const assignments = [
        { playerId: "ada", questId: "scout" },
        { playerId: "ada", questId: "scout" },
        { playerId: "ada", questId: "missing" },
        { playerId: "missing", questId: "herbs" },
    ];
    const records = [
        { playerId: "ada", questId: "scout", recordId: "r", amount: -1 },
        { playerId: "ada", questId: "scout", recordId: "r", amount: 1 },
        { playerId: "ada", questId: "scout", recordId: "r", amount: 10 },
        {
            playerId: "ada",
            questId: "scout",
            recordId: "fraction",
            amount: 0.5,
        },
        { playerId: "ada", questId: "scout", recordId: "zero", amount: 0 },
        {
            playerId: "ada",
            questId: "scout",
            recordId: "nan",
            amount: Number.NaN,
        },
        {
            playerId: "ada",
            questId: "scout",
            recordId: "infinity",
            amount: Number.POSITIVE_INFINITY,
        },
        {
            playerId: "ada",
            questId: "scout",
            recordId: "unsafe",
            amount: Number.MAX_SAFE_INTEGER + 1,
        },
        {
            playerId: "ada",
            questId: "herbs",
            recordId: "unassigned",
            amount: 3,
        },
        {
            playerId: "missing",
            questId: "scout",
            recordId: "unknown",
            amount: 2,
        },
    ];
    assert.deepEqual(
        calculateProgress(
            sampleInput.players,
            sampleInput.quests,
            assignments,
            records,
        ),
        [
            {
                playerId: "ada",
                quests: [
                    {
                        questId: "scout",
                        progress: 1,
                        target: 2,
                        completed: false,
                        earnedXp: 0,
                    },
                ],
                completedCount: 0,
                earnedXp: 0,
                percent: 50,
            },
        ],
    );
});
test("deduplication is per pair, order and rounding", () => {
    const players = [
        { id: "b", name: "B" },
        { id: "a", name: "A" },
    ];
    const quests = [
        { id: "q", target: 3, xp: 9 },
        { id: "z", target: 1, xp: 0 },
    ];
    const assignments = [
        { playerId: "a", questId: "z" },
        { playerId: "b", questId: "q" },
        { playerId: "a", questId: "q" },
    ];
    const records = [
        { playerId: "b", questId: "q", recordId: "same", amount: 1 },
        { playerId: "a", questId: "q", recordId: "same", amount: 3 },
        { playerId: "a", questId: "z", recordId: "same", amount: 1 },
    ];
    assert.deepEqual(calculateProgress(players, quests, assignments, records), [
        {
            playerId: "b",
            quests: [
                {
                    questId: "q",
                    progress: 1,
                    target: 3,
                    completed: false,
                    earnedXp: 0,
                },
            ],
            completedCount: 0,
            earnedXp: 0,
            percent: 33,
        },
        {
            playerId: "a",
            quests: [
                {
                    questId: "z",
                    progress: 1,
                    target: 1,
                    completed: true,
                    earnedXp: 0,
                },
                {
                    questId: "q",
                    progress: 3,
                    target: 3,
                    completed: true,
                    earnedXp: 9,
                },
            ],
            completedCount: 2,
            earnedXp: 9,
            percent: 100,
        },
    ]);
});
