<script>

import tinycolor from "tinycolor2";
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
import CrispInput from '@/components/shared/CrispInput.vue';
import SectionHeaderColorTools from '@/components/layout/SectionHeaderColorTools.vue';

export default {
  name: 'LightenColorView',
  components: {
    Vue3ColorPicker,
    CrispInput,
    SectionHeaderColorTools
  },
  setup() {
    return {
      tinycolor
    }
  },
  data() {
    return {
      selectedColor: '#409BCD',
      lightenColors: []
    }
  },
  watch: {
    selectedColor: function() {
      this.lightenColors = this.generateLightenColors(this.selectedColor);
    }
  },
  methods: {
    generateLightenColors(color) {
      let colors = [];
      for (let i = 0; i < 5; i++) {
        colors.push(tinycolor(color).lighten(i * 5).toHexString());
      }
      return colors;
    }
  }
}

</script>

<template>
  <div class="wrapper">
    <SectionHeaderColorTools />
    <section id="powerbar" class="flex flex-1 flex-col p-4 border-b bg-white w-full justify-between">
      <section id="title" class="flex flex-col justify-center">
        <h1 class="text-slate-900 font-semibold text-md">Convert Hex and Rgb Colors</h1>
        <p class="text-sm text-slate-900">Select your color and we will convert it to the format that you need</p>
      </section>
    </section>
    <section id="workspace">
      
      <!-- 2 column wrapper -->
      <div class="mx-auto w-full grow lg:flex">
        <!-- Left sidebar & main wrapper -->
        <div class="shrink-0 w-full lg:w-80 border-r">
          <h2 class="text-slate-900 p-4 font-semibold uppercase text-xs md:border-b hidden lg:block">
            <span class="text-green-400">○</span> Color Selector
          </h2>
          <section class="flex flex-row justify-center px-8 pt-8">
            <Vue3ColorPicker v-model="selectedColor" mode="solid" :showColorList="false" :showEyeDrop="false" type="RGBA"/>
          </section>
        </div>
        <div class="w-full">
          <h2 class="text-slate-900 p-4 font-semibold uppercase text-xs border-b">
            <span class="text-green-400">►</span> Output
          </h2>
          <section class="">
            <div class=" lg:h-[40rem] flex flex-col lg:flex-row flex-wrap justify-center">
              <div 
                v-for="color in lightenColors" 
                :key="color" 
                class="h-[6rem] lg:h-full lg:w-1/5 flex flex-row lg:flex-col gap-2 justify-center items-center" 
                :style="{backgroundColor: color}">
                <p class="text-xs p-2 rounded bg-black/20 text-white text-center p-2">{{ color }}</p>
                <p class="text-xs p-2 rounded bg-black/20 text-white text-center p-2">{{ tinycolor(color).toRgbString() }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>

.dash {
  width: 100%;
  height: 1px;
  background: #e2e8f0;
  display: block;
}

</style>