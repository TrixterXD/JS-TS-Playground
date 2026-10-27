# 05 — Quest Completion

Complete a quest and award its XP exactly once, without mutation.

## Input and output

`completeQuest(state, questId)` returns `{ state, status }`. State contains one player (`id`, `xp`) and quests (`id`, `xp`, `completed`). IDs are unique, XP values are nonnegative finite numbers. Status is `completed`, `already-completed`, or `not-found`.

## Business rules and edge cases

- An existing incomplete quest becomes completed and its XP is added to player XP.
- A completed quest gives no additional XP and returns the original state with `already-completed`.
- Unknown IDs return the original state with `not-found`.
- Successful operations return a new state, player, quests array, and changed quest. Unchanged quests retain identity.
- Zero-XP quests still become completed. Do not mutate input.

## Example

A player with 15 XP completes the incomplete `bridge` quest worth 40 XP. The result has status `completed`, player XP 55, and `bridge.completed: true`. Repeating the completion returns `already-completed` and leaves XP at 55. See `sampleInput` in `index.ts`.

## Run

```sh
npm run exercise -- exercises/05/index.ts
npm run exercise -- --test exercises/05/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
