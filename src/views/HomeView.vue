<script setup>
import SectionHeaderColorTools from '@/components/layout/SectionHeaderColorTools.vue';
import SectionHeaderTextTools from '@/components/layout/SectionHeaderTextTools.vue';
import SectionHeaderCssTools from '@/components/layout/SectionHeaderCssTools.vue';

</script>

<template>
  <main class="flex flex-start">

    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full p-4 lg:p-6">

      <!-- Color Tools -->
      <div class="flex flex-col gap-2 w-full">
        <SectionHeaderColorTools />
        <div class="p-2">
          <p class="text-sm text-gray-600 pb-2">Tools for building palettes and colors</p>
          <ul>
            <li class="py-2 border-b"><router-link to="/color-tools/palette-generator" class="btn mt-4 text-lime-500">Color Palette Generator</router-link></li>
            <li class="py-2 border-b"><router-link to="/color-tools/lighten-color" class="btn mt-4 text-lime-500">Lighten Color</router-link></li>
            <li class="py-2 border-b"><router-link to="/color-tools/darken-color" class="btn mt-4 text-lime-500">Darken Color</router-link></li>
          </ul>
        </div>
        <router-link to="/color-tools" class="flex flex-row justify-between px-4 btn bg-lime-500 rounded py-2 text-center text-white">
          <span>Browse all Color Tools </span>
          <span>&rarr;</span>
        </router-link>
      </div>

      <!-- Text Tools -->
      <div class="flex flex-col gap-2 w-full">
        <SectionHeaderTextTools />
        <div class="p-2">
          <p class="text-sm text-gray-600 pb-2">Tools for working with text and typography</p>
          <ul>
            <li class="py-2 border-b"><router-link to="/text-tools/word-counter" class="btn mt-4  text-blue-500">Lorem Ipsum</router-link></li>
            <li class="py-2"><router-link to="/text-tools/word-counter" class="btn mt-4  text-blue-500">Word Counter and Keywords Analysis</router-link></li>
          </ul>
        </div>  
        <router-link to="/text-tools" class="flex flex-row justify-between px-4 btn bg-blue-500 rounded py-2 text-center text-white">
          <span>Browse all Text Tools </span>
          <span>&rarr;</span>
        </router-link>
      </div>

      <!-- Text Tools -->
      <div class="flex flex-col gap-2 w-full">
        <SectionHeaderCssTools />
        <div class="p-2">
          <p class="text-sm text-gray-600 pb-2">Tools for working with cascading style sheets</p>
          <ul>
            <li class="py-2 border-b"><router-link to="/css-tools/static-type-scale" class="btn mt-4  text-slate-500">Static Type Scale</router-link></li>
          </ul>
        </div>  
        <router-link to="/text-tools" class="flex flex-row justify-between px-4 btn bg-slate-500 rounded py-2 text-center text-white">
          <span>Browse all Text Tools </span>
          <span>&rarr;</span>
        </router-link>
      </div>
    </section>

  </main>
</template>