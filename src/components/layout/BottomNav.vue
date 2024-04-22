<template>
  <main id="bottomNav" class="flex flex-row border-t border-slate-200 bottom-0 fixed left-0 right-0 w-full bg-white h-24 justify-center">
    <!-- <router-link to="/" class="flex flex-col h-24 w-24 justify-center text-xs font-semibold uppercase text-slate-500">Home</router-link> -->
    <router-link to="/" class="flex flex-col py-4 h-24 w-24 justify-center text-xs font-semibold uppercase text-slate-500 justify-center text-center">
      <img src="/crisp-nav-tools.svg" alt="Tools" class="h-8 w-8 self-center" />
      Tools
    </router-link>
    <router-link to="/trends" class="flex flex-col py-8 h-24 w-24 justify-center text-xs font-semibold uppercase text-slate-500 justify-center text-center">
      <img src="/crisp-nav-trending.svg" alt="Trends" class="h-8 w-8 self-center" />
      Trends
    </router-link>
    <router-link to="/build" class="flex flex-col py-8 h-24 w-24 justify-center text-xs font-semibold uppercase text-slate-500 justify-center text-center">
      <img src="/crisp-nav-build.svg" alt="Build" class="h-8 w-8 self-center" />
      Build
    </router-link>
  </main>
</template>

<style scoped>
.router-link-active, 
.router-link-exact-active {
  @apply bg-blue-50/50;
}
</style>