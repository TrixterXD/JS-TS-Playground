# 10 — Quest Progress System

Report per-player progress from assignments, quests, and completion records.

## Input and output

`calculateProgress(players, quests, assignments, completions)` returns one report per player in player input order. Players and quests have unique IDs. Each quest has a positive integer `target` and nonnegative finite XP. Assignments link a player and quest. Completion records contain `playerId`, `questId`, `recordId`, and numeric `amount`. All IDs are nonempty.

Each report has `playerId`, `quests`, `completedCount`, `earnedXp`, and `percent`. Each quest report has `questId`, `progress`, `target`, `completed`, and `earnedXp`.

## Business rules and edge cases

- Only assignments with known players and quests count. Duplicate assignments count once. Quest reports use the order of first valid assignment for that player.
- Records only contribute to an assigned pair. A valid amount is a positive safe integer. Ignore invalid amounts and unknown or unassigned pairs.
- `recordId` is deduplicated separately within each player/quest pair. The first valid record with that ID counts; invalid records do not reserve an ID. The same record ID may count for another pair.
- Progress is the sum of valid unique amounts, capped at target. A quest is completed at target and awards its XP once; partial progress awards zero.
- Player `percent` is the floor of the sum of capped progress divided by the sum of assigned targets, times 100. With no assignments, percent is zero. `completedCount` and `earnedXp` summarize that player's quest reports.
- Relevant sums fit within safe integers. Do not mutate inputs.
- Before implementing the final function, write a short `DESIGN.md` naming your own subproblems, their inputs/outputs, and the intermediate data you intend to inspect. Choose your own decomposition; no particular helper count or technique is required. Tests check behavior, not architecture.

## Example

Ada is assigned herbs (target 3, reward 30 XP) and scouting (target 2, reward 20 XP). Records report 5 herbs and 1 scouting unit. Her quest reports have progress 3 and 1, only herbs is completed, earned XP is 30, completed count is 1, and overall percent is 80. See `sampleInput` in `index.ts` for the full output structure.

## Run

```sh
npm run exercise -- exercises/10/index.ts
npm run exercise -- --test exercises/10/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
