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
      baseSize: 16,
      selectedTypeScale: "MinorThird",
    };
  },
  setup() {
    const typeSizes = (scale, baseSize) => {
      const type = {
        h1: `${baseSize * scale * scale * scale * scale * scale}px`,
        h2: `${baseSize * scale * scale * scale * scale}px`,
        h3: `${baseSize * scale * scale * scale}px`,
        h4: `${baseSize * scale * scale}px`,
        h5: `${baseSize * scale}px`,
        p: `${baseSize}px`,
        small: `${baseSize / scale}px`,
      };

      return type;
    };

    return {
      typeSizes,
    };
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(paragraphs.value);
      showPopup.value = true;
      setTimeout(() => {
        showPopup.value = false;
      }, 2000);
      console.log("Paragraph copied to clipboard");
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
      <input
        type="number"
        v-model="baseSize"
        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        value="16"
      />
    </section>
    <section id="type-scale-output">
      <section class="output">
        <ul>
          <li
            v-for="(size, key) in typeSizes(
              typescales[selectedTypeScale].value,
              baseSize
            )"
            :key="key"
            :style="{
              fontSize: size,
            }"
          >
            {{ key }}: {{ size }}
          </li>
        </ul>
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
