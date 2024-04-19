// userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    viewType: 'list'
  }),
  actions: {
    setViewType(viewType) {
      this.viewType = viewType;
    },
  },
});