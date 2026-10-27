/**
 * 08 — Scope and Variable Visibility.
 * Implement a scope report and predict which bindings are accessible.
 * Full input/output contract, business rules, and edge cases: PROBLEM.md.
 */
// @ts-check

/** @typedef {{ world: string, player: string, reward: number, message: string }} ScopeReport */
/** @typedef {{ globalWorld: boolean, functionPlayer: boolean, reward: boolean, blockMessage: boolean }} Visibility */

/**
 * @param {string} _playerName
 * @param {boolean} _includeBonus
 * @returns {ScopeReport}
 */
export function describeScope(_playerName, _includeBonus) {
    throw new Error("Not implemented");
}

/** @returns {{ afterBlock: Visibility, insideBlock: Visibility, outsideFunction: Visibility }} */
export function predictVisibility() {
    throw new Error("Not implemented");
}

export const sampleInput = {
    world: "Northlands",
    playerName: "Ada",
    includeBonus: true,
};
// With globalThis.playgroundWorld = "Northlands", describeScope("Ada", true) expected:
// { world: "Northlands", player: "Ada", reward: 25, message: "Bonus for Ada" }
// predictVisibility() expected: the accessibility table you must determine from the contract.
