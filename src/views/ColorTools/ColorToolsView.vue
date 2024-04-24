<script>

import Links from '@/components/layout/Links.vue';
import Sidebar from "@/components/layout/SideBar.vue";
import colorroutes from '@/router/routes-color-tools';
import { useUserStore } from '@/stores/user';

export default {
  components: {
    Links
  },
  data() {
    return {
      colorroutes,
    }
  },
  setup() {

    const userStore = useUserStore();

    return {
      userStore
    }
  },
  components: {
    Links,
    Sidebar
  }
}
</script>

<template>
  <section class="w-full flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
    <section class="flex flex-col w-full lg:w-1/4 pr-8">
      <Sidebar />
    </section>
    <section class="w-full flex flex-col min-h-screenpb-[20rem]">
      <Links title="Color Tools" :icon="'/icon-color-tools.svg'" :routes="colorroutes" :routePath="'/color-tools'" viewType="big" />
    </section>
  </section>
</template>