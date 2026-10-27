# 07 — Quest Event Processor

Process ordered quest events into a final immutable state.

## Input and output

`processEvents(initial, events)` returns `{ quests, totalXp, processedEventIds }`. Quests have unique IDs, nonnegative finite XP, and status `available`, `active`, or `completed`. Initial `totalXp` is already awarded XP; never recalculate it from initial quests. Initial processed event IDs are unique. Events have a nonempty ID, quest ID, and type `start`, `complete`, or `cancel`.

## Business rules and edge cases

- Process events in input order, not by ID. A start changes available to active; completion changes active to completed and awards quest XP; cancellation changes active to available without XP.
- Every other transition and every unknown quest is ignored.
- An event with an empty ID is ignored and not recorded.
- Any nonempty event ID not already recorded is recorded on its first occurrence, even when the quest or transition is invalid. Later occurrences are ignored regardless of payload.
- Processed IDs retain initial order followed by first-seen order.
- Completed quests cannot restart or lose rewards. Zero-XP completions are valid.
- Never mutate initial state or events. Reference identity of the returned objects is unrestricted.

## Example

Starting with 10 total XP and an available bridge quest worth 40 XP, events `e1: start bridge` and `e2: complete bridge` produce a completed bridge, total XP 50, and processed IDs `["e1", "e2"]`. See `sampleInput` in `index.ts`.

## Run

```sh
npm run exercise -- exercises/07/index.ts
npm run exercise -- --test exercises/07/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
