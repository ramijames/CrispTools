<template>
  <main class="main-gradient mx-auto flex flex-col">
    <div class="p-4 pb-0 lg:px-6">
      <Header />
    </div>
    <div>  
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
.main-gradient {
  background: linear-gradient(135deg,  #cbf983 0%,#ffffff 5%);
}
</style>

