<script>
import { ref, watch } from "vue";
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
  <section id="powerbar" class="flex flex-1 flex-col p-4 lg:px-6 border-b w-full justify-between">
    <section id="title" class="flex flex-col justify-center">
      <h1 class="text-slate-900 font-semibold text-md">Text Analysis</h1>
      <p class="text-sm text-slate-900">Word analysis tool and keyword extractor</p>
    </section>
    <section id="toolbar" class="flex flex-auto flex-row gap-2">
      <section class="count w-full">
        <div class="flex flex-row gap-6 py-2 items-center justify-start block appearance-none w-full">
          <div class="text-lg md:text-2xl text-black">{{ wordCount }} words, 
          <span class="text-slate-400">{{ sentenceCount }} sentences, {{ paragraphCount }} paragraphs</span></div>
        </div>
      </section>
    </section>
  </section>
  <section id="workspace" class="flex flex-col md:flex-row">
    <div class="w-full md:w-3/4  border-r bg-white">
      <textarea placeholder="Paste your text here" v-model="text" id="wordCounterBox" rows="30" class="block appearance-none w-full bg-white p-4 focus:outline-none">Paste your text here</textarea>
    </div>
    <div class="w-full md:w-1/4  bg-neutral-50">
      <section v-if="!text" class="flex flex-col items-center text-center p-8 text-neutral-200 h-full justify-center">
        <DocumentTextIcon class="h-12 w-12 mb-2" />
        No text to analyze
      </section>
      <section v-if="text" class="p-8">
        <div class="font-bold text-md text-black mb-4 border-b pb-4">Keywords</div>
        <div v-for="(count, keyword) in Object.entries(keywords).slice(0, limit)" :key="keyword" class="flex flex-row mb-2 text-black">
          <div class="text-sm rounded rounded-full bg-neutral-200 text-neutral-500 text-center px-4 mr-2">{{ count[1] }}</div> {{ count[0] }} 
        </div>
        
        <Button
          btnType="secondary"
          btnText="Show more"
          :onClick="showMore" 
          class="mt-4 w-full"
        />
      </section>
    </div>
  </section>
</template>

<style scoped>

</style>