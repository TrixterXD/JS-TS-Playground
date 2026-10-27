/**
 * 07 — Quest Event Processor.
 * Process ordered quest events into a final immutable state.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
export type Quest = {
    id: string;
    xp: number;
    status: "available" | "active" | "completed";
};
export type QuestEvent = {
    id: string;
    questId: string;
    type: "start" | "complete" | "cancel";
};
export type EventState = {
    quests: Quest[];
    totalXp: number;
    processedEventIds: string[];
};

export function processEvents(
    _initial: EventState,
    _events: readonly QuestEvent[],
): EventState {
    throw new Error("Not implemented");
}

export const sampleInput: { initial: EventState; events: QuestEvent[] } = {
    initial: {
        quests: [{ id: "bridge", xp: 40, status: "available" }],
        totalXp: 10,
        processedEventIds: [],
    },
    events: [
        { id: "e1", questId: "bridge", type: "start" },
        { id: "e2", questId: "bridge", type: "complete" },
    ],
};
// Expected: { quests: [{ id: "bridge", xp: 40, status: "completed" }], totalXp: 50, processedEventIds: ["e1", "e2"] }
