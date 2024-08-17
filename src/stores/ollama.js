import { defineStore } from "pinia";
import { Ollama } from "ollama/browser";
import { ref } from "vue";

export const useOllamaStore = defineStore("ollama", () => {
  let config = ref({
    host: "http://localhost:11434",
  });

  let status = ref({
    connected: false,
  });

  let ollama = ref(null);

  async function connect() {
    ollama.value = new Ollama(config.value);
    status.value.connected = true;
  }

  return {
    config,
    status,
    ollama,
    connect,
  };
});
