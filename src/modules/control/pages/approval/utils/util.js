/*
 * @Date: 2020-07-28 10:26:36
 * @LastEditors: fy
 * @LastEditTime: 2020-09-24 10:34:45
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/utils/util.js
 */
// 处理各种事件，包装data，并返回包装后的data，提供方法
import config from './config.js'
import _ from 'lodash'

export class Utils {
  static id = -1

  static createNodes(type, data) {
    let res = _.cloneDeep(config[type])
    if (res.type !== 0) {
      res.parentId = data.id
    } else {
      res.parentId = -1
    }
    res.id = this.createId(data)
    console.log(res.id)

    return res
  }

  static getPrevdata(data, source) {
    if (data.parentId === source.id) return source
    if (source.list.length === 1) {
      let res = this.getPrevdata(data, source.list[0])
      if (res) {
        return res
      }
    }
    if (source.list.length > 1) {
      for (let c of source.list) {
        let res = this.getPrevdata(data, c)
        if (res) {
          return res
        }
      }
    }
  }

  static delNodes(data, source) {
    let prevData = this.getPrevdata(data, source)
    if (prevData.list.length === 1 || prevData.list.length === 2) {
      // 删除，并且移交节点关系
      prevData.list = []
    }
    if (prevData.list.length > 2) {
      // 删除一个节点
      let index = prevData.list.findIndex((item) => item.id === data.id)
      prevData.list.splice(index, 1)
    }
  }

  static createId(data) {
    // let id = this.id + 1
    // this.id++

    if (data) {
      if (data.list.length === 0) {
        this.id = Math.max(data.id, this.id)
      } else {
        data.list.forEach((item) => {
          this.createId(item)
        })
      }
    }
    ++this.id
    return this.id
  }

  static addApprover(data) {
    let obj = Utils.createNodes('approver', data)
    data.list.map((item) => (item.parentId = obj.id))
    obj.list = data.list
    data.list = []
    data.list.push(obj)
  }

  static addCondition(data) {
    if (data.list.length === 0) {
      let obj1 = Utils.createNodes('condition', data)
      let obj2 = Utils.createNodes('condition', data)
      data.list.push(obj1, obj2)
    } else {
      let obj1 = Utils.createNodes('condition', data)
      data.list.push(obj1)
    }
  }

  static sign(data, parent) {
    if (!data) return
    if (data.type === 0) {
      data.level = 0
      data.flowSerialNumber = 0
    } else {
      data.level = parent.type === 0 ? parent.level + 1 : parent.type === 1 ? parent.level + 1 : parent.level
      data.flowSerialNumber = data.level
    }

    if (data.list.length === 0) return
    data.list.map((item) => {
      this.sign(item, data)
    })
  }

  static checkEmpty(data) {
    if (data.type === 1) {
      if (data.postList.length === 0) return true
    }

    if (data.type === 2) {
      if (data.conditionList.length === 0) {
        return true
      }
      for (let i = 0; i < data.conditionList.length; i++) {
        if (!data.conditionList[i].content || !data.conditionList[i].field || !data.conditionList[i].operator) {
          return true
        }
      }
    }

    if (data.list.length > 0) {
      for (let i = 0; i < data.list.length; i++) {
        return this.checkEmpty(data.list[i])
      }
    }
  }

  static checkRequired(data) {
    let required = false
    data.forEach((item) => {
      if (item.required) {
        required = true
      }
    })
    return required
  }
}

export function initData(start) {
  let startNode = Utils.createNodes('start')
  startNode.sponsor = start
  return startNode
}
