<template>
  <q-page padding>
    <div class="text-h6">Admin Dashboard</div>

    <div class="q-my-md">
      <q-card class="my-card bg-blue-2">
        <q-card-section>
          <div class="text-h6">Total Orders</div>
          <div class="text-subtitle1">{{ totalOrders }}</div>
        </q-card-section>
      </q-card>

      <q-card class="my-card bg-green-2">
        <q-card-section>
          <div class="text-h6">Total Games</div>
          <div class="text-subtitle1">{{ totalGames }}</div>
        </q-card-section>
      </q-card>

      <q-card class="my-card bg-orange-2">
        <q-card-section>
          <div class="text-h6">Total Money</div>
          <div class="text-subtitle1">{{ formattedTotalMoney }}</div>
        </q-card-section>
      </q-card>

      <q-card class="my-card bg-red-2">
        <q-card-section>
          <div class="text-h6">Confirmed Orders</div>
          <div class="text-subtitle1">{{ confirmedOrders }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    // Mock data for dashboard stats
    const totalOrders = ref(120);
    const totalGames = ref(15);
    const totalMoney = ref(8500.75);
    const confirmedOrders = ref(95);

    // Computed property to format total money as a currency
    const formattedTotalMoney = computed(() => {
      return `$${totalMoney.value.toFixed(2)}`;
    });

    return {
      totalOrders,
      totalGames,
      formattedTotalMoney, // use the computed property here
      confirmedOrders
    };
  }
};
</script>

<style>
.my-card {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
</style>
