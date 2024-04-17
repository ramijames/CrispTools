<script setup>
import Links from '@/components/layout/Links.vue';
import textroutes from '@/router/routes-text-tools';
</script>

<template>
  <main class="bg-slate-700 rounded-b-xl mb-2">
    <section class="flex flex-col-reverse md:flex-row max-w-screen-xl gap-8 mx-auto pb-4 pt-10 px-8">
      <div class="flex flex-col justify-center w-full">
        <h1 class="text-6xl text-slate-300 font-black mb-2 drop-shadow">Free Online Text Tools</h1>
        <p class="text-xl text-slate-300 mb-8 drop-shadow">Writing tools to make your literary journey a blast</p>
      </div>
    </section>
  </main>
  <Links title="Text Tools" :icon="'/icon-text-tools.svg'" :routes="textroutes" :routePath="'/text-tools'" viewType="'big'" />
</template>