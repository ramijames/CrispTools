<script setup>
import cssroutes from '@/router/routes-css-tools';
import Links from '@/components/layout/Links.vue';
</script>

<template>
  <Links title="Css Tools" :icon="'/icon-css-tools.svg'" :routes="cssroutes" :routePath="'/css-tools'" viewType="'big'" />
</template>