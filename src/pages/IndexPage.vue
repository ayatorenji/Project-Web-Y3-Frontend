<template>
  <q-page class="flex flex-center">
    <img
      alt="Game logo"
      src="~assets/game_icon.png"
      style="width: 200px; height: 200px"
    >
    <div class="text-center">
      <h3>Welcome to Games Currency Shop!</h3>
      <q-btn label="Login" to="/user/login" color="primary" class="q-ma-md" />
      <q-btn label="Register" to="/register" color="secondary" class="q-ma-md" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
