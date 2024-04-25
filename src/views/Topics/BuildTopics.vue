<script>
import { getFirestore, addDoc, getDocs, collection, onSnapshot } from 'firebase/firestore';
import { ref, onMounted, watch } from 'vue';
import { getAuth } from 'firebase/auth';


export default {
  data() {
    return {
      selectedTab: 'newTopic'
    }
  },
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
        errMsg.value = errorMessage;
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
      successMsg
    }
  },
  methods: {
    deleteTopic(topicIndex) {
      this.topics.splice(topicIndex, 1);
    },
    deleteSource(topicIndex, sourceIndex) {
      this.topics[topicIndex].newsSources.splice(sourceIndex, 1);
    },
    editSource(topicIndex, sourceIndex) {
      const newSource = prompt('Enter new source');
      if (newSource) {
        this.topics[topicIndex].newsSources.splice(sourceIndex, 1, newSource);
      }
    },
    removeTopicsWithoutSources() {
      this.topics = this.topics.filter(topic => topic.newsSources.length > 0);
    }
  }
}
</script>

<template>
  <main class="w-full h-full flex flex-col lg:flex-row justify-center">
    <section class="w-full h-full lg:w-1/2 mx-auto">
      <!-- <h1 class="text-2xl font-semibold mb-2">New topic</h1> -->
      <ul class="flex flex-row w-full mb-6">
        <li class="text-xl font-semibold self-center w-1/2 text-center py-4 border-b cursor-pointer" v-bind:class="{ selected: selectedTab === 'newTopic' }" @click="selectedTab = 'newTopic'">New topic</li>
        <li class="text-xl font-semibold self-center w-1/2 text-center py-4 border-b cursor-pointer" v-bind:class="{ selected: selectedTab === 'manageTopics' }" @click="selectedTab = 'manageTopics'">Manage topics</li>
      </ul>
      
      <section id="newTopic" v-show="selectedTab === 'newTopic'">
        <div v-if="errMsg" class="p-2 bg-red-50 text-red-500 rounded my-4">{{ errMsg }}</div>
        <div v-if="successMsg" class="p-2 bg-blue-50 text-blue-500 rounded">{{ successMsg }}</div>
        <form v-else @submit.prevent="addTopic(topic)" class="flex flex-col">
          <label for="topic" class="mb-2 text-sm uppercase font-semibold">Topic title</label>
          <input type="text" id="topic" name="topic" v-model="topic" class="border rounded mb-4 p-2" />

          <section class="p-4 bg-blue-50 rounded mb-4">
            <h2 class="text-lg font-semibold mb-2">Sources</h2>
            <div v-for="(source, index) in sources" :key="index" class="flex flex-col mb-4">
              <!-- <label :for="`source-${index}`" class="mb-2 text-sm uppercase font-semibold">Source</label> -->
              <section class="flex flex-row gap-2 justify-center">
                <input type="text" :id="`source-${index}`" v-model="sources[index]" class="w-full border rounded p-2" />
                <button v-if="sources.length > 1" type="button" @click="sources.splice(index, 1)" class="self-center bg-red-50 p-2 rounded">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-red-500" d="M17 4H13V3C13 2.20435 12.6839 1.44129 12.1213 0.87868C11.5587 0.316071 10.7956 0 10 0H8C7.20435 0 6.44129 0.316071 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H2V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V6H17C17.2652 6 17.5196 5.89464 17.7071 5.70711C17.8946 5.51957 18 5.26522 18 5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4ZM7 3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H10C10.2652 2 10.5196 2.10536 10.7071 2.29289C10.8946 2.48043 11 2.73478 11 3V4H7V3ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V6H14V17Z" fill="#fff"/>
                  </svg>
                </button>
              </section>
            </div>

            <button type="button" @click="addSource" class="bg-blue-500 text-white py-1 px-2 rounded self-start mb-4">Add Source</button>
          </section>
          
          <button type="submit" class="w-full bg-blue-500 text-white py-2 text-sm uppercase px-2 rounded self-start mb-4">Add new topic</button>

        </form>
      </section>

      <section id="manageTopics" v-show="selectedTab === 'manageTopics'">
        <section v-for="(topic, topicIndex) in topics" :key="topic.topic" class="flex flex-col justify-between mb-4 border rounded-lg">
            <section class="flex flex-row justify-between p-4 rounded-t-lg border-b">
              <span class="text-xl font-semibold">{{ topic.topic }}</span>
              <button @click="deleteTopic(topicIndex)" class="py-1 px-2 text-red-500 bg-red-50 rounded">Delete Topic</button>
            </section>
            <section class="bg-slate-50">
              <table class="w-full">
                <tr>
                  <th class="p-4 text-left">News Sources</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
                <tr v-for="(source, sourceIndex) in topic.newsSources" :key="source" class="w-full">
                  <td class="p-4">{{ source }}</td>
                  <td class="p-4 flex flex-row justify-end gap-2 text-right">
                    <button @click="deleteSource(topicIndex, sourceIndex)" class="text-red-500 bg-red-50 rounded h-10 px-3 self-end">
                      <svg class="self-center" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill-red-500" d="M17 4H13V3C13 2.20435 12.6839 1.44129 12.1213 0.87868C11.5587 0.316071 10.7956 0 10 0H8C7.20435 0 6.44129 0.316071 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H2V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V6H17C17.2652 6 17.5196 5.89464 17.7071 5.70711C17.8946 5.51957 18 5.26522 18 5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4ZM7 3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H10C10.2652 2 10.5196 2.10536 10.7071 2.29289C10.8946 2.48043 11 2.73478 11 3V4H7V3ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V6H14V17Z" fill="#fff"/>
                      </svg>
                    </button>
                    <button @click="editSource(topicIndex, sourceIndex)" class="text-blue-500 bg-blue-50 rounded h-10 px-3 self-end">
                      <svg class="self-center" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.9596 4.44541L13.6142 2.1L14.7 1.01421L16.9858 3.3L16.9733 3.31252L16.9548 3.3332L15.9596 4.44541ZM3.38313 17H1V14.6116L11.0032 4.51742L13.389 6.90319L3.38313 17Z" stroke="black" stroke-width="2"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              </table>
            </section>
        </section>
      </section>

    </section>
    
  </main>
</template>

<style scoped>

.selected {
  @apply border-blue-500;
  @apply text-blue-500;
}

</style>