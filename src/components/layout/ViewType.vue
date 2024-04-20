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
  <section class="flex flex-row justify-end px-4 mb-4 border-b dark:border-slate-100/10">
    <!-- <span class="cursor-default mr-4 text-xs font-semibold uppercase text-slate-400/60 self-center">Viewtype</span> -->
    <section class="flex flex-row w-full lg:w-auto text-center">
      <div :class="bigCss.button" @click="setViewType('big')">Big</div>
      <div :class="iconCss.button" @click="setViewType('icon')">Icon</div>
      <div :class="listCss.button" @click="setViewType('list')">List</div>
    </section>
  </section>  
</template>

<style>

.selected {
  @apply w-1/3;
    @apply lg:w-auto;
  @apply border-b-2;
    @apply border-blue-500;
  @apply cursor-pointer;
  @apply text-white;
    @apply dark:text-white;
  @apply py-2;
  @apply text-xs;
  @apply font-semibold;
  @apply uppercase;
  @apply transition-colors;
  @apply ease-in-out;
  @apply ml-0;
    @apply lg:ml-4;
}

.unselected {
  @apply w-1/3;
  @apply lg:w-auto;
  @apply cursor-pointer;
  @apply text-black;
    @apply dark:text-white;
  @apply py-2;
  @apply text-xs;
  @apply font-semibold;
  @apply uppercase;
  @apply transition-colors;
  @apply ease-in-out;
  @apply ml-0;
    @apply lg:ml-4;
}

</style>