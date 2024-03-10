<script setup>
import { ref, computed, watch } from "vue";

import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

let numParagraphs = ref(1);
let paragraphs = ref(lorem.generateParagraphs(numParagraphs.value));
let showPopup = ref(false);

const generateParagraphs = () => {
  paragraphs.value = lorem.generateParagraphs(numParagraphs.value);
};

watch(numParagraphs, generateParagraphs);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(paragraphs.value);
    showPopup.value = true;
    setTimeout(() => {
      showPopup.value = false;
    }, 2000);
    console.log('Paragraph copied to clipboard');
  } catch (err) {
    console.error('Failed to copy paragraph: ', err);
  }
};

</script>

<template>
  <div class="wrapper">
    <section class="panel-group">
      <section class="p-8 pt-24 flex bg-white items-center flex-col">
        <h4 class="text-center text-7xl font-bold text-black">
          Lorem Ipsum Generator
        </h4>
        <p class="text-center my-4 text-2xl max-w-3xl text-black">
          Generate paragraphs of placeholder for use in your designs when the actual content isn't available.
        </p>
      </section>
      <section class="flex gap-x-1 p-4 border-solid border-t border-gray-200">
        <label class="px-4 py-2 pr-8 font-semibold">Paragraphs</label><input
          type="number"
          v-model="numParagraphs"
          min="1"
          max="10"
          step="1"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          @click="numParagraphs = 1"
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Reset
        </button>
        <button
          @click="copyToClipboard()"
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Copy
        </button>
        <button
          @click="generateParagraphs"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-400 rounded shadow"
        >
          Regenerate
        </button>
      </section>
      <section class="flex flex-col items-center justify-center">
        <div class="max-w-3xl">
          <div class="my-4">
            <div class="font-bold text-xl mb-2">Generated Text</div>
            <p class="text-gray-700 text-base">
              <transition name="fade">
                <div v-if="showPopup" class="fixed top-0 right-0 m-4 p-2 bg-green-500 text-white rounded shadow-lg">
                  Copied to clipboard!
                </div>
              </transition>
              <p v-html="paragraphs"></p>
            </p>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped>
#toolbar {
  justify-content: space-between;
  border-left: 0;
  border-top: 0;
  border-right: 0;
}
</style>
