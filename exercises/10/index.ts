/**
 * 10 — Quest Progress System.
 * Report per-player progress from assignments, quests, and completion records.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
export type Player = { id: string; name: string };
export type Quest = { id: string; target: number; xp: number };
export type Assignment = { playerId: string; questId: string };
export type ProgressRecord = {
    playerId: string;
    questId: string;
    recordId: string;
    amount: number;
};
export type QuestProgress = {
    questId: string;
    progress: number;
    target: number;
    completed: boolean;
    earnedXp: number;
};
export type PlayerProgress = {
    playerId: string;
    quests: QuestProgress[];
    completedCount: number;
    earnedXp: number;
    percent: number;
};

export function calculateProgress(
    _players: readonly Player[],
    _quests: readonly Quest[],
    _assignments: readonly Assignment[],
    _completions: readonly ProgressRecord[],
): PlayerProgress[] {
    throw new Error("Not implemented");
}

export const sampleInput = {
    players: [{ id: "ada", name: "Ada" }],
    quests: [
        { id: "herbs", target: 3, xp: 30 },
        { id: "scout", target: 2, xp: 20 },
    ],
    assignments: [
        { playerId: "ada", questId: "herbs" },
        { playerId: "ada", questId: "scout" },
    ],
    completions: [
        { playerId: "ada", questId: "herbs", recordId: "r1", amount: 5 },
        { playerId: "ada", questId: "scout", recordId: "r2", amount: 1 },
    ],
};
// Expected: [{ playerId: "ada", quests: [
// { questId: "herbs", progress: 3, target: 3, completed: true, earnedXp: 30 },
// { questId: "scout", progress: 1, target: 2, completed: false, earnedXp: 0 }
// ], completedCount: 1, earnedXp: 30, percent: 80 }]
