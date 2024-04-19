<script>
import { computed, ref } from 'vue';
import SectionHeader from '@/components/layout/SectionHeader.vue';
import { useUserStore } from '@/stores/user';

export default {
  components: {
    SectionHeader
  },
  data() {
    return {
      
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    routes: {
      type: Array,
      required: true
    },
    routePath: {
      type: String,
      required: true
    },
    viewType: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  setup(props){

    const userStore = useUserStore();

    const routerCss = computed(() => {
      switch (userStore.viewType) {
        case 'big':
          return {
                  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
                  routerLink: 'bg-left bg-cover h-60 relative rounded-xl bg-white transition-shadow shadow hover:shadow-xl flex flex-col justify-between',
                  image: 'w-full h-60 object-cover rounded-xl',
                  section: 'backdrop-blur-md text-ellipsis overflow-hidden absolute bottom-0 w-full px-6 py-4 hover:py-6 transition-all bg-slate-500/30 rounded-b-xl rounded-t-xl',
                  p1: 'text-white drop-shadow-md font-semibold text-md mb-1 truncate text-ellipsis overflow-hidden',
                  p2: 'text-white/60 drop-shadow-md text-sm truncate text-ellipsis overflow-hidden'
                };
        case 'icon':
          return {
                  grid: 'grid grid-cols-2 lg:grid-cols-8 gap-8',
                  routerLink: 'h-auto w-full bg-none relative flex flex-col gap-4',
                  image: 'w-24 h-24 object-cover rounded-xl self-center',
                  section: '',
                  p1: 'font-semibold text-xs mb-1 truncate text-ellipsis overflow-hidden text-center',
                  p2: 'hidden'
                };
        default: // case 'list':
          return {
                  grid: 'grid grid-cols-1 lg:grid-cols-2 gap-2',
                  routerLink: 'h-auto bg-none relative flex flex-row gap-4 rounded-xl hover:bg-slate-200/50 p-2 transition-all',
                  image: 'w-12 h-12 object-cover rounded-lg',
                  section: '',
                  p1: 'font-semibold text-md mb-1 truncate text-ellipsis overflow-hidden',
                  p2: 'text-xs'
                };  
      }
    });

    return {
      props,
      routerCss
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <SectionHeader :title="props.title" :icon="props.icon" :routePath="props.routePath" :viewType="props.viewType" />
    <div class="rounded-2xl border border-slate-200 p-6 mb-12 w-full max-w-screen-2xl mx-auto shadow bg-white">
      <ul :class="routerCss.grid">
        <router-link 
          :to="route.path" 
          v-for="route in props.routes" 
          :key="route.name" 
          :class="routerCss.routerLink"
        >
          <img :src="route.image" :alt="route.name" :class="routerCss.image">
          <section :class="routerCss.section">
            <p :class="routerCss.p1">{{ route.name }}</p>
            <p :class="routerCss.p2">{{ route.description }}</p>
          </section>
        </router-link>
      </ul>
    </div>
  </div>
</template>