# 01 — Quest Statistics

Report statistics for completed quests only.

## Input and output

`statistics(quests)` accepts quests with unique IDs, a title, nonnegative finite XP, and a completion flag. Return `{ completedCount, totalXp, averageXp, hardestQuest }`. `hardestQuest` is the full selected input quest (object identity is not required).

## Business rules and edge cases

- Ignore incomplete quests, including those with more XP than every completed quest.
- Average XP is total completed XP divided by completed count; do not round it.
- For equal maximum XP, select the first completed quest in input order.
- Empty input or no completions produces zero numeric values and `hardestQuest: null`.
- Do not mutate input. Input satisfies the declared types and numeric constraints.

## Example

Completed quests worth 20 and 40 XP, plus an incomplete 500-XP quest, produce `completedCount: 2`, `totalXp: 60`, `averageXp: 30`, and the full 40-XP quest as `hardestQuest`. See `sampleInput` in `index.ts` for the exact objects.

## Run

```sh
npm run exercise -- exercises/01-statistics/index.ts
npm run exercise -- --test exercises/01-statistics/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
