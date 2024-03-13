<script>
import { ref, computed, watch } from "vue";
import Button from './Button.vue';
import CrispInput from './CrispInput.vue';
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
    lorem: function (val) {
      console.log(val);
    },
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
    <section class="panel-group">
      <section class="p-8 pt-24 flex items-center flex-col">
        <h4 class="text-center text-7xl font-bold text-black">
          Lorem Ipsum Generator
        </h4>
        <p class="text-center my-4 text-2xl text-black">
          Generate text content for use in your designs and mockups.
        </p>
      </section>
      <section class="flex p-4 gap-2">
        <label class="px-4 py-2 pr-8 font-semibold">Paragraphs</label>
        <!-- <input
          type="number"
          v-model="numParagraphs"
          min="1"
          max="10"
          step="1"
          class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        /> -->
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
      <section class="flex flex-col items-center justify-center">
          <div class="my-4">
            <div class="font-bold text-xl mb-2">Generated Text</div>
            <p class="text-gray-700 text-base">
              <p>
                {{ paragraphs }}
              </p>
            </p>
          </div>
      </section>
    </section>
  </div>
</template>

<style scoped>
#toolbar {
  
}
</style>
