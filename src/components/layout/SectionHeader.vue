<script>
import { ref } from "vue";
import { useRouter } from 'vue-router';
// import ViewTypeHeader from '@/components/layout/ViewType.vue'

export default {
  props: {
    title: String,
    routePath: String,
    viewType: String,
    routes: Array,
    icon: String
  },
  setup(props) {
    // let css = '';
    const route = useRouter();

    // switch (props.viewType) {
    //   case 'big':
    //     css = 'text-sm font-semibold uppercase text-slate-500 self-center';
    //   default:
    //     css = 'text-sm font-semibold uppercase text-slate-500 self-center';
    // }

    return {
      // css,
      props,
      route
    };
  },
  components: {

  }
}
</script>

<template>
  <div class="flex flex-row justify-between w-full max-w-screen-2xl pt-6 pb-2">
    <div class="flex flex-row gap-2 w-full justify-between lg:justify-start">  
      <h2 class="text-lg font-semibold text-slate-500 dark:text-slate-50 self-center">{{ props.title }}</h2>
      <router-link v-if="route.currentRoute.value.path !== props.routePath" :to="props.routePath" class="btn text-xs py-1 px-2 bg-blue-500 rounded text-white font-semibold uppercase ml-2 self-center">View all →</router-link>
    </div>
  </div>
</template>