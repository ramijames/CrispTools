<template>
  <main class="mx-auto flex flex-col">
    <div class="">
      <Header />
    </div>
    <div class="bg-white">  
      <RouterView />
    </div>
    <div class="py-8 px-4 lg:px-6 border-t">
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

