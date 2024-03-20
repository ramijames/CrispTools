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
          return "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-600 rounded shadow-md shadow-black/5";
        case "secondary":
          return "border px-4 py-2 rounded bg-white active:bg-neutral-50 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-md shadow-black/5 ring-1 ring-slate-700/10";
        case "danger":
          return "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-100 rounded text-slate-700 shadow-md shadow-black/5";
        default:
          return "border px-4 py-2 rounded bg-white active:bg-neutral-50 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-md shadow-black/5 ring-1 ring-slate-700/10";
      }
    },
  },
};
</script>
