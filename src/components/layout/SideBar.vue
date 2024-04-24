<script setup>

import {
  DocumentTextIcon,
  SwatchIcon,
  SparklesIcon,
  CursorArrowRaysIcon
} from "@heroicons/vue/24/solid";

</script>

<template>
  <aside class="h-full w-full bg-blue-100/20 lg:bg-transparent dark:bg-blue-900/10">
    <nav class="h-full w-full flex flex-col justify-between px-4 pr-0 lg:pr-4 py-4 lg:py-0" aria-label="Global" >
      <div class="h-full w-full flex flex-row lg:flex-col gap-4 lg:gap-1 whitespace-nowrap overflow-x-auto">
        <router-link to="/tools" class="justify-center lg:justify-start dark:hover:bg-blue-500/10 hover:bg-blue-50 text-xs font-semibold uppercase text-slate-900 dark:text-white px-4 rounded-full flex flex-row leading-10"><SparklesIcon class="hidden lg:flex p-1 h-7 mr-3 w-auto self-center text-blue-500"></SparklesIcon> All Tools</router-link>
        <router-link to="/color-tools" class="justify-center lg:justify-start dark:hover:bg-blue-500/10 hover:bg-blue-50 text-xs font-semibold uppercase text-slate-900 dark:text-white px-4 rounded-full flex flex-row leading-10"><SwatchIcon class="hidden lg:flex p-1 h-7 mr-3 w-auto self-center text-blue-500"></SwatchIcon> Color Tools</router-link>
        <router-link to="/text-tools" class="justify-center lg:justify-start dark:hover:bg-blue-500/10 hover:bg-blue-50 text-xs font-semibold uppercase text-slate-900 dark:text-white px-4 rounded-full flex flex-row leading-10"><DocumentTextIcon class="hidden lg:flex p-1 h-7 mr-3 w-auto self-center text-blue-500"></DocumentTextIcon> Text Tools</router-link>
        <router-link to="/css-tools" class="justify-center lg:justify-start dark:hover:bg-blue-500/10 hover:bg-blue-50 text-xs font-semibold uppercase text-slate-900 dark:text-white px-4 rounded-full flex flex-row leading-10"><CursorArrowRaysIcon class="hidden lg:flex p-1 h-7 mr-3 w-auto self-center text-blue-500"></CursorArrowRaysIcon> CSS Tools</router-link>
      </div>
    </nav>
  </aside>
</template>

<style scoped>

.router-link-active,
.router-link-exact-active {
  @apply text-slate-900;
  @apply bg-blue-100;
}

.dark .router-link-active,
.dark .router-link-exact-active {
  @apply text-white;
  @apply bg-blue-500/10;
}

.router-link-active:hover,
.router-link-exact-active:hover {
  @apply bg-blue-100;
}

.dark .router-link-active:hover,
.dark .router-link-exact-active:hover {
  @apply bg-blue-500/20;
}

.router-link-active svg,
.router-link-exact-active svg {
  @apply text-blue-500;
}

</style>
