<script>
import { ref, computed, watch } from "vue";
import Button from './shared/Button.vue';
import CrispInput from './shared/CrispInput.vue';
import { LoremIpsum } from "lorem-ipsum";

export default {
  data() {
    return {

    };
  },
  setup() {
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

    // Buttons
    const generateParagraphs = () => {
      paragraphs.value = lorem.generateParagraphs(numParagraphs.value);
    };

    watch(numParagraphs, generateParagraphs);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(paragraphs.value);
      showPopup.value = true;
      setTimeout(() => {
        showPopup.value = false;
      }, 2000);
      console.log("Paragraph copied to clipboard");
    };

    const reset = () => {
      numParagraphs.value = 1;
      generateParagraphs();
    };

    return {
      numParagraphs,
      paragraphs,
      showPopup,
      generateParagraphs,
      copyToClipboard,
      reset,
    };

  },
  components: {
    Button,
    CrispInput,
  },
  methods: {

  },
  watch: {

  },
};
</script>

<template>
  <div class="wrapper">
    <transition name="fade">
      <div v-if="showPopup" class="fixed top-0 right-0 m-4 p-2 bg-green-500 text-white rounded shadow-lg">
        Copied to clipboard!
      </div>
    </transition>
    <section id="powerbar" class="flex flex-1 flex-row p-4 lg:px-6 border-b w-full justify-between">
      <section id="title" class="flex flex-col justify-center pr-24">
        <h4 class="text-md font-semibold text-black">Lorem Ipsum Generator</h4>
        <p class="text-xs text-slate-800">Generate text content for use in your designs and mockups</p>
      </section>
      <section id="toolbar" class="flex flex-auto flex-row gap-2">
        <CrispInput v-model="numParagraphs" type="number" inputType="secondary" />
        <Button
          btnType="secondary"
          btnText="Reset"
          :onClick="reset" 
        />
        <Button
          btnType="secondary"
          btnText="Regenerate"
          :onClick="generateParagraphs" 
        />
        <Button
          btnType="primary"
          btnText="Copy"
          :onClick="copyToClipboard" 
        />
      </section>
    </section>
    <section id="workspace" class="flex lg:flex-row md:flex-col">
      <div class="w-full bg-white flex flex-col items-center">
        <div class="max-w-3xl p-24 text-black">
          <h3 class="font-bold text-xl mb-2">Generated Text</h3>
          <p>{{ paragraphs }}</p>
        </div>
      </div>
    </section>
  </div>
</template>