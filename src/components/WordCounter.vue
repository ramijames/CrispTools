<script>
import { ref, computed, watch } from "vue";
import Button from './shared/Button.vue';
import keywordExtractor from 'keyword-extractor';

export default {
  data() {
    return {

    };
  },
  setup() {
    // Basic Word Counter
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

    // Keyword Extractor
    const keywords = ref([]);
    const keywordCounts = ref(0);
    const limit = ref(5); // initial limit

    const showMore = () => {
      limit.value += 5;
    };

    watch(text, () => {
      const extractionResult = keywordExtractor.extract(text.value, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: false
      });

      let keywordCounts = extractionResult.reduce((counts, keyword) => {
        if (counts[keyword]) {
          counts[keyword]++;
        } else {
          counts[keyword] = 1;
        }
        return counts;
      }, {});

      const entries = Object.entries(keywordCounts);
      const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
      const filteredEntries = sortedEntries.filter(([keyword, count]) => count >= 3);
      keywordCounts = Object.fromEntries(filteredEntries);

      keywords.value = keywordCounts;
    });

    return {
      wordCount,
      sentenceCount,
      paragraphCount,
      text,
      keywords,
      limit,
      showMore
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
  <div class="title py-10">
    <h1 class="text-4xl font-bold text-black">Text Analysis</h1>
    <p class="text-2xl text-black">Word analysis tool and keyword extractor</p>
  </div>
  <div class="flex flex-row">
    <section class="main flex flex-col w-3/4">
      <section class="count">
        <div class="flex flex-row gap-6 py-2 justify-between block appearance-none w-full bg-slate-100 border px-4 py-2 pr-8 border-b-0 rounded-t-lg">
          <div class="text-md text-black">{{ wordCount }} words</div>
          <div class="text-md text-slate-400">{{ sentenceCount }} sentences, {{ paragraphCount }} paragraphs</div>
        </div>
      </section>
      <section class="textblock">
        <textarea v-model="text" id="wordCounterBox" rows="30" class="block appearance-none w-full bg-white border hover:border-blue-500 px-4 py-2 pr-8 rounded-b-lg focus:outline-none focus:shadow-outline">Paste your text here</textarea>
      </section>
    </section>
    <section class="main flex flex-col w-1/4">
      <div class="font-bold text-xl mb-2">Keywords</div>
      <div v-for="(count, keyword) in Object.entries(keywords).slice(0, limit)" :key="keyword">
        {{ keyword }}:{{ count[0] }} {{ count[1] }} 
      </div>
      
      <button v-if="text" @click="showMore">Show more</button>
    </section>
    <!-- <section class="panel-group">
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
      <section class="flex flex-row items-center justify-top my-6 w-full">
            <section class="counter w-1/2 min-h-96 bg-yellow-50 p-6">
              <div class="font-bold text-xl mb-2">Paste your text</div>
              <p class="text-gray-700 text-base">
                <textarea v-model="text" id="wordCounterBox" rows="10" class="block appearance-none w-full bg-white border hover:border-blue-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline">Paste your text here</textarea>
              </p>
            </section>
            <section class="analysis w-1/2 min-h-96 bg-neutral-100 p-6">
              <div class="font-bold text-xl mb-2">Analysis</div>
              <div class="panel">
                <ul>
                  <li>Words: {{ wordCount }}</li>
                  <li>Sentences: {{ sentenceCount }}</li>
                  <li>Paragraphs: {{ paragraphCount }}</li>
                </ul>
              </div>
              <div class="font-bold text-xl mb-2">Keywords</div>
              <div v-for="(count, keyword) in Object.entries(keywords).slice(0, limit)" :key="keyword">
                {{ keyword }}:{{ count[0] }} {{ count[1] }} 
              </div>
              
              <button v-if="text" @click="showMore">Show more</button>
            </section>
      </section>
    </section> -->
  </div>
</template>

<style scoped>

</style>