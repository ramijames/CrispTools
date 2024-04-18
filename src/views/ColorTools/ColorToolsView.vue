<script setup>
import Links from '@/components/layout/Links.vue';
import colorroutes from '@/router/routes-color-tools';
import ViewTypeHeader from '@/components/layout/ViewType.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<template>
  <main class="bg-slate-700 rounded-b-xl mb-2">
    <section class="flex flex-col-reverse md:flex-row max-w-screen-xl gap-8 mx-auto pb-4 pt-10 px-8">
      <div class="flex flex-col justify-center w-full">
        <h1 class="text-6xl text-slate-300 font-black mb-2 drop-shadow">Free Online Color Tools</h1>
        <p class="text-xl text-slate-300 mb-8 drop-shadow">We provide easy to use, excellent color tools so that you can quickly and effectively create designs.</p>
      </div>
    </section>
  </main>
  <ViewTypeHeader :viewType="userStore.viewType" />
  <Links title="Color Tools" :icon="'/icon-color-tools.svg'" :routes="colorroutes" :routePath="'/color-tools'" viewType="'big'" />
</template>