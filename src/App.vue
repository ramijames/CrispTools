<template>
  <Header />
  <section class="flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
      <Sidebar />
      <section class="w-full flex flex-col min-h-screen px-4">
        <RouterView />
      </section>
  </section>
  <Footer />
</template>

<script setup>
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/SideBar.vue";
import Footer from "./components/layout/Footer.vue";
</script>

<style scoped>

</style>

