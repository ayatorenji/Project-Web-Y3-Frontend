<template>
  <q-page padding>
    <q-btn color="primary" label="Add New User" @click="openAddUserDialog" />

    <!-- Table for existing users -->
    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat icon="edit" @click="openEditUserDialog(props.row)" />
          <q-btn flat icon="delete" @click="deleteUser(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- Dialog for adding or editing a user -->
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="person" color="primary" text-color="white" />
          <span class="q-ml-sm">{{ editingUser ? 'Edit' : 'Add' }} User</span>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="saveUser">
            <q-input v-model="editFormData.fullName" label="Full Name" required />
            <q-input v-model="editFormData.email" label="Email" type="email" required />

            <div class="q-mt-md">
              <q-btn label="Cancel" flat @click="closeDialog" />
              <q-btn label="Save" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const dialog = ref(false);
    const users = ref([]); // Placeholder for users data
    const editingUser = ref(null);
    const editFormData = ref({
      id: null,
      fullName: '',
      email: ''
    });

    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      { name: 'fullName', align: 'left', label: 'Full Name', field: 'fullName', sortable: true },
      { name: 'email', label: 'Email', field: 'email', sortable: true },
      { name: 'actions', label: 'Actions', field: 'actions', sortable: false }
    ];

    function openAddUserDialog() {
      editingUser.value = null;
      editFormData.value = { id: null, fullName: '', email: '' };
      dialog.value = true;
    }

    function openEditUserDialog(user) {
      editingUser.value = user;
      editFormData.value = { ...user };
      dialog.value = true;
    }

    function saveUser() {
      if (editingUser.value) {
        const index = users.value.findIndex(u => u.id === editingUser.value.id);
        if (index !== -1) {
          users.value[index] = { ...editFormData.value };
        }
      } else {
        const newUser = {
          ...editFormData.value,
          id: users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1
        };
        users.value.push(newUser);
      }
      dialog.value = false;
    }

    function deleteUser(userId) {
      users.value = users.value.filter(u => u.id !== userId);
    }

    function closeDialog() {
      dialog.value = false;
    }

    return {
      dialog,
      users,
      editingUser,
      editFormData,
      columns,
      openAddUserDialog,
      openEditUserDialog,
      saveUser,
      deleteUser,
      closeDialog
    };
  }
};
</script>
