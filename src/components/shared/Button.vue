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
          return "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-600 rounded shadow-md shadow-black/5 ring-1 ring-slate-700/10";
        case "secondary":
          return "bg-white hover:bg-blue-100 text-blue-600 font-semibold py-2 px-4 border border-blue-100 rounded text-slate-700 shadow-md shadow-black/5 ring-1 ring-slate-700/10";
        case "danger":
          return "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-100 rounded text-slate-700 shadow-md shadow-black/5 ring-1 ring-slate-700/10";
        default:
          return "bg-white hover:bg-blue-100 text-blue-600 font-semibold py-2 px-4 border border-blue-100 rounded text-slate-700 shadow-md shadow-black/5 ring-1 ring-slate-700/10";
      }
    },
  },
};
</script>
