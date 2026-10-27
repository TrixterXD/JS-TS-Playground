# 09 — Stateful Function Factory

Create independent XP trackers whose returned functions retain private state.

## Input and output

This JavaScript task introduces closures by behavior. `createXpTracker(initialXp)` returns a function accepting a command and returning the current XP number. Commands are `{ type: "read" }`, `{ type: "earn", amount }`, `{ type: "spend", amount }`, or `{ type: "reset" }`. The initial value is a nonnegative safe integer; otherwise the factory throws `RangeError`.

## Business rules and edge cases

- Each tracker starts at its own initial XP and remembers changes between calls.
- Read leaves XP unchanged. Reset restores that tracker's initial XP.
- Earn and spend require nonnegative safe-integer amounts. Invalid amounts leave XP unchanged.
- Spending more than the balance is ignored, not partially applied.
- An earn that would exceed `Number.MAX_SAFE_INTEGER` is ignored.
- Zero amounts are valid no-ops. Return current XP after every command.
- Trackers must not affect one another or use shared global state. Do not attach mutable state as public function properties. Commands satisfy the documented union; unknown command shapes need not be handled.

## Example

A tracker created with initial XP 10 receives `earn 5`, `spend 3`, `read`, and `reset` in that order. The returned values are `[15, 12, 12, 10]`. Another tracker created with 7 still reads 7. See `sampleInput` in `index.js`.

## Run

```sh
npm run exercise -- exercises/09/index.js
npm run exercise -- --test exercises/09/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
