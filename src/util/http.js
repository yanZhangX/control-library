/*
 * @Date: 2020-09-03 09:33:07
 * @LastEditors: fy
 * @LastEditTime: 2020-09-24 11:18:34
 * @FilePath: /ll-web-administration/src/util/http.js
 */
import axios from 'axios'
import { getToken, messageInstance } from './method'
// import Vue from 'vue'

export let BASE_URL = 'https://oas.lianlianlvyou.com'

if (process.env.NODE_ENV !== 'production') {
  // 开发网关
  // BASE_URL = 'http://192.168.10.124:32001'
  // BASE_URL = 'http://192.168.101.216:8081'
  // BASE_URL = 'http://192.168.10.124:32011'
  // 行政系统
  // 外网穿透的
  // BASE_URL = 'http://adminstration.free.vipnps.vip'
  // 本地
  BASE_URL = 'http://192.168.100.87:8080' // 杨永玲
}

let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: { Authorization: getToken() }
})
instance.interceptors.request.use((config) => {
  if (!getToken()) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('没有token')
    }
    return Promise.reject(new Error('用户失效'))
  }
  let reqUrl = config.url || ''
  config.url = reqUrl
  return config
})
// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 如果返回的是arraybuffer
    if (response.config.responseType === 'arraybuffer') {
      try {
        // 如果JSON.parse(enc.decode(new Uint8Array(res.data)))不报错，说明后台返回的是json对象，则弹框提示
        // 如果JSON.parse(enc.decode(new Uint8Array(res.data)))报错，说明返回的是文件流，进入catch，下载文件
        let enc = new TextDecoder('utf-8')
        let res = JSON.parse(enc.decode(new Uint8Array(response.data))) // 转化成json对象
        messageInstance.error(res.message)
        return Promise.reject(new Error(res.message))
      } catch (err) {
        return Promise.resolve(response.data)
      }
    }

    // todo 修改拦截器
    const body = response.data || {}
    const { code, message } = body
    switch (code) {
      case 1002:
      case 1001:
        messageInstance.error(message)
        return code
      case 10001:
        return Promise.reject(new Error('用户失效'))
      case 500:
        return Promise.reject(new Error('processed'))
      case 401:
        return Promise.reject(new Error('processed'))
      default:
        return body.data // TODO 直接返回数据，业务不用关心code和message
    }
  },
  () => {
    // 对响应错误做点什么
    return Promise.reject(new Error('processed'))
  }
)

export const http = instance
