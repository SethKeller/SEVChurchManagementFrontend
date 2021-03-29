import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Congregation from "../views/Congregation.vue";
import Searchtest from "../views/Searchtest.vue";
import Member from "../views/Memberinfo.vue";
import MemberDirectory from "../views/MemberDirectory.vue";
import FamilyEdit from "../views/FamilyEdit.vue";
import Login from "../views/Login.vue";

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
  {
    path: "/family-info",
    name: "FamilyEdit",
    component: FamilyEdit
  },
  {
    path: "/search",
    name: "search",
    component: Searchtest
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: () => import("../views/Profile.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
