/**
 * Boss Fight — Quest Engine.
 * Implement a synchronous standalone quest engine with immutable operations.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
export type Difficulty = "easy" | "medium" | "hard";
export type Player = { id: string; name: string; xp: number; level: number };
export type Quest = {
    id: string;
    title: string;
    baseXp: number;
    difficulty: Difficulty;
    minLevel: number;
};
export type Completion = {
    playerId: string;
    questId: string;
    awardedXp: number;
};
export type EngineState = {
    players: Player[];
    quests: Quest[];
    completions: Completion[];
    appliedOperationIds: string[];
};
export type Operation =
    | { id: string; type: "create-quest"; quest: Quest }
    | { id: string; type: "complete-quest"; playerId: string; questId: string };
export type Status =
    | "applied"
    | "invalid-operation"
    | "duplicate-operation"
    | "invalid-quest"
    | "quest-exists"
    | "player-not-found"
    | "quest-not-found"
    | "already-completed"
    | "level-too-low"
    | "xp-overflow";
export type EngineResult = { state: EngineState; status: Status };

export function applyOperation(
    _state: EngineState,
    _operation: Operation,
): EngineResult {
    throw new Error("Not implemented");
}

export const sampleInput: { state: EngineState; operation: Operation } = {
    state: {
        players: [{ id: "ada", name: "Ada", xp: 90, level: 1 }],
        quests: [
            {
                id: "bridge",
                title: "Repair bridge",
                baseXp: 60,
                difficulty: "medium",
                minLevel: 1,
            },
        ],
        completions: [],
        appliedOperationIds: [],
    },
    operation: {
        id: "op1",
        type: "complete-quest",
        playerId: "ada",
        questId: "bridge",
    },
};
// Expected: { status: "applied", state: {
// players: [{ id: "ada", name: "Ada", xp: 210, level: 3 }],
// quests: [{ id: "bridge", title: "Repair bridge", baseXp: 60, difficulty: "medium", minLevel: 1 }],
// completions: [{ playerId: "ada", questId: "bridge", awardedXp: 120 }], appliedOperationIds: ["op1"] } }
