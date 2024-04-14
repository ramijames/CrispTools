<script setup>
import SectionHeaderCssTools from '@/components/layout/SectionHeaderCssTools.vue';
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <SectionHeaderCssTools />
    <div class="p-4">
      <p class="text-sm text-gray-600 pb-2">Tools for working with cascading style sheets</p>
      <ul>
        <li class="py-2 border-b"><router-link to="/css-tools/static-type-scale" class="btn mt-4  text-slate-500">Static Type Scale</router-link></li>
      </ul>
    </div>
  </div>
</template>