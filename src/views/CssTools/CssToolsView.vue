<script setup>
import cssroutes from '@/router/routes-css-tools';
import Links from '@/components/layout/Links.vue';
import ViewTypeHeader from '@/components/layout/ViewType.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<template>
  <ViewTypeHeader :viewType="userStore.viewType" />
  <Links title="Css Tools" :icon="'/icon-css-tools.svg'" :routes="cssroutes" :routePath="'/css-tools'" viewType="'big'" />
</template>