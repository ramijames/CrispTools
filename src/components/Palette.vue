<script>
import { ref, watch } from "vue";
import Button from './shared/Button.vue';
import CrispInput from './shared/CrispInput.vue';
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
import tinycolor from "tinycolor2";

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";

export default {
  data() {
    return {
      selectedColorPaletteSize: 'Complementary',
    };
  },
  setup() {
    const selectedColor = ref("#000000");
    const colorPalette = ref([]);

    const selectedColorPaletteType = ref("Complementary");
    const colorPaletteTypes = {
      Complementary: { label: "Complementary", selected: true },
      Analogous: { label: "Analogous", selected: false },
      Triadic: { label: "Triadic", selected: false },
      SplitComplementary: { label: "Split Complementary", selected: false },
      Tetradic: { label: "Tetradic", selected: false },
      Monochromatic: { label: "Monochromatic", selected: false },
    };

    // Size of the color palette
    const selectedColorPaletteSize = ref(5);
    const colorPaletteSizes = {
      3: { label: "3", selected: false },
      4: { label: "4", selected: false },
      5: { label: "5", selected: true },
      6: { label: "6", selected: false },
    };

    watch([selectedColor, selectedColorPaletteType], ([newColor, newType]) => {
      const color = tinycolor(newColor);
      let colors;
      switch (newType) {
        case 'Complementary':
          colors = [color, color.complement()];
          break;
        case 'Analogous':
          colors = color.analogous(selectedColorPaletteSize.value, selectedColorPaletteSize.value);
          break;
        case 'Triadic':
          colors = color.triad();
          break;
        case 'SplitComplementary':
          colors = color.splitcomplement();
          break;
        case 'Tetradic':
          colors = color.tetrad();
          break;
        case 'Monochromatic':
          colors = color.monochromatic(selectedColorPaletteSize.value);
          break;
        default:
          colors = [color];
      }
      colorPalette.value = colors.map(c => c.toHexString());
      console.log(colorPalette.value);
    });

    return {
      colorPalette,
      selectedColor,
      selectedColorPaletteType,
      colorPaletteTypes,
      selectedColorPaletteSize,
      colorPaletteSizes,
    };

  },
  components: {
    Button,
    CrispInput,
    Vue3ColorPicker,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel
  },
  methods: {

  },
  watch: {

  },
  computed: {
    computedColorPalette() {
      // Generate the colorPalette based on the selectedColorPaletteSize
      // This is just a placeholder. Replace it with your actual logic.
      return Array.from({length: this.selectedColorPaletteSize}, (_, i) => ({id: i}));
    }
  }
};
</script>

<template>
  <div class="wrapper">
    <section id="powerbar" class="flex flex-1 flex-col p-4 lg:px-6 border-b w-full justify-between">
      <section id="title" class="flex flex-col justify-center">
        <h4 class="text-md font-semibold text-black">Palette Generator</h4>
        <p class="text-xs text-slate-800">Easy to use palette generator</p>
      </section>
      <section id="toolbar" class="flex flex-auto flex-col md:flex-row gap-4 py-4">
        <!-- 
          - Number of colors
          - Generator method as a select dropdown
          - Primary color select
          - Random palette button
         -->
        <div class="flex flex-row md:flex-col">
          <label class="block mb-1 text-xs text-slate-400" for="input1">Primary color</label>
          <PopoverGroup class="hidden lg:flex lg:gap-x-12">
            <Popover class="relative">
              <PopoverButton class="block appearance-none w-full bg-white border hover:border-blue-500 rounded focus:outline-none focus:shadow-outline shadow text-slate-700 shadow-md shadow-black/5 ring-1 ring-slate-700/10" >
                <div id="currentColor" :style="{ backgroundColor: selectedColor }"></div>
                <!-- <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true"/> -->
              </PopoverButton>

              <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                <PopoverPanel class="absolute top-full z-10 mt-2 overflow-hidden block appearance-none bg-white border rounded shadow text-slate-700 shadow-md shadow-black/5 ring-1 ring-slate-700/10">
                  <Vue3ColorPicker v-model="selectedColor" mode="solid" :alpha="false" :showColorList="false" :showEyeDrop="false" type="RGBA"/>
                </PopoverPanel>
              </transition>
            </Popover>
          </PopoverGroup>
        </div>
        <div class="flex flex-row md:flex-col">
          <label class="block mb-1 text-xs text-slate-400" for="input1">Palette type</label>
          <select v-model="selectedColorPaletteType" class="block appearance-none w-full bg-white border hover:border-blue-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline shadow text-slate-700 shadow-md shadow-black/5 ring-1 ring-slate-700/10">
            <option disabled value="Select a palette type">Select a palette type</option>
            <option v-for="(type, key) in colorPaletteTypes" :key="key" :value="key" :selected="type.selected" >
              {{ type.label }}
            </option>
          </select>
        </div>
        <div class="flex flex-row md:flex-col">
          <label class="block mb-1 text-xs text-slate-400" for="input1">Number of colors</label>
          <select v-model="selectedColorPaletteSize" class="block appearance-none w-full bg-white border hover:border-blue-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline shadow text-slate-700 shadow-md shadow-black/5 ring-1 ring-slate-700/10">
            <option disabled value="Number of colors">Number of colors</option>
            <option v-for="(color, key) in colorPaletteSizes" :key="key" :value="key" :selected="color.selected" >
              {{ color.label }}
            </option>
          </select>
        </div>
      </section>
    </section>
    <section id="workspace" class="flex lg:flex-row md:flex-col">
      <div class="w-full bg-white flex flex-col items-center">
        <div class="p-12">
          <div class="flex flex-wrap justify-center gap-4">
            <div v-for="index in parseInt(selectedColorPaletteSize)" :key="index" class="w-60 h-60 rounded-full border" :style="{ backgroundColor: colorPalette[index-1] }">
              <p class="text-xs text-center">{{ colorPalette[index-1] }}#hex</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

.ck-cp-container {
  width:320px;
  box-shadow: none;
}

#currentColor {
  width: 84px;
  height: 40px;
  box-shadow: inset white 0px 0px 0px 2px; 
}

.colour-area-mask,
.colour-area {
  border-radius: 0.1rem !important;
}
</style>