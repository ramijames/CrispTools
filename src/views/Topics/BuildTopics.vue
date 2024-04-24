<script>
import { getFirestore, addDoc, getDocs, collection, onSnapshot } from 'firebase/firestore';
import { ref, onMounted, watch } from 'vue';
import { getAuth } from 'firebase/auth';


export default {
  setup() {
    const topic = ref('');
    const db = getFirestore();
    const topicsCollection = collection(db, 'topics');
    const errMsg = ref(null);
    const successMsg = ref(null);

    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    const addTopic = async () => {
      // Validate each source
      for (const source of sources.value) {
        const errorMessage = validateSource(source, sources.value);
        if (errorMessage) {
          errMsg.value = errorMessage;
          console.error(errorMessage);
          return; // Do not add the topic if a source is invalid
        }
      }

      // Validate the topic
      const errorMessage = validateTopic(topic.value);
      if (errorMessage) {
        errMsg.value = errorMessage;
        console.error(errorMessage);
        return; // Do not add the topic if the topic is invalid
      }

      // If all sources are valid, add the topic
      try {
        const docRef = await addDoc(topicsCollection, {
          topic: topic.value,
          createdAt: new Date(),
          newsSources: sources.value,
          userId: userId
        });
        console.log('Document written with ID: ', docRef.id);
        successMsg.value = 'Topic added successfully';
        
        // after 3 seconds, clear all
        setTimeout(() => {
          clearAll();
        }, 3000);
        
      } catch (e) {
        errMsg.value = e.message;
        console.error('Error adding document: ', e);
      }
    };

    const topics = ref([]);

    const sources = ref(['']);

    const addSource = () => {
      const newSource = sources.value[sources.value.length - 1];
      const errorMessage = validateSource(newSource, sources.value);
      if (errorMessage) {
        console.error(errorMessage);
      } else {
        sources.value.push('');
      }
    };

    const validateTopic = (topic) => {
      // must not be an empty string
      if (!topic) {
        return 'Topic cannot be an empty string';
      }

      // must be unique
      if (topics.value.some(t => t.topic === topic)) {
        return 'Topic must be unique';
      }

      // If all checks pass, return null
      return null;
    };

    const validateSource = (source, allSources) => {
      // must not be an empty string
      if (!source) {
        return 'Source cannot be an empty string';
      }

      // must have http or https
      if (!source.startsWith('http://') && !source.startsWith('https://')) {
        return 'Source must start with http:// or https://';
      }

      // must have a domain
      const url = new URL(source);
      if (!url.hostname) {
        return 'Source must have a domain';
      }

      // end with rss or xml
      if (!source.endsWith('rss') && !source.endsWith('xml')) {
        return 'Source must end with rss or xml';
      }

      // must be unique
      // if (allSources.includes(source)) {
      //   return 'Source must be unique';
      // }

      // If all checks pass, return null
      return null;
    };

    onSnapshot(topicsCollection, (snapshot) => {
      topics.value = snapshot.docs.map(doc => doc.data());
    });

    const clearAll = () => {
      topic.value = [''];
      sources.value = [''];
      errMsg.value = null;
      successMsg.value = null;
    };


    return {
      addTopic,
      topic,
      topics,
      sources,
      addSource,
      errMsg,
      successMsg,
    }
  }
}
</script>

<template>
  <main class="w-full h-full flex flex-col lg:flex-row">
    <section class="w-full h-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-2">New topic</h1>
      <div v-if="errMsg" class="p-2 bg-red-50 text-red-500 rounded my-4">{{ errMsg }}</div>
      <div v-if="successMsg" class="p-2 bg-blue-50 text-blue-500 rounded">{{ successMsg }}</div>
      <form v-else @submit.prevent="addTopic(topic)" class="flex flex-col">
        <label for="topic" class="mb-2 text-sm uppercase font-semibold">Topic title</label>
        <input type="text" id="topic" name="topic" v-model="topic" class="border rounded mb-4 p-2" />

        <section class="p-4 bg-blue-50 rounded mb-4">
          <h2 class="text-lg font-semibold mb-2">Sources</h2>
          <div v-for="(source, index) in sources" :key="index" class="flex flex-col mb-4">
            <label :for="`source-${index}`" class="mb-2 text-sm uppercase font-semibold">Source</label>
            <input type="text" :id="`source-${index}`" v-model="sources[index]" class="border rounded p-2" />
          </div>

          <button type="button" @click="addSource" class="bg-blue-500 text-white py-1 px-2 rounded self-start mb-4">Add Source</button>
        </section>
        
        <button type="submit" class="w-full bg-blue-500 text-white py-2 text-sm uppercase px-2 rounded self-start mb-4">Add new topic</button>

      </form>
    </section>
    
  </main>
</template>