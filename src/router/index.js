import Vue from "vue";
import VueRouter from "vue-router";
import Congregation from '../views/Congregation.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/congregation",
    name: "Congregation",
    component: Congregation
  },
];

const router = new VueRouter({
  routes
});

export default router;
