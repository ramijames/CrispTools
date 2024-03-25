<script setup>

</script>

<template>
  <main>
    <div class="flex flex-col items-center justify-center my-16">
      <h1 class="text-5xl font-semibold mt-6" style="min-height: 50px; background-image: url('https://www.iconfinder.com/static/img/illustrations/marker2.svg?ba92f9ef8e'); background-repeat: no-repeat; background-position: 100% 35%; background-size: 45%;">Tiny Tools to work faster</h1>
    </div>
    <!-- grid of tools as links to the palette, word counter, static type scale, and lipsum -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 max-w-3xl mx-auto mb-24">
      <router-link to="/palette-generator" class="card border p-6 rounded">
        <div class="card-content">
          <img src="/palette.svg" class="w-12 h-auto pb-6" alt="Color palette">
          <h2 class="text-xl font-semibold">Color Palette</h2>
          <p class="text-sm text-gray-600">Generate a color palette for your project</p>
        </div>
      </router-link>
      <router-link to="/word-counter" class="card border p-6 rounded">
        <div class="card-content">
          <img src="/word-counter.svg" class="w-12 h-auto pb-6" alt="Color palette">
          <h2 class="text-xl font-semibold">Word Counter</h2>
          <p class="text-sm text-gray-600">Analyze text content and extract keywords</p>
        </div>
      </router-link>
      <router-link to="/static-type-scale" class="card border p-6 rounded">
        <div class="card-content">
          <img src="/type-scale.svg" class="w-12 h-auto pb-6" alt="Color palette">
          <h2 class="text-xl font-semibold">Static Type Scale</h2>
          <p class="text-sm text-gray-600">Generate a static type scale for your project</p>
        </div>
      </router-link>
      <router-link to="/lipsum" class="card border p-6 rounded">
        <div class="card-content">
          <img src="/lipsum.svg" class="w-12 h-auto pb-6" alt="Color palette">
          <h2 class="text-xl font-semibold">Lorem Ipsum</h2>
          <p class="text-sm text-gray-600">Generate placeholder text for your designs</p>
        </div>
      </router-link>
    </section>
  </main>
</template>