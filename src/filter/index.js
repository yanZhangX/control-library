import Vue from 'vue'
Vue.filter('replaceDate', function(date) {
  return date.replace(/-/g, '/')
})
Vue.filter('formatWeekDay', function(num) {
  let week = ''
  switch (num) {
    case '1':
      week = '周一'
      break
    case '2':
      week = '周二'
      break
    case '3':
      week = '周三'
      break
    case '4':
      week = '周四'
      break
    case '5':
      week = '周五'
      break
    case '6':
      week = '周六'
      break
    case '7':
      week = '周日'
      break
  }
  return week
})
Vue.filter('managerStatus', (status) => {
  let result = ''
  switch (status) {
    case 1:
      result = '试用'
      break
    case 2:
      result = '正式'
      break
    case 0:
      result = '离职'
      break
  }
  return result
})
