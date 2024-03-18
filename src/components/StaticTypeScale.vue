<script>
import { ref, watch } from "vue";
import CrispInput from "./shared/CrispInput.vue";
import Button from "./shared/Button.vue";
import {Tabs, Tab} from 'vue3-tabs-component';
import PlainCSS from "./statictypegen/plaincss.vue";
import CSSVariables from "./statictypegen/cssvariables.vue";
import SASSVariables from "./statictypegen/sassvariables.vue";
import TailwindStyles from "./statictypegen/tailwindstyles.vue";

export default {
  data() {
    return {
      units: {
        px: { label: "px", selected: true },
        rem: { label: "rem", selected: false },
      },
    };
  },
  setup() {
    const baseSize = ref(16);
    const selectedUnit = ref("px");
    const selectedTypeScale =  ref("MajorSecond");
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

    const typescales = {
      MinorSecond: { value: 1.067, label: "Minor Second", selected: false },
      MajorSecond: { value: 1.125, label: "Major Second", selected: false },
      MinorThird: { value: 1.2, label: "Minor Third", selected: true },
      MajorThird: { value: 1.25, label: "Major Third", selected: false },
      PerfectFourth: { value: 1.333, label: "Perfect Fourth", selected: false,},
      AugmentedFourth: { value: 1.414, label: "Augmented Fourth", selected: false,},
      PerfectFifth: { value: 1.5, label: "Perfect Fifth", selected: false },
      GoldenRatio: { value: 1.618, label: "Golden Ratio", selected: false },
    };

    return {
      typeSizes,
      baseSize,
      selectedUnit,
      typescales,
      selectedTypeScale
    };
  },
  components: {
    CrispInput,
    Button,
    Tabs,
    Tab,
    PlainCSS,
    CSSVariables,
    SASSVariables,
    TailwindStyles,
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
  <section id="powerbar" class="flex flex-1 flex-col p-4 lg:px-6 border-b w-full justify-between">
    <section id="title" class="flex flex-col justify-center">
      <h4 class="text-md font-semibold text-black">Static Type Scale</h4>
      <p class="text-xs text-slate-800">Generate a static type scale based on a base size and a scale ratio</p>
    </section>
    <section id="toolbar" class="flex flex-auto flex-col sm:flex-row gap-2 pt-4">
      <div class="w-full sm:w-1/3">
        <label class="block mb-1 font-semibold text-sm" for="input1">Scale Ratio</label>
        <select v-model="selectedTypeScale" class="block appearance-none w-full bg-white border hover:border-blue-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline">
          <option disabled value="Select a type scale">Select a type scale</option>
          <option v-for="(scale, key) in typescales" :key="key" :value="key" :selected="scale.selected" >
            {{ scale.label }}
          </option>
        </select>
      </div>
      <div class="w-full sm:w-1/3">
        <label class="block mb-1 font-semibold text-sm" for="input1">Unit</label>
        <select v-model="selectedUnit" class="block appearance-none w-full bg-white border hover:border-blue-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline">
          <option disabled value="Select a unit">Select a unit</option>
          <option v-for="(unit, key) in units" :key="key" :value="key" :selected="unit.selected" >
            {{ unit.label }}
          </option>
        </select>
      </div>
      <div class="w-full sm:w-1/3">
        <label class="block mb-1 font-semibold text-sm" for="input1">Basesize in {{ selectedUnit }}</label>
        <CrispInput v-model="baseSize" type="number" inputType="secondary" />
      </div>
    </section>
  </section>
  <section id="workspace" class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/2 md:border-r py-8 bg-white">
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
    </div>
    <div class="w-full md:w-1/2 bg-blue-900">
      <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged" nav-item-class="nav-item">
        <tab name="Plain CSS" >
          <PlainCSS :typeSizes="typeSizes(typescales[selectedTypeScale].value, baseSize)" :baseSize="baseSize" :selectedUnit="selectedUnit" />
        </tab>
        <tab name="CSS Variables">
          <CSSVariables :typeSizes="typeSizes(typescales[selectedTypeScale].value, baseSize)" :baseSize="baseSize" :selectedUnit="selectedUnit" />
        </tab>
        <tab name="SASS Variables">
          <SASSVariables :typeSizes="typeSizes(typescales[selectedTypeScale].value, baseSize)" :baseSize="baseSize" :selectedUnit="selectedUnit" />
        </tab>
        <tab name="Tailwind">
          <TailwindStyles :typeSizes="typeSizes(typescales[selectedTypeScale].value, baseSize)" :baseSize="baseSize" :selectedUnit="selectedUnit" />
        </tab>
      </tabs>
    </div>
  </section>
</template>

<style>
.css.hljs {
  background: transparent;
}

.tabs-component-tabs {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin: 1rem;
}

.nav-item {
  padding: .5rem;
  border-radius: .35rem;
  border: 1px solid rgb(235, 235, 235);
}

.nav-item:hover {
  border: 1px solid rgb(59, 130, 246)
}

.is-active {
  background-color: rgb(37, 99, 235);
  border: 1px solid rgb(37, 99, 235);
  color:white;
}

.is-inactive {
  background-color: transparent;
  border-color:rgb(37, 99, 235);
  color:white;
}

.css.hljs {
  padding: 1rem;
}

</style>
