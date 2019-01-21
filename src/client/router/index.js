import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// Views
import Welcome from '../views/Welcome'
import SecondPage from '../views/SecondPage'

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
    }, {
      path: '/secondpage',
      name: 'secondpage',
      component: SecondPage,
    }, {
      // use Laravels native 404 page
      path: '*',
      beforeEnter(to, from, next) {
        window.location = "/404"
      }
    }
  ],
})