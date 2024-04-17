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
    let css = '';
    const route = useRouter();

    switch (props.viewType) {
      case 'big':
        css = 'text-sm font-semibold uppercase text-slate-500 self-center';
      default:
        css = 'text-sm font-semibold uppercase text-slate-500 self-center';
    }

    return {
      css,
      props,
      route
    };
  }
}
</script>

<template>
  <div class="flex flex-row justify-between w-full max-w-screen-2xl mx-auto px-6 py-4">
    <div class="flex flex-row gap-2">  
      <img :src="props.icon" :alt="props.title" class="w-8 h-auto self-center opacity-10">
      <h2 class="text-sm font-semibold uppercase text-slate-500 self-center">{{ props.title }}</h2>
    </div>
    <router-link v-if="route.currentRoute.value.path !== props.routePath" :to="props.routePath" :class="css">Explore →</router-link>
  </div>
</template>