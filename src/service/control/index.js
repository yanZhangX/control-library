/*
 * @Author: xiangty
 * @Date: 2020-11-01 23:50:56
 * @LastEditTime: 2020-11-04 00:26:43
 * @LastEditors: Please set LastEditors
 * @Description: 控件库接口
 * @FilePath: \control-library\src\service\control\index.js
 */
import { http } from '@/util/http'

// 插入表单接口
export function formInsert(data) {
  return http({
    url: '/api/v1/form/insert',
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
export function formDetailQuery(data) {
  return http({
    url: '/api/v1/form/query',
    method: 'post',
    data
  })
}
