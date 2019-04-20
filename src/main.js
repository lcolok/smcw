import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'
import lottie from "vue-lottie";
import Vue from "vue";
Vue.component("lottie", lottie);
Vue.config.productionTip = false



// Vue.prototype.$Vue = Vue;

new Vue({
  router,
  i18n,
  store,
  lottie,
  render: h => h(App)
}).$mount('#app')

