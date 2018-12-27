import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function loginByUsername(username, password, imei = null, mac = null) {
  const data = {
    username,
    password,
    imei,
    mac
  }
  return request({
    url: '/Login',
    // url: '/apix/login',
    method: 'post',
    params: data
  })
}

export function logout() {
  return request({
    url: '/dev/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/apix/auth/myRole',
    method: 'get',
    params: { token }
  })
}

export function switchCompany(token, TargetCompanyId) {
  return request({
    url: 'apix/switch',
    method: 'POST',
    params: { token, TargetCompanyId }
  })
}

// /api/Employee/GetCompanyAllTree 获取公司部门及员工树
// / isGetPerson?'选人'：'选部门'
export function GetCompanyAllTree(isGetPerson = 'true', token = getToken(), deptId = 'UzgF') {
  return request({
    url: 'apix/v2/Employee/GetComanyAllTree',
    method: 'GET',
    params: { token, deptId, isGetPerson }
  })
}

// /api/auth/myRole 获取我的角色 创建者，管理员、普通成员
export function myRole(token) {
  return request({
    url: 'apix/auth/myRole',
    method: 'GET',
    params: { token }
  })
}

// get('apix/v2/auth/my')
export function myRouters(token = getToken()) {
  return request({
    url: 'apix/v2/auth/my',
    method: 'GET',
    params: { token }
  })
}

// /api/company/myCompany 获取我加入的公司信息
export function myCompany(token) {
  return request({
    url: 'apix/company/myCompany',
    method: 'GET',
    params: { token }
  })
}

// POST /api/register/sendcode 获取验证码
export function sendcode(model) {
  return request({
    url: 'apix/register/sendcode',
    method: 'POST',
    data: model
  })
}

// /api/register/Verificat 验证验证码有效性
export function Verificat(model) {
  return request({
    url: 'apix/register/Verificat',
    method: 'POST',
    data: model
  })
}

// POST /api/register/submit 提交注册
export function submit(model) {
  return request({
    url: 'apix/register/submit',
    method: 'POST',
    data: model
  })
}

// /api/account/sendcode 【通用】找回密码 - 发送验证码
export function account_sendcode(model) {
  return request({
    url: 'apix/account/sendcode',
    method: 'POST',
    data: model
  })
}

// /api/account/validatecode 【通用】找回密码 - 确认验证码
export function account_validatecode(model) {
  return request({
    url: 'apix/account/validatecode',
    method: 'POST',
    data: model
  })
}

// /api/account/reset_password 【通用】找回密码 - 设置密码
export function reset_password(model) {
  return request({
    url: 'apix/account/reset_password',
    method: 'POST',
    data: model
  })
}
