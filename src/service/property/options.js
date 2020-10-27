import { http } from '@/util'
let path = {
  classificationAdd: '/administration/assetMan/asset/add/cla', // 新增资产分类
  assetsAdd: '/administration/assetMan/asset/add', // 新增/编辑资产
  distribution: '/administration/assetMan/asset/distribution', // 将资产主动分配给指定人员
  reback: '/administration/assetMan/return/asset', // 归还资产
  editBinding: '/administration/assetMan/binding/phone', // 修改绑定信息
  addBankAccount: '/finance/payconfig/offline/bank/add' // 新增线下支付账户
}
export function addClassification(data) {
  return http({
    url: path.classificationAdd,
    method: 'post',
    data
  })
}
export function addAssets(data) {
  return http({
    url: path.assetsAdd,
    method: 'post',
    data
  })
}

export function distributeAssets(data) {
  return http({
    url: path.distribution,
    method: 'post',
    data
  })
}

export function rebackAsset(data) {
  return http({
    url: path.reback,
    method: 'post',
    data
  })
}

export function editBinding(data) {
  return http({
    url: path.editBinding,
    method: 'post',
    data
  })
}
export function addOfflineBank(data) {
  return http({
    url: path.addBankAccount,
    method: 'post',
    data
  })
}
