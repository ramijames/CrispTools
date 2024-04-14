import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
import '@cyhnkckali/vue3-color-picker/dist/style.css'

import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

// app.config.productionTip = false

createApp(App)
  .use(router)
  .use(VueHighlightJS)
  .use(Vue3ColorPicker)
  .mount("#app");
