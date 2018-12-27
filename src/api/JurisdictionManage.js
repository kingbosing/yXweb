import request from '@/utils/request'
import * as CurrentAuth from '@/utils/sessionStorage' // 用户信息

var token = CurrentAuth.getMyToken()

export function GetCompanyAllTree(deptId, isGetPerson) { // 获取公司部门树
  return request({
    url: 'apix/Employee/GetCompanyAllTree',
    params: { token, deptId, isGetPerson }
  })
}

export function employee4PC(departmentId) { // 获取部门员工
  return request({
    url: 'apix/department/employee4PC',
    params: { token, departmentId, key: '' }
  })
}

export function getfunc2(profileId, departmentId) { // 获取部门内某员工的权限
  return request({
    url: 'apix/auth/getfunc2',
    params: { token, profileId, departmentId }
  })
}

export function attachFuncsToEmpolyee(ProfileId, DepartmentId, FunctionModuleIds) { // 修改权限
  return request({
    url: 'apix/auth/attachFuncsToEmpolyee',
    method: 'post',
    params: { token },
    data: { ProfileId, DepartmentId, FunctionModuleIds, FunctionPermissionIds: [] }
  })
}
export function detail(ProfileId) { // 获取某员工的信息
  return request({
    url: 'apix/Employee/detail',
    params: { token, ProfileId }
  })
}
