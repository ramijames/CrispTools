<script setup>

import tinycolor from "tinycolor2";

</script>

<template>
  <div class="wrapper">
    <section id="powerbar" class="flex flex-1 flex-col p-6 border-b bg-white w-full justify-between">
      <section id="title" class="flex flex-col justify-center">
        <h1 class="text-slate-900 font-semibold text-md">Lighten Colors</h1>
        <p class="text-sm text-slate-900">Select your color and we will output a set of lighter values</p>
      </section>
    </section>
    <section id="workspace">
      
      <!-- 2 column wrapper -->
      <div class="mx-auto w-full  grow lg:flex">
        <!-- Left sidebar & main wrapper -->
        <div class="shrink-0 w-80 border-r">
          <h2 class="text-slate-900 p-6 font-semibold uppercase text-xs border-b">
            <span class="text-green-400">○</span> Color Selector
          </h2>
        </div>
        <div class="w-full">
          <h2 class="text-slate-900 p-6 font-semibold uppercase text-xs border-b">
            <span class="text-green-400">►</span> Output
          </h2>
        </div>
      </div>
    </section>

  </div>
</template>