<script>

import tinycolor from "tinycolor2";
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
import CrispInput from '@/components/shared/CrispInput.vue';
import SectionHeader from '@/components/layout/SectionHeader.vue';
import PowerBar from '@/components/layout/PowerBar.vue';

export default {
  name: 'LightenColorView',
  components: {
    Vue3ColorPicker,
    CrispInput,
    SectionHeader,
    PowerBar
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
  <div class="max-w-">
    <SectionHeader :title="'Color Tools'" :icon="'/icon-color-tools.svg'" :routePath="'/color-tools'" />
    <PowerBar :title="'Lighten Colors'" :description="'Select your color and we will output a set of lighter values'" />
    
    <section id="workspace" class="px-4 bg-white mb-8 rounded-xl shadow-xl">
      <!-- 2 column wrapper -->
      <div class="mx-auto w-full grow lg:flex">
        <!-- Left sidebar & main wrapper -->
        <div class="py-4 pr-4 shrink-0 w-full lg:w-min">
          <!-- <h2 class="text-slate-900 p-4 font-semibold uppercase text-xs md:border-b hidden lg:block">
            <span class="text-green-400">○</span> Color Selector
          </h2> -->
          <Vue3ColorPicker v-model="selectedColor" mode="solid" :showColorList="false" :showEyeDrop="false" type="RGBA"/>
        </div>
        <div class="w-full">
          <!-- <h2 class="text-slate-900 p-4 font-semibold uppercase text-xs border-b">
            <span class="text-green-400">►</span> Output
          </h2> -->
            <div class="my-4 overflow-hidden rounded-md lg:h-[20rem] flex flex-col lg:flex-row flex-wrap justify-center">
              <div 
                v-for="color in lightenColors" 
                :key="color" 
                class="h-[6rem] lg:h-full lg:w-1/5 flex flex-row lg:flex-col gap-2 justify-center items-center" 
                :style="{backgroundColor: color}">
                <p class="text-xs p-2 rounded bg-black/20 text-white text-center p-2">{{ color }}</p>
                <p class="text-xs p-2 rounded bg-black/20 text-white text-center p-2">{{ tinycolor(color).toRgbString() }}</p>
              </div>
            </div>
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