<script setup>
import cssroutes from '@/router/routes-css-tools';
import Links from '@/components/layout/Links.vue';
</script>

<template>
  <main class="bg-slate-700 rounded-b-xl mb-2">
    <section class="flex flex-col-reverse md:flex-row max-w-screen-xl gap-8 mx-auto pb-4 pt-10 px-8">
      <div class="flex flex-col justify-center w-full">
        <h1 class="text-6xl text-slate-300 font-black mb-2 drop-shadow">Free Online Css Tools</h1>
        <p class="text-xl text-slate-300 mb-8 drop-shadow">Css doesn't have to be a pain</p>
      </div>
    </section>
  </main>
  <Links title="Css Tools" :icon="'/icon-css-tools.svg'" :routes="cssroutes" :routePath="'/css-tools'" viewType="'big'" />
</template>