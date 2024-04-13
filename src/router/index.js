import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// Icon Tools
import IconGenView from "../views/IconTools/IconGenView.vue";

// Color Tools
import ColorToolsView from "../views/ColorTools/ColorToolsView.vue";
import LightenColorView from "../views/ColorTools/LightenColorView.vue";
import PaletteGeneratorView from "../views/ColorTools/PaletteGeneratorView.vue";

// Typography Tools
import TypographyToolsView from "../views/TypographyTools/TypographyToolsView.vue";
import LipsumView from "../views/TypographyTools/LipsumView.vue";
import StaticTypeView from "../views/TypographyTools/StaticTypeView.vue";
import WordCounterView from "../views/TypographyTools/WordCounterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/typography-tools",
      name: "typography-tools",
      component: TypographyToolsView,
    },
    {
      path: "/lipsum",
      name: "lipsum",
      component: LipsumView,
    },
    {
      path: "/static-type-scale",
      name: "static-type-scale",
      component: StaticTypeView,
    },
    {
      path: "/icon-gen",
      name: "icon-gen",
      component: IconGenView,
    },
    {
      path: "/word-counter",
      name: "word-counter",
      component: WordCounterView,
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
  ],
});

export default router;
