import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "/node_modules/crisp-style/index.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
