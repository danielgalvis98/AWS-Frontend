import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import RegisterClient from './components/RegisterClient';

const routes = [
  {
    path: '/registerClient',
    component: RegisterClient
  }
]

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({ routes })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
