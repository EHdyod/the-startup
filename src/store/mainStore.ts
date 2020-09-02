import { createStore } from "pinia";
import { useUpgradesStore, Upgrade } from "./upgradesStore";
import { usePlayerStore } from "./playerStore";

interface MainStore {
  bytes: number;
  totalBytes: number;
  bps: number;
  bpk: number;
}

export const useMainStore = createStore({
  id: "main",
  state: (): MainStore => ({
    bytes: 0,
    totalBytes: 0,
    bps: 0,
    bpk: 1
  }),
  getters: {
    getBytes(state) {
      return state.bytes;
    },
    getTotalBytes(state) {
      return state.totalBytes;
    },
    getBps(state) {
      return state.bps;
    },
    getBpk(state) {
      return state.bpk;
    },
    getBytesUntilNextLevel(state) {
      const player = usePlayerStore();
      return Math.round(player.getNextLevel.value - state.totalBytes);
    }
  },
  actions: {
    incrementBytes() {
      this.patch({
        bytes: this.state.bytes + this.state.bpk,
        totalBytes: this.state.totalBytes + this.state.bpk
      });
    },
    buyUpgrade(index: number, quantity: number) {
      const upgrades = useUpgradesStore();
      const upgrade = upgrades.state[index];
      const initCost =
        upgrade.quantity === 0
          ? upgrade.cost
          : upgrade.cost / upgrade.quantity ** upgrade.increase;
      const costTotal = upgrade.increase ** quantity * initCost;
      if (this.state.bytes > costTotal) {
        this.patch({
          bytes: this.state.bytes - costTotal
        });
        upgrades.buyUpgrade(index, quantity);
      }
    },
    bytesPerSecond() {
      const upgrades = useUpgradesStore().state;
      const bps = upgrades.reduce((acc: number, upg: Upgrade) => {
        return acc + upg.bps * upg.quantity;
      }, 0);
      this.patch({
        bps: bps,
        bytes: this.state.bytes + bps / 60,
        totalBytes: this.state.totalBytes + bps / 60
      });
    }
  }
});
