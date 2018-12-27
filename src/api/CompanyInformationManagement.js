import request from '@/utils/request'
import * as CurrentAuth from '@/utils/sessionStorage' // 用户信息

var token = CurrentAuth.getMyToken()

export function getCompanyInformation(CompanyCode) {
  return request({
    url: 'apix/company/info',
    method: 'get',
    params: { token, CompanyCode }
  })
}
