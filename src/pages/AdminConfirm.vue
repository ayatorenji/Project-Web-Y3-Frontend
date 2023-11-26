<template>
  <q-page padding>
    <div class="text-h6">Order Management</div>

    <q-table
      :rows="orders"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat icon="check_circle" color="positive" @click="confirmOrder(props.row)" />
          <q-btn flat icon="cancel" color="negative" @click="cancelOrder(props.row)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const orders = ref([
      { id: 1, user: 'User1', game: 'Game1', paymentMethod: 'Credit Card', package: 'Starter', status: 'Pending' },
      { id: 2, user: 'User2', game: 'Game2', paymentMethod: 'PayPal', package: 'Advanced', status: 'Pending' },
      // ... add more orders as needed
    ]);

    const columns = ref([
      { name: 'id', align: 'left', label: 'Order ID', field: row => row.id, sortable: true },
      { name: 'user', align: 'left', label: 'User', field: row => row.user, sortable: true },
      { name: 'game', label: 'Game', field: row => row.game, sortable: true },
      { name: 'paymentMethod', label: 'Payment Method', field: row => row.paymentMethod, sortable: true },
      { name: 'package', label: 'Package', field: row => row.package, sortable: true },
      { name: 'status', label: 'Status', field: row => row.status, sortable: true },
      { name: 'actions', label: 'Actions', field: 'actions', sortable: false }
    ]);

    const pagination = ref({
      sortBy: 'id',
      descending: false,
      page: 1,
      rowsPerPage: 5
    });

    function confirmOrder(order) {
      console.log('Confirming order:', order);
      // Here you would typically make an API call to update the order status
      order.status = 'Confirmed';
      // Trigger reactivity
      orders.value = [...orders.value];
    }

    function cancelOrder(order) {
      console.log('Cancelling order:', order);
      // Here you would typically make an API call to update the order status
      order.status = 'Cancelled';
      // Trigger reactivity
      orders.value = [...orders.value];
    }

    return {
      orders,
      columns,
      pagination,
      confirmOrder,
      cancelOrder
    };
  }
};
</script>

<style scoped>
.q-td {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
