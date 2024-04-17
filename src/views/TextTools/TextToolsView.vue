<script setup>
import Links from '@/components/layout/Links.vue';
import textroutes from '@/router/routes-text-tools';
</script>

<template>
  <Links title="Text Tools" :icon="'/icon-text-tools.svg'" :routes="textroutes" :routePath="'/text-tools'" viewType="'big'" />
</template>