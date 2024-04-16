<script setup>
import LinksColorTools from '@/components/layout/LinksColorTools.vue';
import LinksTextTools from '@/components/layout/LinksTextTools.vue';
import LinksCssTools from '@/components/layout/LinksCssTools.vue';

</script>

<template>
  <main class="flex flex-start max-w-screen-2xl mx-auto">

    <section class=" w-full py-6 px-2 lg:px-0">

      <LinksColorTools />
      <LinksCssTools />
      <LinksTextTools />

    </section>

  </main>
</template>