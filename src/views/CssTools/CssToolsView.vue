<script setup>
import cssroutes from '@/router/routes-css-tools';
import Links from '@/components/layout/Links.vue';
import ViewTypeHeader from '@/components/layout/ViewType.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<template>
  <main class="bg-slate-700 rounded-t-xl mt-6">
    <section class="flex flex-col-reverse md:flex-row max-w-screen-xl gap-8 mx-auto pb-4 pt-10 px-8">
      <div class="flex flex-col justify-center w-full">
        <h1 class="text-6xl text-slate-300 font-black mb-2 drop-shadow">Free Online Css Tools</h1>
        <p class="text-xl text-slate-300 mb-8 drop-shadow">Css doesn't have to be a pain</p>
      </div>
    </section>
  </main>
  <ViewTypeHeader :viewType="userStore.viewType" />
  <Links title="Css Tools" :icon="'/icon-css-tools.svg'" :routes="cssroutes" :routePath="'/css-tools'" viewType="'big'" />
</template>