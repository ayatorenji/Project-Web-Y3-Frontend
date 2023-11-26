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
          <q-item
            v-for="method in paymentMethods"
            :key="method.id"
            clickable
            v-ripple
            :class="{'selected-item': isPaymentMethodSelected(method)}"
            @click="selectPaymentMethod(method)"
          >
            <q-item-section>{{ method.name }}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="q-mt-md">
        <div class="text-h6">Choose a Package:</div>
        <q-list bordered class="rounded-borders">
          <q-item
            v-for="pkg in filteredPackages"
            :key="pkg.id"
            clickable
            v-ripple
            :class="{'selected-item': isPackageSelected(pkg)}"
            @click="selectPackage(pkg)"
          >
            <q-item-section>{{ pkg.name }} - {{ pkg.price }}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-input
        v-model="userGameId"
        label="Your Game ID"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please enter your Game ID']"
      />
      <q-btn
        label="Submit Order"
        color="primary"
        class="q-mt-md"
        @click="submitOrder"
      />
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue';
import { useGameStore } from 'src/stores/gameStore';
import { Notify } from 'quasar';

export default {
  setup() {
    const gameStore = useGameStore();
    const selectedGame = ref(null);
    const userGameId = ref('');
    const selectedPackage = ref(null);
    const selectedPaymentMethod = ref(null);

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

    async function submitOrder() {
      if (!selectedGame.value || !selectedPackage.value || !userGameId.value) {
        Notify.create({
          type: 'negative',
          message: 'Please select a game, package, and enter your Game ID.'
        });
        return;
      }

      const orderData = {
        game_id: selectedGame.value.id,
        user_game_id: userGameId.value,
        selected_package: selectedPackage.value.name,
        status: 'Pending'
      };

      try {
        // Note the endpoint should match the backend route
        const response = await this.$api.post('/api/orders/create', orderData);
        // Check the response status
        if (response && response.status === 201) {
          Notify.create({
            type: 'positive',
            message: 'Order submitted successfully.'
          });
          // Reset form or additional logic after submission
          // You might want to reset your selected values here
        } else {
          // If the response status is not 201, handle other statuses
          Notify.create({
            type: 'negative',
            message: response ? response.data.message : 'Unknown error occurred'
          });
        }
      } catch (error) {
        console.error(error);
        Notify.create({
          type: 'negative',
          message: 'There was a problem submitting your order.'
        });
      }
    }

    function selectPaymentMethod(method) {
      selectedPaymentMethod.value = method;
      console.log('Payment Method Selected:', method);
    }

    function selectPackage(pkg) {
      selectedPackage.value = pkg;
      console.log('Package Selected:', pkg);
    }

    function isPaymentMethodSelected(method) {
      return selectedPaymentMethod.value === method;
    }

    function isPackageSelected(pkg) {
      return selectedPackage.value === pkg;
    }

    return {
      games: gameStore.games,
      paymentMethods,
      filteredPackages,
      selectedGame,
      selectGame,
      resetSelection,
      userGameId,
      submitOrder,
      selectPaymentMethod,
      selectPackage,
      isPaymentMethodSelected,
      isPackageSelected,
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

.selected-item {
  background-color: #9f9f9f; /* Or any highlight color you prefer */
}
</style>
