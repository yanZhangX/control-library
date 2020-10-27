import { http, copyObj } from '@/util'
let path = {
  assetsList: '/administration/assetMan/asset/all', // 所有资产
  classificationList: '/administration/assetMan/asset/all/cla', // 分类列表
  assetClassJson: '/administration/assetMan/asset/json', // 查询资产分类三级联动
  myAssetsList: '/administration/assetMan/asset/mine', // 查询我的资产列表
  warehouseList: '/administration/assetMan/warehouse/man', // 查询仓库管理
  useListForCompany: '/administration/assetMan/management/company', // 查询使用管理：站点
  useListForDept: '/administration/assetMan/management/dept', // 查询使用管理：部门
  assetsDetail: '/administration/assetMan/asset/detail', // 查询资产详情
  operateLog: '/administration/assetMan/asset/operate/log', // 查询使用记录
  bindingLog: '/administration/assetMan/asset/binding/inf', // 查询绑定记录
  changeDisableType: '/administration/assetMan/asset/change/cla', // 启用/禁用分类
  distPerson: '/administration/assetMan/distribution/person', // 资产分配人员列表
  useDetailAllasset: '/administration/assetMan/use/all/asset', // 使用管理-查询资产详情
  getAssetBinding: '/administration/assetMan/get/binding', // 获取绑定资料
  WarehouseExport: '/administration/assetMan/export/warehouse', // 仓库管理Excel导出
  checkedAsset: '/administration/assetMan/confirm/asset', // 确认收到资产
  getAllAnnex: '/administration/assetMan/get/annex', // 查询所有资产附件
  purchaseList: '/administration/asset/procurement/list', // 本公司资产采购列表
  purchaseListAdmin: '/administration/asset/procurement/list/all', // 本公司所有资产采购列表
  applyDetail: '/administration/approval/apply/detail', // 查看审批数据详情
  procurement: '/administration/asset/procurement/statistics', // 本公司资产采购统计
  allCompany: '/common/comBranch/getAll', // 获取所有分公司
  allUser: '/common/positionUserSearch/getAllUser', // 获取公司所有员工
  getCompanyByFinance: '/common/comBranch/getCompanyByFinance', // 分公司列表(财务管理)
  bankenterpriseBank: '/finance/bankenterprise/query/bank', // 查询开户行
  bankConfig: '/finance/payconfig/apply/fee/bank/config', // 请款出纳制单获取付款账号配置
  applyFee: '/finance/company/apply/fee', // 请款报销申请
  applyFeeUpdate: '/finance/company/apply/fee/update', // 请款报销编辑
  myFeeDetail: '/finance/company/apply/fee/my/detail', // 查看请款报销详情
  myFeeAccount: '/finance/company/apply/fee/my/account', // 查询自己请款报销历史使用账号
  feeTypeTree: '/finance/company/apply/fee/type/tree' // 使用费用类型
}

export function getAllAnnex(params) {
  return http({
    url: path.getAllAnnex,
    method: 'get',
    params
  })
}

export function queryAssetsList(params) {
  return http({
    url: path.assetsList,
    method: 'get',
    params
  })
}
export function queryClassification(params) {
  return http({
    url: path.classificationList,
    method: 'get',
    params
  })
}
export function queryAssetClassJson(params) {
  return http({
    url: path.assetClassJson,
    method: 'get',
    params
  })
}
export function queryMyAssetsList(params) {
  return http({
    url: path.myAssetsList,
    method: 'get',
    params
  })
}
export function queryWarehouseList(params) {
  return http({
    url: path.warehouseList,
    method: 'get',
    params
  })
}
export function queryUseListForCompany(data) {
  let params = copyObj(data)
  if (params.companyId === undefined) {
    params.companyId = ''
  }
  return http({
    url: path.useListForCompany,
    method: 'get',
    params
  })
}
export function queryUseListForDept(params) {
  return http({
    url: path.useListForDept,
    method: 'get',
    params
  })
}
export function queryAssetsDetail(params) {
  return http({
    url: path.assetsDetail,
    method: 'get',
    params
  })
}
export function queryOperateLog(params) {
  return http({
    url: path.operateLog,
    method: 'get',
    params
  })
}
export function queryBindingLog(params) {
  return http({
    url: path.bindingLog,
    method: 'get',
    params
  })
}
export function changeDisableType(params) {
  return http({
    url: path.changeDisableType,
    method: 'get',
    params
  })
}
export function queryDistPerson(params) {
  return http({
    url: path.distPerson,
    method: 'get',
    params
  })
}

export function useDetailAllasset(params) {
  return http({
    url: path.useDetailAllasset,
    method: 'get',
    params
  })
}

export function getAssetBinding(params) {
  return http({
    url: path.getAssetBinding,
    method: 'get',
    params
  })
}

export function exportWarehouse(params) {
  return http({
    url: path.WarehouseExport,
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}

export function checkedAsset(params) {
  return http({
    url: path.checkedAsset,
    method: 'get',
    params
  })
}
export function queryPurchaseList(params) {
  return http({
    url: path.purchaseList,
    method: 'get',
    params
  })
}
export function queryPurchaseListAdmin(params) {
  return http({
    url: path.purchaseList,
    method: 'get',
    params
  })
}
export function queryApplyDetail(params) {
  return http({
    url: path.applyDetail,
    method: 'get',
    params
  })
}
export function queryAllCompany(data) {
  return http({
    url: path.allCompany,
    method: 'get',
    params: data
  })
}
export function getFinanceCompanyList(data) {
  return http({
    url: path.getCompanyByFinance,
    method: 'get',
    params: data
  })
}
export function getCompanyUser(data) {
  return http({
    url: path.allUser,
    method: 'get',
    params: data
  })
}
export function getBankenterpriseBank(data) {
  return http({
    url: path.bankenterpriseBank,
    method: 'get',
    params: data
  })
}
export function getBankConfig(data) {
  return http({
    url: path.bankConfig,
    method: 'get',
    params: data
  })
}
export function cashOutAdd(data) {
  return http({
    url: path.applyFee,
    method: 'get',
    params: data
  })
}
export function cashOutEdit(data) {
  return http({
    url: path.applyFeeUpdate,
    method: 'get',
    params: data
  })
}
export function getFeeMyDetail(data) {
  return http({
    url: path.myFeeDetail,
    method: 'get',
    params: data
  })
}
export function getMyAccount(data) {
  return http({
    url: path.myFeeAccount,
    method: 'get',
    params: data
  })
}
export function getCostTypes(data) {
  return http({
    url: path.feeTypeTree,
    method: 'get',
    params: data
  })
}
