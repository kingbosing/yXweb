
import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()
// console.log(token)
// POST /api/v2/BusarManage/AddOrEditSubject 新增/编辑科目
export function AddOrEditSubject(BusarSubject) {
  return request({
    url: 'apix/v2/BusarManage/AddOrEditSubject',
    method: 'post',
    params: { token },
    data: BusarSubject
  })
}

// POST /api/v2/BusarManage/UseOrForbidSubject 启用/禁用科目
export function UseOrForbidSubject(keyid, type) {
  return request({
    url: 'apix/v2/BusarManage/UseOrForbidSubject',
    method: 'post',
    params: { keyid, type, token }
  })
}

// POST /api/v2/BusarManage/DeleteSubject 删除科目
export function DeleteSubject(keyid) {
  return request({
    url: 'apix/v2/BusarManage/DeleteSubject',
    method: 'post',
    params: { token, keyid }
  })
}
// type 类别(1-资产 2-负债 3-权益 4-成本 5-损益)
// GET /api/v2/BusarManage/GetSubjectCode 获取科目编码
export function GetSubjectCode(type, parentid) {
  return request({
    url: 'apix/v2/BusarManage/GetSubjectCode',
    method: 'get',
    params: { token, type, parentid }
  })
}

// GET /api/v2/BusarManage/GetSubjectList 获取后台科目列表
export function GetSubjectList(type, subjectname) {
  return request({
    url: 'apix/v2/BusarManage/GetSubjectList',
    method: 'get',
    params: { token, type, subjectname }
  })
}

// GET /api/v2/BusarManage/GetSubjectDropDownList 获取科目下拉列表
// 1-凭证科目 2-切换科目
// 类型(0-全部 1-资产 2-负债 3-权益 4-成本 5-损益)
export function GetSubjectDropDownList(style, type) {
  return request({
    url: 'apix/v2/BusarManage/GetSubjectDropDownList',
    method: 'get',
    params: { token, style, type }
  })
}

// GET /api/v2/BusarManage/GetParameterSetting 获取当前科目参数设置
export function GetParameterSetting() {
  return request({
    url: 'apix/v2/BusarManage/GetParameterSetting',
    method: 'get',
    params: { token }
  })
}
// POST /api/v2/BusarManage/SaveParameterSetting 保存科目参数设置
export function SaveParameterSetting(BusarParameter) {
  return request({
    url: 'apix/v2/BusarManage/SaveParameterSetting',
    method: 'post',
    params: { token },
    data: BusarParameter
  })
}

// GET /api/v2/BusarManage/GetEarlyList 获取财务期初列表
export function GetEarlyList(type) {
  return request({
    url: 'apix/v2/BusarManage/GetEarlyList',
    method: 'get',
    params: { token, type }
  })
}

// POST /api/v2/BusarManage/SaveEarlyFinancial 保存财务期初
export function SaveEarlyFinancial(SaveEarly) {
  return request({
    url: 'apix/v2/BusarManage/SaveEarlyFinancial',
    method: 'post',
    params: { token },
    data: SaveEarly
  })
}

// GET /api/v2/BusarManage/JudgeNeedTip 判断是否需要提示
// type 1-会计科目 2-财务期初（第一、二步） 3-财务期初（第三步）4-初始化管理
export function JudgeNeedTip(type) {
  return request({
    url: 'apix/v2/BusarManage/JudgeNeedTip',
    method: 'get',
    params: { token, type }
  })
}

// GET /api/v2/BusarManage/CalculateBalance 试算平衡
export function CalculateBalance() {
  return request({
    url: 'apix/v2/BusarManage/CalculateBalance',
    method: 'get',
    params: { token }
  })
}

export function OpenAccount() {
  return request({
    url: 'apix/v2/BusarManage/OpenAccount',
    method: 'get',
    params: { token }
  })
}
export function AccountIsOpen() {
  return request({
    url: 'apix/v2/BusarManage/AccountIsOpen ',
    method: 'get',
    params: { token }
  })
}
