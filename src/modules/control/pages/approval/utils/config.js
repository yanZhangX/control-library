/*
 * @Date: 2020-07-14 14:53:01
 * @LastEditors: fy
 * @LastEditTime: 2020-08-20 14:46:09
 * @FilePath: /nearby-oa-public/src/modules/approval/utils/config.js
 */

const start = {
  type: 0,
  list: [],
  postType: 0,
  sponsor: [] // 发起人列表
}

const condition = {
  type: 2,
  list: [], // 子元素列表
  conditionList: []
}

const approver = {
  type: 1,
  list: [],
  postList: [], // 审核人列表
  postType: 1 // 审核人类型，职位或者人
}

export default { start, condition, approver }
