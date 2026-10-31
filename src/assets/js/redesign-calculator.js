/* Illustrative model adapted from the supplied mock-up. Review assumptions before public use. */
(function () {
    "use strict";
    const assumptions = Object.freeze({
        electricityPrice: 0.26, gasPrice: 0.11, electricShare: 0.42,
        gasEfficiency: 0.9, heatPumpCOP: 3.5, solarYield: 1300,
        roofShare: 0.22, areaPerKW: 4.5, solarCostPerKW: 1500,
        solarFixedCost: 1200, heatPumpCost: 9800, batteryCost: 11000,
        solarIncentive: 0.5, heatPumpIncentive: 0.65,
        selfConsumption: 0.7, batterySelfConsumption: 0.85
    });

    function calculate(input, model = assumptions) {
        const { bill, size, product, restrictions } = input;
        if (!Number.isFinite(bill) || bill < 600 || bill > 8000 ||
            !Number.isFinite(size) || size < 50 || size > 600) {
            throw new RangeError("Bill or home size is outside the supported range.");
        }
        if (!["pv", "hp", "integrated", "full"].includes(product) ||
            !["no", "unsure", "yes"].includes(restrictions)) {
            throw new RangeError("Unknown product or restriction.");
        }
        const hasSolar = product !== "hp";
        const hasHeatPump = product !== "pv";
        const electricBill = bill * model.electricShare;
        const gasBill = bill - electricBill;
        const heatPumpKWh = hasHeatPump ? gasBill / model.gasPrice * model.gasEfficiency / model.heatPumpCOP : 0;
        const electricNeed = electricBill / model.electricityPrice + heatPumpKWh;
        const roofLimit = size * model.roofShare / model.areaPerKW;
        const capacity = hasSolar ? Math.floor(Math.min(roofLimit, electricNeed / model.solarYield, 20) * 2) / 2 : 0;
        const generation = capacity * model.solarYield;
        const solarUse = product === "full" ? model.batterySelfConsumption : model.selfConsumption;
        const solarSavings = Math.min(electricNeed, generation * solarUse) * model.electricityPrice;
        const heatSavings = hasHeatPump ? gasBill - heatPumpKWh * model.electricityPrice : 0;
        const savings = Math.max(0, Math.min(bill, solarSavings + heatSavings));
        const adjustment = { no: 1, unsure: 1.08, yes: 1.22 }[restrictions];
        const solarCost = hasSolar ? (capacity * model.solarCostPerKW + model.solarFixedCost) * adjustment : 0;
        const heatPumpCost = hasHeatPump ? model.heatPumpCost * Math.max(0.6, Math.min(1.8, (size / 180) ** 0.6)) * adjustment : 0;
        const storageCost = product === "full" ? model.batteryCost * adjustment : 0;
        const gross = solarCost + heatPumpCost + storageCost;
        // Rates apply separately to the assumed eligible solar and heat-pump costs, never to the battery.
        const incentives = solarCost * model.solarIncentive + heatPumpCost * model.heatPumpIncentive;
        const net = gross - incentives;
        return { capacity, generation, savings, gross, incentives, net, payback: savings > 0 ? net / savings : null };
    }

    function initialize(root) {
        const italian = root.dataset.language === "it";
        const locale = italian ? "it-IT" : "en-US";
        const money = new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
        const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
        const find = name => root.querySelector("[data-" + name + "]");
        let timer;
        function update(announce) {
            const result = calculate({
                bill: Number(find("bill").value), size: Number(find("size").value),
                product: find("product").value, restrictions: find("constraints").value
            });
            find("bill-label").textContent = money.format(Number(find("bill").value));
            find("size-label").textContent = number.format(Number(find("size").value)) + " m²";
            for (const key of ["saving", "gross", "incentives", "net"]) {
                find(key).textContent = money.format(result[key === "saving" ? "savings" : key]);
            }
            find("capacity").textContent = number.format(result.capacity) + " kWp";
            find("generation").textContent = number.format(result.generation) + " kWh";
            find("payback").textContent = result.payback === null ? (italian ? "Non disponibile" : "Not available") :
                number.format(result.payback) + (italian ? " anni" : " years");
            find("assumptions").textContent = italian ?
                "Elettricità €0,26/kWh; gas €0,11/kWh; quota elettrica 42%; rendimento caldaia 90%; COP 3,5; produzione FV 1.300 kWh/kWp/anno. Autoconsumo 70% (85% con batteria). Incentivi esemplificativi: 50% FV, 65% pompa di calore, nessuno sulla batteria. Vincoli: +8% se incerti, +22% se presenti. Sono ipotesi dimostrative, non aliquote confermate." :
                "Electricity €0.26/kWh; gas €0.11/kWh; electricity share 42%; boiler efficiency 90%; COP 3.5; solar yield 1,300 kWh/kWp/year. Self-consumption 70% (85% with battery). Example incentives: 50% solar, 65% heat pump, none on battery. Restrictions: +8% if uncertain, +22% if present. These are demonstration assumptions, not confirmed incentive rates.";
            if (announce) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    find("announcement").textContent = (italian ? "Risparmio annuo stimato: " : "Estimated annual savings: ") +
                        money.format(result.savings) + (italian ? ". Costo netto: " : ". Net cost: ") + money.format(result.net);
                }, 200);
            }
        }
        update(false);
        root.addEventListener("input", () => update(true));
        root.hidden = false;
        const fallback = root.nextElementSibling;
        if (fallback && fallback.hasAttribute("data-dz-calc-fallback")) fallback.hidden = true;
    }

    if (typeof module !== "undefined" && module.exports) module.exports = { calculate, assumptions };
    if (typeof document !== "undefined") {
        for (const root of document.querySelectorAll("[data-dz-calculator]")) initialize(root);
    }
})();
