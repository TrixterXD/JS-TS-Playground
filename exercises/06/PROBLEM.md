# 06 — Player Leaderboard

Rank players from quest-completion records across three collections.

## Input and output

`leaderboard(users, quests, completions)` returns `{ rank, userId, name, completedCount, totalXp }[]`. Users and quests have unique IDs. Quests contain nonnegative finite XP. A completion contains `userId` and `questId`.

## Business rules and edge cases

- Include every known user, even without valid completions.
- Ignore records referencing unknown users or quests.
- Count each (userId, questId) pair once, even if repeated. Different users can complete the same quest.
- Rank by total XP descending, then completed count descending, then user ID ascending using JavaScript string ordering (`<` and `>`), not locale rules.
- Assign distinct ranks 1 through N after ordering; names do not affect ranking.
- Empty users produces an empty leaderboard. Do not mutate any input.

## Example

Ada and Lin are known users. Lin has two identical records for the same 40-XP bridge quest. Lin ranks first with one completion and 40 XP; Ada ranks second with zero completions and zero XP. See `sampleInput` in `index.ts` for full output records.

## Run

```sh
npm run exercise -- exercises/06/index.ts
npm run exercise -- --test exercises/06/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
