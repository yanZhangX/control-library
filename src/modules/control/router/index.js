/*
 * @Date: 2020-09-03 09:33:07
 * @LastEditors: fy
 * @LastEditTime: 2020-09-03 10:03:13
 * @FilePath: /ll-web-administration/src/modules/administration/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages'
import Dashboard from '../pages/dashboard'
import Login from '../pages/loginRegister/login/index.vue'
import Page404 from '@/Page404'
import approval from './modules/approval'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: Index,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
          redirect: '/createNew'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    ...approval,
    {
      path: '/error',
      name: 'page404',
      component: Page404
    },
    {
      path: '*',
      redirect: '/error'
    }
  ]
})

export default router
