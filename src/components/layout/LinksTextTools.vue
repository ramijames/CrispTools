<script setup>
import SectionHeaderTextTools from '@/components/layout/SectionHeaderTextTools.vue';
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <SectionHeaderTextTools />
    <div class="p-4">
      <p class="text-sm text-gray-600 pb-2">Tools for working with text and typography</p>
      <ul>
        <li class="py-2 border-b"><router-link to="/text-tools/lipsum" class="btn mt-4  text-blue-500">Lorem Ipsum</router-link></li>
        <li class="py-2"><router-link to="/text-tools/word-counter" class="btn mt-4  text-blue-500">Word Counter and Keywords Analysis</router-link></li>
      </ul>
    </div>
  </div>
</template>