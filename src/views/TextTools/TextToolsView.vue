<script>

import Links from '@/components/layout/Links.vue';
import Sidebar from "@/components/layout/SideBar.vue";
import textroutes from '@/router/routes-text-tools';
import { useUserStore } from '@/stores/user';

export default {
  components: {
    Links
  },
  data() {
    return {
      textroutes,
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
      <Links title="Text Tools" :icon="'/icon-text-tools.svg'" :routes="textroutes" :routePath="'/text-tools'" viewType="big" />
    </section>
  </section>
</template>