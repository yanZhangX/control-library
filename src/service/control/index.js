/*
 * @Author: xiangty
 * @Date: 2020-11-01 23:50:56
 * @LastEditTime: 2020-11-29 16:41:50
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
// 修改表单接口
export function formUpdate(data) {
  return http({
    url: '/api/v1/form/updateFromRecord',
    method: 'post',
    data
  })
}
export function formListQuery(params) {
  return http({
    url: '/api/v1/form/getTemplateListByPc',
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
// 下拉框动态查询的接口
export function getTableData(params) {
  return http({
    url: '/api/v1/form/getTableData',
    method: 'get',
    params
  })
}
// 删除表单数据（模版）
export function removeTemplate(params) {
  return http({
    url: '/api/v1/form/removeTemplate',
    method: 'get',
    params
  })
}
