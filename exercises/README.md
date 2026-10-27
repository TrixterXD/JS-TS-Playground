# Programming exercises

Work through **01 → 10 in order**, then attempt the Boss Fight. Read each `PROBLEM.md` before editing its entry file. Inputs, expected results, types, and business rules are specifications, not implementation hints. Solve each task independently; no earlier solution is imported by a later task.

| Directory           | Task                                   | Difficulty | Learning goals                                                   |
| ------------------- | -------------------------------------- | ---------- | ---------------------------------------------------------------- |
| `01-statistics`     | Quest Statistics                       | 1/5        | Selection rules, totals, averages, ties, empty input             |
| `02`                | Quest Ownership                        | 1/5        | Related collections, stable order, missing owners                |
| `03`                | Quest Difficulty Summary               | 2/5        | Allowed-value unions, complete summaries, zero totals            |
| `04`                | Inventory Transformation               | 2/5        | Nested immutable updates, identity, invalid updates              |
| `05`                | Quest Completion                       | 2/5        | Atomic domain changes, idempotency, reward rules                 |
| `06`                | Player Leaderboard                     | 3/5        | Multiple relationships, deduplication, deterministic ranking     |
| `07`                | Quest Event Processor                  | 3/5        | Ordered transitions, invalid events, persistent event identity   |
| `08`                | Scope and Visibility (JavaScript)      | 2/5        | Global, function, block scope; accessibility predictions         |
| `09`                | Stateful Function Factory (JavaScript) | 3/5        | Closures, private state, independent instances, validation       |
| `10`                | Quest Progress System                  | 4/5        | Independent decomposition, intermediate data, progress contracts |
| `boss-quest-engine` | Quest Engine                           | 5/5        | Type-safe operations, immutable state, validation, progression   |

## Files and workflow

- `index.ts` (or `index.js` for 08 and 09): public types/JSDoc, unsolved functions, sample data, expected output comments.
- `PROBLEM.md`: complete behavioral contract, examples, and edge cases.
- `index.test.ts`: separate black-box tests using only Node's built-in `node:test` and `node:assert/strict`. Leave tests closed if you want to work from the problem statement first. Tests contain expected behavior, not reference implementations.

Execute an entry file (exports only; no output is expected):

```sh
npm run exercise -- exercises/01-statistics/index.ts
npm run exercise -- exercises/08/index.js
```

Run a task's tests:

```sh
npm run exercise -- --test exercises/01-statistics/index.test.ts
npm run exercise -- --test exercises/08/index.test.ts
npm run exercise -- --test exercises/boss-quest-engine/index.test.ts
```

Run all tests (quote the glob so Node expands it consistently across shells):

```sh
npm run exercise -- --test "exercises/*/index.test.ts"
```

Every implementation starts with `throw new Error("Not implemented")`. Failed tests are expected until you solve the corresponding exercise. Node's runner reports each test independently, so a first failure does not hide remaining cases. For 08, implement both exported functions. Tests cannot prove the required declaration placement or private-state design; review those requirements yourself.

Check setup and code quality:

```sh
npm run typecheck
npm run check
npm run build
```

JavaScript exercises have JSDoc types. The exercise configuration enables `allowJs` and `checkJs`, so `npm run typecheck` checks both JavaScript bodies and all TypeScript entry files and tests in strict mode.

Format only the file you intend to change, for example:

```sh
npx biome format --write exercises/01-statistics/index.ts
```

`npm run format` formats the whole project, including your solutions. No solution code is generated or automatically rewritten by the exercise tests. Do not add dependencies or UI layers to solve these synchronous tasks. For 10, write your own `DESIGN.md` before implementing. Add more test cases of your own as you discover edge cases.
