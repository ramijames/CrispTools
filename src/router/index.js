import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// Icon Tools
import IconGenView from "../views/IconTools/IconGenView.vue";

// Color Tools
import ColorToolsView from "../views/ColorTools/ColorToolsView.vue";
import LightenColorView from "../views/ColorTools/LightenColorView.vue";
import DarkenColorView from "../views/ColorTools/DarkenColorView.vue";
import PaletteGeneratorView from "../views/ColorTools/PaletteGeneratorView.vue";
import HexToRgbConverterView from "../views/ColorTools/HexToRgbConverterView.vue";

// Typography Tools
import TextToolsView from "../views/TextTools/TextToolsView.vue";
import LipsumView from "../views/TextTools/LipsumView.vue";
import WordCounterView from "../views/TextTools/WordCounterView.vue";

// CSS Tools
import CssToolsView from "../views/CssTools/CssToolsView.vue";
import StaticTypeView from "../views/CssTools/StaticTypeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/text-tools",
      name: "text-tools",
      component: TextToolsView,
    },
        {
          path: "/text-tools/lipsum",
          name: "lipsum",
          component: LipsumView,
        },
        {
          path: "/text-tools/word-counter",
          name: "word-counter",
          component: WordCounterView,
        },
    {
      path: "/css-tools",
      name: "css-tools",
      component: CssToolsView,
    },
        {
          path: "/css-tools/static-type-scale",
          name: "static-type-scale",
          component: StaticTypeView,
        },
    {
      path: "/icon-gen",
      name: "icon-gen",
      component: IconGenView,
    },
    {
      path: "/color-tools/",
      name: "color-tools",
      component: ColorToolsView,
    },
        {
          path: "/color-tools/palette-generator",
          name: "palette-generator",
          component: PaletteGeneratorView,
        },
        {
          path: "/color-tools/lighten-color",
          name: "lighten-color",
          component: LightenColorView,
        },
        {
          path: "/color-tools/darken-color",
          name: "darken-color",
          component: DarkenColorView,
        },
        {
          path: "/color-tools/hex-to-rgb-converter",
          name: "hex-to-rgb-converter",
          component: HexToRgbConverterView,
        },
  ],
});

export default router;
