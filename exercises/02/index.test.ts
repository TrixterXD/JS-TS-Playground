import assert from "node:assert/strict";
import { test } from "node:test";
import { assignQuests, sampleInput } from "./index.ts";

test("ownership and unknown owners", () => {
    assert.deepEqual(assignQuests(sampleInput.users, sampleInput.quests), [
        { id: "ada", name: "Ada", quests: [sampleInput.quests[0]] },
        { id: "lin", name: "Lin", quests: [] },
    ]);
});
test("no users", () => {
    assert.deepEqual(assignQuests([], sampleInput.quests), []);
});
test("no quests", () => {
    assert.deepEqual(assignQuests(sampleInput.users, []), [
        { id: "ada", name: "Ada", quests: [] },
        { id: "lin", name: "Lin", quests: [] },
    ]);
});
test("stable order and no mutation", () => {
    const users = [
        { id: "b", name: "B" },
        { id: "a", name: "A" },
    ];
    const quests = [
        { id: "2", title: "Second", ownerId: "a" },
        { id: "1", title: "First", ownerId: "a" },
    ];
    const before = structuredClone({ users, quests });
    assert.deepEqual(assignQuests(users, quests), [
        { id: "b", name: "B", quests: [] },
        { id: "a", name: "A", quests },
    ]);
    assert.deepEqual({ users, quests }, before);
});
