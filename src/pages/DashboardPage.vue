<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 600px">
      <div class="text-h5 text-center q-mb-md">User Spending Dashboard</div>
      <q-card flat>
        <q-card-section>
          <div>Total Money Spent: {{ totalMoneySpent }}</div>
          <div class="q-mt-md">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  setup() {
    const chartCanvas = ref(null);
    const chartInstance = ref(null);

    // Example data
    const userSpendingData = {
      'Team Fight Tactics': 150,
      'League of Legends': 200,
      'Valorant': 250,
    };

    // Compute total money spent
    const totalMoneySpent = Object.values(userSpendingData).reduce((acc, value) => acc + value, 0);

    // Watch for changes and update the chart
    watch(() => userSpendingData, () => {
      if (chartInstance.value) {
        chartInstance.value.data.datasets[0].data = Object.values(userSpendingData);
        chartInstance.value.update();
      }
    }, { deep: true });

    // Mounted lifecycle hook to initialize the chart
    onMounted(() => {
      const ctx = chartCanvas.value.getContext('2d');
      chartInstance.value = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(userSpendingData),
          datasets: [
            {
              label: 'Spending per Game',
              data: Object.values(userSpendingData),
              backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });

    return {
      chartCanvas,
      totalMoneySpent,
    };
  },
};
</script>
