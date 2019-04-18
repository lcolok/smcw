import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'
import lottie from "vue-lottie";
import Vue from "vue";
Vue.component("lottie", lottie);
Vue.config.productionTip = false

import AV from 'leancloud-storage'

import current_app_id from '!raw-loader!../.leancloud/current_app_id';
import current_app_key from '!raw-loader!../.leancloud/current_app_key';

AV.init({
  appId: current_app_id,
  appKey: current_app_key,
})

Vue.prototype.$AV = AV;

// Vue.prototype.$Vue = Vue;

new Vue({
  router,
  i18n,
  store,
  lottie,
  render: h => h(App)
}).$mount('#app')

