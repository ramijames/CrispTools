<script setup>
import Links from '@/components/layout/Links.vue';
import colorroutes from '@/router/routes-color-tools';
import ViewTypeHeader from '@/components/layout/ViewType.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<template>
  <ViewTypeHeader :viewType="userStore.viewType" />
  <Links title="Color Tools" :icon="'/icon-color-tools.svg'" :routes="colorroutes" :routePath="'/color-tools'" viewType="'big'" />
</template>