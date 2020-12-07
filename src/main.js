import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import Vue2Filters from 'vue2-filters'


import RegisterClient from './components/RegisterClient';
import ProductList from './components/ProductList';

const routes = [
  {
    path: '/',
    component: ProductList
  },
  {
    path: '/registerClient',
    component: RegisterClient
  }
]

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vue2Filters)


const router = new VueRouter({ routes })

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
