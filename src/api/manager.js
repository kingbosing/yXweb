import request from '@/utils/request'

// 操作日志
export function GetoPerationLog(token, pageSize, pageIndex, editItem, id, man) {
  return request({
    url: 'apix/KPIoplog/get',
    method: 'get',
    params: { token, pageSize, pageIndex, editItem, id, man }
  })
}

// 查询管理员列表
export function Getmanager(token) {
  return request({
    url: 'apix/manager/get',
    method: 'get',
    params: { token }
  })
}

// 删除管理员
export function Delmanager(token, ids) {
  return request({
    url: 'apix/manager/delete',
    method: 'post',
    params: { token },
    data: ids
  })
}

// 添加管理员
export function Addmanager(token, ids) {
  console.log(ids)
  return request({
    url: 'apix/manager/add',
    method: 'post',
    params: { token },
    data: ids
  })
}

// 设置管理员功能模块
export function Setmanagerfunc(token, profileid, ids) {
  return request({
    url: 'apix/manager/setmanagerfunc',
    method: 'post',
    params: { token, profileid },
    data: ids
  })
}
// 获取管理员模块
export function Getmanagermodule(token, profileid) {
  return request({
    url: 'apix/manager/getmanagermodule',
    method: 'get',
    params: { token, profileid }
  })
}

// /// 组织架构管理
// 获取组织架构
export function AllDepartment(token) {
  return request({
    url: 'apix/Department/allDepartment',
    method: 'get',
    params: { token }
  })
}

// 添加单元 POST /api/department/add 创建我所在公司的部门
export function AddDepartment(token, model) {
  return request({
    url: 'apix/department/add',
    method: 'post',
    params: { token },
    data: model
  })
}

// POST /api/department/edit 修改某部门功能
export function EditDepartment(token, model) {
  return request({
    url: 'apix/department/edit',
    method: 'post',
    params: { token },
    data: model
  })
}

// POST /api/department/del 删除部门
export function DelDepartment(token, departmentId) {
  return request({
    url: 'apix/department/del',
    method: 'post',
    params: { token, departmentId }
  })
}

// 添加审批类型
// api/approvaltype/create?token={token}&name={name}
export function addApprovalType(token, name) {
  return request({
    url: 'apix/approvaltype/create',
    method: 'post',
    params: { token, name }
  })
}

// 刪除審批類型
// api/approvaltype/delete?token={token}&id={id}
export function deleteApprovalType(token, id) {
  return request({
    url: 'apix/approvaltype/delete',
    method: 'post',
    params: { token, id }
  })
}

// 重命名
// api/approvaltype/rename?token={token}&id={id}&name={name}
export function renameApprovalType(token, id, name) {
  return request({
    url: 'apix/approvaltype/rename',
    method: 'post',
    params: { token, id, name }
  })
}

// 修改模板状态
// api/approvaltype/modifytemplate?
// Token={token}&id={id}&enable={enable}&typeid={typeId}
export function modifytemplate(token, id, typeid, enable) {
  return request({
    url: 'apix/approvaltype/modifytemplate',
    method: 'post',
    params: { token, id, typeid, enable }
  })
}

// 刪除模板
// api/approvaltype/deletetemplate?token={token}&id={id}
export function deletetemplate(token, id) {
  return request({
    url: 'apix/approvaltype/deletetemplate',
    method: 'post',
    params: { token, id }
  })
}

// 获取模板
// api/approvaltype/gettemplate?token={token}
export function gettemplate(token) {
  return request({
    url: 'apix/approvaltype/gettemplate',
    method: 'GET',
    params: { token }
  })
}

// 添加模板
// api/approvaltype/addtemplate?token={token}&typeid={typeId}&ids={ids}
export function addtemplate(token, typeid, ids) {
  return request({
    url: 'apix/approvaltype/addtemplate',
    method: 'post',
    params: { token, typeid, ids }
  })
}
