<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

const isLoggedIn = ref(true);
const user = ref(null);
const auth = getAuth();

onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }
})

</script>

<template>
  <main id="bottomNav" class="flex flex-row border-t border-slate-200 dark:border-slate-100/10 bottom-0 fixed left-0 right-0 w-full bg-white h-[80px] justify-center bg-white dark:bg-slate-900 ">
    <router-link v-if="isLoggedIn" to="/" class="flex flex-col py-4 h-18 w-24 justify-center text-xs font-semibold uppercase text-slate-500 dark:text-white justify-center text-center">
      <img src="/crisp-nav-tools.svg" alt="Tools" class="h-8 w-8 self-center" />
      Tools
    </router-link>
  </main>
</template>

<style scoped>
.router-link-active, 
.router-link-exact-active {
  @apply bg-blue-50/50;
  @apply dark:bg-slate-800 !important;
}
</style>