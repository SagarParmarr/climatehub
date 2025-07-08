import { createRouter, createWebHistory } from "vue-router";

import routes from "./router/index";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
