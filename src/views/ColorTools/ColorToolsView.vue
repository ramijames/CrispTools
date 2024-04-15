<script setup>
import LinksColorTools from '@/components/layout/LinksColorTools.vue';
</script>

<template>
  <main class="bg-slate-100">
    <section class="flex flex-col-reverse md:flex-row max-w-screen-xl gap-8 mx-auto p-[4rem]">
      <div class="flex flex-col justify-center w-full md:w-2/3">
        <h1 class="text-6xl text-slate-900 font-semibold mb-2">Free Online Color Tools</h1>
        <p class="text-xl text-slate-600 mb-8">We provide easy to use, excellent color tools so that you can quickly and effectively create designs.</p>
        <button class="bg-lime-500 text-white px-4 py-2 mt-4 w-1/2">Explore Tools</button>
      </div>
      <div class="flex flex-row justify-center w-full md:w-1/3">
        <img src="/color-tools.svg" alt="Color Tools" class="w-full mb-4" />
      </div>
    </section>
  </main>
  <LinksColorTools />
</template>