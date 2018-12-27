import request from '@/utils/request'
import * as CurrentAuth from '@/utils/sessionStorage' // 用户信息
var token = CurrentAuth.getMyToken()

export function GetEmpKpiStatisGeneralList(dt, pageSize, pageIndex) { // 获取列表
  return request({
    url: 'apix/KPIStatis/GetEmpKpiStatisGeneralList',
    params: { token, dt, pageSize, pageIndex }
  })
}

export function GetMonthTotalTable(pid, dt) { // 获取列表
  return request({
    url: 'apix/KPIStatis/GetMonthTotalTable',
    params: { token, pid, dt }
  })
}

export function GetWorkMonthReportDetail(pid, dt) { // 获取列表
  return request({
    url: 'apix/KPIStatis/GetWorkMonthReportDetail',
    params: { token, pid, dt }
  })
}

export function check_man_details(pid, dt) { // 获取月通用考核表
  return request({
    url: 'apix/KPIStatis/check_man_details',
    params: { token, pid, dt }
  })
}

export function GetWorkDayReportDetail(pid, dt, searchId) { // 获取日表
  return request({
    url: '/apix/KPIStatis/GetWorkDayReportDetail',
    params: { token, pid, dt, searchId }
  })
}

export function GetWorkItemTypes() { // 获取类别
  return request({
    url: '/apix/KPIRule/GetWorkItemTypes',
    params: { token }
  })
}
