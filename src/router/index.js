import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Congregation from "../views/Congregation.vue";
import Searchtest from "../views/Searchtest.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/congregation",
    name: "Congregation",
    component: Congregation
  },
  {
    path: "/search",
    name: "search",
    component: Searchtest
  }
];

const router = new VueRouter({
  routes
});

export default router;
