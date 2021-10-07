import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:familyID/:familyName",
    name: "FamilyDetails",
    component: () =>
      import(
        /* webpackChunkName: "familydetails" */ "../views/FamilyDetailsView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
