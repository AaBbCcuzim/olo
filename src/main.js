import { createApp } from "vue";
import { createPinia } from "pinia";

import "./styles.css";

import App from "./App.vue";
import router from "./router";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: "mdi",
  },
});

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(vuetify);

app.mount("#app");

document.addEventListener("contextmenu", (e) => e.preventDefault());
