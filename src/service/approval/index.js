/*
 * @Date: 2020-07-02 15:44:34
 * @LastEditors: fy
 * @LastEditTime: 2020-10-09 14:29:22
 * @FilePath: /ll-web-administration/src/service/approval/index.js
 */
import { http } from '@/util/http'

// 获取所有职位集合
export function queryPosition(data) {
  return http({
    url: '/common/position/distinct/position',
    method: 'get',
    params: data
  })
}

// 根据姓名查找员工
export function queryUser(data) {
  return http({
    url: '/common/positionUserSearch/getAllUser',
    method: 'get',
    params: data
  })
}

// 获取审批分类
export function queryApprovalGroup(data) {
  return http({
    url: '/administration/approval/types',
    method: 'get',
    params: data
  })
}

// 新建审批模版
export function createApprover(data) {
  return http({
    url: '/administration/approval/types/add',
    method: 'post',
    data: data
  })
}

// 修改审批模版
export function editorApprover(data) {
  return http({
    url: '/administration/approval/types/update',
    method: 'post',
    data: data
  })
}

// 查询省份城市
export function queryAllProvinceAndCity(data) {
  return http({
    url: '/common/addressProvince/getAllProvinceAndCity',
    method: 'get',
    params: data
  })
}

// 修改模版排序（大类）
export function querySortTypes(data) {
  return http({
    url: '/administration/approval/types/sort',
    method: 'post',
    data: data
  })
}

// 修改模版排序（小类）
export function querySortList(data) {
  return http({
    url: '/administration/approval/template/sort',
    method: 'post',
    data: data
  })
}

// 启用/禁用模版
export function enableTemp(data) {
  return http({
    url: '/administration/approval/template/enable',
    method: 'get',
    params: data
  })
}

// 删除模版
export function deleteTemp(data) {
  return http({
    url: '/administration/approval/template/delete',
    method: 'get',
    params: data
  })
}

// 获取模版基础配置
export function getTempBase(data) {
  return http({
    url: '/administration/approval/template/common',
    method: 'get',
    params: data
  })
}

// 获取模版组件配置
export function getTempComps(data) {
  return http({
    url: '/administration/approval/template/control',
    method: 'get',
    params: data
  })
}

// 获取模版流程配置
export function getTempFlow(data) {
  return http({
    url: '/administration/approval/template/work/flow',
    method: 'get',
    params: data
  })
}

// 获取可以申请的模版列表
export function getMineTemp(data) {
  return http({
    url: '/administration/approval/apply/mine/template',
    method: 'get',
    params: data
  })
}

// 超管的申请模版列表
export function getSuperTemplate(data) {
  return http({
    url: '/administration/approval/apply/admin/template',
    method: 'get',
    params: data
  })
}

// 发起申请
export function submitApproval(data) {
  return http({
    url: '/administration/approval/apply',
    method: 'post',
    data: data
  })
}

// 根据token获取用户信息
export function getUserInfo(data) {
  return http({
    url: '/common/login/getUserInfo',
    method: 'get',
    params: data
  })
}

// 获取与我相关的审批列表
export function getMyApproval(data) {
  return http({
    url: '/administration/approval/list',
    method: 'get',
    params: data
  })
}

// 获取与我相关的申请列表
export function getMyApply(data) {
  return http({
    url: '/administration/approval/apply/list',
    method: 'get',
    params: data
  })
}

// 获取超管审批列表
export function getSuperList(data) {
  return http({
    url: '/administration/approval/admin/list',
    method: 'get',
    params: data
  })
}

// 获取公司列表
export function getAllCompany(data) {
  return http({
    url: '/common/comBranch/getAll',
    method: 'get',
    params: data
  })
}

// 获取审批分类列表
export function getTypeList(data) {
  return http({
    url: '/administration/approval/apply/template/all',
    method: 'get',
    params: data
  })
}

// 获取审批模版状态
export function getStatusList(data) {
  return http({
    url: '/administration/approval/apply/status',
    method: 'get',
    params: data
  })
}

// 查看具体某个审批详情
export function getApprovalDetail(data) {
  return http({
    url: '/administration/approval/apply/detail',
    method: 'get',
    params: data
  })
}

// 审核操作
export function auditApproval(data) {
  return http({
    url: '/administration/approval/apply/audit',
    method: 'post',
    data: data
  })
}

// 查看审批数据列表-后台维护人员
export function getApprovalDataBackend(data) {
  return http({
    url: '/administration/approval/apply/list/all/0',
    method: 'get',
    params: data
  })
}

// 查看审批数据列表-表单管理人
export function getApprovalDataManager(data) {
  return http({
    url: '/administration/approval/apply/list/all/1',
    method: 'get',
    params: data
  })
}

// 获取部门名称表 --用于审批类型列表中可见范围的展示
export function getDepartment(data) {
  return http({
    url: '/common/department/getCoreNameIdCode',
    method: 'get',
    params: data
  })
}

// 审批附件上传
export function uploadFiles(data) {
  return http({
    url: '/administration/approval/apply/file/upload',
    method: 'post',
    data: data
  })
}

// 获取审批数据页面分类 --- 管理人
export function getDataType(data) {
  return http({
    url: '/administration/approval/apply/template',
    method: 'get',
    params: data
  })
}

// 获取审批数据页面所有分类 --- 后台维护人
export function getDataTypeAll(data) {
  return http({
    url: '/administration/approval/apply/template/all',
    method: 'get',
    params: data
  })
}

// 获取资产分类三级联动json
export function getAssetsType(data) {
  return http({
    url: '/administration/assetMan/asset/json',
    method: 'get',
    params: data
  })
}

// 获取资产第四级
export function getAssetsDetail(data) {
  return http({
    url: '/administration/assetMan/warehouse/man',
    method: 'get',
    params: data
  })
}

// 获取包量预付群长额度列表
export function queryPrepaidGroupList(data) {
  return http({
    url: '/administration/prepaid/package/list',
    method: 'get',
    params: data
  })
}

// 修改额度
export function changeQuota(data) {
  return http({
    url: '/administration/prepaid/package/update',
    method: 'post',
    data: data
  })
}

// 导出包量预付信息
export function downQuota(data) {
  return http({
    url: '/administration/prepaid/package/export',
    method: 'get',
    params: data,
    responseType: 'arraybuffer'
  })
}
