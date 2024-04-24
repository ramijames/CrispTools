<script>

import Links from '@/components/layout/Links.vue';
import Sidebar from "@/components/layout/SideBar.vue";

import colorroutes from '@/router/routes-color-tools';
import cssroutes from '@/router/routes-css-tools';
import textroutes from '@/router/routes-text-tools';

import { useUserStore } from '@/stores/user';

import ViewTypeHeader from '@/components/layout/ViewType.vue';

export default {
  components: {
    Links
  },
  data() {
    return {
      
    }
  },
  setup() {

    const userStore = useUserStore();

    return {
      userStore
    }
  },
  components: {
    ViewTypeHeader,
    Links,
    Sidebar
  }
}

</script>

<template>
  <section class="h-full w-full flex flex-col max-w-screen-2xl mx-auto">
    <section class="h-screen flex flex-col w-full py-4 lg:pr-12">
      <p class="w-full lg:w-2/3 mx-auto text-slate-500 dark:text-white/50 uppercase text-sm font-semibold mb-8">Pitch</p>
      <h1 class="w-full lg:w-2/3 mx-auto text-slate-900 dark:text-white text-5xl mb-4">Control what content you see</h1>
      <p class="w-full lg:w-2/3 pr-40 mx-auto text-slate-500 dark:text-white/70 text-base">
        Every site that you browse content for has its own agenda, and it's own algorithm 
        that defines what you see. What about how you want to use the web? With our tools 
        you can see only the topics and trends most important to you.
      </p>
    </section>
    
  </section>
</template>