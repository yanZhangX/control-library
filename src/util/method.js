import { message } from 'ant-design-vue'

export function getToken() {
  return ''
}

const mcMessage = function() {}

mcMessage.error = function(content) {
  message.error(content)
}
mcMessage.success = function(content) {
  message.success(content)
}
mcMessage.warning = function(content) {
  message.warning(content)
}
export const messageInstance = mcMessage

/**
 * 复制对象
 * @param {Object} obj source
 * @return {Object} 返回复制的对象
 */
export function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj))
}
/**
 * 根据日期返回week
 * @param {String} date 日期
 * @return {String} 周几
 */
export function weekDayByDate(date) {
  let dt = new Date(date)
  let weekday = ['7', '1', '2', '3', '4', '5', '6']
  return weekday[dt.getDay()]
}
/**
 * 删除对象空属性值
 * @param {Object} obj 对象
 * @return {Object} 对象
 */
export function formatObject(obj) {
  for (var key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return obj
}

export function exportExcel(data, excelName = '导出数据') {
  var blob = new Blob([data])
  let downloadElement = document.createElement('a')
  let href = window.URL.createObjectURL(blob) // 创建下载的链接
  downloadElement.href = href
  downloadElement.download = new Date().toLocaleString() + excelName + '.xlsx' // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}
