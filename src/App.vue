<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <v-navigation-drawer permanent expand-on-hover rail v-if="ollama.status.connected">
        <v-list nav>
          <v-list-item v-for="menuItem in menuList" :prepend-icon="menuItem.icon" :title="menuItem.title" @click="goTo(menuItem.to)"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- <v-app-bar title="Olo"></v-app-bar> -->

      <v-main>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { ref, KeepAlive } from "vue";
import { useOllamaStore } from "./stores/ollama";

const router = useRouter();
const ollama = useOllamaStore();

const menuList = ref([
  {
    icon: "mdi-view-dashboard",
    title: "Home",
    to: "/home",
  },
  {
    icon: "mdi-format-list-bulleted",
    title: "Model",
    to: "/model",
  },
  {
    icon: "mdi-apps",
    title: "Store",
    to: "/store",
  },
  {
    icon: "mdi-cog",
    title: "Setting",
    to: "/setting",
  },
]);

/**
 * @param {string} route
 * @description 跳转到指定路由
 */
function goTo(route) {
  router.push(route);
}
</script>

<style scoped></style>
