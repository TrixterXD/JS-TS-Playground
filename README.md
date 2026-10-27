# JS / TS Playground

A minimal environment for independent JavaScript, TypeScript, algorithm, and React practice. Exercise solutions and hints are intentionally not included.

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

## Adding exercises

Solve the existing tasks sequentially as described in [exercises/README.md](exercises/README.md). To add your own task, create a new folder under `exercises/` with an `index.ts` or `index.js`, a `PROBLEM.md`, and a separate `index.test.ts`. Exercise files are automatically included in type checking. Run any exercise by passing its path to `npm run exercise --`.

Exercises use Node.js, not browser globals or React. The project uses ES modules; use `import`/`export` and explicit file extensions for local Node.js imports. JavaScript files also run with tsx and are checked using `allowJs`, `checkJs`, and JSDoc contracts.

For independent learning, AI assistance should be limited to environment maintenance: do not generate solutions, algorithms, or hints, or automatically rewrite user-written exercise solutions. Formatting is an explicit user action.
