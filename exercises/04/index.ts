/**
 * 04 — Player Inventory Transformation.
 * Apply absolute quantity updates to a nested inventory without mutation.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
export type Item = {
    id: string;
    label: string;
    quantity: number;
    metadata: { rarity: string };
};
export type Bag = { id: string; label: string; items: Item[] };
export type Player = { id: string; profile: { name: string }; bags: Bag[] };
export type InventoryUpdate = {
    bagId: string;
    itemId: string;
    quantity: number;
};

export function updateInventory(
    _player: Player,
    _updates: readonly InventoryUpdate[],
): Player {
    throw new Error("Not implemented");
}

export const sampleInput: { player: Player; updates: InventoryUpdate[] } = {
    player: {
        id: "ada",
        profile: { name: "Ada" },
        bags: [
            {
                id: "belt",
                label: "Belt",
                items: [
                    {
                        id: "potion",
                        label: "Potion",
                        quantity: 2,
                        metadata: { rarity: "common" },
                    },
                ],
            },
        ],
    },
    updates: [{ bagId: "belt", itemId: "potion", quantity: 5 }],
};
// Expected: same player data with potion quantity 5; original quantity remains 2.
