<template>
  <q-page padding>
    <q-btn color="primary" label="Add New Game" @click="openAddGameDialog" />

    <!-- Table for existing games -->
    <q-table
      :rows="games"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-img :src="props.row.image" style="max-width: 50px; max-height: 50px;" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat icon="edit" @click="openEditGameDialog(props.row)" />
          <q-btn flat icon="delete" @click="deleteGame(props.row.id)" />
        </q-td>
      </template>
    </q-table>

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
            <q-input v-model="editFormData.description" label="Game Description" type="textarea" />
            <q-input v-model="editFormData.image" label="Image URL" type="url" required />
            <div class="q-mt-md">
              <q-img v-if="editFormData.image" :src="editFormData.image" style="max-width: 200px; max-height: 200px;" />
            </div>
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
    const games = ref([]); // This should be populated with your games data
    const editingGame = ref(null);
    const editFormData = ref({
      id: null,
      name: '',
      description: '',
      image: ''
    });

    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      { name: 'name', align: 'left', label: 'Game Name', field: 'name', sortable: true },
      { name: 'description', label: 'Description', field: 'description', sortable: true },
      { name: 'image', label: 'Image', field: 'image', sortable: true },
      { name: 'actions', label: 'Actions', field: 'actions', sortable: false }
    ];

    function openAddGameDialog() {
      editingGame.value = null;
      editFormData.value = { id: null, name: '', description: '', image: '' };
      dialog.value = true;
    }

    function openEditGameDialog(game) {
      editingGame.value = game;
      editFormData.value = { ...game };
      dialog.value = true;
    }

    function saveGame() {
      if (editingGame.value) {
        const index = games.value.findIndex(g => g.id === editingGame.value.id);
        if (index !== -1) {
          games.value[index] = { ...editFormData.value };
        }
      } else {
        const newGame = {
          ...editFormData.value,
          id: games.value.length > 0 ? Math.max(...games.value.map(g => g.id)) + 1 : 1
        };
        games.value.push(newGame);
      }
      dialog.value = false;
    }

    function deleteGame(gameId) {
      games.value = games.value.filter(g => g.id !== gameId);
    }

    function closeDialog() {
      dialog.value = false;
    }

    return {
      dialog,
      games,
      editingGame,
      editFormData,
      columns,
      openAddGameDialog,
      openEditGameDialog,
      saveGame,
      deleteGame,
      closeDialog
    };
  }
};
</script>
