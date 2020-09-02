import { createStore } from "pinia";

interface Player {
  name: string;
  level: number;
  nextLevel: number;
  increase: number;
}

export const usePlayerStore = createStore({
  id: "player",
  state: (): Player => ({
    name: "",
    level: 0,
    nextLevel: 100,
    increase: 3
  }),
  getters: {
    getName(state) {
      return state.name;
    },
    getLevel(state) {
      return state.level;
    },
    getNextLevel(state) {
      return state.nextLevel;
    }
  },
  actions: {
    levelUp() {
      this.patch({
        level: this.state.level + 1,
        nextLevel: this.state.nextLevel * this.state.increase
      });
    },
    resetLevel() {
      this.patch({
        level: 0,
        nextLevel: 100
      });
    }
  }
});
