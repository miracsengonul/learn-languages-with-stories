import Vue from "vue";
import App from "./App.vue";

import "./index.css";

import Toast from "vue-toastification";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import router from "./router";

import CountryFlag from "vue-country-flag";

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});

Vue.component("country-flag", CountryFlag);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
