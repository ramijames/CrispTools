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
  <header class="w-full bg-white py-4 mb-4">
    <nav class="max-w-screen-2xl w-full mx-auto flex flex-row items-center justify-between gap-6 px-8" aria-label="Global" >
      <div class="flex lg:flex-1">
        <router-link to="/" class="flex flex-row gap-2 justify-center items-center">
          <img class="h-8 w-auto" src="/crisp-logo-white.svg" alt="Crisp Tools"/>
          <span class="text-md font-semibold text-neutral-300 border-l border-slate-200 pl-2 tracking-widest">CRISP</span>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
