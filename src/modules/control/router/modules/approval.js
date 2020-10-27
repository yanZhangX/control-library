/*
 * @Date: 2020-09-03 09:37:37
 * @LastEditors: fy
 * @LastEditTime: 2020-10-09 09:45:13
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
  }
]

export default routes
