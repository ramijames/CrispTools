<script setup>

import {
  DocumentTextIcon,
  SwatchIcon,
  SparklesIcon,
  CursorArrowRaysIcon
} from "@heroicons/vue/24/outline";

</script>

<template>
  <aside class="w-full px-4 lg:pr-4">
    <nav class="w-full flex flex-col px-0 lg:px-2 py-2 lg:py-0 lg:my-4" aria-label="Global" >
      <div class="flex flex-row lg:flex-col gap-4 lg:gap-1 whitespace-nowrap overflow-x-auto">
        <router-link to="/" class="text-md font-semibold text-slate-500 px-4 rounded-full flex flex-row leading-10"><SparklesIcon class="p-1 h-7 mr-3 w-auto self-center"></SparklesIcon> All Tools</router-link>
        <router-link to="/color-tools" class="text-md font-semibold text-slate-500 px-4 rounded-full flex flex-row leading-10"><SwatchIcon class="p-1 h-7 mr-3 w-auto self-center"></SwatchIcon> Color Tools</router-link>
        <router-link to="/text-tools" class="text-md font-semibold text-slate-500 px-4 rounded-full flex flex-row leading-10"><DocumentTextIcon class="p-1 h-7 mr-3 w-auto self-center"></DocumentTextIcon> Text Tools</router-link>
        <router-link to="/css-tools" class="text-md font-semibold text-slate-500 px-4 rounded-full flex flex-row leading-10"><CursorArrowRaysIcon class="p-1 h-7 mr-3 w-auto self-center"></CursorArrowRaysIcon> CSS Tools</router-link>
      </div>
    </nav>
  </aside>
</template>

<style scoped>

.router-link-active,
.router-link-exact-active {
  @apply text-white;
  @apply bg-slate-500;
}

</style>
