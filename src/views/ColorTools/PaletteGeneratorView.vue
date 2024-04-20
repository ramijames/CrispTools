<script>

import { ref, watch, computed } from "vue";
import Button from '@/components/shared/Button.vue';
import CrispInput from '@/components/shared/CrispInput.vue';
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
import tinycolor from "tinycolor2";
import ExampleContent from '@/components/colors/ExampleContent.vue';
import ColorInput from 'vue-color-input';
import PowerBar from '@/components/layout/PowerBar.vue';
import SectionHeader from "@/components/layout/SectionHeader.vue";

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
    const inputColor = ref("#1E83D3");
    const colorPalette = ref([]);
    const selectedColor = ref("#1E83D3");
    const spinDegree = ref(60);
    const numberOfColors = ref(12);
    const saturation = ref(100);
    const lightness = ref(50);

    // Utilities that wrap the tinycolor library
    const hexToRgb = (hex) => {
      const color = tinycolor(hex);
      return color.toRgbString();
    };
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
      const selectedColorHue = tinycolor(selectedColor.value).toHsl().s;
      const selectedColorSaturation = tinycolor(selectedColor.value).toHsl().s;
      return tinycolor.fromRatio({
        h: selectedColorHue, // hue from selectedColor
        s: 0.4, // saturation from selectedColor
        l: 0.98 // middle lightness
      }).toHexString();
    });

    // const backgroundColor = computed(() => { return tinycolor(selectedColor.value).lighten(48).desaturate(90).toHexString(); });
    const textColor = computed(() => { return tinycolor(selectedColor.value).darken(44).toHexString(); });
    const borderColor = computed(() => { return tinycolor(backgroundColor.value).darken(10).toHexString(); });
    const shadowColor = computed(() => { return tinycolor(selectedColor.value).darken(20).toHexString(); });
    const linkColor = computed(() => { return tinycolor(selectedColor.value).toHexString(); });
    const hoverColor = computed(() => { return tinycolor(selectedColor.value).lighten(5).toHexString(); });
    const activeColor = computed(() => { return tinycolor(selectedColor.value).darken(5).toHexString(); });
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
        l: 0.42 // middle lightness
      }).toHexString();
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
      console.log(selectedColor);
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
    ColorInput,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ExampleContent,
    Vue3ColorPicker,
    PowerBar,
    SectionHeader
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
  <div id="palette">
    <div class="wrapper px-4 lg:px-8">
      <SectionHeader :title="'Color Tools'" :routePath="'/color-tools'" :routes="'/color-tools'" />
      <PowerBar :title="'User Interface Color Palette Generator'" :description="'Easy to use palette generator for building coordinated colors for use in UIs'" />
      
      <section id="workspace" class="px-4 bg-white mb-8 rounded-xl shadow-xl">
        
        <!-- 3 column wrapper -->
        <div class="w-full max-w-screen-2xl mx-auto grow lg:flex">
          <!-- Left sidebar & main wrapper -->
          <div class="shrink-0 w-70 border-r">
            <div class="py-4 xl:flex-1 pr-4">
              <Vue3ColorPicker v-model="selectedColor" mode="solid" :showColorList="false" :showEyeDrop="false" type="RGBA"/>
              <!-- 1. Preview your palette -->
              <section id="intro" class="flex flex-col gap-4 items-center w-full">
                <!-- <color-input v-model="selectedColor" position="right bottom" disable-alpha /> -->
                
              </section>
            </div>
          </div>

          <div class="flex w-full flex-col">
            <div class="py-4 pl-4">
              <!-- <ExampleContent :colors="colorPaletteObject" /> -->
              <section id="colorpreview" class="w-full">
                  <div class="flex flex-col">
                    <div class="flex flex-row">
                      <div class="w-full py-8 rounded-tl-lg flex flex-col justify-between" :style="{ backgroundColor: selectedColor }">
                        <p class="text-xs text-center text-white/60">Primary</p>
                        <p class="text-xs text-center text-white/60">{{ rgbToHex(selectedColor) }}</p>
                      </div>
                      <div class="w-full py-8 rounded-tr-lg flex flex-col justify-between" :style="{ backgroundColor: colorPalette[2] }">
                        <p class="text-xs text-center text-white/60">Secondary</p>
                        <p class="text-xs text-center text-white/60">{{ rgbToHex(colorPalette[2]) }}</p>
                      </div>
                    </div>
                    <div class="w-full p-1 px-4 rounded-b-lg flex flex-row justify-between" :style="{ backgroundColor: colorPalette[5] }">
                      <p class="text-xs text-center text-white/60">Accent</p>
                      <p class="text-xs text-center text-white/60">{{ rgbToHex(colorPalette[5]) }}</p>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2 py-2" id="palette">
                    <div class="flex flex-row w-full">
                      <div class="w-full flex flex-col gap-1">
                        <!-- <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: selectedColor }"></div>
                            <div class="text-xs">Primary</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ rgbToHex(selectedColor) }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(selectedColor) }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: colorPalette[4] }"></div>
                            <div class="text-xs">Secondary</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ colorPalette[4] }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(colorPalette[4])  }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: colorPalette[11] }"></div>
                            <div class="text-xs">Accent</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ colorPalette[11] }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(colorPalette[11])  }}</p>
                        </div> -->
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: backgroundColor }"></div>
                            <div class="text-xs text-slate-500">Background</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ backgroundColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(backgroundColor)  }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: textColor }"></div>
                            <div class="text-xs text-slate-500">Text</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ textColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(textColor)  }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: borderColor }"></div>
                            <div class="text-xs text-slate-500">Border</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ borderColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(borderColor)  }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: shadowColor }"></div>
                            <div class="text-xs text-slate-500">Shadow</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ shadowColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(shadowColor)  }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: linkColor }"></div>
                            <div class="text-xs text-slate-500">Link</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ rgbToHex(linkColor) }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(linkColor) }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: hoverColor  }"></div>
                            <div class="text-xs text-slate-500">Link Hover</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ hoverColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ tinycolor(hoverColor).toRgbString()  }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: activeColor  }"></div>
                            <div class="text-xs text-slate-500">Link Active</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ activeColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ tinycolor(activeColor).toRgbString()  }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: disabledColor }"></div>
                            <div class="text-xs text-slate-500">Disabled</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ disabledColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(disabledColor) }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: greenColor }"></div>
                            <div class="text-xs text-slate-500">Success</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ greenColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(greenColor) }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: redColor }"></div>
                            <div class="text-xs text-slate-500">Error</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ redColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(redColor) }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: yellowColor }"></div>
                            <div class="text-xs text-slate-500">Warning</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ yellowColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ hexToRgb(yellowColor) }}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center justify-between">
                          <div class="flex flex-row gap-2 items-center">
                            <div class="w-12 h-2 rounded" :style="{ backgroundColor: infoColor }"></div>
                            <div class="text-xs text-slate-500">Info</div>
                          </div>
                          <p class="text-xs text-right text-slate-500" v-if="showHex">{{ infoColor }}</p>
                          <p class="text-xs text-right text-slate-500" v-else>{{ tinycolor(infoColor).toRgbString() }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section id="explainer" class="w-full flex flex-row justify-end">
                  <Button
                    btnType="small"
                    btnText="Show RGB Values"
                    :onClick="toggleColorFormat"
                    v-if="showHex === true" 
                    class="w-full"
                  />
                  <Button
                    btnType="small"
                    btnText="Show HEX Values"
                    :onClick="toggleColorFormat"
                    v-if="showHex === false" 
                    class="w-full"
                  />
                </section>
            </div>
          </div>
        </div>
        
        <!-- 3. Output your palette -->

      </section>
    </div>
  </div>
</template>

<style>
#palette {
  height: 100%;
}

.ck-cp-container {
  width:320px;
  box-shadow: none !important;
  padding: 0 !important;
}

.ck-cp-menu {
  display:none !important;
}

.opacity-bar {
  display: none !important;
}

.ck-cp-input-container input[type="text"] {
  font-size:11px !important;
}

.ck-cp-input-container input[type="number"] {
  font-size:11px !important;
}

.color-input .box {
  width:208px;
  border-radius: 8px;
}

#currentColor {
  width: 72px;
  height: 32px;
}

.colour-area-mask,
.colour-area {
  border-radius: 8px !important;
  overflow: hidden !important;
}

.inner-border {
  border-color: rgba(0,0,0,.2);
}
</style>
