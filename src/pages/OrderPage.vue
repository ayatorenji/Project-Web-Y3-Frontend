<template>
  <q-page class="q-pa-md">
    <!-- Game selection cards -->
    <div class="q-gutter-md row flex-wrap justify-start">
      <q-card v-for="game in games" :key="game.id" class="my-card" @click="selectGame(game)">
        <q-img :src="game.image" :alt="game.name" class="game-image" />
        <q-card-section class="text-center">
          <div class="text-h6">{{ game.name }}</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Payment methods and packages selection -->
    <div v-if="selectedGame" class="q-mt-md">
      <div class="text-h6">Selected Game: {{ selectedGame.name }}</div>
      <q-btn flat label="Change Game" @click="resetSelection" />
      <div class="q-mt-md">
        <div class="text-h6">Choose a Payment Method:</div>
        <q-list bordered class="rounded-borders">
          <q-item v-for="method in paymentMethods" :key="method.id" clickable v-ripple @click="selectPaymentMethod(method)">
            <q-item-section>{{ method.name }}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="q-mt-md">
        <div class="text-h6">Choose a Package:</div>
        <q-list bordered class="rounded-borders">
          <q-item v-for="pkg in filteredPackages" :key="pkg.id" clickable v-ripple @click="selectPackage(pkg)">
            <q-item-section>{{ pkg.name }} - {{ pkg.price }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue';
import { useGameStore } from 'src/stores/gameStore';

export default {
  setup() {
    const gameStore = useGameStore();
    const selectedGame = ref(null);

    // Computed properties to ensure reactivity
    const filteredPackages = computed(() => gameStore.filteredPackages);
    const paymentMethods = computed(() => gameStore.paymentMethods);

    function selectGame(game) {
      selectedGame.value = game;
      gameStore.selectGame(game.id);
    }

    function resetSelection() {
      selectedGame.value = null;
      gameStore.resetSelection();
    }

    function selectPaymentMethod(method) {
      // Implement your logic for selecting a payment method
    }

    function selectPackage(pkg) {
      // Implement your logic for selecting a package
    }

    return {
      games: gameStore.games,
      paymentMethods,
      filteredPackages,
      selectedGame,
      selectGame,
      resetSelection,
      selectPaymentMethod,
      selectPackage
    };
  }
};
</script>

<style>
.my-card {
  cursor: pointer;
  width: 200px;
  margin: 10px;
  transition: box-shadow 0.1s ease-in-out;
}

.my-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.game-image {
  width: 100%; /* This will ensure the image takes the full width of the card */
  height: 150px; /* Adjust as needed */
  object-fit: cover; /* This will ensure the image covers the area nicely */
}

.rounded-borders {
  border-radius: 10px;
}
</style>
