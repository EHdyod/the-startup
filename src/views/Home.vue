<template>
  <div id="home-root">
    <Overview />
    <div id="upgrades">
      <Upgrade
        v-for="(upgrade, index) in upgrades"
        :key="index"
        :index="index"
        :quantity="quantity"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, onBeforeUnmount } from "vue";
import Overview from "@/components/Overview.vue";
import Upgrade from "@/components/Upgrade.vue";
import { useMainStore } from "@/store/mainStore";
import { usePlayerStore } from "@/store/playerStore";
import { useUpgradesStore } from "@/store/upgradesStore";

export default {
  name: "Home",
  components: {
    Overview,
    Upgrade
  },
  data() {
    return {
      quantity: 1
    };
  },
  setup() {
    let loopStarter: boolean;
    const mainStore = useMainStore();
    const player = usePlayerStore();
    const upgrades = useUpgradesStore().getAvailableUpgrades.value;

    const coding = () => {
      mainStore.incrementBytes();
    };
    const levelManager = () => {
      if (mainStore.getBytesUntilNextLevel.value <= 0) {
        player.levelUp();
      }
    };
    const loop = () => {
      mainStore.bytesPerSecond();
      levelManager();
      if (loopStarter) requestAnimationFrame(loop);
    };

    onBeforeMount(() => {
      loopStarter = true;
      loop();
      window.addEventListener("keypress", coding);
    });

    onBeforeUnmount(() => {
      loopStarter = false;
      window.removeEventListener("keypress", coding);
    });

    return { upgrades };
  }
};
</script>

<style scoped>
#home-root {
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  align-items: center;
}
#upgrades {
  background-color: #222222;
  padding: 15px;

  display: flex;
  flex-flow: nowrap column;
  justify-content: space-around;
  align-items: stretch;
}
</style>
