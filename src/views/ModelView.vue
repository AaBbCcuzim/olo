<template>
  <v-container>
    <div class="mt-3 text-h3">Model</div>
    <div class="my-5 text-h5">Downloaded Models</div>
    <v-form>
      <div class="text-subtitle-1 text-medium-emphasis">Fill in the model name to filter</div>
      <v-text-field v-model="modelFilter" placeholder="llama3" variant="outlined" prepend-inner-icon="mdi-magnify" max-width="300px" density="compact" @update:modelValue="filterModel"> </v-text-field>
    </v-form>
    <v-table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(model, index) in filteredModels" :key="model.digest">
          <td>{{ index + 1 }}</td>
          <td>{{ model.name }}</td>
          <td>
            <v-badge color="info" :content="model.details.parameter_size" inline></v-badge>
          </td>
          <td>{{ formatMemory(model.size) }}</td>
          <td>{{ formatTime(model.modified_at) }}</td>
          <td>
            <v-btn @click="deleteModel(model.name)" variant="text">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { ref, onActivated } from "vue";
import { useOllamaStore } from "../stores/ollama";
import { tr } from "vuetify/locale";

const o = useOllamaStore();

const headers = ref(["ID", "Model", "Size ", "Memory", "Last Modified", ""]);
const models = ref([]);

let filteredModels = ref([]);
let modelFilter = ref("");

/**
 * @description 获取模型列表
 */
async function getModelList() {
  const res = await o.ollama.list();
  filteredModels.value = models.value = res.models;
}

/**
 * @param 内存大小 B
 * @description 内存大小格式化
 * @returns {string} 格式化后的内存大小
 */
function formatMemory(memory) {
  return `${(memory / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

/**
 * @param {string} 时间戳
 * @description 时间戳格式化
 * @returns {string} 格式化后的时间
 */
function formatTime(timestamp) {
  return new Date(timestamp).toLocaleString();
}

/**
 * @description 过滤模型
 */
function filterModel() {
  filteredModels.value = models.value.filter((model) => model.model.includes(modelFilter.value));
}

/**
 * @param {string} model
 * @description 删除模型
 */
async function deleteModel(model) {
  const config = {
    model,
  };

  try {
    await o.ollama.delete(config);
    await getModelList();
  } catch (error) {
    console.error(error);
  }
}

onActivated(async () => {
  await getModelList();
});
</script>

<style scoped></style>
