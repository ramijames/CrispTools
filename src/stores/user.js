// userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: String,
    viewType: 'list'
  }),
  actions: {
    setViewType(viewType) {
      this.viewType = viewType;
    },
    setName(name) {
      this.name = name;
    },
  },
});