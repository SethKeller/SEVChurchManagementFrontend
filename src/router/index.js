import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import Congregation from '../views/Congregation.vue';
import Member from '../views/Memberinfo.vue';
import MemberDirectory from "../views/MemberDirectory.vue";

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
  },
  {
    path: "/memberinfo",
    name: "Member",
    component: Member
  },
];

const router = new VueRouter({
  routes
});

export default router;
