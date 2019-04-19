import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'


import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
  iconfont: ['mdi','md']
})
