import request from '@/utils/request'
import * as CurrentAuth from '@/utils/sessionStorage' // 用户信息

var token = CurrentAuth.getMyToken()
// 上传图片
export function FileUpload(Data, FileName, Category, Size) { // FileName, Category, Size
  return request({
    url: 'apix/file/FileUpload',
    method: 'post',
    params: { token },
    data: { Data, FileName, Category, Size, Duration: '' }
  })
}
// 添加公司介绍
export function addDescription(Title, Content) { // FileName, Category, Size
  return request({
    url: 'apix/company/addDescription',
    method: 'post',
    params: { token },
    data: { Title, Content }
  })
}
// 修改公司介绍
export function modifyDescription(ID, Title, Content) { // FileName, Category, Size
  return request({
    url: 'apix/company/modifyDescription',
    method: 'post',
    params: { token },
    data: { ID, Title, Content }
  })
}
// 删除公司介绍
export function delDescription(companyDescriptionId) { // FileName, Category, Size
  return request({
    url: 'apix/company/delDescription',
    method: 'post',
    params: { token, companyDescriptionId }
  })
}
// 修改公司信息
export function modifyCompany(data) { // FileName, Category, Size
  return request({
    url: 'apix/company/modifyCompany',
    method: 'post',
    params: { token },
    data: data
  })
}
// 获取公司信息
export function getCompanyInformation(CompanyCode) {
  return request({
    url: 'apix/company/info',
    method: 'get',
    params: { token, CompanyCode }
  })
}
