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
    const typeSizes = (scale, baseSize) => {
      const type = {
        h1: `${baseSize * scale * scale * scale * scale * scale}`,
        h2: `${baseSize * scale * scale * scale * scale}`,
        h3: `${baseSize * scale * scale * scale}`,
        h4: `${baseSize * scale * scale}`,
        h5: `${baseSize * scale}`,
        p: `${baseSize}`,
        small: `${baseSize / scale}`,
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
  <div class="wrapper">
    <section id="type-scale-input">
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
      <div class="mb-4 px-2 w-full">
        <label class="block mb-1 text-sm" for="input1">{{
          selectedUnit
        }}</label>

        <input
          type="number"
          value="16"
          v-model="convertedBaseSize"
          id="convertedBaseSize"
          class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
          autofocus
          placeholder="Base size"
        />
      </div>
    </section>
    <section id="type-scale-output columns-2">
      <section class="output">
        <ul>
          <li
            v-for="(size, key) in typeSizes(
              typescales[selectedTypeScale].value,
              baseSize
            )"
            :key="key"
            :style="{
              fontSize: size + selectedUnit,
            }"
          >
            {{ key }}: {{ size }}
          </li>
        </ul>
      </section>
      <section>test</section>
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
