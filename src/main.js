import Vue from "vue";
Vue.config.productionTip = false

import './plugins/antd'
// import './plugins/lottie'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'


// Vue.prototype.$Vue = Vue;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')

