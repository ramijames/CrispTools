<script>
import { ref, computed, watch } from "vue";
import Button from './shared/Button.vue';
import keywordExtractor from 'keyword-extractor';
import {
  DocumentTextIcon
} from "@heroicons/vue/24/outline";


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
      
      // Remove special characters from the text before extracting keywords
      let cleanedText = text.value.replace(/–|-|■|•|●|►|▼|▲|▶|◀|◆|◇/g, ' ');

      const extractionResult = keywordExtractor.extract(cleanedText, {
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
    DocumentTextIcon
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
      <section v-if="!text" class="flex flex-col items-center text-center p-8 text-neutral-400">
        <DocumentTextIcon class="h-12 w-12 mb-2" />
        No text to analyze
      </section>
      <section v-if="text" class="px-8">
        <div class="font-bold text-xl mb-4">Keywords</div>
        <div v-for="(count, keyword) in Object.entries(keywords).slice(0, limit)" :key="keyword" class="flex flex-row mb-2">
          <!--{{ keyword }}: --> <div class="text-sm rounded rounded-full bg-slate-100 text-slate-500 text-center px-4 mr-2">{{ count[1] }}</div> {{ count[0] }} 
        </div>
        
        <Button
          btnType="secondary"
          btnText="Show more"
          :onClick="showMore" 
        />
      </section>
    </section>
  </div>
</template>

<style scoped>

</style>