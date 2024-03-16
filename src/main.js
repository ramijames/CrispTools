import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

const app = createApp(App);

app.config.productionTip = false

app.use(router);
app.use(VueHighlightJS);
app.mount("#app");
