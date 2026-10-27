/**
 * 09 — Stateful Function Factory.
 * Create independent XP trackers whose returned functions retain private state.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
// @ts-check

/** @typedef {{ type: "read" } | { type: "reset" } | { type: "earn", amount: number } | { type: "spend", amount: number }} XpCommand */

/**
 * @param {number} _initialXp
 * @returns {(command: XpCommand) => number}
 */
export function createXpTracker(_initialXp) {
    throw new Error("Not implemented");
}

/** @type {{ initialXp: number, commands: XpCommand[] }} */
export const sampleInput = {
    initialXp: 10,
    commands: [
        { type: "earn", amount: 5 },
        { type: "spend", amount: 3 },
        { type: "read" },
        { type: "reset" },
    ],
};
// One tracker created with 10, receiving the listed commands, returns: [15, 12, 12, 10].
