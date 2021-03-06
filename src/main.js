import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vue2Filters from 'vue2-filters'


import Amplify, { Auth } from 'aws-amplify';
import '@aws-amplify/ui-vue';

import VueRouter from 'vue-router'
import RegisterClient from './components/RegisterClient';
import SignIn from './components/SignIn';
import ProductList from './components/ProductList';
import ClientsList from './components/ClientsList';
import OrdersList from './components/OrdersList';

import store from './store'

const routes = [
  {
    path: '/',
    component: ProductList
  },
  {
    path: '/registerClient',
    component: RegisterClient
  },
  {
    path: '/login',
    component: SignIn
  },
  {
    path: '/clients',
    component: ClientsList
  },
  {
    path:'/orders',
    component: OrdersList
  }
]

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vue2Filters)


const router = new VueRouter({ routes })

Amplify.configure({
  Auth: {
    userPoolId: 'us-west-2_FHM4sGPFy',
    region: 'us-west-2',
    userPoolWebClientId: '5evqpun27f7rt6scielggprb63'
  }
})

Auth.configure({
  Auth: {
    userPoolId: 'us-west-2_FHM4sGPFy',
    region: 'us-west-2',
    userPoolWebClientId: '5evqpun27f7rt6scielggprb63'
  }
});

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
