import moment from 'moment'
export default {
  install(Vue, options) {
    Vue.prototype.arrange = function(source) {
      var t
      var ta
      var r = []
      for (var j = 0; j < source.length; j++) {
        var v = source[j]
        if (v != null) {
          if (t === v) {
            ta.push(t)
            t++
            continue
          }
          ta = [v]
          t = v + 1
          r.push(ta)
        }
      }
      return r
    }
    Vue.prototype.deepCopy = function(target, source) {
      for (var prop in source) {
        if (typeof source[prop] === 'object') {
          target[prop] = source[prop].constructor === Array ? [] : {}
          this.deepCopy(target[prop], source[prop])
        } else {
          target[prop] = source[prop]
        }
      }
      return target
    }
    Vue.prototype.comparedTime = function(date, time) {
      let dateTime = date + ' ' + time
      var d = new Date(Date.parse(dateTime.replace(/-/g, '/')))
      var curDate = new Date()
      let hours = moment(curDate).format('HH')
      let minutes = moment(curDate).format('mm')
      if (d < curDate) {
        if (minutes > 0 && minutes < 30) {
          return hours + ':30'
        }
        if (minutes > 30) {
          return Number(hours) + 1 + ':00'
        }
      } else {
        return time
      }
    }
  }
}
