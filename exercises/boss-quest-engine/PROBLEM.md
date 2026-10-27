# Boss Fight — Quest Engine

Implement a synchronous standalone quest engine with immutable operations.

## Input and output

`applyOperation(state, operation)` returns `{ state, status }`. State contains players, quest definitions, completion records, and successfully applied operation IDs. Types are declared in `index.ts` and form part of the contract. This engine does not depend on earlier solutions.

Players have `id`, `name`, total `xp`, and `level`. Quests have `id`, `title`, `baseXp`, `difficulty`, and `minLevel`. Completion records contain `playerId`, `questId`, and `awardedXp`. One quest may be completed by multiple players, but only once per player. Operations either create a quest or complete one for a player.

Initial state is valid: IDs are unique within player and quest collections, successful operation IDs are unique and nonblank, completion pairs are unique and refer to existing entities. Player XP and quest base XP are nonnegative safe integers. Levels equal 1 plus the number of full 100-XP units in total XP. Existing minimum levels are positive safe integers. Names and titles are nonblank. Completion XP is historical data and is not recalculated. TypeScript input shapes are trusted; numeric and string business constraints on new operations must still be validated at runtime.

## Creation rules

- Operation ID, new quest ID, and title must be nonblank after trimming. Validation does not trim or normalize stored values or identity comparisons.
- Base XP must be a nonnegative safe integer. Minimum level must be a positive safe integer. Difficulty is the declared union: `easy`, `medium`, `hard`.
- A quest ID that already exists is rejected. Successful creation appends the supplied quest to the quest collection. It does not create players or change XP.

## Completion and progression rules

- The player and quest must exist; the player's level must meet the quest's minimum level.
- Each player/quest pair may complete only once, even with a different operation ID.
- Award base XP multiplied by difficulty: easy = 1, medium = 2, hard = 3. Zero XP is allowed.
- Both the reward and resulting player total must remain safe integers. Overflow rejects the whole operation.
- Update only the completing player's XP and level. Append a completion containing the actual reward. New level is 1 plus the number of full 100-XP units in new total XP; multiple levels may be gained at once.

## Operation identity and errors

- Only successful operations reserve their operation ID, appended in success order. Rejected operations leave the entire state unchanged and may be retried with the same ID after correcting the cause.
- A previously successful operation ID rejects any new payload as `duplicate-operation`.
- Return status using this exact priority (first applicable rule wins):
  1. Blank operation ID: `invalid-operation`.
  2. Already applied operation ID: `duplicate-operation`.
  3. Creation: invalid fields → `invalid-quest`; existing quest ID → `quest-exists`; otherwise `applied`.
  4. Completion: unknown player → `player-not-found`; unknown quest → `quest-not-found`; existing completion pair → `already-completed`; insufficient level → `level-too-low`; unsafe reward or resulting XP → `xp-overflow`; otherwise `applied`.
- For completion, a blank player/quest ID naturally does not match any existing entity. Do not throw for business rejections; return the status.

## Immutability and edge cases

- Never mutate state, operation, or nested data. Rejections return the original state object.
- Success returns a new state and applied-operation-ID array. Preserve reference identity of all unchanged collections and unchanged existing records.
- Creation returns a new quests array; players and completions retain identity. Completion returns new players and completions arrays; the completing player is new, other players and existing completions retain identity, and quests retain identity.
- Stored newly created quest identity is unrestricted, but its data must equal the operation's quest.
- Handle empty quest collections, missing relationships, zero XP, exact level thresholds, multiple level gains, whitespace-only IDs, duplicate operations, duplicate completions, rejected retries, and arithmetic overflow.
- No React, asynchronous work, persistence, or external APIs are needed.

## Example

Ada starts with 90 XP at level 1. Completing the bridge quest (base XP 60, medium difficulty, minimum level 1) using operation `op1` awards 120 XP. Return `applied`, Ada with 210 XP at level 3, a completion with `awardedXp: 120`, and applied IDs `["op1"]`. Reusing `op1` returns `duplicate-operation`; completing the same pair with `op2` returns `already-completed`. See `sampleInput` in `index.ts` for the full output.

## Run

```sh
npm run exercise -- exercises/boss-quest-engine/index.ts
npm run exercise -- --test exercises/boss-quest-engine/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
