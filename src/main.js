import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import { create } from './utils/create.js'
Vue.prototype.$create = create

import * as filters from './filters' // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
