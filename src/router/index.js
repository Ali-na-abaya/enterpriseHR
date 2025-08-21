import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import JobDetail from "../components/JobDetail.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/job/:id", component: JobDetail },
];

export default createRouter({
  history: createWebHistory("/enterpriseHR/"),
  routes,
});
