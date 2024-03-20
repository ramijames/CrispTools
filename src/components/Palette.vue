<script>
import { ref, watch, computed } from "vue";
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

    // Function to take the input color and generate a yellow color


    // Function to take the input color and generate a blue color


    // Function to take the input color and generate a red color
    const generateRed = computed(() => {
      const selectedColorSaturation = tinycolor(selectedColor.value).toHsl().s;
      return tinycolor.fromRatio({
        h: 0, // hue for red
        s: selectedColorSaturation, // saturation from selectedColor
        l: 0.5 // middle lightness
      }).lighten(20).toHexString();
    });

    // Function to take the input color and generate a green color
    const generateGreen = computed(() => {
      const selectedColorSaturation = tinycolor(selectedColor.value).toHsl().s;
      return tinycolor.fromRatio({
        h: 120, // hue for green
        s: selectedColorSaturation, // saturation from selectedColor
        l: 0.5 // middle lightness
      }).lighten(20).toHexString();
    });

    // Function to take the input color and generate a yellow color
    const generateYellow = computed(() => {
      const selectedColorSaturation = tinycolor(selectedColor.value).toHsl().s;
      return tinycolor.fromRatio({
        h: 60, // hue for yellow
        s: selectedColorSaturation, // saturation from selectedColor
        l: 0.5 // middle lightness
      }).lighten(20).toHexString();
    });

    // Function to take the most blue color and make it lighter and grayer and return it as the "neutral color"
    const neutralColor = (color) => {
      return tinycolor(color).lighten(50).desaturate(50).toHexString();
    };

    // For the background color, we want to take the primary color and make it very, very light
    // So we need a function that will take the selectedColor and make it very light
    const backgroundColor = (color) => {
      // This should detect how light the color is and then decide how much to lighten it. 
      // For colors that are already light, it should lighten it less
      if (tinycolor(color).isLight()) {
        return tinycolor(color).lighten(20).toHexString();
      } else {
        return tinycolor(color).lighten(47).toHexString();
      }
    };

    // For the border color, we want a slightly darker version of the background color
    const borderColor = (color) => {
      return tinycolor(color).darken(10).toHexString();
    };

    // For the shadow color, we want a dark, desaturated version of the selected color
    const shadowColor = (color) => {
      return tinycolor(color).darken(20).desaturate(50).toHexString();
    };
    

    // Watch the selected color and generate a palette based on the input color
    watch(selectedColor, (newVal) => {
      colorPalette.value = generatePalette(newVal, numberOfColors.value, spinDegree.value);
      saturation.value = tinycolor(newVal).toHsl().s * 100;
      lightness.value = tinycolor(newVal).toHsl().l * 100;
    });

    // This needs to run when the component is mounted 
    colorPalette.value = generatePalette(selectedColor.value, numberOfColors.value, spinDegree.value);
    saturation.value = tinycolor(selectedColor.value).toHsl().s * 100;
    lightness.value = tinycolor(selectedColor.value).toHsl().l * 100;

    // For text we will want to take the most blue color and make it darker
    // So we need a function that will take the most blue color and make it darker
    const textColor = (color) => {
      return tinycolor(color).darken(44).toHexString();
    };

    return {
      inputColor,
      colorPalette,
      selectedColor,
      neutralColor,
      textColor,
      backgroundColor,
      borderColor,
      shadowColor,
      rgbToHex,
      hexToRgb,
      tinycolor,
      spinDegree,
      generatePalette,
      generateRed,
      generateGreen,
      generateYellow,
      saturation,
      lightness
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
      <section id="palette" class="p-6 border-r">
        <h4 class="text-lg font-semibold text-black pb-4">UI Palette Colors</h4>
        <div class="flex flex-col flex-wrap gap-4 w-full">
          <!-- <div v-for="(color, index) in colorPalette" :key="index" class="flex flex-col w-20 gap-2">
            <div class="w-20 h-12" :style="{ backgroundColor: color }"></div>
            <p class="text-xs text-center text-slate-700">{{ color }}</p>
          </div> -->
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Primary Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: selectedColor }"></div>
            <p class="text-xs text-center text-slate-700">{{ rgbToHex(selectedColor) }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(selectedColor) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Secondary Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: colorPalette[4] }"></div>
            <p class="text-xs text-center text-slate-700">{{ colorPalette[4] }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(colorPalette[4])  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Accent Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: colorPalette[8] }"></div>
            <p class="text-xs text-center text-slate-700">{{ colorPalette[8] }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(colorPalette[8])  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Background Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: backgroundColor(selectedColor) }"></div>
            <p class="text-xs text-center text-slate-700">{{ backgroundColor(selectedColor) }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(backgroundColor(selectedColor))  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Text Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: textColor(selectedColor) }"></div>
            <p class="text-xs text-center text-slate-700">{{ textColor(selectedColor) }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(textColor(selectedColor))  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Border Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: borderColor(backgroundColor(selectedColor)) }"></div>
            <p class="text-xs text-center text-slate-700">{{ borderColor(backgroundColor(selectedColor)) }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(borderColor(backgroundColor(selectedColor)))  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Shadow Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: shadowColor(selectedColor) }"></div>
            <p class="text-xs text-center text-slate-700">{{ shadowColor(selectedColor) }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(shadowColor(selectedColor))  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Link Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: selectedColor }"></div>
            <p class="text-xs text-center text-slate-700">{{ selectedColor }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(selectedColor) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Link Hover Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: tinycolor(selectedColor).darken(15).toHexString()  }"></div>
            <p class="text-xs text-center text-slate-700">{{ tinycolor(selectedColor).darken(15).toHexString() }}</p>
            <p class="text-xs text-center text-slate-700">{{ tinycolor(selectedColor).darken(15).toRgbString()  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Link Active Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: tinycolor(selectedColor).lighten(15).toHexString()  }"></div>
            <p class="text-xs text-center text-slate-700">{{ tinycolor(selectedColor).lighten(15).toHexString() }}</p>
            <p class="text-xs text-center text-slate-700">{{ tinycolor(selectedColor).lighten(15).toRgbString()  }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Disabled Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: neutralColor(selectedColor) }"></div>
            <p class="text-xs text-center text-slate-700">{{ neutralColor(selectedColor) }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(neutralColor(selectedColor)) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Success Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: generateGreen }"></div>
            <p class="text-xs text-center text-slate-700">{{ generateGreen }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(generateGreen) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Error Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: generateRed }"></div>
            <p class="text-xs text-center text-slate-700">{{ generateRed }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(generateRed) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Warning Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: generateYellow }"></div>
            <p class="text-xs text-center text-slate-700">{{ generateYellow }}</p>
            <p class="text-xs text-center text-slate-700">{{ hexToRgb(generateYellow) }}</p>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <div class="text-xs font-bold w-40">Info Color</div>
            <div class="w-20 h-6" :style="{ backgroundColor: tinycolor(selectedColor).lighten(30).toHexString() }"></div>
            <p class="text-xs text-center text-slate-700">{{ tinycolor(selectedColor).lighten(30).toHexString() }}</p>
            <p class="text-xs text-center text-slate-700">{{ tinycolor(selectedColor).lighten(30).toRgbString() }}</p>
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
</style>