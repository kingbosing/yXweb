import request from '@/utils/request'

// /api/department/employee4PC 获取公司或部门直属成员信息--PC版需求
export function Employee4PC(token, departmentId, key) {
  return request({
    url: 'apix/department/employee4PC',
    method: 'get',
    params: { token, departmentId, key }
  })
}

// /// 获取员工详细信息
export function GetEmployeeDetail(token, profileid) {
  return request({
    url: 'apix/employee/detail',
    method: 'get',
    params: { token, profileid }
  })
}

// /api/department/setleader 设置部门领导人
export function Setleader(token, model) {
  return request({
    url: 'apix/department/setleader',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/companyjob/getcategory 获取职位类别
export function Getcategory(token, key) {
  return request({
    url: 'apix/companyjob/getcategory',
    method: 'get',
    params: { token, key }
  })
}

// /api/companyjob/getjob 获取职位
export function Getjob(token, _categoryID, key) {
  return request({
    url: 'apix/companyjob/getjob',
    method: 'get',
    params: { token, _categoryID, key }
  })
}

// /api/Employee/add 添加新员工
export function Add(token, model) {
  return request({
    url: 'apix/Employee/add',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/Employee/modify 修改员工详细信息,成功返回员工ID号
export function Modify(token, model) {
  return request({
    url: 'apix/Employee/modify',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/Employee/leaved 设置员工为离职状态
export function SetEmployeeLeaved(token, EmployeePorfileId) {
  return request({
    url: 'apix/Employee/leaved',
    method: 'post',
    params: { token, EmployeePorfileId }
  })
}

// 查找新同事
export function FindnewColleague(token, XiaoYingCode) {
  return request({
    url: 'apix/profile',
    method: 'get',
    params: { token, XiaoYingCode }
  })
}

// 新同事列表
export function ToNewColleague(token, pageIndex, pageSize) {
  return request({
    url: 'apix/company/newColleagues1',
    method: 'post',
    params: { token, pageIndex, pageSize }
  })
}
// /api/company/checkjoin check是否已加入公司
export function Checkjoin(token, checkId) {
  return request({
    url: 'apix/company/invitejoin',
    method: 'get',
    params: { token, checkId }
  })
}
// 邀请加入公司
export function InvitenewColleague(token, XiaoYingHao) {
  return request({
    url: 'apix/company/invitejoin',
    method: 'post',
    params: { token, XiaoYingHao }
  })
}

// /api/company/ignorejoin 拒绝加入公司,即邀请时受邀方拒绝加入公司,申请时对方拒绝;以及邀请时，受邀方通过后，邀请方再拒绝
export function RefuseJoin(token, JoinQueueId) {
  return request({
    url: 'apix/company/ignorejoin',
    method: 'post',
    params: { token, JoinQueueId }
  })
}

// 从新同事列表中删除(对方撤销申请, 对方撤销邀请)
export function DelnewColleague(token, NewColleagueId) {
  return request({
    url: 'apix/company/delnewColleague',
    method: 'post',
    params: { token, NewColleagueId }
  })
}
