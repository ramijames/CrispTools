import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia';
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
import '@cyhnkckali/vue3-color-picker/dist/style.css'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyABN1rSd281ECjUS9I1AtE3ZaSMJ5WTJJs",
  authDomain: "crisptools-dev.firebaseapp.com",
  projectId: "crisptools-dev",
  storageBucket: "crisptools-dev.appspot.com",
  messagingSenderId: "509556416944",
  appId: "1:509556416944:web:ff8b5f5e540e3870b3f675",
  measurementId: "G-7HW0WHNTQ0"
};

// Initialize Firebase
initializeApp(firebaseConfig)

import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

createApp(App)
  .use(firebaseConfig)
  .use(router)
  .use(createPinia())
  .use(VueHighlightJS)
  .use(Vue3ColorPicker)
  .mount("#app");