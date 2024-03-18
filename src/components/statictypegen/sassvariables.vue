<script>
import { ref, watch } from 'vue';

export default {
  name: "SASSVariables",

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
  <div :key="SASSVariables" class="">
    <pre v-highlightjs><code class="css">$text-size-sm: {{ typeSizes.small }}{{ selectedUnit }};
$text-size-base: {{ typeSizes.p }}{{ selectedUnit }};
$text-size-md: {{ typeSizes.h5 }}{{ selectedUnit }};
$text-size-lg: {{ typeSizes.h4 }}{{ selectedUnit }};
$text-size-xl: {{ typeSizes.h3 }}{{ selectedUnit }};
$text-size-2xl: {{ typeSizes.h2 }}{{ selectedUnit }};
$text-size-3xl: {{ typeSizes.h1 }}{{ selectedUnit }};</code></pre>
  </div>
</template>