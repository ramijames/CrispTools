<template>
  <input
    v-model="inputValue"
    :class="inputClasses"
    :type="type"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', Number($event.target.value))"
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
          return "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-400 rounded shadow text-slate-700 shadow-sm shadow-black/5";
        case "secondary":
          return "w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5";
        default:
          return "w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5";
      }
    });

    return {
      inputValue,
      inputClasses,
    };
  },
};
</script>
