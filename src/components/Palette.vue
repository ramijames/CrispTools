<script>
import { ref, watch, computed } from "vue";
import Button from './shared/Button.vue';
import CrispInput from './shared/CrispInput.vue';
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
import tinycolor from "tinycolor2";
import ExampleContent from './colors/ExampleContent.vue';

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
      showHex: true,
    };
  },
  setup() {
    // Let's think about how we build palettes a little differently! 
    // If we want to build a pallete that is useful for building a 
    // functional UI, we need to think about the following:
    //
    // - The primary color
    // - The secondary color
    // - The accent color
    // - The background color
    // - The text color
    // - The border color
    // - The shadow color
    // - The link color
    // - The hover color
    // - The active color
    // - The focus color
    // - The disabled color
    // - The success color
    // - The warning color
    // - The error color
    // - The info color
    // - The neutral color
    //
    // Together, this doesn't just give us some random colors. It gives us a 
    // complete palette that we can use to build a UI.

    // So with that, we ned a user to input just one color, and then we can 
    // generate the rest of the palette based on that color.
    // We'll need these to set up the color picker
    const inputColor = ref("#008EFF");
    const colorPalette = ref([]);
    const selectedColor = ref("#008EFF");
    const spinDegree = ref(60);
    const numberOfColors = ref(12);
    const saturation = ref(100);
    const lightness = ref(50);

    // Convert hex to rgb using tinycolor
    const hexToRgb = (hex) => {
      const color = tinycolor(hex);
      return color.toRgbString();
    };

    // Convert rgb to hex using tinycolor
    const rgbToHex = (rgb) => {
      const color = tinycolor(rgb);
      return color.toHexString();
    };

    // Function to take the input color from the Vue3ColorPicker (selectedColor) and generate a palette that is based on 
    // movement in degrees around the color wheel with parameters that allow you to specify the number of colors and the degree of movement (spinDegree)
    const generatePalette = (color, numberOfColors, spinDegree) => {
      const colors = [];
      for (let i = 0; i < numberOfColors; i++) {
        const newColor = tinycolor(color).spin(spinDegree * i).toHexString();
        colors.push(newColor);
      }
      return colors;
    };

    const backgroundColor = computed(() => {
      if (tinycolor(selectedColor.value).isLight()) {
        return tinycolor(selectedColor.value).lighten(20).toHexString();
      } else {
        return tinycolor(selectedColor.value).lighten(47).toHexString();
      }
    });

    const textColor = computed(() => { return tinycolor(selectedColor.value).darken(44).toHexString(); });
    const borderColor = computed(() => { return tinycolor(backgroundColor.value).darken(10).toHexString(); });
    const shadowColor = computed(() => { return tinycolor(selectedColor.value).darken(20).desaturate(50).toHexString(); });
    const linkColor = computed(() => { return tinycolor(selectedColor.value).toHexString(); });
    const hoverColor = computed(() => { return tinycolor(selectedColor.value).darken(15).toHexString(); });
    const activeColor = computed(() => { return tinycolor(selectedColor.value).lighten(20).toHexString(); });
    const disabledColor = computed(() => { return tinycolor(selectedColor.value).lighten(35).desaturate(75).toHexString(); });
    const infoColor = computed(() => { return tinycolor(selectedColor.value).lighten(35).toHexString(); });

    const redColor = computed(() => {
      const selectedColorSaturation = tinycolor(selectedColor.value).toHsl().s;
      return tinycolor.fromRatio({
        h: 0, // hue for red
        s: selectedColorSaturation, // saturation from selectedColor
        l: 0.5 // middle lightness
      }).lighten(20).toHexString();
    });

    const greenColor = computed(() => {
      const selectedColorSaturation = tinycolor(selectedColor.value).toHsl().s;
      return tinycolor.fromRatio({
        h: 120, // hue for green
        s: selectedColorSaturation, // saturation from selectedColor
        l: 0.5 // middle lightness
      }).lighten(20).toHexString();
    });

    const yellowColor = computed(() => {
      const selectedColorSaturation = tinycolor(selectedColor.value).toHsl().s;
      return tinycolor.fromRatio({
        h: 60, // hue for yellow
        s: selectedColorSaturation, // saturation from selectedColor
        l: 0.5 // middle lightness
      }).lighten(20).toHexString();
    });

    // This needs to run when the component is mounted 
    colorPalette.value = generatePalette(selectedColor.value, numberOfColors.value, spinDegree.value);
    saturation.value = tinycolor(selectedColor.value).toHsl().s * 100;
    lightness.value = tinycolor(selectedColor.value).toHsl().l * 100;

    // Let's build an object with all of the colors we need
    // We'll use this to generate the palette
    const colorPaletteObject = computed(() => ({
      primary: colorPalette.value[0],
      secondary: colorPalette.value[4],
      accent: colorPalette.value[5],
      background: backgroundColor.value,
      text: textColor.value,
      border: borderColor.value,
      shadow: shadowColor.value,
      link: linkColor.value,
      hover: hoverColor.value,
      active: activeColor.value,
      disabled: disabledColor.value,
      success: greenColor.value,
      warning: yellowColor.value,
      error: redColor.value,
      info: infoColor.value,
    }));

    // Watch the selected color and generate a palette based on the input color
    watch(selectedColor, (newVal) => {
      colorPalette.value = generatePalette(newVal, numberOfColors.value, spinDegree.value);
      saturation.value = tinycolor(newVal).toHsl().s * 100;
      lightness.value = tinycolor(newVal).toHsl().l * 100;
    }); 

    return {
      inputColor,
      colorPalette,
      selectedColor,
      textColor,
      backgroundColor,
      borderColor,
      shadowColor,
      linkColor,
      hoverColor,
      activeColor,
      disabledColor,
      infoColor,
      rgbToHex,
      hexToRgb,
      tinycolor,
      spinDegree,
      generatePalette,
      redColor,
      greenColor,
      yellowColor,
      saturation,
      lightness,
      colorPaletteObject
    };

  },
  components: {
    Button,
    CrispInput,
    Vue3ColorPicker,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ExampleContent
  },
  methods: {
    toggleColorFormat() {
      this.showHex = !this.showHex;
    }
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
        <h4 class="text-md font-semibold text-black">User Interface Color Palette Generator</h4>
        <p class="text-xs text-slate-800">Easy to use palette generator for building coordinated colors for use in UIs</p>
      </section>
      <section id="toolbar" class="flex flex-auto flex-col md:flex-row gap-4 py-4 flex-start">
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
      </section>
    </section>
    <section id="workspace" class="flex lg:flex-row md:flex-col">
      <!-- 
        I now want to display these colors in a nicely formatted table
        with the color, the hex value, and the rgb value

            // - The primary color (selectedColor)
            // - The secondary color (random color from the palette)
            // - The accent color (random color from the palette)
            // - The background color (backgroundColor)
            // - The text color (textColor)
            // - The border color (selectedColor)
            // - The shadow color (selectedColor)
            // - The link color (same as accent color)
            // - The hover color (same as accent color)
            // - The active color (same as secondary color)
            // - The disabled color (neutralColor)
            // - The success color (mostGreen)
            // - The warning color (mostRed)
            // - The error color (mostYellow)
            // - The info color (mostBlue)
      -->
      <section class="w-full h-full">
        <ExampleContent :colors="colorPaletteObject" />
      </section>
      <section id="palette" class="p-6 border-l right-0 top-0 h-screen min-w-[24rem]">
        <div class="flex flex-row justify-between items-center">
          <h4 class="text-lg font-semibold text-black pb-4">UI Palette Colors</h4>
          <button @click="toggleColorFormat">{{ showHex ? 'Show RGB' : 'Show Hex' }}</button>
        </div>
        
        <div class="flex flex-col flex-wrap w-full gap-1">
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Primary Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: selectedColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ rgbToHex(selectedColor) }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(selectedColor) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Secondary Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: colorPalette[4] }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ colorPalette[4] }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(colorPalette[4])  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Accent Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: colorPalette[5] }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ colorPalette[8] }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(colorPalette[8])  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Background Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: backgroundColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ backgroundColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(backgroundColor)  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Text Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: textColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ textColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(textColor)  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Border Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: borderColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ borderColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(borderColor)  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Shadow Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: shadowColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ shadowColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(shadowColor)  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Link Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: linkColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ rgbToHex(linkColor) }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(linkColor) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Link Hover Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: hoverColor  }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ hoverColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ tinycolor(hoverColor).toRgbString()  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Link Active Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: activeColor  }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ activeColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ tinycolor(activeColor).toRgbString()  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Disabled Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: disabledColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ disabledColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(disabledColor) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Success Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: greenColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ greenColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(greenColor) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Error Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: redColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ redColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(redColor) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Warning Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: yellowColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ yellowColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ hexToRgb(yellowColor) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs w-32">Info Color</div>
            <div class="w-6 h-6 rounded" :style="{ backgroundColor: infoColor }"></div>
            <p class="text-xs text-center text-slate-700" v-if="showHex">{{ infoColor }}</p>
            <p class="text-xs text-center text-slate-700" v-else>{{ tinycolor(infoColor).toRgbString() }}</p>
          </div>
        </div>
      </section>    
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

.inner-border {
  border-color: rgba(0,0,0,.2);
}
</style>