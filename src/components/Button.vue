<template>
  <button :class="buttonClasses" @click="onClick">
    {{ btnText }}
  </button>
</template>

<script>
export default {
  props: {
    btnType: {
      type: String,
      default: "default",
    },
    btnText: {
      type: String,
      default: "",
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    buttonClasses() {
      switch (this.btnType) {
        case "primary":
          return "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-400 rounded shadow";
        case "secondary":
          return "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
        case "danger":
          return "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow";
        default:
          return "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
      }
    },
  },
};
</script>
