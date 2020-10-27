import { http } from '@/util/http'
import { stringify } from 'qs'
import { meetAuthUrl } from '../config'
let path = {
  addApplyRoom: meetAuthUrl + '/confRoomMan/addApplyRoom', // 用户申请会议室表单提交
  approvalReject: meetAuthUrl + '/confRoomMan/approvalReject', // 会议室管理审批驳回
  consentApproval: meetAuthUrl + '/confRoomMan/consentApproval', // 会议室管理审批申请审批同意
  updateFeedback: meetAuthUrl + '/confRoomMan/updateFeedback', // 会议室管理审批反馈
  addConRoom: meetAuthUrl + '/confRoomMan/addConRoom', // 管理员新增/修改会议室（有ID修改，无ID新增）
  delRoomMessage: meetAuthUrl + '/confRoomMan/delRoomMessage', // 管理员删除会议室
  cancelTheConsent: meetAuthUrl + '/confRoomMan/cancelTheConsent' // 已同意情申请况下取消
}
export function addApplyRoom(data) {
  return http({
    url: path.addApplyRoom,
    method: 'post',
    data: stringify(data)
  })
}
export function approvalReject(data) {
  return http({
    url: path.approvalReject,
    method: 'post',
    data: stringify(data)
  })
}
export function consentApproval(data) {
  return http({
    url: path.consentApproval,
    method: 'get',
    params: data
  })
}
export function updateFeedback(data) {
  return http({
    url: path.updateFeedback,
    method: 'get',
    params: data
  })
}
export function addConRoom(data) {
  return http({
    url: path.addConRoom,
    method: 'post',
    data: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  })
}
export function delRoom(data) {
  return http({
    url: path.delRoomMessage,
    method: 'get',
    params: data
  })
}
export function cancelRoomApply(data) {
  return http({
    url: path.cancelTheConsent,
    method: 'get',
    params: data
  })
}
