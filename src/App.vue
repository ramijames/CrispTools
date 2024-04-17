<template>
  <main class="flex flex-col">
    <div class="">
      <Header />
    </div>
    <div class="w-full max-w-screen-2xl mx-auto px-4">  
      <RouterView />
    </div>
    <div class="w-full mx-auto">
      <Footer />
    </div>
  </main>
</template>

<script setup>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
</script>

<style scoped>

</style>

