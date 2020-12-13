/*
 * @Date: 2020-09-03 09:37:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-10 22:32:49
 * @FilePath: /ll-web-administration/src/modules/administration/router/modules/approval.js
 */
const routes = [
  {
    path: '/approvalType',
    component: () => import('../../pages/approval/approvalType/index.vue')
  },
  {
    path: '/createNew',
    component: () => import('../../pages/approval/approvalType/createNew.vue')
  },
  {
    path: '/formList',
    name: 'formList',
    component: () => import('../../pages/formList/index.vue')
  },
  {
    path: '/formDetail',
    component: () => import('../../pages/formList/formDetail.vue')
  }
]

export default routes
