import request from '@/utils/request'
import * as CurrentAuth from '@/utils/sessionStorage' // 用户信息

var token = CurrentAuth.getMyToken()

export function company(CompanyCode) { // 获取公司
  return request({
    url: 'apix/card/company',
    method: 'get',
    params: { token, CompanyCode }
  })
}

export function GetPersonalInfo(CompanyCode, profileid) { // 获取公司
  return request({
    url: 'apix/v2/card/GetPersonalInfo',
    method: 'get',
    params: { token, CompanyCode, profileid }
  })
}

export function SetCardBackUrl(data) { // 设置名片背面
  return request({
    url: 'apix/v2/card/SetCardBackUrl',
    method: 'post',
    params: { token },
    data: data
  })
}

export function SetCardFrontUrl(data) { // 设置名片正面
  return request({
    url: 'apix/v2/card/SetCardFrontUrl',
    method: 'post',
    params: { token },
    data: data
  })
}
