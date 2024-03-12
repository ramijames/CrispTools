<script>
import { ref, computed, watch } from "vue";

export default {
  data() {
    return {
      typescales: {
        MinorSecond: { value: 1.067, label: "Minor Second", selected: false },
        MajorSecond: { value: 1.125, label: "Major Second", selected: false },
        MinorThird: { value: 1.2, label: "Minor Third", selected: true },
        MajorThird: { value: 1.25, label: "Major Third", selected: false },
        PerfectFourth: {
          value: 1.333,
          label: "Perfect Fourth",
          selected: false,
        },
        AugmentedFourth: {
          value: 1.414,
          label: "Augmented Fourth",
          selected: false,
        },
        PerfectFifth: { value: 1.5, label: "Perfect Fifth", selected: false },
        GoldenRatio: { value: 1.618, label: "Golden Ratio", selected: false },
      },
      units: {
        px: { label: "px", selected: true },
        rem: { label: "rem", selected: false },
      },
      baseSize: 16,
      selectedTypeScale: "MinorThird",
      selectedUnit: "px",
    };
  },
  setup() {
    function truncateToThree(num) {
      return Math.trunc(num * 1000) / 1000;
    }

    const typeSizes = (scale, baseSize) => {
      const type = {
        h1: `${truncateToThree(
          baseSize * scale * scale * scale * scale * scale
        )}`,
        h2: `${truncateToThree(baseSize * scale * scale * scale * scale)}`,
        h3: `${truncateToThree(baseSize * scale * scale * scale)}`,
        h4: `${truncateToThree(baseSize * scale * scale)}`,
        h5: `${truncateToThree(baseSize * scale)}`,
        p: `${truncateToThree(baseSize)}`,
        small: `${truncateToThree(baseSize / scale)}`,
      };

      return type;
    };

    const baseSize = ref(16);
    const selectedUnit = ref("px");

    const convertedBaseSize = computed(() => {
      if (selectedUnit.value === "px") {
        return baseSize.value;
      } else if (selectedUnit.value === "rem") {
        return baseSize.value / 16;
      }
    });

    return {
      typeSizes,
      convertedBaseSize,
      baseSize,
      selectedUnit,
    };
  },
  mounted() {},
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(paragraphs.value);
      showPopup.value = true;
      setTimeout(() => {
        showPopup.value = false;
      }, 2000);
      console.log("Paragraph copied to clipboard");
    },
    convertRemToPx(rem) {
      const baseFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      return rem * baseFontSize;
    },
    convertPxToRem(px) {
      const baseFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      return px / baseFontSize;
    },
  },
};
</script>

<template>
  <div class="wrapper w-full">
    <section class="panel-group w-full">
      <section class="p-8 pt-24 flex bg-white items-center flex-col w-full">
        <h4 class="text-center text-7xl font-bold text-black">
          Type Scale Generator
        </h4>
        <p class="text-center my-4 text-2xl text-black">
          Generate text content for use in your designs and mockups.
        </p>
      </section>
      <section
        class="flex p-4 gap-2 border-solid border-t border-gray-200 w-full"
      >
        <div class="mb-4 w-1/3">
          <label class="block mb-1 text-sm" for="input1">Scale Ratio</label>
          <select
            v-model="selectedTypeScale"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option disabled value="Select a type scale">
              Select a type scale
            </option>
            <option
              v-for="(scale, key) in typescales"
              :key="key"
              :value="key"
              :selected="scale.selected"
            >
              {{ scale.label }}
            </option>
          </select>
        </div>
        <div class="mb-4 w-1/3">
          <label class="block mb-1 text-sm" for="input1">Unit</label>
          <select
            v-model="selectedUnit"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option disabled value="Select a unit">Select a unit</option>
            <option
              v-for="(unit, key) in units"
              :key="key"
              :value="key"
              :selected="unit.selected"
            >
              {{ unit.label }}
            </option>
          </select>
        </div>
        <div class="mb-4 w-1/3">
          <label class="block mb-1 text-sm" for="input1"
            >Basesize in {{ selectedUnit }}</label
          >

          <input
            type="number"
            value="16"
            v-model="baseSize"
            id="convertedBaseSize"
            class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
            autofocus
            placeholder="Base size"
          />
        </div>
      </section>
      <section class="my-4">
        <section id="typography" class="w-full">
          <ul class="flex flex-col justify-center gap-4">
            <li
              class="flex items-center flex-row"
              v-for="(size, key) in typeSizes(
                typescales[selectedTypeScale].value,
                baseSize
              )"
              :key="key"
            >
              <span
                class="border text-slate-400 b-1 b-slate-200 p-1 rounded-md block w-16 text-center mx-4 text-sm"
                >{{ size }}</span
              >
              <span
                :style="{
                  fontSize: size + selectedUnit,
                }"
                class="text-ellipsis truncate"
                ><span class="text-slate-400">{{ key }}</span> Vexed nymphs go
                for quick waltz job</span
              >
            </li>
          </ul>
        </section>
        <section id="cssoutput" class="w-full">output</section>
      </section>
    </section>
  </div>
</template>

<style scoped>
#toolbar {
  justify-content: space-between;
  border-left: 0;
  border-top: 0;
  border-right: 0;
}
</style>
