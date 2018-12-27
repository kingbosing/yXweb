import request from '@/utils/request'

// 待阅-待办
// api/Approval/GetUnReadAndUnopt?Token={Token}
export function GetUnReadAndUnopt(token) {
  return request({
    url: 'apix/Approval/GetUnReadAndUnopt',
    method: 'get',
    params: {
      token
    }
  })
}

// 公告
// api/notice/get_mynotice
// int status, int pageIndex, int pageSize
export function get_mynotice(token, status = 0, pageIndex = 1, pageSize = 6) {
  return request({
    url: 'apix/notice/get_mynotice',
    method: 'get',
    params: {
      token,
      status,
      pageIndex,
      pageSize
    }
  })
}

// 任务
// ../apix/v2/task/GetMyTaskList?searchtype=all&pageIndex=1&pageSize=10
export function GetMyTaskList(token, searchtype = 'all', pageIndex = 1, pageSize = 6) {
  return request({
    url: 'apix/v2/task/GetMyTaskList',
    method: 'get',
    params: {
      token,
      searchtype,
      pageIndex,
      pageSize
    }
  })
}

// 打卡排名
// api/atd/ranking?Token={Token}
export function ranking(token) {
  return request({
    url: 'apix/atd/ranking',
    method: 'get',
    params: {
      token
    }
  })
}

// POST /api/company/joinQueue 获取加入公司请求
export function JoinQueue(token) {
  return request({
    url: 'apix/company/joinQueue',
    method: 'post',
    params: { token }
  })
}

// /// 搜索公司
export function Search_Company(token, CompanyCode) {
  return request({
    url: 'apix/company/sketch',
    method: 'get',
    params: { token, CompanyCode }
  })
}

// /// 发送加入申请
export function Send_joinCompany(token, model) {
  return request({
    url: 'apix/company/join',
    method: 'post',
    params: { token },
    data: model
  })
}

// /// 同意加入公司;即邀请时受邀方同意加入公司,成功返回加入公司请求队列的ID
export function JoinCompanyAgreeJoin(token, joinqueueid) {
  return request({
    url: 'apix/company/agreejoin',
    method: 'post',
    params: { token, joinqueueid }
  })
}

// /// 拒绝加入公司,即邀请时受邀方拒绝加入公司,申请时对方拒绝;以及邀请时，受邀方通过后，邀请方再拒绝
export function JoinCompanyIgnoreJoin(token, joinqueueid) {
  return request({
    url: 'apix/company/ignorejoin',
    method: 'post',
    params: { token, joinqueueid }
  })
}

// /// 申请人删除被拒绝的加入公司记录
export function JoinCompanyDelJoinrec(token, joincompanyqueueid) {
  return request({
    url: 'apix/company/deljoinrec',
    method: 'post',
    params: { token, joincompanyqueueid }
  })
}

// /api/company/createCompany 创建公司和默认部门，并加入该公司成为创建者
export function createCompany(token, model) {
  return request({
    url: 'apix/company/createCompany',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/switch 切换公司获取用户功能列表
export function switchFun(token, TargetCompanyId) {
  return request({
    url: 'apix/switch',
    method: 'post',
    params: { token, TargetCompanyId }
  })
}
