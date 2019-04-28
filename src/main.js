import Vue from "vue";
Vue.config.productionTip = false

import './plugins/antd'
// import './plugins/lottie'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'

import rawDisplayer from "./vue/infra/raw-displayer.vue";
Vue.component("rawDisplayer", rawDisplayer);

import 'animate.css';
// Vue.prototype.$Vue = Vue;

/* // 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el, obj) {
    //这是需要页面刚加载就能进行聚焦操作使用的钩子函数,可以省略的，视具体需求而定
    //console.log(obj);
    if (obj.value) {
      //对值进行判断
      // 聚焦元素
      el.focus();
    }
  },
  // 当指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated: function(el, obj) {
    //这是每当绑定的值发生改变时触发的钩子函数
    //console.log(obj);  //可以打印看一下
    if (obj.value) {
      el.focus();
    }
  }
}); */



new Vue({
  router,
  i18n,
  store,

  render: h => h(App)
}).$mount('#app')

