<template>
  <div id="overview-root">
    <h3>Current Bytes</h3>
    <h5 id="bytes-display">{{ bytes }}</h5>
    <h5 id="bps-display">Bytes Per Second: {{ bps }}</h5>
    <h5 id="level-display">Current Level: {{ level }}</h5>
    <h5 id="next-level-display">
      Bytes Until Next Level: {{ bytesUntilNextLevel }}
    </h5>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useMainStore } from "@/store/mainStore";
import { usePlayerStore } from "@/store/playerStore";

export default {
  name: "Overview",
  setup() {
    const mainStore = useMainStore();
    const player = usePlayerStore();
    return {
      bytes: computed(() => mainStore.getBytes.value.toFixed(1)),
      bps: computed(() => mainStore.getBps.value.toFixed(1)),
      level: computed(() => player.getLevel.value),
      bytesUntilNextLevel: computed(() => {
        return mainStore.getBytesUntilNextLevel.value;
      })
    };
  }
};
</script>

<style scoped>
#overview-root {
  display: flex;
  flex-flow: nowrap column;
  align-items: center;
  padding: 25px;
}

h3 {
  color: #222222;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 15px;
}

#bytes-display {
  width: 10vw;
  padding: 15px 25px;
  background-color: #28a484;
  border-radius: 5px;
  color: white;
  font-size: 60px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 30px;
}
#bps-display,
#level-display,
#next-level-display {
  margin-bottom: 15px;

  color: #222222;
  font-size: 18px;
  font-weight: 500;
  font-style: italic;
  text-align: center;
}
</style>
