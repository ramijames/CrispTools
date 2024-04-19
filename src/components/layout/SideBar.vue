<script setup>
import { ref } from "vue";

import color from '@/router/routes-color-tools';
import css from '@/router/routes-css-tools';
import text from '@/router/routes-text-tools';

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {
  MusicalNoteIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  SwatchIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
  CursorArrowRaysIcon
} from "@heroicons/vue/24/outline";
import {
  ChevronDownIcon,
} from "@heroicons/vue/20/solid";

const mobileMenuOpen = ref(false);

</script>

<template>
  <aside class="w-full lg:w-1/4 px-4 lg:pr-4">
    <nav class="w-full flex flex-col px-0 lg:px-2 py-2 lg:py-0 lg:my-4" aria-label="Global" >
      <!-- router-links to main pages -->
      <div class="flex flex-row lg:flex-col gap-4 lg:gap-1 whitespace-nowrap overflow-x-auto">
        <router-link to="/" class="text-sm font-semibold text-slate-700 flex flex-row leading-10"><SparklesIcon class="p-1 border border-slate-200 rounded-md h-7 bg-white shadow mr-3 w-auto self-center"></SparklesIcon> All Tools</router-link>
        <router-link to="/color-tools" class="text-sm font-semibold text-slate-700 flex flex-row leading-10"><SwatchIcon class="p-1 border border-slate-200 rounded-md h-7 bg-white shadow mr-3 w-auto self-center"></SwatchIcon> Color Tools</router-link>
        <router-link to="/text-tools" class="text-sm font-semibold text-slate-700 flex flex-row leading-10"><DocumentTextIcon class="p-1 border border-slate-200 rounded-md h-7 bg-white shadow mr-3 w-auto self-center"></DocumentTextIcon> Text Tools</router-link>
        <router-link to="/css-tools" class="text-sm font-semibold text-slate-700 flex flex-row leading-10"><CursorArrowRaysIcon class="p-1 border border-slate-200 rounded-md h-7 bg-white shadow mr-3 w-auto self-center"></CursorArrowRaysIcon> CSS Tools</router-link>
      </div>
    </nav>
  </aside>
</template>

<style scoped>

.router-link-active,
.router-link-exact-active {
  @apply bg-slate-50;
  @apply text-black;
}

.router-link-active svg {
  @apply bg-slate-600;
  @apply text-white;
  @apply border-slate-700;
}

</style>
