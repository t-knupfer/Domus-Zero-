const test = require("node:test");
const assert = require("node:assert/strict");
const { calculate, assumptions } = require("../src/assets/js/redesign-calculator.js");
const base = { bill: 2400, size: 180, product: "integrated", restrictions: "no" };
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, actual + " != " + expected);

test("heat-pump-only arithmetic excludes solar and applies incentives only to heating", () => {
    const result = calculate({ ...base, product: "hp" });
    const gasBill = 2400 * 0.58;
    const replacementElectricity = gasBill / 0.11 * 0.9 / 3.5 * 0.26;
    close(result.savings, gasBill - replacementElectricity);
    assert.equal(result.capacity, 0);
    assert.equal(result.generation, 0);
    assert.equal(result.gross, 9800);
    assert.equal(result.incentives, 6370);
    assert.equal(result.net, 3430);
    close(result.payback, 3430 / result.savings);
});

test("battery has no assumed incentive; restrictions increase costs, not savings", () => {
    const integrated = calculate(base);
    const battery = calculate({ ...base, product: "full" });
    assert.equal(battery.gross - integrated.gross, 11000);
    assert.equal(battery.incentives, integrated.incentives);
    assert.ok(battery.savings >= integrated.savings);
    const restricted = calculate({ ...base, restrictions: "yes" });
    close(restricted.gross, integrated.gross * 1.22);
    close(restricted.net, integrated.net * 1.22);
    assert.equal(restricted.savings, integrated.savings);
});

test("zero-incentive model yields full net cost and zero-saving model yields no payback", () => {
    const result = calculate(base, { ...assumptions, solarIncentive: 0, heatPumpIncentive: 0 });
    assert.equal(result.net, result.gross);
    const zero = calculate({ ...base, product: "pv" }, { ...assumptions, selfConsumption: 0 });
    assert.equal(zero.savings, 0);
    assert.equal(zero.payback, null);
});

test("all boundary scenarios stay finite, conserve cost totals and fit the roof", () => {
    for (const bill of [600, 8000]) for (const size of [50, 600])
    for (const product of ["pv", "hp", "integrated", "full"])
    for (const restrictions of ["no", "unsure", "yes"]) {
        const r = calculate({ bill, size, product, restrictions });
        for (const key of ["capacity", "generation", "savings", "gross", "incentives", "net"]) {
            assert.ok(Number.isFinite(r[key]) && r[key] >= 0, key);
        }
        assert.ok(r.savings <= bill);
        assert.ok(r.capacity <= size * 0.22 / 4.5);
        close(r.net + r.incentives, r.gross);
        assert.ok(r.payback === null || Number.isFinite(r.payback));
    }
});

test("invalid input is rejected instead of producing a plausible estimate", () => {
    for (const change of [{ bill: NaN }, { bill: Infinity }, { bill: 599 }, { bill: 8001 },
        { bill: "2400" }, { size: 49 }, { size: 601 }, { product: "unknown" }, { restrictions: "unknown" }]) {
        assert.throws(() => calculate({ ...base, ...change }), RangeError);
    }
});
