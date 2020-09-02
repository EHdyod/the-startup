import { useUpgradesStore } from "@/store/upgradesStore";

describe("upgrades store tests", () => {
  const store = useUpgradesStore();
  beforeEach(() => {
    store.reset();
  });

  describe("states test", () => {
    const state = store.state;
    it("should state have upgrades", () => {
      expect(state).not.toBeNull();
    });
  });

  describe("getters tests", () => {
    it("should be only the first upgrade available at level 0 and the second upgrade should be disabled", () => {
      const upgrades = store.state;
      const upgradesAvailable = store.getAvailableUpgrades.value;
      expect(upgradesAvailable.length).toBe(2);
      expect(upgrades[0].disabled).not.toBe(true);
      expect(upgrades[1].disabled).toBe(true);
    });
  });

  describe("actions tests", () => {
    it("should quantity have increase by 5 after buy 5 upgrades", () => {
      const index = 0;
      const quantity = 5;
      store.buyUpgrade(index, quantity);
      const upgrade = store.state[index];
      expect(upgrade.quantity).toBe(quantity);
    });
    it("should return the price of 5 upgrades", () => {
      const index = 0;
      const quantity = 5;
      const upgrade = store.state[index];
      const initCost = upgrade.cost;
      const increase = upgrade.increase;
      const priceTheo = Math.round(initCost * increase ** quantity);
      const priceRes = store.getPrice(index, quantity);
      expect(priceRes).toBe(priceTheo);
    });
    it("should be more expansive to buy 5 upgrades after buy 5 upgrades", () => {
      const index = 0;
      const quantity = 5;
      const upgrade = store.state[index];
      const initPrice = upgrade.cost;
      store.buyUpgrade(index, quantity);
      const finalPrice = store.getPrice(index, quantity);
      expect(finalPrice > initPrice).toBe(true);
    });
  });
});
