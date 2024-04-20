<script setup>

import {
  DocumentTextIcon,
  SwatchIcon,
  SparklesIcon,
  CursorArrowRaysIcon
} from "@heroicons/vue/24/solid";

</script>

<template>
  <aside class="w-full px-4 lg:pr-4">
    <nav class="w-full flex flex-col justify-start px-0 lg:px-2 py-2 lg:py-0 lg:my-4" aria-label="Global" >
      <div class="flex flex-row lg:flex-col gap-4 lg:gap-1 whitespace-nowrap overflow-x-auto">
        <router-link to="/" class="hover:bg-slate-50 text-md font-semibold text-black px-4 rounded-full flex flex-row leading-10"><SparklesIcon class="p-1 h-7 mr-3 w-auto self-center text-blue-500"></SparklesIcon> All Tools</router-link>
        <router-link to="/color-tools" class="hover:bg-slate-50 text-md font-semibold text-black px-4 rounded-full flex flex-row leading-10"><SwatchIcon class="p-1 h-7 mr-3 w-auto self-center text-blue-500"></SwatchIcon> Color Tools</router-link>
        <router-link to="/text-tools" class="hover:bg-slate-50 text-md font-semibold text-black px-4 rounded-full flex flex-row leading-10"><DocumentTextIcon class="p-1 h-7 mr-3 w-auto self-center text-blue-500"></DocumentTextIcon> Text Tools</router-link>
        <router-link to="/css-tools" class="hover:bg-slate-50 text-md font-semibold text-black px-4 rounded-full flex flex-row leading-10"><CursorArrowRaysIcon class="p-1 h-7 mr-3 w-auto self-center text-blue-500"></CursorArrowRaysIcon> CSS Tools</router-link>
      </div>
    </nav>
  </aside>
</template>

<style scoped>

.router-link-active,
.router-link-exact-active {
  @apply text-white;
  @apply bg-blue-500;
}

.router-link-active:hover,
.router-link-exact-active:hover {
  @apply bg-blue-600;
}

.router-link-active svg,
.router-link-exact-active svg {
  @apply text-white;
}

</style>
