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
} from "@heroicons/vue/24/outline";
import {
  ChevronDownIcon,
} from "@heroicons/vue/20/solid";

const mobileMenuOpen = ref(false);

</script>

<template>
  <aside class="w-full lg:w-1/4 px-4 lg:pr-4">
    <nav class="w-full flex flex-col px-0 lg:px-2" aria-label="Global" >
      <!-- router-links to main pages -->
      <div class="flex flex-row lg:flex-col gap-2 lg:gap-4 lg:my-4 whitespace-nowrap overflow-x-auto">
        <router-link to="/" class="rounded-full bg-slate-200/50 py-2 px-6 text-base font-semibold text-slate-700">All Tools</router-link>
        <router-link to="/color-tools" class="rounded-full bg-slate-200/50 py-2 px-6 text-base font-semibold text-slate-700">Color Tools</router-link>
        <router-link to="/text-tools" class="rounded-full bg-slate-200/50 py-2 px-6 text-base font-semibold text-slate-700">Text Tools</router-link>
        <router-link to="/css-tools" class="rounded-full bg-slate-200/50 py-2 px-6 text-base font-semibold text-slate-700">CSS Tools</router-link>
      </div>
    </nav>
  </aside>
</template>

<style scoped>

.router-link-active,
.router-link-exact-active {
  @apply bg-slate-500;
  @apply text-white;
}

</style>
