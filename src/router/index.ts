import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Main from "../views/Main.vue";
import CreateNew from "../views/CreateNew.vue";
import MyConfessions from "../views/MyConfessions.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/createnew",
    name: "CreateNew",
    component: CreateNew,
  },
  {
    path: "/myconfessions",
    name: "MyConfessions",
    component: MyConfessions,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
