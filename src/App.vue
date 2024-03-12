<template>
  <main
    class="mx-auto flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8"
  >
    <Header />
    <RouterView />
    <Footer />
  </main>
</template>

<script setup>
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>
