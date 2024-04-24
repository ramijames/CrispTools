<script>
import { useRouter } from 'vue-router';

export default {
  props: {
    title: String,
    routePath: String,
    viewType: String,
    routes: Array,
    icon: String
  },
  setup(props) {
    const route = useRouter();

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
  <div class="flex flex-row justify-between w-full max-w-screen-2xl pb-4">
    <div class="flex flex-row gap-2 w-full justify-between lg:justify-start">  
      <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-50 self-center">{{ props.title }}</h2>
      <router-link v-if="route.currentRoute.value.path !== props.routePath" :to="props.routePath" class="btn text-xs py-1 px-2 bg-blue-50 dark:bg-blue-50/10 rounded text-blue-500 font-semibold uppercase ml-2 self-center">View all →</router-link>
    </div>
  </div>
</template>