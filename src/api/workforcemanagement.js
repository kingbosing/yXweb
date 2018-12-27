import request from '@/utils/request'
import * as CurrentAuth from '@/utils/sessionStorage' // 用户信息

var token = CurrentAuth.getMyToken()

export function GetAtdSchedulingList(pageIndex, pageSize, searchStr) { // 获取列表
  return request({
    url: 'apix/v2/AtdRule/GetAtdSchedulingList',
    method: 'get',
    params: { token, pageIndex, pageSize, searchStr }
  })
}

export function GetAtdRules() { // 获取班次列表
  return request({
    url: 'apix/v2/AtdRule/GetAtdRules',
    method: 'get',
    params: { token }
  })
}

export function CreateWiFi(data) { // 添加WIFI
  return request({
    url: 'apix/v2/AtdRule/CreateWiFi',
    method: 'post',
    params: { token },
    data: data
  })
}
export function CreateAtdScheduling(data) { // 新增排班
  return request({
    url: 'apix/v2/AtdRule/CreateAtdScheduling',
    method: 'post',
    params: { token },
    data: data
  })
}
export function GetAtdSchedulingDetail(atdScheduingId) { // 编辑排班
  return request({
    url: 'apix/v2/AtdRule/GetAtdSchedulingDetail',
    params: { token, atdScheduingId }
  })
}

export function CycleScheduling(data) { // 设置周期
  return request({
    url: 'apix/v2/AtdRule/CycleScheduling',
    method: 'post',
    params: { token },
    data: data
  })
}
export function WisdomScheduling(data) { // 设置智慧
  return request({
    url: 'apix/v2/AtdRule/WisdomScheduling',
    method: 'post',
    params: { token },
    data: data
  })
}
export function DeleteAtdScheduling(atdScheduingId) { // 删除排班
  return request({
    url: 'apix/v2/AtdRule/DeleteAtdScheduling',
    method: 'post',
    params: { token, atdScheduingId }
  })
}
export function GetProfileWorkDays(atdSchedulingId, date, pageIndex, pageSize, searchStr) { // 个人排班详情
  return request({
    url: 'apix/v2/AtdRule/GetProfileWorkDays',
    method: 'get',
    params: { token, atdSchedulingId, date, pageIndex, pageSize, searchStr }
  })
}

export function SaveDeptWorkDays(data) { // 保存排班
  return request({
    url: 'apix/v2/AtdRule/SaveDeptWorkDays',
    method: 'post',
    params: { token },
    data: data
  })
}
export function GetDeptWorkDays(atdSchedulingId) { // 根据ID 获取默认排班
  return request({
    url: 'apix/v2/AtdRule/GetDeptWorkDays',
    method: 'get',
    params: { token, atdSchedulingId }
  })
}
export function SavePersonalWorkDays(data) { // 保存个人
  return request({
    url: 'apix/v2/AtdRule/SavePersonalWorkDays',
    method: 'post',
    params: { token },
    data: data
  })
}
