import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

// 获取所有标签列表
// api/v2/customerManage/tag_Get?Token={token}
export function GetAllTag() {
  return request({
    url: 'apix/v2/customerManage/tag_Get',
    method: 'get',
    params: {
      token
    }
  })
}

// 删除标签
// api/v2/customerManage/tag_Del?Token={token}&parentTagId={parentTagId}
export function DeleteTag(parentTagId) {
  return request({
    url: 'apix/v2/customerManage/tag_Del',
    method: 'POST',
    params: {
      token, parentTagId
    }
  })
}

// 添加标签
// api/v2/customerManage/tag_Add?Token={token}&parentTagName={parentTagName}&tagStr={tagStr}
export function AddTag(parentTagName, tagStr) {
  return request({
    url: 'apix/v2/customerManage/tag_Add',
    method: 'POST',
    params: {
      token, parentTagName, tagStr
    }
  })
}

// 编辑标签
// api/v2/customerManage/tag_Edit?T
// oken={token}&parentTagId={parentTagId}&parentTagName={parentTagName}&tagStr={tagStr}
export function EditTag(parentTagId, parentTagName, tagStr) {
  return request({
    url: 'apix/v2/customerManage/tag_Edit',
    method: 'POST',
    params: {
      token, parentTagId, parentTagName, tagStr
    }
  })
}

// 获取父标签列表
// api/customertagV1/getparenttag?Token={token}
export function Getparenttag() {
  return request({
    url: 'apix/customertagV1/getparenttag',
    method: 'get',
    params: {
      token
    }
  })
}

// 客户列表
// api/v2/customerManage/customerSearch
// ?Token={token}&pageIndex={pageIndex}&pageSize={pageSize}&keyWord={keyWord}&tags={tags}
export function customerSearchList(keyWord, tags, pageIndex = 1, pageSize = 25) {
  return request({
    url: 'apix/v2/customerManage/customerSearch',
    method: 'get',
    params: {
      token, keyWord, tags, pageIndex, pageSize
    }
  })
}

// 获取客户详情【客户管理】
// api/v2/customerManage/customerDetail?Token={token}&customerId={customerId}
export function customerDetail(customerId) {
  return request({
    url: 'apix/v2/customerManage/customerDetail',
    method: 'get',
    params: {
      token, customerId
    }
  })
}

// 添加跟进记录【客户管理】
// api/v2/customerManage/addVisit?Token={token}
export function addVisit(data) {
  return request({
    url: 'apix/v2/customerManage/addVisit',
    method: 'POST',
    params: {
      token
    },
    data: {
      PhotoIds: data.PhotoIds,
      FileIds: data.FileIds,
      Content: data.Content,
      FollowTime: data.FollowTime,
      Status: data.Status,
      CustomerId: data.CustomerId
    }
  })
}

// 编辑跟进记录【客户管理】
// api/v2/customerManage/editvisit?token={token}&visitid={visitid}
export function editvisit(visitid, data) {
  return request({
    url: 'apix/v2/customerManage/editvisit',
    method: 'POST',
    params: {
      token, visitid
    },
    data
  })
}

// 获取跟进记录
// api/v2/customerManage/followList?
// Token={token}&customerId={customerId}&pageIndex={pageIndex}&pageSize={pageSize}"
export function followList(customerId, pageIndex = 1, pageSize = 100) {
  return request({
    url: 'apix/v2/customerManage/followList',
    method: 'GET',
    params: {
      token, customerId, pageIndex, pageSize
    }
  })
}

// 跟进记录添加评论【客户管理】
// api/v2/customerManage/addVisitComtent?Token={token}&visitId={visitId}&content={content}"
export function addVisitComtent(visitId, content) {
  return request({
    url: 'apix/v2/customerManage/addVisitComtent',
    method: 'POST',
    params: {
      token, visitId, content
    }
  })
}

// 删除跟进记录【客户管理】【客户管理】
// api/v2/customerManage/delVisit?Token={token}&visitId={visitId}
export function delVisit(visitId) {
  return request({
    url: 'apix/v2/customerManage/delVisit',
    method: 'POST',
    params: {
      token, visitId
    }
  })
}

// 删除客户【客户管理】 customerid
// POST /api/v2/customerManage/DelteCustomer
export function DelteCustomer(customerid) {
  return request({
    url: 'apix/v2/customerManage/DelteCustomer',
    method: 'POST',
    params: {
      token, customerid
    }
  })
}
// 更改新增 标签
export function tag_Add(parentTagName, tagStr) {
  return request({
    url: 'apix/v2/customerManage/tag_Add',
    method: 'POST',
    params: { token, parentTagName, tagStr }
  })
}
// 编辑标签
export function tag_Edit(parentTagId, parentTagName, tagStr) {
  return request({
    url: 'apix/v2/customerManage/tag_Edit',
    method: 'POST',
    params: { token, parentTagId, parentTagName, tagStr }
  })
}
// 删除标签
export function tag_Del(parentTagId) {
  return request({
    url: 'apix/v2/customerManage/tag_Del',
    method: 'POST',
    params: { token, parentTagId }
  })
}
export function employee4PC(departmentId) { // 获取部门员工
  return request({
    url: 'apix/department/employee4PC',
    params: { token, departmentId, key: '' }
  })
}

export function allDepartment() { // 获取部门
  return request({
    url: 'apix/v2/Department/allDepartment',
    params: { token }
  })
}

export function addCustomer(data) { // 新增客户
  return request({
    url: 'apix/v2/customerManage/addCustomer',
    params: { token },
    method: 'POST',
    data: data
  })
}

export function editCustomer(data) { // 编辑客户
  return request({
    url: 'apix/v2/customerManage/editCustomer',
    params: { token },
    method: 'POST',
    data: data
  })
}

export function uploadExcel(data) { // 编辑客户
  return request({
    url: 'apix/v2/customerManage/uploadExcel',
    params: { token },
    method: 'POST',
    data: data
  })
}
