import assert from "node:assert/strict";
import { test } from "node:test";
import { describeScope, predictVisibility, sampleInput } from "./index.js";

declare global {
    var playgroundWorld: string;
}

test("bonus branch", () => {
    globalThis.playgroundWorld = sampleInput.world;
    assert.deepEqual(describeScope(sampleInput.playerName, true), {
        world: "Northlands",
        player: "Ada",
        reward: 25,
        message: "Bonus for Ada",
    });
    assert.equal(globalThis.playgroundWorld, "Northlands");
});
test("standard branch", () => {
    globalThis.playgroundWorld = "Southlands";
    assert.deepEqual(describeScope("Lin", false), {
        world: "Southlands",
        player: "Lin",
        reward: 10,
        message: "Standard reward",
    });
});
test("empty name, changing global, independent calls", () => {
    globalThis.playgroundWorld = "East";
    assert.deepEqual(describeScope("", true), {
        world: "East",
        player: "",
        reward: 25,
        message: "Bonus for ",
    });
    globalThis.playgroundWorld = "West";
    assert.deepEqual(describeScope("  Ada  ", false), {
        world: "West",
        player: "  Ada  ",
        reward: 10,
        message: "Standard reward",
    });
});
test("visibility predictions", () => {
    assert.deepEqual(predictVisibility(), {
        afterBlock: {
            globalWorld: true,
            functionPlayer: true,
            reward: true,
            blockMessage: false,
        },
        insideBlock: {
            globalWorld: true,
            functionPlayer: true,
            reward: true,
            blockMessage: true,
        },
        outsideFunction: {
            globalWorld: true,
            functionPlayer: false,
            reward: false,
            blockMessage: false,
        },
    });
});
