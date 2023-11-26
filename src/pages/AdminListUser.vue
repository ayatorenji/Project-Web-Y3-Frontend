<template>
  <q-page padding>
    <!-- Table for existing users -->
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat icon="edit" @click="openEditUserDialog(props.row)" />
          <q-btn flat icon="delete" @click="onDelete(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- Button to add a new user -->
    <q-btn color="primary" label="Add New User" @click="openAddUserDialog" />

    <!-- Dialog for adding or editing a user -->
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="person" color="primary" text-color="white" />
          <span class="q-ml-sm">{{ dialogTitle }}</span>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="saveUser">
            <q-input v-model="editFormData.fullname" label="FullName" required />
            <q-input v-model="editFormData.email" label="Email" type="email" required />
            <q-input v-model="editFormData.username" label="Username" required />
            <q-input v-if="!editingUser" v-model="editFormData.password" label="Password" type="password" required />
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
import { Notify } from 'quasar';

export default {
  name: "AdminListUser",
  data() {
    return {
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
        { name: 'fullname', align: 'center', label: 'Full Name', field: 'fullname', sortable: true },
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
        { name: 'username', align: 'center', label: 'Username', field: 'username', sortable: true },
        { name: 'actions', align: 'center', label: 'Actions', field: 'actions', sortable: false },
      ],
      rows: [], // This will be filled with data from your API
      dialog: false,
      dialogTitle: '',
      editingUser: false,
      editFormData: {
        id: null,
        fullname: '',
        email: '',
        username: '',
        password: '',
      },
    };
  },
  methods: {
    openAddUserDialog() {
      this.editingUser = false;
      this.dialogTitle = 'Add New User';
      this.editFormData = { fullname: '', email: '', username: '', password: '' };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    saveUser() {
      const action = this.editingUser ? 'put' : 'post';
      const url = this.editingUser ? `/admin/users/${this.editFormData.id}` : '/admin/users';
      this.$api[action](url, this.editFormData)
        .then((response) => {
          Notify.create({
            type: 'positive',
            message: `User ${this.editingUser ? 'updated' : 'added'} successfully!`
          });
          this.dialog = false;
          this.getData(); // Refresh the table
        })
        .catch((error) => {
          Notify.create({
            type: 'negative',
            message: `Error ${this.editingUser ? 'updating' : 'adding'} user: ` + error.message
          });
        });
    },
    getData() {
      this.$api.get('/admin/users')
        .then((response) => {
          this.rows = response.data;
        })
        .catch((error) => {
          Notify.create({
            type: 'negative',
            message: 'Error fetching users: ' + error.message
          });
        });
    },
    openEditUserDialog(user) {
      this.editingUser = true;
      this.dialogTitle = 'Edit User';
      this.editFormData = { ...user };
      this.dialog = true;
    },
    onDelete(userId) {
      this.$api.delete(`/admin/users/${userId}`)
        .then(() => {
          Notify.create({
            type: 'positive',
            message: 'User deleted successfully!'
          });
          this.getData(); // Refresh the table
        })
        .catch((error) => {
          Notify.create({
            type: 'negative',
            message: 'Error deleting user: ' + error.message
          });
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
