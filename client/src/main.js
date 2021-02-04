/*
 * @Author: **
 * @Date: 2021-01-31 16:05:21
 * @LastEditTime: 2021-02-04 14:26:28
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'

import './http'
import moment from 'moment'
Vue.prototype.$moment = moment

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
