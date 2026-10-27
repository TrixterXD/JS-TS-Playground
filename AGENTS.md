# Coding agent instructions

- Read [exercise authoring guidelines](docs/EXERCISE_GUIDELINES.md) and the [learning profile](docs/learning-profile/README.md) before designing tasks. Do not invent a missing audit or proficiency scores.
- Inspect at least two existing exercises: their problem statements, signatures, and separate tests. Prefer one new exercise at a time in interactive learning.
- Use `npm run new-exercise -- 11 "Array Practice"` with an unused number. Do not create another one-off Python or other scaffold generator. The command creates templates, not authored content.
- Never overwrite student solutions or change existing tests without explicit permission. Never automatically solve exercises or provide algorithms, pseudocode, method/operator hints, or solution-like helpers.
- Keep implementations as `throw new Error("Not implemented")` when authoring tasks; write behavioral tests separately and remove the failing template test only when real tests are authored.
- Preserve the Vite/React/TypeScript/Biome/tsx setup. Avoid new dependencies, abstractions, or architecture without a concrete need.
- Check changes with `npm run typecheck`, `npm run check`, and `npm run build`; generator changes also require `npm run test:scaffold`. Unsolved exercise-test failures are expected, not permission to change solutions or expectations.
