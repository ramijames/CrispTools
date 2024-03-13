<script>
import { ref, computed, watch } from "vue";
import CrispInput from "./CrispInput.vue";

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
      // baseSize: 18,
      selectedTypeScale: "MinorThird",
    };
  },
  setup() {
    const baseSize = ref(18);
    const selectedUnit = ref("px");
    let previousUnit = ref("px");

    watch(selectedUnit, (newUnit, oldUnit) => {
      previousUnit.value = oldUnit;
      if (newUnit === "rem" && oldUnit === "px") {
        baseSize.value /= 16;
      } else if (newUnit === "px" && oldUnit === "rem") {
        baseSize.value *= 16;
      }
    });
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

    return {
      typeSizes,
      baseSize,
      selectedUnit,
    };
  },
  components: {
    CrispInput,
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
  <div class="wrapper w-full">
    <section class="panel-group w-full">
      <section class="p-8 pt-24 flex items-center flex-col w-full">
        <h4 class="text-center text-7xl font-bold text-black">
          Type Scale Generator
        </h4>
        <p class="text-center my-4 text-2xl text-black">
          Generate a type scale based on a base size and a scale ratio
        </p>
      </section>
      <section class="flex p-4 gap-2 w-full border-b b-slate-200">
        <div class="mb-4 w-1/3">
          <label class="block mb-1 text-sm" for="input1">Scale Ratio</label>
          <select
            v-model="selectedTypeScale"
            class="block appearance-none w-full bg-white border hover:border-blue-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline"
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
            class="block appearance-none w-full bg-white border hover:border-blue-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline"
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
          <CrispInput v-model="baseSize" type="number" inputType="secondary" />
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
                class="border text-slate-400 b-1 b-slate-200 p-2 rounded-md block w-24 text-center mx-4 text-sm"
                >{{ size }}{{ selectedUnit }}</span
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
        <section id="cssoutput" class="w-full">
          <pre>
            <code>

                .h1 {
                  font-size: {{ typeSizes(typescales[selectedTypeScale].value, baseSize).h1 }}{{ selectedUnit }};
                }
                .h2 {
                  font-size: {{ typeSizes(typescales[selectedTypeScale].value, baseSize).h2 }}{{ selectedUnit }};
                }
                .h3 {
                  font-size: {{ typeSizes(typescales[selectedTypeScale].value, baseSize).h3 }}{{ selectedUnit }};
                }
                .h4 {
                  font-size: {{ typeSizes(typescales[selectedTypeScale].value, baseSize).h4 }}{{ selectedUnit }};
                }
                .h5 {
                  font-size: {{ typeSizes(typescales[selectedTypeScale].value, baseSize).h5 }}{{ selectedUnit }};
                }
                .p {
                  font-size: {{ typeSizes(typescales[selectedTypeScale].value, baseSize).p }}{{ selectedUnit }};
                }
                .small {
                  font-size: {{ typeSizes(typescales[selectedTypeScale].value, baseSize).small }}{{ selectedUnit }};
                }

            </code>
          </pre>
        </section>
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
