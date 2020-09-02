import { useMainStore } from "@/store/mainStore";
import { usePlayerStore } from "@/store/playerStore";
import { useUpgradesStore } from "@/store/upgradesStore";

describe("main store tests", () => {
  const store = useMainStore();
  const upgrades = useUpgradesStore();
  const player = usePlayerStore();

  beforeEach(() => {
    store.reset();
    upgrades.reset();
    player.reset();
  });

  describe("states tests", () => {
    it("should state have bytes, totalBytes, bps and bpk", () => {
      const state = store.state;
      expect(state.bytes).not.toBeNull();
      expect(state.totalBytes).not.toBeNull();
      expect(state.bps).not.toBeNull();
      expect(state.bpk).not.toBeNull();
    });
  });

  describe("getters tests", () => {
    const state = store.state;
    it("should have getter for bytes", () => {
      expect(store.getBytes.value).toBe(state.bytes);
    });
    it("should have getter for totalBytes", () => {
      expect(store.getTotalBytes.value).toBe(state.totalBytes);
    });
    it("should have getter for bps", () => {
      expect(store.getBps.value).toBe(state.bps);
    });
    it("should have getter for bpk", () => {
      expect(store.getBpk.value).toBe(state.bpk);
    });
    it("should need all nextLevel player's value at initialisation", () => {
      const playerNextLevel = player.getNextLevel.value;
      expect(store.getBytesUntilNextLevel.value).toBe(playerNextLevel);
    });
    it("should need less bytes to nextLevel if you earn bytes", () => {
      const initBytesNeeded = store.getBytesUntilNextLevel.value;
      store.patch({
        bytes: 1,
        totalBytes: 1
      });
      const finalBytesNeeded = store.getBytesUntilNextLevel.value;
      expect(finalBytesNeeded < initBytesNeeded).toBe(true);
    });
  });

  describe("actions tests", () => {
    it("should have one more byte after incrementation", () => {
      const bytesInit = store.state.bytes;
      const totalBytesInit = store.state.totalBytes;
      store.incrementBytes();
      const bytesFinal = store.state.bytes;
      const totalBytesFinal = store.state.totalBytes;
      expect(bytesFinal).toBe(bytesInit + 1);
      expect(totalBytesFinal).toBe(totalBytesInit + 1);
    });
    it("should have less bytes and more of an upgrade after bying upgrades ", () => {
      const bytes = 2000000;
      store.patch({
        bytes: bytes
      });

      const initBytes = store.state.bytes;
      const initUpgradeQuantity = upgrades.state[0].quantity;
      store.buyUpgrade(0, 5);
      const finalBytes = store.state.bytes;
      const finalUpgradeQuantity = upgrades.state[0].quantity;
      expect(finalBytes < initBytes).toBe(true);
      expect(finalUpgradeQuantity > initUpgradeQuantity).toBe(true);
    });
    it("should haven't buy upgrade if don't have enought bytes", () => {
      const bytes = 20;
      store.patch({
        bytes: bytes
      });
      const initBytes = store.state.bytes;
      const initUpgradeQuantity = upgrades.state[0].quantity;
      store.buyUpgrade(0, 5);
      const finalBytes = store.state.bytes;
      const finalUpgradeQuantity = upgrades.state[0].quantity;
      expect(finalBytes === initBytes).toBe(true);
      expect(finalUpgradeQuantity === initUpgradeQuantity).toBe(true);
    });
    it("should have more bps after buying an upgrade", () => {
      const initBps = store.state.bps;
      upgrades.buyUpgrade(0, 5);
      store.bytesPerSecond();
      const finalBps = store.state.bps;
      expect(finalBps > initBps).toBe(true);
    });
    it("should have more bytes if upgrades were bought", () => {
      const initBytes = store.state.bytes;
      const initTotalBytes = store.state.totalBytes;
      upgrades.buyUpgrade(0, 5);
      store.bytesPerSecond();
      const finalBytes = store.state.bytes;
      const finalTotalBytes = store.state.totalBytes;
      expect(finalBytes > initBytes).toBe(true);
      expect(finalTotalBytes > initTotalBytes).toBe(true);
    });
  });
});
