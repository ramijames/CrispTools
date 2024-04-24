<script>
import { computed, ref } from "vue";
import { useUserStore } from '@/stores/user';

export default {
  props: {
    viewType: String
  },
  setup(props){
    const view = ref(props.viewType);
    const userStore = useUserStore();
    userStore.setViewType(props.viewType);

    const selected   = 'selected';
    const unselected = 'unselected';

    const bigCss = computed(() => {
      if (userStore.viewType === 'big') {
        return { button: selected };
      } else {
        return { button: unselected };
      }
    });

    const iconCss = computed(() => {
      if (userStore.viewType === 'icon') {
        return { button: selected };
      } else {
        return { button: unselected };
      }
    });

    const listCss = computed(() => {
      if (userStore.viewType === 'list') {
        return { button: selected };
      } else {
        return { button: unselected };
      }
    });

    const setViewType = (type) => {
      userStore.setViewType(type);
      view.value = type;
    }
    
    return { 
      view,
      setViewType,
      bigCss,
      iconCss,
      listCss
    }
    
  }
}

</script>

<template>
  <section class="flex flex-row justify-end">
    <!-- <span class="cursor-default mr-4 text-xs font-semibold uppercase text-slate-400/60 self-center">Viewtype</span> -->
    <section class="w-full flex flex-row lg:w-auto text-center relative border-r dark:border-slate-200/10 pr-3">
      <div :class="bigCss.button" @click="setViewType('big')">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="14" height="14" rx="4" fill="#D9D9D9"/>
        </svg>
      </div>
      <div :class="listCss.button" @click="setViewType('list')">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="4" height="4" rx="2" fill="#D9D9D9"/>
          <rect x="2" y="7" width="4" height="4" rx="2" fill="#D9D9D9"/>
          <rect x="2" y="12" width="4" height="4" rx="2" fill="#D9D9D9"/>
          <rect x="7" y="3" width="9" height="2" rx="1" fill="#D9D9D9"/>
          <rect x="7" y="8" width="9" height="2" rx="1" fill="#D9D9D9"/>
          <rect x="7" y="13" width="9" height="2" rx="1" fill="#D9D9D9"/>
        </svg>
      </div>
      <div :class="iconCss.button" @click="setViewType('icon')">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="6" height="6" rx="3" fill="#D9D9D9"/>
          <rect x="2" y="10" width="6" height="6" rx="3" fill="#D9D9D9"/>
          <rect x="10" y="2" width="6" height="6" rx="3" fill="#D9D9D9"/>
          <rect x="10" y="10" width="6" height="6" rx="3" fill="#D9D9D9"/>
        </svg>
      </div>
    </section>
  </section>  
</template>

<style>

.selected {
    @apply lg:w-auto;
  @apply cursor-pointer;
  @apply text-blue-500;
    @apply dark:text-white;
  @apply py-2;
  @apply px-2;
  @apply text-xs;
  @apply font-semibold;
  @apply uppercase;
  @apply transition-colors;
  @apply ease-in-out;
  @apply ml-0;
    @apply lg:ml-4;
}

.selected svg * {
  @apply fill-blue-500;
}

.dark .selected svg * {
  @apply fill-white;
}

.unselected {
  @apply lg:w-auto;
  @apply cursor-pointer;
  @apply text-slate-300;
    @apply dark:text-white;
  @apply py-2;
  @apply px-2;
  @apply text-xs;
  @apply font-semibold;
  @apply uppercase;
  @apply transition-colors;
  @apply ease-in-out;
  @apply ml-0;
    @apply lg:ml-4;
  @apply relative;
}

.dark .unselected svg * {
  @apply fill-blue-500;

}

</style>