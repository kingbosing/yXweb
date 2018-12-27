import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'
import {
  getMyProfileId
} from '@/utils/auth'
// import { getMyCompanys } from '@/utils/sessionStorage'
const token = getToken()
const profile = getMyProfileId()
// const company =
// 获取职位类别
export function Getcategory(key) {
  return request({
    url: 'apix/companyjob/getcategory',
    method: 'get',
    params: {
      token,
      key
    }
  })
}

// 判断该职位类别是否存在
export function IsExistCategory(name) {
  return request({
    url: 'apix/companyjob/isexistcategory',
    method: 'post',
    params: {
      token,
      name
    }
  })
}

// 添加职位类别
export function Addcategory(categroyName, companycode) {
  return request({
    url: 'apix/companyjob/addcategory',
    method: 'post',
    params: {
      token
    },
    data: {
      CategroyName: categroyName,
      CompanyId: companycode,
      CreatorId: profile
    }
  })
}

// 查询职位类别下是否员工
export function Isexistempolyee_category(_id) {
  return request({
    url: 'apix/companyjob/Isexistempolyee_category',
    method: 'get',
    params: {
      token,
      _id
    }
  })
}
// 删除职位类别
export function Deletecategory(_id) {
  return request({
    url: 'apix/companyjob/deletecategory',
    method: 'post',
    params: {
      token,
      _id
    }
  })
}

// 修改职位类别
export function Renamecategory(_id, name) {
  return request({
    url: 'apix/companyjob/renamecategory',
    method: 'post',
    params: {
      token,
      _id,
      name
    }
  })
}

// 获取职位
export function Getjob(_categoryID, key) {
  return request({
    url: 'apix/companyjob/getjob',
    method: 'get',
    params: {
      token,
      _categoryID,
      key
    }
  })
}

// 判断职位是否已经存在
export function Isexistjob(name, id, cid) {
  return request({
    url: 'apix/companyjob/Isexistjob',
    method: 'post',
    params: {
      token,
      name,
      id,
      cid
    }
  })
}
// 添加职位
export function Addjob(CompanyJobAddModel) {
  CompanyJobAddModel.CreatorId = profile
  return request({
    url: 'apix/companyjob/create',
    method: 'post',
    params: {
      token
    },
    data: CompanyJobAddModel
  })
}
// 编辑职位
export function Editjob(CompanyJobAddModel) {
  CompanyJobAddModel.CreatorId = profile
  return request({
    url: 'apix/companyjob/edit',
    method: 'post',
    params: {
      token
    },
    data: CompanyJobAddModel
  })
}

// 查询职位下是否有员工
export function Isexistempolyee(_id) {
  return request({
    url: 'apix/companyjob/isexistempolyee',
    method: 'get',
    params: {
      token,
      _id
    }
  })
}

// 删除职位
export function Deletejob(_id) {
  return request({
    url: 'apix/companyjob/delete',
    method: 'post',
    params: {
      token,
      _id
    }
  })
}
