<script setup>
import { ref, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Header from "./Header.vue";

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
let paragraphs = computed(() => lorem.generateParagraphs(numParagraphs.value));
</script>

<template>
  <div class="wrapper">
    <!-- <Header /> -->
    <section class="panel-group">
      <section class="panel panel-w-50">
        <h1>Lorem Ipsum Generator</h1>
        <!-- <h5>What is Lorem Ipsum?</h5>
        <small>
          Lorem Ipsum is a placeholder text commonly used in the design and
          typesetting industry. It resembles Latin but is actually a nonsensical
          jumble of words and letters. It's often used as filler text when the
          actual content isn't available or relevant for the design process. The
          purpose of Lorem Ipsum is to mimic the appearance of real text without
          distracting the viewer with meaningful content, allowing designers to
          focus on layout and design elements. The term "Lorem Ipsum" is derived
          from the first two words of a Latin text that means "pain itself" or
          "suffering itself," which comes from a work by Cicero.
        </small> -->
      </section>
      <section class="panel panel-w-50">
        <h5>How many paragraphs do you want?</h5>

        <section
          id="toolbar"
          class="p-2 m-t-2 m-b-2 code bg-stone b-1 r-1 b-color-cement t-center flex-row"
        >
          <input
            type="number"
            v-model="numParagraphs"
            min="1"
            max="10"
            step="1"
          />
          <button @click="numParagraphs = 1">Just one, please</button>
        </section>

        <section
          id="output"
          class="card m-t-2 m-b-2 code bg-white b-1 r-1 b-color-stone"
        >
          <div class="card-title">Generated text</div>
          <div class="card-content">
            <small v-html="paragraphs"></small>
          </div>
        </section>
      </section>
    </section>
  </div>
</template>

<style scoped>
#toolbar {
  justify-content: space-between;
}
</style>
