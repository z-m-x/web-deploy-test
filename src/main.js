import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import VueCompositionAPI from "@vue/composition-api";
// Vue.use(VueCompositionAPI);
Vue.use(ElementUI);
import "./mock";
new Vue({
  router,
  store,
  render: (h) => h(App),
  watch: {
    $route: {
      handler: function(params) {
        console.log(params);
      },
      deep: true,
    },
  },
}).$mount("#app");
