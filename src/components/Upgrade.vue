<template>
  <div id="upgrade-root">
    <button
      :class="{ 'upgrade-button': true, disabled: upgrade.disabled }"
      :disabled="upgrade.disabled"
      @click="buyUpgrade"
    >
      Hire {{ upgrade.name }}
      {{ upgrade.disabled ? `(at lvl ${upgrade.unlocksAt})` : "" }}
    </button>
    <div class="upgrade-details">
      <p class="upgrade-cost">Cost: {{ upgrade.cost }}</p>
      <p class="upgrade-quantity">Quantity: {{ upgrade.quantity }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useUpgradesStore } from "@/store/upgradesStore";
import { useMainStore } from "@/store/mainStore";

export default {
  name: "Upgrade",
  props: {
    index: Number,
    quantity: Number
  },
  setup(props: Record<string, any>) {
    const upgrade = useUpgradesStore().state[props.index];
    const mainStore = useMainStore();
    return {
      upgrade,
      buyUpgrade: () => {
        mainStore.buyUpgrade(props.index, props.quantity);
      }
    };
  }
};
</script>

<style scoped>
#upgrade-root {
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0 5px;
}

.upgrade-details {
  flex: 1 1 100%;
  text-align: left;
  width: auto;
}

.upgrade-button,
.upgrade-cost,
.upgrade-quantity {
  color: white;
  margin: 0 15px;
}

.upgrade-button {
  appearance: none;
  border: none;
  outline: none;

  display: inline-block;
  min-width: 300px;
  padding: 15px 25px;
  background-color: #28a484;

  font-size: 20px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;

  cursor: pointer;
}

.upgrade-button.disabled {
  color: black;
  background-color: #cccccc;
  pointer-events: none;
}
</style>
