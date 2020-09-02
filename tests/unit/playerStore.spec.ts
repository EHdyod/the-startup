import { usePlayerStore } from "@/store/playerStore";

describe("player store tests", () => {
  const store = usePlayerStore();

  describe("states test", () => {
    const state = store.state;
    it("should state have name", () => {
      expect(state.name).not.toBeNull();
    });
    it("should state have level", () => {
      expect(state.level).not.toBeNull();
    });
    it("should state have nextLevel", () => {
      expect(state.nextLevel).not.toBeNull();
    });
    it("should state have increase", () => {
      expect(state.increase).not.toBeNull();
    });
  });

  describe("getters tests", () => {
    const state = store.state;
    it("should have getter for name", () => {
      expect(store.getName.value).toBe(state.name);
    });
    it("should have getter for levels", () => {
      expect(store.getLevel.value).toBe(state.level);
    });
    it("should have getter for nextLevel", () => {
      expect(store.getNextLevel.value).toBe(state.nextLevel);
    });
  });

  describe("actions tests", () => {
    it("should have a higher level after level up", () => {
      const levelInit = store.getLevel.value;
      store.levelUp();
      const levelFinal = store.getLevel.value;
      expect(levelFinal > levelInit).toBe(true);
    });
    it("should nextLevel be incresed by 'increase' after level up", () => {
      const nextLevelInit = store.getNextLevel.value;
      const increase = store.state.increase;
      store.levelUp();
      const nextLevelFinal = store.getNextLevel.value;
      expect(nextLevelFinal === nextLevelInit * increase).toBe(true);
    });

    it("should have level to 0 after reset", () => {
      store.resetLevel();
      expect(store.getLevel.value).toBe(0);
    });
  });
});
