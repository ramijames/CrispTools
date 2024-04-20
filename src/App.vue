<template>
  <!-- <Header /> -->
  <section :class="theme" class="bg-white dark:bg-slate-900">
    <header class="w-full p-4 border-b dark:border-slate-100/10">
      <nav class="max-w-screen-2xl w-full mx-auto flex flex-row items-center justify-between lg:px-4" aria-label="Global" >
        <section class="flex flex-row justify-center">
          <router-link to="/" class="flex flex-row gap-2 justify-center items-center">
            <img class="h-12 w-auto" src="/crisp-logo-white.svg" alt="Crisp Tools"/>
          </router-link>
          <span class="self-center ml-4 text-sm font-semibold text-slate-700 dark:text-slate-500">Welcome</span>
        </section>
        <button @click="toggleTheme()" class="flex flex-row px-2 py-1 text-white rounded text-xs bg-blue-500 dark:bg-slate-800 uppercase">
          <SunIcon class="h-4 w-auto" v-if="theme === 'light'" />
          <MoonIcon class="h-4 w-auto" v-if="theme === 'dark'" /> <span class="hidden">{{ theme }}</span>
        </button>
      </nav>
    </header>
    <section class="flex flex-col lg:flex-row max-w-screen-2xl mx-auto w-full">
      <section class="flex flex-col w-full lg:w-1/4 border-r dark:border-slate-100/10">
        <Sidebar />
      </section>
      <section class="w-full flex flex-col min-h-screen border-r dark:border-slate-100/10">
        <RouterView />
        <Footer />
      </section>
    </section>
  </section>
  
</template>

<script>
import Sidebar from "./components/layout/SideBar.vue";
import Footer from "./components/layout/Footer.vue";

import {
  SunIcon,
  MoonIcon
} from "@heroicons/vue/24/solid";

import { ref, onMounted, watch } from 'vue';

export default {
  setup() {
    const theme = ref('light');

    // Load theme from localStorage on component mount
    onMounted(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        theme.value = savedTheme;
      }
    });

    // Watch for changes in theme and save to localStorage
    watch(theme, (newTheme) => {
      localStorage.setItem('theme', newTheme);
    });

    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
      console.log('Theme toggled to:', theme.value);
    };

    return {
      theme,
      toggleTheme,
    };
  },
  components: {
    Sidebar,
    Footer,
    SunIcon,
    MoonIcon
  },
};

</script>

<style>

/* Define your light and dark theme colors */
:root {
  --color-bg: #ffffff;
  --color-text: #000000;
}

:root[data-theme='dark'] {
  --color-bg: #000000;
  --color-text: #ffffff;
}

/* Use the defined colors */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
}

</style>

