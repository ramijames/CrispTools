<script setup>
import SectionHeaderColorTools from '@/components/layout/SectionHeaderColorTools.vue';
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <SectionHeaderColorTools />
    <div class="p-4">
      <p class="text-sm text-gray-600 pb-2">Tools for building palettes and colors</p>
      <ul>
        <li class="py-2 border-b"><router-link to="/color-tools/palette-generator" class="btn mt-4 text-lime-500">Color Palette Generator</router-link></li>
        <li class="py-2 border-b"><router-link to="/color-tools/lighten-color" class="btn mt-4 text-lime-500">Lighten Color</router-link></li>
        <li class="py-2 "><router-link to="/color-tools/darken-color" class="btn mt-4 text-lime-500">Darken Color</router-link></li>
      </ul>
    </div>
  </div>
</template>