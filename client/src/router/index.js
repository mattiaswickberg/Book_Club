import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import MainLoggedIn from '@/components/MainLoggedIn'
import CreateAccount from '@/components/CreateAccount'
import Authorisation from '@/components/Authorisation'
import MyBooks from '@/components/MyBooks'
import AddBookCase from '@/components/AddBookCase'
import Book from '@/components/Book'
import BookCase from '@/components/BookCase'
import Profile from '@/components/Profile'
import SearchResult from '@/components/SearchResult'
import p404 from '@/components/404'
import p403 from '@/components/403'
import p500 from '@/components/500'
import AccountCreated from '@/components/AccountCreated'
import ViewBookDetails from '@/components/ViewBookDetails'
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
      path: '/mainloggedin',
      name: 'MainLoggedIn',
      component: MainLoggedIn
    },
    {
      path: '/createaccount',
      name: 'CreateAccount',
      component: CreateAccount
    },

    {
      path: '/auth',
      redirect: '/mainloggedin'
    },

    {
      path: '/mybooks',
      name: 'MyBooks',
      component: MyBooks
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
      path: '/bookcase',
      name: 'BookCase',
      component: BookCase
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/searchresult/:search',
      name: 'SearchResult',
      component: SearchResult,
      props: true
    },
    {
      path: '/viewBookDetails',
      name: 'ViewBookDetails',
      component: ViewBookDetails
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
