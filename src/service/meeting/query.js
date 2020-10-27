import { http } from '@/util/http'
import { stringify } from 'qs'
import { meetAuthUrl } from '../config'
let path = {
  getApproval: meetAuthUrl + '/confRoomMan/getApproval', // 获取审批列表
  getMeApplication: meetAuthUrl + '/confRoomMan/getMeApplication', // 获取我的申请列表
  getRoomMessage: meetAuthUrl + '/confRoomMan/getRoomMessage', // 获取审批列表
  getAppointment: meetAuthUrl + '/confRoomMan/getAppointment', // 时间段预约状态
  getApplyRoom: meetAuthUrl + '/confRoomMan/getApplyRoom', // 获取会议室列表
  getRecommendRoom: meetAuthUrl + '/confRoomMan/getRecommendRoom', // 获取推荐会议室列表
  getAllRoom: meetAuthUrl + '/confRoomMan/getAllRoom' // 获取会议室列表
}

export function queryApproval(data) {
  return http({
    url: path.getApproval,
    method: 'post',
    data: stringify(data)
  })
}
export function queryMyApply(data) {
  return http({
    url: path.getMeApplication,
    method: 'post',
    data: stringify(data)
  })
}
export function queryMeeting(data) {
  return http({
    url: path.getRoomMessage,
    method: 'post',
    data: stringify(data)
  })
}
export function getAppointment(data) {
  return http({
    url: path.getAppointment,
    method: 'get',
    params: data
  })
}
export function getApplyRoom(data) {
  return http({
    url: path.getApplyRoom,
    method: 'get',
    params: data
  })
}
export function getRecommendRoom(data) {
  return http({
    url: path.getRecommendRoom,
    method: 'get',
    params: data
  })
}
export function queryAllRoom(data) {
  return http({
    url: path.getAllRoom,
    method: 'get',
    params: data
  })
}
