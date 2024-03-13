<template>
  <input
    v-model="inputValue"
    :class="inputClasses"
    autofocus
    :type="type"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
    min="1"
  />
</template>

<script>
import { ref, watch, computed } from "vue";

export default {
  props: {
    modelValue: {
      type: [Number, String],
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
  },
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newVal) => {
        inputValue.value = newVal;
      }
    );

    const inputClasses = computed(() => {
      switch (props.inputType) {
        case "primary":
          return "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-400 rounded shadow";
        case "secondary":
          return "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
        default:
          return "w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none";
      }
    });

    return {
      inputValue,
      inputClasses,
    };
  },
};
</script>
