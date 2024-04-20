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

    const selected   = 'w-1/3 lg:w-auto rounded cursor-pointer bg-blue-500 text-white py-2 lg:py-1 px-2 text-sm px-4 text-xs font-semibold uppercase transition-colors ease-in-out';
    const unselected = 'w-1/3 lg:w-auto rounded cursor-pointer text-black dark:text-white py-2 lg:py-1 px-2 text-sm px-4 text-xs font-semibold uppercase transition-colors ease-in-out';

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
  <section class="flex flex-row justify-end p-4 mb-4 border-b dark:border-slate-100/10">
    <!-- <span class="cursor-default mr-4 text-xs font-semibold uppercase text-slate-400/60 self-center">Viewtype</span> -->
    <section class="flex flex-row w-full lg:w-auto text-center">
      <div :class="bigCss.button" @click="setViewType('big')">Big</div>
      <div :class="iconCss.button" @click="setViewType('icon')">Icon</div>
      <div :class="listCss.button" @click="setViewType('list')">List</div>
    </section>
  </section>  
</template>