import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MemberDirectory from "../views/MemberDirectory.vue";
import Congregation from "../views/Congregation.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/directory",
    name: "Directory",
    component: MemberDirectory
  },
  {
    path: "/congregation",
    name: "Congregation",
    component: Congregation
  }
];

const router = new VueRouter({
  routes
});

export default router;
