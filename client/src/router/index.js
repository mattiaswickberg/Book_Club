import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import CreateAccount from '@/components/CreateAccount'
import Authorisation from '@/components/Authorisation'
import Account from '@/components/Account'
import AddBookCase from '@/components/AddBookCase'
import Book from '@/components/Book'
import BookCase from '@/components/BookCase'
import EditAccount from '@/components/EditAccount'
import SearchResult from '@/components/SearchResult'
import ViewBook from '@/components/ViewBook'
import p404 from '@/components/404'
import p403 from '@/components/403'
import p500 from '@/components/500'
import AccountCreated from '@/components/AccountCreated'
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
    },
    {
      path: '/accountcreated',
      name: 'Account Created',
      component: AccountCreated
    },
    {
      path: '/addbookcase',
      name: 'AddBookCase',
      component: AddBookCase
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    },
    {
      path: '/viewbook',
      name: 'ViewBook',
      component: ViewBook
    },
    {
      path: '/bookcase',
      name: 'BookCase',
      component: BookCase
    },
    {
      path: '/editaccount',
      name: 'EditAccount',
      component: EditAccount
    },
    {
      path: '/searchresult/:search',
      name: 'SearchResult',
      component: SearchResult,
      props: true
    },
    {
      path: '/404',
      name: '404',
      component: p404
    },
    {
      path: '/403',
      name: '403',
      component: p403
    },
    {
      path: '/500',
      name: '500',
      component: p500
    }
  ]
})
