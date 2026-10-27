# 04 — Player Inventory Transformation

Apply absolute quantity updates to a nested inventory without mutation.

## Input and output

`updateInventory(player, updates)` returns a `Player`. A player has a profile and bags; each bag has items with an ID, label, quantity, and metadata. Bag IDs are unique; item IDs are unique within a bag. Existing quantities are nonnegative integers. Updates specify `bagId`, `itemId`, and the new absolute `quantity`.

## Business rules and edge cases

- Apply updates in input order; the last valid update for an item determines its final quantity.
- Unknown bags or items and nonfinite, negative, or noninteger quantities are ignored.
- Quantity zero keeps the item; do not remove it or add missing items.
- Do not mutate any original object or array, or the updates.
- Preserve reference identity for the profile, all metadata, unchanged items, and unchanged bags. Preserve unrelated data and ordering.
- If final quantities equal original quantities (including changes later reversed), return the original player object. Otherwise return a new player, bags array, and changed bags/items arrays/items only.

## Example

Ada's `belt` bag contains a potion with quantity 2. The update `{ bagId: "belt", itemId: "potion", quantity: 5 }` returns the same player data with potion quantity 5. The original remains at 2, and the profile and potion metadata keep their original references. See `sampleInput` in `index.ts`.

## Run

```sh
npm run exercise -- exercises/04/index.ts
npm run exercise -- --test exercises/04/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
