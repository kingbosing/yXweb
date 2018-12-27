import request from '@/utils/request'
import * as CurrentAuth from '@/utils/sessionStorage' // 用户信息

var token = CurrentAuth.getMyToken()

export function GetAtdRuleList(searchStr) { // 获取列表
  return request({
    url: 'apix/v2/AtdRule/GetAtdRuleList',
    method: 'get',
    params: { token, searchStr }
  })
}

export function CreateAtdRule(data) { // 新增
  return request({
    url: 'apix/v2/AtdRule/CreateAtdRule',
    method: 'post',
    params: { token },
    data: data
  })
}

export function DeleteAtdRule(ruleId) { // 删除
  return request({
    url: 'apix/v2/AtdRule/DeleteAtdRule',
    method: 'post',
    params: { token, ruleId }
  })
}

export function GetAtdRuleDetail(ruleId) { // 获取详情
  return request({
    url: 'apix/v2/AtdRule/GetAtdRuleDetail',
    method: 'post',
    params: { token, ruleId }
  })
}
