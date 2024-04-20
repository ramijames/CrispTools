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
          return "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded uppercase";
        case "secondary":
          return "border px-4 py-2 rounded bg-white active:bg-neutral-50 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5 uppercase";
        case "small":
          return "border px-2 py-1 text-xs rounded bg-white active:bg-neutral-50 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5 uppercase";
        default:
          return "border px-4 py-2 rounded bg-white active:bg-neutral-50 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5 uppercase";
      }
    },
  },
};
</script>
