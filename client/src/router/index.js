import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
