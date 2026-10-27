import assert from "node:assert/strict";
import { test } from "node:test";
import { createXpTracker } from "./index.js";

test("state persists and reset restores initial XP", () => {
    const tracker = createXpTracker(10);
    assert.equal(tracker({ type: "earn", amount: 5 }), 15);
    assert.equal(tracker({ type: "spend", amount: 3 }), 12);
    assert.equal(tracker({ type: "read" }), 12);
    assert.equal(tracker({ type: "reset" }), 10);
});
test("trackers are independent", () => {
    const a = createXpTracker(0);
    const b = createXpTracker(7);
    assert.equal(a({ type: "earn", amount: 2 }), 2);
    assert.equal(b({ type: "read" }), 7);
    assert.equal(a({ type: "read" }), 2);
    assert.equal(b({ type: "reset" }), 7);
});
test("invalid amounts and insufficient balance", () => {
    const tracker = createXpTracker(5);
    for (const amount of [
        -1,
        0.5,
        Number.NaN,
        Number.POSITIVE_INFINITY,
        Number.MAX_SAFE_INTEGER + 1,
    ]) {
        assert.equal(tracker({ type: "earn", amount }), 5);
        assert.equal(tracker({ type: "spend", amount }), 5);
    }
    assert.equal(tracker({ type: "spend", amount: 6 }), 5);
    assert.equal(tracker({ type: "spend", amount: 5 }), 0);
    assert.equal(tracker({ type: "earn", amount: 0 }), 0);
});
test("invalid initial XP and overflow", () => {
    for (const initial of [
        -1,
        0.5,
        Number.NaN,
        Number.POSITIVE_INFINITY,
        Number.MAX_SAFE_INTEGER + 1,
    ]) {
        assert.throws(() => createXpTracker(initial), RangeError);
    }
    const tracker = createXpTracker(Number.MAX_SAFE_INTEGER);
    assert.equal(tracker({ type: "earn", amount: 1 }), Number.MAX_SAFE_INTEGER);
    assert.equal(tracker({ type: "read" }), Number.MAX_SAFE_INTEGER);
});
