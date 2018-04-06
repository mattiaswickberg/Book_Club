import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import CreateAccount from '@/components/CreateAccount'
import Authorisation from '@/components/Authorisation'
import Account from '@/components/Account'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },

    {
      path: '/createaccount',
      name: 'CreateAccount',
      component: CreateAccount
    },

    {
      path: '/auth',
      name: 'Authorisation',
      component: Authorisation
    },

    {
      path: '/account',
      name: 'Account',
      component: Account
    }
  ]
})
