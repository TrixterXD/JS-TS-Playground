/**
 * 05 — Quest Completion.
 * Complete a quest and award its XP exactly once, without mutation.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
export type Quest = { id: string; xp: number; completed: boolean };
export type State = { player: { id: string; xp: number }; quests: Quest[] };
export type CompletionResult = {
    state: State;
    status: "completed" | "already-completed" | "not-found";
};

export function completeQuest(
    _state: State,
    _questId: string,
): CompletionResult {
    throw new Error("Not implemented");
}

export const sampleInput: State = {
    player: { id: "ada", xp: 15 },
    quests: [{ id: "bridge", xp: 40, completed: false }],
};
// completeQuest(sampleInput, "bridge") expected:
// { status: "completed", state: { player: { id: "ada", xp: 55 }, quests: [{ id: "bridge", xp: 40, completed: true }] } }
