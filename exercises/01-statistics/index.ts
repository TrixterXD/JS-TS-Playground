/**
 * 01 — Quest Statistics.
 * Report statistics for completed quests only.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
export type Quest = {
    id: string;
    title: string;
    xp: number;
    completed: boolean;
};
export type Statistics = {
    completedCount: number;
    totalXp: number;
    averageXp: number;
    hardestQuest: Quest | null;
};

export function statistics(_quests: readonly Quest[]): Statistics {
    throw new Error("Not implemented");
}

export const sampleInput: Quest[] = [
    { id: "herbs", title: "Gather herbs", xp: 20, completed: true },
    { id: "bridge", title: "Repair bridge", xp: 40, completed: true },
    { id: "dragon", title: "Find dragon", xp: 500, completed: false },
];
// Expected: { completedCount: 2, totalXp: 60, averageXp: 30,
// hardestQuest: { id: "bridge", title: "Repair bridge", xp: 40, completed: true } }
