<script>
import { ref, computed, watch } from "vue";
import Button from './shared/Button.vue';
import CrispInput from './shared/CrispInput.vue';

export default {
  data() {
    return {

    };
  },
  setup() {
  

    return {
      
    };

  },
  components: {
    Button,
    CrispInput,
  },
  methods: {

  },
  watch: {

  },
};
</script>

<template>
  <div class="wrapper">
    <section id="powerbar" class="flex flex-1 flex-col p-4 lg:px-6 border-b w-full justify-between">
      <section id="title" class="flex flex-col justify-center">
        <h4 class="text-md font-semibold text-black">Palette Generator</h4>
        <p class="text-xs text-slate-800">Easy to use palette generator</p>
      </section>
      <section id="toolbar" class="flex flex-auto flex-col md:flex-row gap-2 py-4">
        
      </section>
    </section>
    <section id="workspace" class="flex lg:flex-row md:flex-col">
      <div class="w-full bg-white flex flex-col items-center">
        <div class="max-w-3xl p-8 md:p-24 text-black">
          <p>Your palettes</p>
        </div>
      </div>
    </section>
  </div>
</template>