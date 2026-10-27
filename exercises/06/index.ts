/**
 * 06 — Player Leaderboard.
 * Rank players from quest-completion records across three collections.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
export type User = { id: string; name: string };
export type Quest = { id: string; xp: number };
export type Completion = { userId: string; questId: string };
export type LeaderboardEntry = {
    rank: number;
    userId: string;
    name: string;
    completedCount: number;
    totalXp: number;
};

export function leaderboard(
    _users: readonly User[],
    _quests: readonly Quest[],
    _completions: readonly Completion[],
): LeaderboardEntry[] {
    throw new Error("Not implemented");
}

export const sampleInput = {
    users: [
        { id: "ada", name: "Ada" },
        { id: "lin", name: "Lin" },
    ],
    quests: [{ id: "bridge", xp: 40 }],
    completions: [
        { userId: "lin", questId: "bridge" },
        { userId: "lin", questId: "bridge" },
    ],
};
// Expected: [{ rank: 1, userId: "lin", name: "Lin", completedCount: 1, totalXp: 40 },
// { rank: 2, userId: "ada", name: "Ada", completedCount: 0, totalXp: 0 }]
