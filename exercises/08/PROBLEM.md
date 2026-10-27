# 08 — Scope and Variable Visibility

Implement a scope report and predict which bindings are accessible.

## Input and output

This is a JavaScript task with JSDoc contracts. `describeScope(playerName, includeBonus)` returns `{ world, player, reward, message }`. `predictVisibility()` returns the boolean table described below. Complete both functions; neither may remain a stub.

## Business rules and edge cases

- `globalThis.playgroundWorld` is the exercise's global binding. Read its value without modifying it. Tests always provide a string value. `sampleInput.world` is example setup data, not a fallback.
- In `describeScope`, declare `functionPlayer` with `const` in the function body, equal to the supplied name. Declare `var reward` initially equal to 10.
- In the conditional block for `includeBonus`, assign `reward` the value 25 and declare `const blockMessage` with value `Bonus for NAME`, where NAME is the supplied name. The bonus report must use the value of `blockMessage` without reading it outside that block.
- The returned `world` is the global value; `player` is `functionPlayer`; `reward` is the value visible after the conditional; `message` is `Bonus for NAME` when true and `Standard reward` otherwise. Do not read `blockMessage` outside its block.
- `predictVisibility()` reports whether each binding is accessible at each location: the global binding on globalThis, `functionPlayer`, `reward`, `blockMessage`. Locations are the function body after the conditional, inside the bonus block after declarations, and an unrelated function outside `describeScope`. Assume the bonus branch executes when evaluating this table.
- A missing binding is reported as false; do not deliberately execute an inaccessible read. No returned inner functions, closures, or dynamic code execution.
- Preserve names exactly, including empty names. Do not modify global state.

## Visibility table contract

Return `{ afterBlock, insideBlock, outsideFunction }`. Each value has boolean keys `globalWorld`, `functionPlayer`, `reward`, and `blockMessage`. Fill this table yourself based on the required declarations.

## Example

With `globalThis.playgroundWorld = "Northlands"`, `describeScope("Ada", true)` returns `{ world: "Northlands", player: "Ada", reward: 25, message: "Bonus for Ada" }`. With the same global value, `describeScope("Lin", false)` returns `{ world: "Northlands", player: "Lin", reward: 10, message: "Standard reward" }`. Predict the separate visibility table yourself.

## Run

```sh
npm run exercise -- exercises/08/index.js
npm run exercise -- --test exercises/08/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
