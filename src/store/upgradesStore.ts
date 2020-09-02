import { createStore } from "pinia";
import { usePlayerStore } from "./playerStore";

export interface Upgrade {
  name: string;
  cost: number;
  initCost: number;
  increase: number;
  bps: number;
  quantity: number;
  unlocksAt: number;
  disabled: boolean;
}

export const useUpgradesStore = createStore({
  id: "upgrades",
  state: (): Upgrade[] => [
    {
      name: "Intern",
      cost: 50,
      initCost: 50,
      increase: 1.15,
      bps: 0.1,
      quantity: 0,
      unlocksAt: 0,
      disabled: false
    },
    {
      name: "Junior Developer",
      cost: 100,
      initCost: 100,
      increase: 1.2,
      bps: 0.5,
      quantity: 0,
      unlocksAt: 1,
      disabled: true
    },
    {
      name: "Web Developer",
      cost: 300,
      initCost: 300,
      increase: 1.4,
      bps: 1,
      quantity: 0,
      unlocksAt: 2,
      disabled: true
    }
  ],
  getters: {
    getAvailableUpgrades(state) {
      const playerLevel = usePlayerStore().getLevel.value;
      return state
        .filter(upg => upg.unlocksAt - 1 <= playerLevel)
        .map(upg => {
          upg.unlocksAt - 1 === playerLevel
            ? (upg.disabled = true)
            : (upg.disabled = false);
          return upg;
        });
    }
  },
  actions: {
    buyUpgrade(index: number, quantity: number) {
      const upgrade = this.state[index];
      upgrade.cost = Math.round(
        upgrade.initCost * upgrade.increase ** quantity
      );
      upgrade.quantity += quantity;
    },
    getPrice(index: number, quantity: number) {
      const upgrade = this.state[index];
      return Math.round(upgrade.initCost * upgrade.increase ** quantity);
    }
  }
});
