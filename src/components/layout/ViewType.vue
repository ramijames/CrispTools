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

    const bigCss = computed(() => {
      if (userStore.viewType === 'big') {
        return { button: 'btn shadow cursor-pointer bg-slate-900 text-white py-1 px-2 rounded-l-lg text-sm px-4' };
      } else {
        return { button: 'btn shadow cursor-pointer bg-white text-black py-1 px-2 rounded-l-lg text-sm px-4' };
      }
    });

    const listCss = computed(() => {
      if (userStore.viewType === 'list') {
        return { button: 'btn shadow cursor-pointer bg-slate-900 text-white py-1 px-2 rounded-r-lg text-sm px-4' };
      } else {
        return { button: 'btn shadow cursor-pointer bg-white text-black py-1 px-2 rounded-r-lg text-sm px-4' };
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
      listCss
    }
    
  }
}

</script>

<template>
  <section class="flex flex-row justify-end rounded-b-xl p-4 mb-4 bg-slate-200/50">
    <section class="flex flex-row justify-end">
      <div :class="bigCss.button" @click="setViewType('big')">Big</div>
      <div :class="listCss.button" @click="setViewType('list')">List</div>
    </section>
  </section>  
</template>