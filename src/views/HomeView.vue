<script setup>

import Links from '@/components/layout/Links.vue';

import colorroutes from '@/router/routes-color-tools';
import cssroutes from '@/router/routes-css-tools';
import textroutes from '@/router/routes-text-tools';

</script>

<template>
  <main class="flex flex-start max-w-screen-2xl mx-auto">

    <section class=" w-full py-6 px-2 lg:px-0">

      <Links title="Color Tools" :icon="'/icon-color-tools.svg'" :routes="colorroutes" :routePath="'/color-tools'" viewType="'big'" />
      <Links title="Css Tools" :icon="'/icon-css-tools.svg'" :routes="cssroutes" :routePath="'/css-tools'" viewType="'big'" />
      <Links title="Text Tools" :icon="'/icon-text-tools.svg'" :routes="textroutes" :routePath="'/text-tools'" viewType="'big'" />

    </section>

  </main>
</template>