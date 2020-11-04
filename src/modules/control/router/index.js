/*
 * @Date: 2020-09-03 09:33:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-04 21:38:41
 * @FilePath: /ll-web-administration/src/modules/administration/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages'
import Dashboard from '../pages/dashboard'
import AuthorizeError from '../pages/authorizeError'
import Login from '../pages/loginRegister/login/index.vue'
import Page404 from '@/Page404'
import approval from './modules/approval'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch((err) => err)
}

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
          redirect: '/formList'
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
      path: '/authorizeError',
      name: 'authorizeError',
      component: AuthorizeError
    },
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
