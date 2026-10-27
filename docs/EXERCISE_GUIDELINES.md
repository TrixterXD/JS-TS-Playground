# Exercise authoring guidelines

## Teaching philosophy

The goal is independent algorithmic thinking, not memorizing JavaScript methods or maximizing completed tasks. Support the student's own reasoning through:

**Problem understanding → Input and output → Data model → Algorithm → JavaScript implementation → TypeScript modeling → Explanation**

This is a learning sequence, not permission to supply the algorithm. Let the student discover and explain it.

- Prefer one exercise at a time during interactive learning.
- Do not name the JavaScript methods, operators, loops, or implementation patterns to use. Do not provide pseudocode, algorithmic hints, reference solutions, or helpers that solve subproblems.
- Prefer practical problems to artificial syntax drills. A scope-specific task may specify declarations needed to investigate scope, but should not supply its completed behavior.
- Introduce one genuinely new concept at a time. Harder tasks should combine already learned mechanisms.
- Introduce edge cases progressively. Make behavior explicit without inflating the task with unrelated exceptions.
- Avoid complexity without a learning purpose. An exercise is not automatically a large architecture project.
- Keep statements concise, unambiguous, and consistent with types, examples, and tests.
- Keep tests separate from implementations. Never overwrite student solutions or adjust existing tests without explicit permission.

## Initial student profile

The **JS/TS Skill Audit dated 2026-10-25**, if available, is the authoritative initial profile. Consult [learning-profile/README.md](learning-profile/README.md) and any actual audit stored there. No audit file was found during this setup; do not fabricate its contents or infer scores from this summary.

The user has confirmed these strengths:

- JavaScript fundamentals and control flow; arrays and objects.
- `map`, `filter`, `find`, `some`, `every`, and `reduce`.
- Callbacks and basic higher-order functions; dynamic object keys.
- References, mutations, and immutable updates.
- Basic TypeScript modeling, unions and narrowing, basic generics, `Record`, and `Partial`.

The main improvement area is **independent decomposition of unfamiliar multi-step problems**: identifying intermediate data, processing order, invariants, and edge cases before implementation.

Areas requiring foundational learning or validation:

- Scope and closures.
- Pure functions as a formal concept.
- Async JavaScript.
- React rendering, state ownership, derived state, effects, and lifecycle.
- TypeScript type compatibility.

Practical React or Next.js exposure does not establish deep understanding of rendering or state models. These are starting observations, not permanent labels. Use later audits and observed independent work to update the profile; do not invent skill levels when evidence is missing.

## Difficulty rubric (1–5)

Difficulty measures conceptual and algorithmic complexity, not file length, property count, or the sheer number of edge cases.

| Level | Meaning                                     | Appropriate scope                                                                                                                                                                                      |
| ----- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | Familiar concept practice                   | One clear objective with familiar data and a small number of direct rules.                                                                                                                             |
| 2     | Small combination or one new concept        | A few familiar mechanisms together, or a deliberately bounded introduction to one new concept. State prerequisites and distinguish introduction from fluency practice.                                 |
| 3     | Unfamiliar combination of familiar concepts | Related collections or state transitions with several interacting rules; independent decomposition is needed. No bundle of new language concepts.                                                      |
| 4     | Complex multi-stage algorithmic problem     | Several dependent results, intermediate data, ordering constraints, and invariants requiring the student to plan and explain their decomposition.                                                      |
| 5     | Boss Fight                                  | A bounded domain problem integrating previously learned mechanisms, validation, and edge cases. It should not introduce several unfamiliar concepts simultaneously or require production architecture. |

Calibrate to current evidence, not task numbering. Introducing a new concept does not automatically make a task harder than a complex combination of familiar ones. Explain the learning objective and prerequisites in the problem, not a solution strategy.

## Authoring workflow

1. Read the root [AGENTS.md](../AGENTS.md), learning profile, and at least two existing exercises including their contracts, signatures, and tests. Check the requested topic against prerequisite knowledge.
2. Use the reusable generator from the repository root:

   ```sh
   npm run new-exercise -- 11 "Array Practice"
   ```

   Choose an unused positive number. Do not write another one-off Python or other scaffolding script. The generator only creates templates; it does not author an exercise or call AI services.
3. Author the actual problem, realistic sample data, exact expected output comments, and appropriate function signature. Keep the implementation empty with `throw new Error("Not implemented")`.
4. Replace the generated failing test placeholder with independent behavioral assertions using `node:test` and `node:assert/strict`. Include at least four meaningful cases covering normal behavior and relevant boundaries. Do not include a reference implementation or reveal a strategy in test helpers or names.
5. Remove the template-only status when the authored task passes the quality checklist. Keep task documentation, entry comments, and expectations synchronized. Add a concise entry to `exercises/README.md` when ready for teaching.
6. Run `npm run typecheck`, `npm run check`, and `npm run build`. Execute that task's tests: failures caused by the unimplemented stub are expected, while syntax, import, fixture, or runner errors are not. Do not solve the exercise merely to make its tests green.

Generated placeholders intentionally fail even if an implementation later exists: they must be replaced with authored tests. An empty test suite, skipped suite, or a test that merely expects `Not implemented` is not evidence of exercise completion.

## Quality checklist

Before considering an authored exercise ready:

- [ ] Input/output contracts, guarantees, and applicable validation rules are unambiguous.
- [ ] The learning objective, prerequisites, and calibrated difficulty are clear.
- [ ] Ordering, ties, duplicate behavior, mutation/identity rules, and error behavior are specified where relevant.
- [ ] Sample data is realistic and expected results agree with the statement and tests.
- [ ] Tests cover normal cases and meaningful edge cases, separately from implementation.
- [ ] Tests specify observable behavior without revealing the implementation.
- [ ] No reference solution, algorithm, pseudocode, hint, or solution-like helper appears in student files.
- [ ] The task is solvable using the documented prerequisite knowledge.
- [ ] Existing student work and tests are unchanged unless explicitly authorized.
