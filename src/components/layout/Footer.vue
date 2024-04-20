<script>
import {
  HeartIcon
} from "@heroicons/vue/24/outline";

export default {
  name: "Footer",
  components: {
    HeartIcon
  }
};
</script>

<template>
  <footer class="w-full bg-white">
    <section class="w-full max-w-screen-2xl p-8 mx-auto flex flex-col md:flex-row justify-between items-center ">
      <p class="uppercase text-xs font-semibold text-neutral-300 pl-8 tracking-widest">Made with <HeartIcon class="h-6 w-6 inline mb-2 text-green-500" /> by <a class="text-slate-500 underline" href="https://www.ramijames.com">Rami James</a></p>
      <a class="flex flex-row uppercase text-xs font-semibold text-neutral-300 tracking-widest" href="https://github.com/ramijames/crisp-tools">Star on Github</a>
    </section>
  </footer>
</template>

<style scoped>

</style>
