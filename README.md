# JS / TS Playground

A minimal environment for independent JavaScript, TypeScript, algorithm, and React practice. Exercise solutions and hints are intentionally not included.

## Technology stack

Vite, React, strict TypeScript, Biome (formatting/linting/import organization), and tsx (standalone execution), managed with npm. Tests use Node's built-in `node:test` and `node:assert/strict`; no external test framework is needed.

## Requirements

Use Node.js 24 LTS (verified with 24.22.1) and npm. Vite requires Node.js ^20.19.0 or >=22.12.0.

```sh
npm ci
```

## Folder structure

```text
src/
  App.tsx             Minimal React application
  main.tsx            Browser entry point
  index.css           Shared styles
exercises/
  README.md           Sequential learning guide and test commands
  01-statistics/      Quest Statistics: contract, stub, sample, tests
  02/ ... 10/         Progressive tasks (08 and 09 use JavaScript)
  boss-quest-engine/  Standalone domain-engine challenge
scripts/
  create-exercise.ts       Reusable template generator
  create-exercise.test.ts  Generator safety tests
docs/
  EXERCISE_GUIDELINES.md  AI exercise-authoring guidelines
  learning-profile/      Initial audit reference and future profiles
AGENTS.md             Practical coding-agent instructions
biome.json            Formatting, linting, and import organization
vite.config.ts        Vite + React configuration
tsconfig.json         TypeScript project references
tsconfig.app.json     Strict browser TypeScript settings
tsconfig.node.json    Strict Node.js / Vite settings
tsconfig.exercises.json  Strict Node.js exercise settings
```

## Daily commands

```sh
npm run dev
npm run exercise -- exercises/01-statistics/index.ts
npm run exercise -- --test exercises/01-statistics/index.test.ts
npm run typecheck
npm run check
npm run format
npm run build
npm run preview
```

- `dev`: start the React development server; open the URL printed by Vite.
- `exercise`: execute the specified TypeScript (or JavaScript) file with tsx in Node.js, independently of React and the browser. The first placeholder intentionally produces no output. tsx executes code without type checking; run `typecheck` separately.
- `typecheck`: check the app, Vite configuration, all JavaScript/TypeScript exercises, and their tests in strict mode without emitting JavaScript.
- `check`: check formatting, linting, and import organization without modifying files.
- `format`: format supported project files, including exercises. This does not apply lint fixes or organize imports. To format just one file, use `npx biome format --write exercises/01-statistics/index.ts`.
- `build`: type-check all projects, then create the production React build in `dist/`.
- `preview`: serve the production build locally after running `build`.

Biome is the only formatter/linter, using four spaces, double quotes, and semicolons. Generated output, dependencies, and the npm lockfile are excluded from Biome checks.

## Tests

Work sequentially using [exercises/README.md](exercises/README.md). Run one task's tests with the command above, or all authored exercise tests with:

```sh
npm run exercise -- --test "exercises/*/index.test.ts"
```

Unsolved exercise tests are expected to fail with `Not implemented`. The generator's independent safety suite should pass:

```sh
npm run test:scaffold
```

## Adding exercises

From the repository root:

```sh
npm run new-exercise -- 11 "Array Practice"
```

This creates `exercises/11-array-practice/` with `PROBLEM.md`, `index.ts`, and `index.test.ts`. **It only creates templates.** Actual problem statements, realistic data, expected outputs, test scenarios, and function signatures must be authored separately. The implementation throws `Not implemented`, and the placeholder test explicitly fails until replaced with real behavioral tests. No AI APIs are called.

Use exactly two arguments: a positive safe-integer number and a quoted title of 1–100 characters without control characters. Numbers are padded to at least two digits. Titles become lowercase ASCII slugs; accents are normalized and punctuation becomes hyphens. At least one ASCII letter or digit must remain. The generator rejects any already-used number (including legacy folders such as `02`) and never replaces an existing target or student solution. Invalid arguments create no exercise folder.

Exercise files are automatically type-checked; generator code and its tests are also included in the Node.js TypeScript project. Run any exercise by passing its path to `npm run exercise --`.

Exercises use Node.js, not browser globals or React. The project uses ES modules; use `import`/`export` and explicit file extensions for local Node.js imports. JavaScript files also run with tsx and are checked using `allowJs`, `checkJs`, and JSDoc contracts.

## AI authoring and learning profile

Coding agents should start with [AGENTS.md](AGENTS.md), follow [docs/EXERCISE_GUIDELINES.md](docs/EXERCISE_GUIDELINES.md), and consult [docs/learning-profile/README.md](docs/learning-profile/README.md). The original skill audit dated 2026-10-25 was not found; that directory explains how to add it verbatim and maintain future profiles without changing the generator.

AI assistance may maintain tooling and author requested exercises, but must not generate solutions, algorithms, or hints, or automatically rewrite student work. Formatting is an explicit user action.
