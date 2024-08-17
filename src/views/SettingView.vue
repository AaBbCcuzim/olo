<template>
  <v-container>
    <div class="mt-3 text-h3">Setting</div>
    <div class="my-5 text-h5">Host</div>
    <v-form>
      <v-text-field v-model="o.config.host" placeholder="http://localhost:5000" max-width="300px" density="compact" variant="outlined"> </v-text-field>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useOllamaStore } from "../stores/ollama";

const o = useOllamaStore();
</script>

<style scoped></style>
