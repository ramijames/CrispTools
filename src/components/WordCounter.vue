<script>
import { ref, computed, watch } from "vue";
import Button from './shared/Button.vue';

export default {
  data() {
    return {

    };
  },
  setup() {
    const text = ref('');
    const wordCount = ref(0);
    const sentenceCount = ref(0);
    const paragraphCount = ref(0);

    const analyzeText = () => {
      const words = text.value.trim().split(/\s+/);
      const sentences = text.value.trim().split(/[.!?]+/);
      const paragraphs = text.value.trim().split(/\n\n+/);

      wordCount.value = words.length;
      sentenceCount.value = sentences.length;
      paragraphCount.value = paragraphs.length;
    };

    watch(text, analyzeText);

    return {
      wordCount,
      sentenceCount,
      paragraphCount,
      text
    };

  },
  components: {
    Button,
  },
  methods: {

    
  },
  watch: {

  },
};




</script>

<template>
  <div class="wrapper">
    <section class="panel-group">
      <section class="p-8 pt-24 flex items-center flex-col">
        <h4 class="text-center text-7xl font-bold text-black">
          Word Counter
        </h4>
        <p class="text-center my-4 text-2xl text-black">
          Check how many words, sentences, or paragraphs your text has
        </p>
      </section>
      <section class="flex p-4 gap-2 border-b b-slate-200">
        
      </section>
      <section class="flex flex-row items-center justify-center my-6 w-full">
            <section class="counter w-1/2 h-96 bg-yellow-50 p-6">
              <div class="font-bold text-xl mb-2">Paste your text</div>
              <p class="text-gray-700 text-base">
                <textarea v-model="text" id="wordCounterBox" rows="10" class="block appearance-none w-full bg-white border hover:border-blue-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline">Paste your text here</textarea>
              </p>
            </section>
            <section class="analysis w-1/2 h-96 bg-neutral-100 p-6">
              <div class="font-bold text-xl mb-2">Analysis</div>
              <div class="panel">
                <ul>
                  <li>Words: {{ wordCount }}</li>
                  <li>Sentences: {{ sentenceCount }}</li>
                  <li>Paragraphs: {{ paragraphCount }}</li>
                </ul>
              </div>
            </section>
      </section>
    </section>
  </div>
</template>

<style scoped>

</style>