<template>
  <!-- <Header /> -->
  <section :class="theme" class="bg-white dark:bg-slate-900 background">

    <header class="w-full fixed top-0 left-0 right-0 h-[80px] bg-white dark:bg-slate-900 py-4 border-b dark:border-slate-100/10">
      <nav class="max-w-screen-2xl w-full mx-auto flex flex-row items-center justify-between lg:px-4" aria-label="Global" >
        <section class="flex flex-row justify-center">
          <router-link v-if="isLoggedIn" to="/trends" class="flex flex-row gap-2 justify-center items-center ml-6">
            <img class="h-12 w-auto" src="/crisp-logo-white.svg" alt="Crisp Tools"/>
          </router-link>
          <router-link v-else to="/" class="flex flex-row gap-2 justify-center items-center ml-2">
            <img class="h-12 w-auto" src="/crisp-logo-white.svg" alt="Crisp Tools"/>
          </router-link>
        </section>
        
        <section class="flex flex-row gap-3">
          <ViewTypeHeader v-if="isLoggedIn" :viewType="userStore.viewType" />
          <button @click="toggleTheme()" class="flex flex-row px-2 py-1 text-blue-500 rounded self-center">
            <SunIcon class="h-5 w-auto" v-if="theme === 'light'" />
            <MoonIcon class="h-5 w-auto" v-if="theme === 'dark'" /> <span class="hidden">{{ theme }}</span>
          </button>
          <router-link class="flex flex-row justify-center p-0.5 text-white *:hover:text-white rounded-full text-xs hover:bg-blue-500 *:hover:stroke-white bg-slate-50 dark:bg-slate-800 uppercase self-center" v-if="isLoggedIn" to="/user">
            <img v-if="user && user.photoURL" class="rounded-full h-8 w-8" :src="user.photoURL">
            <Cog8ToothIcon class="text-blue-500 h-4 w-auto" v-else />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 mx-1 w-auto self-center stroke-blue-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>

          </router-link> 
          <section class="flex flex-row gap-2">
            <router-link class="button flex flex-row px-2 py-1 text-white rounded text-xs bg-blue-500 dark:bg-slate-800 uppercase self-center" v-if="!isLoggedIn" to="/register">Register</router-link>
            <router-link class="button flex flex-row px-2 py-1 text-white rounded text-xs bg-blue-500 dark:bg-slate-800 uppercase self-center" v-if="!isLoggedIn" to="/sign-in">Sign in</router-link>
          </section>
        </section>
      </nav>
    </header>

    <section class="bg-white dark:bg-slate-900 fixed top-[80px] bottom-[80px] overflow-auto left-0 right-0 flex flex-col lg:flex-row pt-4 lg:pt-8 px-4 lg:px-12 pb-[20rem]">
      <RouterView />
    </section>

    <BottomNav />
  </section>
  
</template>

<script>
import ViewTypeHeader from "./components/layout/ViewType.vue";
import BottomNav from "./components/layout/BottomNav.vue";
import Footer from "./components/layout/Footer.vue";
import { ref, watchEffect, watch, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';

import {
  SunIcon,
  MoonIcon,
  Cog8ToothIcon
} from "@heroicons/vue/24/solid";

export default {
  setup() {
    const theme = ref('light');
    const auth = getAuth();
    const user = ref(null);
    const router = useRouter();
    const isLoggedIn = ref(true);
    const isGoogleUser = ref(false);
    const userStore = useUserStore();

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

    // runs after firebase is initialized
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        isLoggedIn.value = true
        user.value = currentUser
        if (currentUser.providerData[0].providerId === 'google.com') {
          isGoogleUser.value = true
        }
      } else {
        isLoggedIn.value = false
        user.value = null
      }
    })

    return {
      theme,
      toggleTheme,
      isLoggedIn,
      auth,
      user,
      userStore
    };
  },
  components: {
    Footer,
    SunIcon,
    MoonIcon,
    Cog8ToothIcon,
    BottomNav,
    ViewTypeHeader
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

