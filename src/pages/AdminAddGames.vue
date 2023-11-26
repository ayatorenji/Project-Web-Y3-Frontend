<template>
  <q-page padding>
    <!-- Table for existing games -->
    <q-table :rows="games" :columns="columns" row-key="id">
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-img :src="props.row.image_url" style="max-width: 50px; max-height: 50px;" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat icon="edit" @click="openEditGameDialog(props.row)" />
          <q-btn flat icon="delete" @click="onDelete(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- Button to add a new game -->
    <q-btn color="primary" label="Add New Game" @click="openAddGameDialog" />

    <!-- Dialog for adding or editing a game -->
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="gamepad" color="primary" text-color="white" />
          <span class="q-ml-sm">{{ editingGame ? 'Edit' : 'Add' }} Game</span>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="saveGame">
            <q-input v-model="editFormData.name" label="Game Name" required />
            <q-input v-model="editFormData.image_url" label="Image URL" type="url" required @input="updateImage" />
            <div class="q-mt-md" v-if="editFormData.image_url">
              <q-img :src="editFormData.image_url" style="max-width: 200px; max-height: 200px;" />
            </div>
            <q-input v-model="editFormData.package" label="Package" type="number" required />
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
  name: "AdminAddGames",
  data() {
    return {
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
        { name: 'gamename', align: 'center', label: 'Game Name', field: 'name', sortable: true },
        { name: 'image_url', align: 'center', label: 'Image', field: 'image_url', sortable: true },
        { name: 'package', align: 'center', label: 'Package', field: 'package', sortable: true },
        { name: 'actions', align: 'center', label: 'Actions', field: 'actions', sortable: false },
      ],
      games: [], // This will be filled with data from your API
      dialog: false,
      dialogTitle: '',
      editingGame: false,
      editFormData: {
        id: null,
        name: '',
        image_url: '',
        package: 0,
      },
    };
  },
  methods: {
    openAddGameDialog() {
      this.editingGame = false;
      this.dialogTitle = 'Add New Game';
      this.editFormData = {
        id: null,
        name: '',
        image_url: '',
        package: 0,
      };
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    saveGame() {
      const action = this.editingGame ? 'put' : 'post';
      const url = this.editingGame ? `/game/${this.editFormData.id}` : '/game/';
      this.$api[action](url, this.editFormData)
        .then((response) => {
          Notify.create({
            type: 'positive',
            message: `User ${this.editingGame ? 'updated' : 'added'} successfully!`
          });
          this.dialog = false;
          this.getData(); // Refresh the table
        })
        .catch((error) => {
          Notify.create({
            type: 'negative',
            message: `Error ${this.editingGame ? 'updating' : 'adding'} game: ` + error.message
          });
        });
    },
    getData() {
      this.$api.get('/game/')
        .then((response) => {
          this.games = response.data;
        })
        .catch((error) => {
          Notify.create({
            type: 'negative',
            message: 'Error fetching users: ' + error.message
          });
        });
    },
    openEditGameDialog(game) {
      this.editingGame = true;
      this.dialogTitle = 'Edit Game';
      this.editFormData = { ...game };
      this.dialog = true;
    },
    onDelete(gameId) {
      this.$api.delete(`/game/${gameId}`)
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
