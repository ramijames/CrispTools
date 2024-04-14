<script setup>
import LinksColorTools from '@/components/layout/LinksColorTools.vue';
import LinksTextTools from '@/components/layout/LinksTextTools.vue';
import LinksCssTools from '@/components/layout/LinksCssTools.vue';

</script>

<template>
  <main class="flex flex-start">

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full p-0 lg:p-6">

      <LinksColorTools />
      <LinksCssTools />
      <LinksTextTools />

    </section>

  </main>
</template>