# 03 — Quest Difficulty Summary

Summarize completed quests by their allowed difficulty.

## Input and output

`difficultySummary(quests)` returns a `Record<Difficulty, { count: number; totalXp: number }>` with exactly the keys `easy`, `medium`, and `hard`. Quests have unique IDs, valid difficulties, nonnegative finite XP, and a completion flag.

## Business rules and edge cases

- Only completed quests contribute.
- Every difficulty is present, even when its totals are zero.
- A zero-XP completed quest contributes to count.
- Empty input returns all three zero entries.
- Do not mutate input.

## Example

Two completed easy quests worth 10 and 20 XP and an incomplete hard quest produce:

```json
{
    "easy": { "count": 2, "totalXp": 30 },
    "medium": { "count": 0, "totalXp": 0 },
    "hard": { "count": 0, "totalXp": 0 }
}
```

See `sampleInput` in `index.ts`.

## Run

```sh
npm run exercise -- exercises/03/index.ts
npm run exercise -- --test exercises/03/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
