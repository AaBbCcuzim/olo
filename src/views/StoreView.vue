<template>
  <v-container>
    <div class="mt-3 text-h3">Store</div>
    <div class="my-5 text-h5" text>Download Model</div>
    <v-form>
      <div class="text-subtitle-1 text-medium-emphasis">Fill in the model name which you want to download</div>
      <v-text-field v-model="modelName" placeholder="llama3" variant="outlined" prepend-inner-icon="mdi-magnify" max-width="300px" density="compact">
        <template v-slot:append>
          <v-btn variant="text" @click="downloadModel">Download</v-btn>
        </template>
      </v-text-field>
    </v-form>
    <div v-if="isShowDownload">
      <v-progress-linear v-model="power" height="25" rounded striped>
        <template v-slot:default="{ value }">
          <strong>{{ Math.ceil(value) }}%</strong>
        </template>
      </v-progress-linear>
      <div></div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useOllamaStore } from "../stores/ollama";

const o = useOllamaStore();

let modelName = ref("");
let power = ref(0);
let isShowDownload = ref(false);

/**
 * @description 下载模型
 */
async function downloadModel() {
  const config = {
    model: modelName.value,
    stream: true,
  };

  isShowDownload.value = true;

  try {
    const stream = await o.ollama.pull(config);

    for await (const part of stream) {
      if (part.digest) {
        if (part.completed && part.total) {
          power.value = Math.round((part.completed / part.total) * 100);
        }
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    isShowDownload.value = false;
  }
}

onMounted(async () => {});
</script>

<style scoped></style>
