<script setup>
import Links from '@/components/layout/Links.vue';
import textroutes from '@/router/routes-text-tools';
import ViewTypeHeader from '@/components/layout/ViewType.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<template>
  <ViewTypeHeader :viewType="userStore.viewType" />
  <Links title="Text Tools" :icon="'/icon-text-tools.svg'" :routes="textroutes" :routePath="'/text-tools'" viewType="'big'" />
</template>