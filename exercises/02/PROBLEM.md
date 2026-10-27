# 02 — Quest Ownership

Attach each user's quests to that user.

## Input and output

`assignQuests(users, quests)` returns one `{ id, name, quests }` entry per user. User and quest IDs are unique within their collections. Each quest has `id`, `title`, and `ownerId`.

## Business rules and edge cases

- Preserve user order and each user's quest input order.
- A user without quests receives an empty array.
- Ignore quests whose owner does not exist; do not create users.
- Empty users yields an empty result even when quests exist.
- Do not mutate either input. Returned quest objects may share identity with input quests.

## Example

For users Ada and Lin, one delivery owned by Ada, and one quest owned by an unknown user, return Ada with the delivery and Lin with `quests: []`. The unknown owner's quest is omitted. See `sampleInput` in `index.ts` for exact objects.

## Run

```sh
npm run exercise -- exercises/02/index.ts
npm run exercise -- --test exercises/02/index.test.ts
```

The entry file only exports the stub and sample data; it intentionally prints nothing. Tests are separate and fail until you implement the contract. Do not change the expected results to make a solution pass.
