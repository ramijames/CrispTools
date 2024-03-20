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
    const spinDegree = ref(30);
    const numberOfColors = ref(12);

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

    // Function to detect most red color in the colors array
    const mostRed = (colors) => {
      let red = 0;
      let redColor = "";
      for (let i = 0; i < colors.length; i++) {
        const color = tinycolor(colors[i]);
        if (color._r > red) {
          red = color._r;
          redColor = color.toHexString();
        }
      }
      return redColor;
    };

    // Function to detect most green color in the colors array
    const mostGreen = (colors) => {
      let green = 0;
      let greenColor = "";
      for (let i = 0; i < colors.length; i++) {
        const color = tinycolor(colors[i]);
        if (color._g > green) {
          green = color._g;
          greenColor = color.toHexString();
        }
      }
      return greenColor;
    };

    // Function to detect most blue color in the colors array
    const mostBlue = (colors) => {
      let blue = 0;
      let blueColor = "";
      for (let i = 0; i < colors.length; i++) {
        const color = tinycolor(colors[i]);
        if (color._b > blue) {
          blue = color._b;
          blueColor = color.toHexString();
        }
      }
      return blueColor;
    };

    // Function to return the most yellow color in the colors array
    const mostYellow = (colors) => {
      let yellow = 0;
      let yellowColor = "";
      for (let i = 0; i < colors.length; i++) {
        const color = tinycolor(colors[i]);
        if (color._r > 200 && color._g > 200) {
          yellow = color._r + color._g;
          yellowColor = color.toHexString();
        }
      }
      return yellowColor;
    };

    // Function to take the most blue color and make it lighter and grayer and return it as the "neutral color"
    const neutralColor = (color) => {
      return tinycolor(color).lighten(50).desaturate(50).toHexString();
    };

    // For the background color, we want to take the primary color and make it very, very light
    // So we need a function that will take the selectedColor and make it very light
    const backgroundColor = (color) => {
      return tinycolor(color).lighten(50).toHexString();
    };
    

    // Watch the selected color and generate a palette based on the input color
    watch(selectedColor, (newVal) => {
      colorPalette.value = generatePalette(newVal, numberOfColors.value, spinDegree.value);
    });

    // This needs to run when the component is mounted 
    colorPalette.value = generatePalette(selectedColor.value, numberOfColors.value, spinDegree.value);

    // For text we will want to take the most blue color and make it darker
    // So we need a function that will take the most blue color and make it darker
    const textColor = (color) => {
      return tinycolor(color).darken(70).toHexString();
    };

    return {
      inputColor,
      colorPalette,
      selectedColor,
      mostBlue,
      mostGreen,
      mostRed,
      mostYellow,
      neutralColor,
      textColor,
      backgroundColor,
      rgbToHex,
      hexToRgb
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
        <CrispInput v-model="spinDegree" type="number" label="Spin degree" placeholder="30" class="w-20" />
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
            // - The focus color (same as secondary color)
            // - The disabled color (neutralColor)
            // - The success color (mostGreen)
            // - The warning color (mostRed)
            // - The error color (mostYellow)
            // - The info color (mostBlue)
            // - The neutral color (neutralColor)
      -->
      <section id="palette" class="p-24">
        <h4 class="text-md font-semibold text-black">Palette</h4>
        <div class="flex flex-row flex-wrap gap-4 w-full">
          <div v-for="(color, index) in colorPalette" :key="index" class="flex flex-col w-20 gap-2">
            <div class="w-20 h-12" :style="{ backgroundColor: color }"></div>
            <p class="text-xs text-center text-slate-700">{{ color }}</p>
          </div>
        </div>
        <!-- <table>
          <thead>
            <tr>
              <th class="text-xs text-slate-400">Color name</th>
              <th class="text-xs text-slate-400">Hex code</th>
              <th class="text-xs text-slate-400">Show the color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-xs text-slate-700">Primary color</td>
              <td class="text-xs text-slate-700">{{ rgbToHex(selectedColor) }}</td>
              <td class="text-xs text-slate-700">
                <div class="w-4 h-4" :style="{ backgroundColor: selectedColor }"></div>
              </td>
            </tr>
            <tr>
              <td class="text-xs text-slate-700">Secondary color</td>
              <td class="text-xs text-slate-700">{{ colorPalette[1] }}</td>
              <td class="text-xs text-slate-700">
                <div class="w-4 h-4" :style="{ backgroundColor: colorPalette[1] }"></div>
              </td>
            </tr>
            <tr>
              <td class="text-xs text-slate-700">Accent color</td>
              <td class="text-xs text-slate-700">{{ colorPalette[2] }}</td>
              <td class="text-xs text-slate-700">
                <div class="w-4 h-4" :style="{ backgroundColor: colorPalette[2] }"></div>
              </td>
            </tr>
            <tr>
              <td class="text-xs text-slate-700">Background color</td>
              <td class="text-xs text-slate-700">{{ backgroundColor(selectedColor) }}</td>
              <td class="text-xs text-slate-700">
                <div class="w-4 h-4" :style="{ backgroundColor: backgroundColor(selectedColor) }"></div>
              </td>
            </tr>
            <tr>
              <td class="text-xs text-slate-700">Text color</td>
              <td class="text-xs text-slate-700">{{ textColor(mostBlue(colorPalette)) }}</td>
              <td class="text-xs text-slate-700">
                <div class="w-4 h-4" :style="{ backgroundColor: textColor(mostBlue(colorPalette)) }"></div>
              </td>
            </tr>
          </tbody>
        </table> -->
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