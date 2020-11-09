/*
 * @Author: xiangty
 * @Date: 2020-11-01 23:50:56
 * @LastEditTime: 2020-11-09 22:36:59
 * @LastEditors: Please set LastEditors
 * @Description: 控件库接口
 * @FilePath: \control-library\src\service\control\index.js
 */
import { http } from '@/util/http'

// 插入表单接口
export function formInsert(data) {
  return http({
    url: '/api/v1/form/addFromRecord',
    method: 'post',
    data
  })
}
export function formListQuery(params) {
  return http({
    url: '/api/v1/form/list',
    method: 'get',
    params
  })
}
export function formDetailQuery(params) {
  return http({
    url: '/api/v1/form/getTemplate',
    method: 'get',
    params
  })
}
// 注册
export function registerUser(data) {
  return http({
    url: '/api/v1/user/registerUser',
    method: 'post',
    data
  })
}
// 登录
export function loginUser(data) {
  return http({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}
