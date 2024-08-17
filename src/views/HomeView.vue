<template>
  <v-container>
    <div class="mt-3 text-h3">Home</div>
    <div class="my-3"></div>
    <v-form>
      <div class="text-subtitle-1 text-medium-emphasis">Connect to the sever</div>
      <v-text-field v-model="o.config.host" placeholder="http://localhost:5000" max-width="500px" density="compact" variant="outlined">
        <template v-slot:append>
          <v-btn @click="o.connect()" variant="text">connect</v-btn>
        </template>
      </v-text-field>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useOllamaStore } from "../stores/ollama";

const o = useOllamaStore();
</script>

<style scoped></style>
