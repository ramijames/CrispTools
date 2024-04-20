<template>
  <!-- <Header /> -->
  <section class="flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
      <section class="flex flex-col w-full lg:w-1/4 border-r">
        <Sidebar />
      </section>
      <section class="w-full flex flex-col min-h-screen border-r">
        <RouterView />
        <Footer />
      </section>
  </section>
  
</template>

<script setup>
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/SideBar.vue";
import Footer from "./components/layout/Footer.vue";
</script>

<style scoped>

</style>

