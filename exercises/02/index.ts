/**
 * 02 — Quest Ownership.
 * Attach each user's quests to that user.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
export type User = { id: string; name: string };
export type Quest = { id: string; title: string; ownerId: string };
export type UserQuests = User & { quests: Quest[] };

export function assignQuests(
    _users: readonly User[],
    _quests: readonly Quest[],
): UserQuests[] {
    throw new Error("Not implemented");
}

export const sampleInput = {
    users: [
        { id: "ada", name: "Ada" },
        { id: "lin", name: "Lin" },
    ],
    quests: [
        { id: "delivery", title: "Deliver supplies", ownerId: "ada" },
        { id: "lost", title: "Lost order", ownerId: "unknown" },
    ],
};
// Expected: [{ id: "ada", name: "Ada", quests: [{ id: "delivery", title: "Deliver supplies", ownerId: "ada" }] },
// { id: "lin", name: "Lin", quests: [] }]
