<template>
  <main class="mx-auto flex flex-col">
    <div class="p-4 lg:px-6 bg-white">
      <Header />
    </div>
    <div class="bg-neutral-100">  
      <RouterView />
    </div>
    <div class="py-8 px-4 lg:px-6">
      <Footer />
    </div>
  </main>
</template>

<script setup>
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
</script>
