import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styling
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
