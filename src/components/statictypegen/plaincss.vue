<script>
import { ref, watch } from 'vue';

export default {
  name: "PlainCSS",

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
  <div :key="PlainCSS" class="mx-auto max-w-7xl bg-gray-900 shadow-2xl sm:rounded-3xl sm:p-16">
    <pre v-highlightjs>
      <code class="css">
h1 { font-size: {{ typeSizes.h1 }}{{ selectedUnit }}; }
h2 { font-size: {{ typeSizes.h2 }}{{ selectedUnit }}; }
h3 { font-size: {{ typeSizes.h3 }}{{ selectedUnit }}; }
h4 { font-size: {{ typeSizes.h4 }}{{ selectedUnit }}; }
h5 { font-size: {{ typeSizes.h5 }}{{ selectedUnit }}; }
p { font-size: {{ typeSizes.p }}{{ selectedUnit }}; }
small { font-size: {{ typeSizes.small }}{{ selectedUnit }}; }
      </code>
    </pre>
  </div>
</template>