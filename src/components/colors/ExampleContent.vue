<script>
import { ref, watch } from 'vue';
import tinycolor from 'tinycolor2';

import {
  HomeIcon,
  ListBulletIcon,
  UserIcon,
} from "@heroicons/vue/16/solid";

export default {
  name: "ExampleContent",
  setup(props) {

    watch(() => props.colors, (newColors) => {
      console.log(newColors);
    }, { immediate: true });

    return {
      colors: props.colors,
      tinycolor,
      props
    };
  },
  components: {
    HomeIcon,
    ListBulletIcon,
    UserIcon,
  },
  props: {
    colors: {
      type: Object,
      default: () => ({
        primary: "",
        secondary: "",
        accent: "",
        background: "",
        text: "",
        border: "",
        link: "",
        hover: "",
        active: "",
        disabled: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      }),
    },
  },
};

</script>

<template>
  <div class="m-6">
    <section id="appchrome" class="h-full border-1 shadow shadow-xl shadow-md shadow-sm rounded-lg ring-1 ring-neutral-100">
      <section id="chromebar" class="flex flex-row bg-neutral-50 p-2">
        <section id="mockui" class="w-24 flex flex-row gap-2 items-center pl-2">
          <span class="close bg-neutral-200"></span>
          <span class="minimize bg-neutral-200"></span>
          <span class="expand bg-neutral-200"></span>
        </section>
        <section id="chromebuttons" class="flex flex-row gap-2">
          <button :style="{ color: colors.text }" class="btn flex flex-row gap-1 p-2 text-xs text-grey-600 w-44 text-left rounded border border-neutral-200 bg-white shadow-sm ring-neutral-100"><HomeIcon class="h-4 w-4" /> Dashboard</button>
          <button :style="{ color: colors.text }" class="btn flex flex-row gap-1 p-2 text-xs text-grey-600 w-44 text-left rounded border border-neutral-200 hover:bg-neutral-200"><HomeIcon class="h-4 w-4 text-blue-400" /> Listing</button>
          <button :style="{ color: colors.text }" class="btn flex flex-row gap-1 p-2 text-xs text-grey-600 w-44 text-left rounded border border-neutral-200 hover:bg-neutral-200"><HomeIcon class="h-4 w-4 text-blue-400" /> Profile</button>
        </section>
      </section>
      <section id="display">
        <section id="displaycontent">
          <section id="displayheader">
            <h1 :style="{ color: tinycolor(colors.primary).toHexString() }">Dashboard</h1>
            <p>Here is the dashboard content</p>
            <!-- Render all colors -->
            <ul>
              <li v-for="(color, name) in colors" :key="name">
                <span :style="{ color: color }">{{ name }}: {{ color }}</span>
              </li>
            </ul>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>

<style scoped>
.close,
.minimize,
.expand {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  border-radius:10px;
}

</style>