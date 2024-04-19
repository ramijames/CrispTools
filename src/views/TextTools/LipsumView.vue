<script>
import { ref, computed, watch } from "vue";
import Button from '@/components/shared/Button.vue';
import CrispInput from '@/components/shared/CrispInput.vue';
import { LoremIpsum } from "lorem-ipsum";
import PowerBar from '@/components/layout/PowerBar.vue';

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
    PowerBar
  },
  methods: {

  },
  watch: {

  },
};
</script>

<template>
  <div id="lipsum">
    <div class="wrapper">
      <transition name="fade">
        <div v-if="showPopup" class="fixed top-0 right-0 m-4 p-2 bg-green-500 text-white rounded shadow text-slate-700 shadow-md shadow-black/5 ring-1 ring-slate-700/10">
          Copied to clipboard!
        </div>
      </transition>
      <PowerBar :title="'Lorem Ipsum Generator'" :description="'Generate text content for use in your designs and mockups'" />

      <section id="workspace" class="p-6 bg-white mb-8 rounded-xl shadow-xl">
        <section id="toolbar" class="flex flex-auto flex-col md:flex-row gap-2 pt-2">
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

        <div class="w-full bg-white flex flex-col items-center">
          <div class="max-w-3xl p-8 md:p-24 text-black">
            <h3 class="font-bold text-xl mb-2">Generated Text</h3>
            <p>{{ paragraphs }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
#lipsum {
  height: 100%;
}
</style>
