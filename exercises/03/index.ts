/**
 * 03 — Quest Difficulty Summary.
 * Summarize completed quests by their allowed difficulty.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
export type Difficulty = "easy" | "medium" | "hard";
export type Quest = {
    id: string;
    difficulty: Difficulty;
    xp: number;
    completed: boolean;
};
export type DifficultySummary = Record<
    Difficulty,
    { count: number; totalXp: number }
>;

export function difficultySummary(
    _quests: readonly Quest[],
): DifficultySummary {
    throw new Error("Not implemented");
}

export const sampleInput: Quest[] = [
    { id: "herbs", difficulty: "easy", xp: 10, completed: true },
    { id: "delivery", difficulty: "easy", xp: 20, completed: true },
    { id: "fort", difficulty: "hard", xp: 100, completed: false },
];
// Expected: { easy: { count: 2, totalXp: 30 }, medium: { count: 0, totalXp: 0 }, hard: { count: 0, totalXp: 0 } }
