import assert from "node:assert/strict";
import { test } from "node:test";
import { completeQuest, sampleInput } from "./index.ts";

test("completion and identity", () => {
    const state = structuredClone(sampleInput);
    state.quests.push({ id: "other", xp: 5, completed: false });
    const before = structuredClone(state);
    const result = completeQuest(state, "bridge");
    assert.deepEqual(result, {
        status: "completed",
        state: {
            player: { id: "ada", xp: 55 },
            quests: [
                { id: "bridge", xp: 40, completed: true },
                state.quests[1],
            ],
        },
    });
    assert.notStrictEqual(result.state, state);
    assert.notStrictEqual(result.state.player, state.player);
    assert.notStrictEqual(result.state.quests, state.quests);
    assert.notStrictEqual(result.state.quests[0], state.quests[0]);
    assert.strictEqual(result.state.quests[1], state.quests[1]);
    assert.deepEqual(state, before);
});
test("duplicate rewards prevented", () => {
    const first = completeQuest(sampleInput, "bridge");
    const second = completeQuest(first.state, "bridge");
    assert.equal(second.status, "already-completed");
    assert.strictEqual(second.state, first.state);
    assert.equal(second.state.player.xp, 55);
});
test("unknown and empty", () => {
    assert.deepEqual(completeQuest(sampleInput, "missing"), {
        status: "not-found",
        state: sampleInput,
    });
    assert.strictEqual(
        completeQuest(sampleInput, "missing").state,
        sampleInput,
    );
    const state = { player: { id: "ada", xp: 0 }, quests: [] };
    assert.strictEqual(completeQuest(state, "missing").state, state);
});
test("zero XP still completes", () => {
    assert.deepEqual(
        completeQuest(
            {
                player: { id: "ada", xp: 7 },
                quests: [{ id: "z", xp: 0, completed: false }],
            },
            "z",
        ),
        {
            status: "completed",
            state: {
                player: { id: "ada", xp: 7 },
                quests: [{ id: "z", xp: 0, completed: true }],
            },
        },
    );
});
