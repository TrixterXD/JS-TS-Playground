import assert from "node:assert/strict";
import { test } from "node:test";
import { sampleInput, updateInventory } from "./index.ts";

test("quantity and immutable references", () => {
    const { player, updates } = structuredClone(sampleInput);
    const before = structuredClone({ player, updates });
    const result = updateInventory(player, updates);
    assert.deepEqual(result, {
        ...before.player,
        bags: [
            {
                ...before.player.bags[0],
                items: [{ ...before.player.bags[0]?.items[0], quantity: 5 }],
            },
        ],
    });
    assert.notStrictEqual(result, player);
    assert.notStrictEqual(result.bags, player.bags);
    assert.notStrictEqual(result.bags[0], player.bags[0]);
    assert.notStrictEqual(result.bags[0]?.items, player.bags[0]?.items);
    assert.notStrictEqual(result.bags[0]?.items[0], player.bags[0]?.items[0]);
    assert.strictEqual(result.profile, player.profile);
    assert.strictEqual(
        result.bags[0]?.items[0]?.metadata,
        player.bags[0]?.items[0]?.metadata,
    );
    assert.deepEqual({ player, updates }, before);
});
test("empty and invalid changes are no-ops", () => {
    const { player } = sampleInput;
    assert.strictEqual(updateInventory(player, []), player);
    assert.strictEqual(
        updateInventory(player, [
            { bagId: "missing", itemId: "potion", quantity: 4 },
            { bagId: "belt", itemId: "missing", quantity: 4 },
            ...[-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY].map(
                (quantity) => ({ bagId: "belt", itemId: "potion", quantity }),
            ),
        ]),
        player,
    );
});
test("last valid update, zero, and unrelated references", () => {
    const player = structuredClone(sampleInput.player);
    const otherItem = {
        id: "rope",
        label: "Rope",
        quantity: 1,
        metadata: { rarity: "common" },
    };
    const otherBag = { id: "pack", label: "Pack", items: [] };
    player.bags[0]?.items.push(otherItem);
    player.bags.push(otherBag);
    const result = updateInventory(player, [
        { bagId: "belt", itemId: "potion", quantity: 8 },
        { bagId: "belt", itemId: "potion", quantity: 0 },
        { bagId: "belt", itemId: "potion", quantity: -1 },
    ]);
    assert.equal(result.bags[0]?.items[0]?.quantity, 0);
    assert.strictEqual(result.bags[0]?.items[1], otherItem);
    assert.strictEqual(result.bags[1], otherBag);
    assert.equal(player.bags[0]?.items[0]?.quantity, 2);
});
test("updates reversed and empty bags", () => {
    const player = sampleInput.player;
    assert.strictEqual(
        updateInventory(player, [
            { bagId: "belt", itemId: "potion", quantity: 9 },
            { bagId: "belt", itemId: "potion", quantity: 2 },
        ]),
        player,
    );
    const empty = { id: "empty", profile: { name: "Empty" }, bags: [] };
    assert.strictEqual(updateInventory(empty, sampleInput.updates), empty);
});
