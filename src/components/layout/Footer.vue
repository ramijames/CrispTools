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
  <footer class="w-full border-t dark:border-slate-100/10">
    <section class="w-full max-w-screen-2xl p-4 mx-auto flex flex-col md:flex-row justify-between items-center ">
      <p class="flex flex-row text-xs text-slate-300 dark:text-slate-300/20">Made with <HeartIcon class="h-4 w-4 inline mb-1 mx-1 text-green-500" /> by <a class="text-slate-500 underline ml-1" href="https://www.ramijames.com">Rami James</a></p>
      <a class="flex flex-row text-xs text-slate-300 dark:text-slate-300/20" href="https://github.com/ramijames/crisp-tools">Star on Github</a>
    </section>
  </footer>
</template>

<style scoped>

</style>
