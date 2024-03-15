import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LipsumView from "../views/LipsumView.vue";
import StaticTypeView from "../views/StaticTypeView.vue";
import IconGenView from "../views/IconGenView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/lipsum",
      name: "lipsum",
      component: LipsumView,
    },
    {
      path: "/static-type-scale",
      name: "static-type-scale",
      component: StaticTypeView,
    },
    {
      path: "/icon-gen",
      name: "icon-gen",
      component: IconGenView,
    },
  ],
});

export default router;
