<script>
import { ref, watch } from 'vue';

export default {
  name: "TailwindStyles",

  setup(props) {
    const baseSizeInternal = ref(props.baseSize);

    watch(() => props.baseSize, (newBaseSize) => {
      baseSizeInternal.value = newBaseSize;
    }, { immediate: true });

    return {
      baseSizeInternal
    };
  },
  props: {
    baseSize: {
      type: Number,
      default: 18,
    },
    typeSizes: {
      type: Object,
      default: () => ({
        h1: "44.789",
        h2: "37.324",
        h3: "31.103",
        h4: "25.919",
        h5: "21.599",
        p: "18",
        small: "15"
      }),
    },
    selectedUnit: {
      type: String,
      default: "px",
    },
  },
  };
</script>

<template>
  <div :key="TailwindStyles" class="mx-auto max-w-7xl bg-gray-900 shadow-2xl sm:rounded-3xl sm:p-16">
    <pre v-highlightjs>
      <code class="css">
// tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      'sm': '{{ typeSizes.small }}{{ selectedUnit }}',
      'base': '{{ typeSizes.p }}{{ selectedUnit }}',
      'lg': '{{ typeSizes.h5 }}{{ selectedUnit }}',
      'xl': '{{ typeSizes.h4 }}{{ selectedUnit }}',
      '2xl': '{{ typeSizes.h3 }}{{ selectedUnit }}',
      '3xl': '{{ typeSizes.h2 }}{{ selectedUnit }}',
      '4xl': '{{ typeSizes.h1 }}{{ selectedUnit }}',
    }
  }
}
      </code>
    </pre>
  </div>
</template>