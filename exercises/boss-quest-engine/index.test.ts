import assert from "node:assert/strict";
import { test } from "node:test";
import {
    applyOperation,
    type EngineState,
    type Operation,
    type Quest,
    sampleInput,
} from "./index.ts";

test("completion, multi-level progression, and immutable references", () => {
    const state = structuredClone(sampleInput.state);
    state.players.push({ id: "lin", name: "Lin", xp: 0, level: 1 });
    const before = structuredClone(state);
    const operation = structuredClone(sampleInput.operation);
    const result = applyOperation(state, operation);
    assert.deepEqual(result, {
        status: "applied",
        state: {
            ...before,
            players: [
                { id: "ada", name: "Ada", xp: 210, level: 3 },
                before.players[1],
            ],
            completions: [
                { playerId: "ada", questId: "bridge", awardedXp: 120 },
            ],
            appliedOperationIds: ["op1"],
        },
    });
    assert.notStrictEqual(result.state, state);
    assert.notStrictEqual(result.state.players, state.players);
    assert.notStrictEqual(result.state.players[0], state.players[0]);
    assert.strictEqual(result.state.players[1], state.players[1]);
    assert.strictEqual(result.state.quests, state.quests);
    assert.notStrictEqual(result.state.completions, state.completions);
    assert.notStrictEqual(
        result.state.appliedOperationIds,
        state.appliedOperationIds,
    );
    assert.deepEqual(state, before);
    assert.deepEqual(operation, sampleInput.operation);
});
test("creation from empty quests and exact data preservation", () => {
    const state: EngineState = {
        players: [],
        quests: [],
        completions: [],
        appliedOperationIds: [],
    };
    const quest: Quest = {
        id: " q ",
        title: " Delivery ",
        baseXp: 0,
        difficulty: "easy",
        minLevel: 1,
    };
    const operation: Operation = {
        id: " create ",
        type: "create-quest",
        quest,
    };
    const before = structuredClone({ state, operation });
    const result = applyOperation(state, operation);
    assert.deepEqual(result, {
        status: "applied",
        state: {
            players: [],
            quests: [quest],
            completions: [],
            appliedOperationIds: [" create "],
        },
    });
    assert.notStrictEqual(result.state, state);
    assert.notStrictEqual(result.state.quests, state.quests);
    assert.notStrictEqual(
        result.state.appliedOperationIds,
        state.appliedOperationIds,
    );
    assert.strictEqual(result.state.players, state.players);
    assert.strictEqual(result.state.completions, state.completions);
    assert.deepEqual({ state, operation }, before);
});
test("duplicates and error priority", () => {
    const first = applyOperation(sampleInput.state, sampleInput.operation);
    const duplicate = applyOperation(first.state, {
        id: "op1",
        type: "complete-quest",
        playerId: "missing",
        questId: "missing",
    });
    assert.equal(duplicate.status, "duplicate-operation");
    assert.strictEqual(duplicate.state, first.state);
    const repeated = applyOperation(first.state, {
        id: "op2",
        type: "complete-quest",
        playerId: "ada",
        questId: "bridge",
    });
    assert.equal(repeated.status, "already-completed");
    assert.strictEqual(repeated.state, first.state);
    const blank = applyOperation(first.state, {
        id: "  ",
        type: "complete-quest",
        playerId: "missing",
        questId: "missing",
    });
    assert.equal(blank.status, "invalid-operation");
    assert.strictEqual(blank.state, first.state);
});
test("missing relationships and retry after creation", () => {
    const state: EngineState = {
        players: [{ id: "ada", name: "Ada", xp: 0, level: 1 }],
        quests: [],
        completions: [],
        appliedOperationIds: [],
    };
    const operation: Operation = {
        id: "retry",
        type: "complete-quest",
        playerId: "ada",
        questId: "q",
    };
    const missingPlayer = applyOperation(state, {
        ...operation,
        playerId: "missing",
    });
    assert.equal(missingPlayer.status, "player-not-found");
    assert.strictEqual(missingPlayer.state, state);
    const missingQuest = applyOperation(state, operation);
    assert.equal(missingQuest.status, "quest-not-found");
    assert.strictEqual(missingQuest.state, state);
    const created = applyOperation(state, {
        id: "create",
        type: "create-quest",
        quest: {
            id: "q",
            title: "Scout",
            baseXp: 100,
            difficulty: "easy",
            minLevel: 1,
        },
    });
    const done = applyOperation(created.state, operation);
    assert.equal(done.status, "applied");
    assert.deepEqual(done.state.players, [
        { id: "ada", name: "Ada", xp: 100, level: 2 },
    ]);
    assert.deepEqual(done.state.appliedOperationIds, ["create", "retry"]);
    assert.strictEqual(done.state.quests, created.state.quests);
});
test("creation validation, conflict, and priority", () => {
    const quest: Quest = {
        id: "bridge",
        title: "Repair bridge",
        baseXp: 60,
        difficulty: "medium",
        minLevel: 1,
    };
    const invalid: Quest[] = [
        { ...quest, id: " " },
        { ...quest, title: "\t" },
        { ...quest, baseXp: -1 },
        { ...quest, baseXp: 1.5 },
        { ...quest, baseXp: Number.NaN },
        { ...quest, baseXp: Number.POSITIVE_INFINITY },
        { ...quest, baseXp: Number.MAX_SAFE_INTEGER + 1 },
        { ...quest, minLevel: 0 },
        { ...quest, minLevel: 1.5 },
        { ...quest, minLevel: Number.NaN },
        { ...quest, minLevel: Number.POSITIVE_INFINITY },
        { ...quest, minLevel: Number.MAX_SAFE_INTEGER + 1 },
    ];
    for (const candidate of invalid) {
        const result = applyOperation(sampleInput.state, {
            id: "new",
            type: "create-quest",
            quest: candidate,
        });
        assert.equal(result.status, "invalid-quest");
        assert.strictEqual(result.state, sampleInput.state);
    }
    const conflict = applyOperation(sampleInput.state, {
        id: "new",
        type: "create-quest",
        quest,
    });
    assert.equal(conflict.status, "quest-exists");
    assert.strictEqual(conflict.state, sampleInput.state);
});
test("level restrictions and both overflow checks", () => {
    const blocked = structuredClone(sampleInput.state);
    blocked.quests = [
        {
            id: "locked",
            title: "Fort",
            baseXp: 10,
            difficulty: "hard",
            minLevel: 2,
        },
    ];
    const denied = applyOperation(blocked, {
        id: "try",
        type: "complete-quest",
        playerId: "ada",
        questId: "locked",
    });
    assert.equal(denied.status, "level-too-low");
    assert.strictEqual(denied.state, blocked);
    const rewardOverflow = structuredClone(sampleInput.state);
    rewardOverflow.quests = [
        {
            id: "huge",
            title: "Huge",
            baseXp: Number.MAX_SAFE_INTEGER,
            difficulty: "hard",
            minLevel: 1,
        },
    ];
    const unsafeReward = applyOperation(rewardOverflow, {
        id: "try",
        type: "complete-quest",
        playerId: "ada",
        questId: "huge",
    });
    assert.equal(unsafeReward.status, "xp-overflow");
    assert.strictEqual(unsafeReward.state, rewardOverflow);
    const totalOverflow = structuredClone(sampleInput.state);
    totalOverflow.players = [
        {
            id: "ada",
            name: "Ada",
            xp: Number.MAX_SAFE_INTEGER,
            level: 1 + Math.floor(Number.MAX_SAFE_INTEGER / 100),
        },
    ];
    const unsafeTotal = applyOperation(totalOverflow, sampleInput.operation);
    assert.equal(unsafeTotal.status, "xp-overflow");
    assert.strictEqual(unsafeTotal.state, totalOverflow);
});
test("hard reward at exact minimum level and level boundary", () => {
    const state: EngineState = {
        players: [{ id: "a", name: "A", xp: 170, level: 2 }],
        quests: [
            {
                id: "q",
                title: "Fort",
                baseXp: 10,
                difficulty: "hard",
                minLevel: 2,
            },
        ],
        completions: [],
        appliedOperationIds: [],
    };
    const result = applyOperation(state, {
        id: "finish",
        type: "complete-quest",
        playerId: "a",
        questId: "q",
    });
    assert.equal(result.status, "applied");
    assert.deepEqual(result.state.players, [
        { id: "a", name: "A", xp: 200, level: 3 },
    ]);
    assert.deepEqual(result.state.completions, [
        { playerId: "a", questId: "q", awardedXp: 30 },
    ]);
});
test("different players, zero XP, and preserved completion identity", () => {
    const state: EngineState = {
        players: [
            { id: "a", name: "A", xp: 0, level: 1 },
            { id: "b", name: "B", xp: 100, level: 2 },
        ],
        quests: [
            {
                id: "q",
                title: "Visit",
                baseXp: 0,
                difficulty: "hard",
                minLevel: 1,
            },
        ],
        completions: [{ playerId: "a", questId: "q", awardedXp: 0 }],
        appliedOperationIds: ["old"],
    };
    const before = structuredClone(state);
    const result = applyOperation(state, {
        id: "new",
        type: "complete-quest",
        playerId: "b",
        questId: "q",
    });
    assert.equal(result.status, "applied");
    assert.deepEqual(result.state.players, state.players);
    assert.deepEqual(result.state.completions, [
        { playerId: "a", questId: "q", awardedXp: 0 },
        { playerId: "b", questId: "q", awardedXp: 0 },
    ]);
    assert.strictEqual(result.state.completions[0], state.completions[0]);
    assert.strictEqual(result.state.players[0], state.players[0]);
    assert.notStrictEqual(result.state.players[1], state.players[1]);
    assert.deepEqual(result.state.appliedOperationIds, ["old", "new"]);
    assert.deepEqual(state, before);
});
