<script>
import { ref, watch } from 'vue';
import tinycolor from 'tinycolor2';

import {
  HomeIcon,
  ListBulletIcon,
  UserIcon,
} from "@heroicons/vue/16/solid";

import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/vue/24/outline'

export default {
  name: "ExampleContent",
  setup(props) {

    const stats = [
      { id: 1, name: 'Total Subscribers', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
      { id: 2, name: 'Avg. Open Rate', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
      { id: 3, name: 'Avg. Click Rate', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
    ]

    // watch(() => props.colors, (newColors) => {
    //   console.log(newColors);
    // }, { immediate: true });

    return {
      colors: props.colors,
      tinycolor,
      props,
      stats
    };
  },
  computed: {
    tiltedStyle() {
      return {
        transform: 'perspective(2500px) rotateX(12deg) ',
        transition: 'transform 0.5s'
      };
    }
  },
  components: {
    HomeIcon,
    ListBulletIcon,
    UserIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    CursorArrowRaysIcon,
    EnvelopeOpenIcon,
    UsersIcon
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
  <div class="w-full">
    <section id="appchrome" class="overflow-hidden border-1 shadow shadow-xl shadow-md shadow-sm rounded-lg ring-1 ring-neutral-100 w-full" :style="{ shadowColor: colors.shadow }">
      <section id="chromebar" class="flex flex-row bg-white p-2 border-b">
        <section id="mockui" class="w-24 flex flex-row gap-2 items-center pl-2">
          <span class="close" :style="{ backgroundColor: colors.error }"></span>
          <span class="minimize" :style="{ backgroundColor: colors.warning }"></span>
          <span class="expand" :style="{ backgroundColor: colors.success }"></span>
        </section>
        <section id="chromebuttons" class="flex flex-row gap-2">
          <button :style="{ color: colors.text, shadowColor: colors.shadow  }" class="btn flex flex-row gap-1 p-2 text-xs text-grey-600 w-44 text-left rounded border border-neutral-200 bg-white shadow-sm ring-neutral-100" ><HomeIcon class="h-4 w-4" /> Crisp Example</button>
          <!-- <button :style="{ color: colors.link, shadowColor: colors.shadow, color: colors.text  }" class="btn flex flex-row gap-1 p-2 text-xs text-grey-600 w-44 text-left rounded border" ><HomeIcon class="h-4 w-4" /> Listing</button>
          <button :style="{ color: colors.link, shadowColor: colors.shadow, color: colors.text  }" class="btn flex flex-row gap-1 p-2 text-xs text-grey-600 w-44 text-left rounded border" ><HomeIcon class="h-4 w-4" /> Profile</button> -->
        </section>
      </section>
      <section id="display" class="flex flex-row" :style="{ backgroundColor: colors.background }">
        <section class="nav h-[32rem]">
          <nav class="flex flex-col gap-2 p-2 w-12 h-full" :style="{ backgroundColor: colors.primary }">
            <!-- brand image followed by a simple nav with icons -->
              <img src="/crisp-logo-symbol.svg" alt="brand logo" class="w-12 h-12 mb-2 rounded-full" />
              <button class="btn flex flex-row gap-1 p-2 text-xs text-white w-full text-left" ><HomeIcon class="h-6 w-6" /></button>
              <button class="btn flex flex-row gap-1 p-2 text-xs text-white w-full text-left" ><ListBulletIcon class="h-6 w-6" /></button>
              <button class="btn flex flex-row gap-1 p-2 text-xs text-white w-full text-left" ><UserIcon class="h-6 w-6" /></button>
          </nav>
        </section>
        <section id="displaycontent" class="p-8 w-full">
          <div>
            <h3 class="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
            <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="item in stats" :key="item.id" class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 border sm:px-6 sm:pt-6"  :style="{ borderColor: colors.border }" >
                <dt>
                  <div class="absolute rounded-md bg-indigo-500 p-3" :style="{ backgroundColor: colors.background }">
                    <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" :style="{ color: colors.accent }" />
                  </div>
                  <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ item.name }}</p>
                </dt>
                <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
                  <p :class="[item.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']">
                    <ArrowUpIcon v-if="item.changeType === 'increase'" class="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                    <ArrowDownIcon v-else class="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                    <span class="sr-only"> {{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by </span>
                    {{ item.change }}
                  </p>
                  <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6" :style="{ backgroundColor: colors.background }">
                    <div class="text-sm">
                      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500" :style="{ color: colors.primary }"
                        >View all<span class="sr-only"> {{ item.name }} stats</span></a
                      >
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>

          <!-- <section id="displayheader">
            <h1 :style="{ color: tinycolor(colors.primary).toHexString() }">Dashboard</h1>
            <p>Here is the dashboard content</p>
            <ul>
              <li v-for="(color, name) in colors" :key="name">
                <span :style="{ color: color }">{{ name }}: {{ color }}</span>
              </li>
            </ul>
          </section> -->
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