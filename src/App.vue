<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="wrapper">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped>
#toolbar {
  justify-content: space-between;
}
</style>
