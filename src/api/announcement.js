import request from '@/utils/request'
// /// 获取我的公告列表(全部公告和我的公告)
export function Get_mynotice(token, status, pageIndex, pageSize) {
  // console.log(token, status, pageIndex, pageSize)
  return request({
    url: 'apix/notice/get_mynotice',
    method: 'get',
    params: { token, status, pageIndex, pageSize }
  })
}

// /// 删除
export function Remove(token, noticeId) {
  return request({
    url: 'apix/notice/remove',
    method: 'post',
    params: { token, noticeId }
  })
}

// /// 获取公告列表（草稿库使用）
export function Get_list(token, status, pageIndex, pageSize) {
  return request({
    url: 'apix/notice/get_list',
    method: 'get',
    params: { token, status, pageIndex, pageSize }
  })
}

// 获取公告详情
export function Get_detail(token, noticeId) {
  return request({
    url: 'apix/notice/get_detail',
    method: 'get',
    params: { token, noticeId }
  })
}

// 新建
export function Add_update(token, model) {
  return request({
    url: 'apix/notice/add_update',
    method: 'post',
    params: { token },
    data: model
  })
}

// 获取公告类型
export function Get_type(token) {
  return request({
    url: 'apix/notice/get_type',
    method: 'get',
    params: { token }
  })
}

// /api/notice/getuserroletype 获取用户角色
export function getuserroletype(token) {
  return request({
    url: 'apix/notice/getuserroletype',
    method: 'get',
    params: { token }
  })
}
