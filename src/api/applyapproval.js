import request from '@/utils/request'

// 我的申请--进行中
// $"api/Apply/RecordV1?Token={token}&search={search}&PageIndex={PageIndex}&PageSize={PageSize}"
export function RecordV1(token, PageIndex, PageSize, search = '') {
  return request({
    url: 'apix/Apply/RecordV1',
    method: 'get',
    params: { token, search, PageIndex, PageSize }
  })
}

// 我的申请--已结束
// api/Apply/historyV1?Token={token}&search={search}&PageIndex={PageIndex}&PageSize={PageSize}
export function historyV1(token, PageIndex, PageSize, search = '') {
  return request({
    url: 'apix/Apply/historyV1',
    method: 'get',
    params: { token, search, PageIndex, PageSize }
  })
}

// 排布方式 我的申请：theStats-->>1;我的审批：theStats-->>2；申请凭证：theStats-->>3
// api/config/set_myApplyListType?Token={token}&newStats={newStats}
// api/config/set_myApproveListType?Token={token}&newStats={newStats}";
export function set_myListType(token, newStats, theStats) {
  const url = 'apix/config/' + ((theStats === 1) && 'set_myApplyListType' || (theStats === 2) && 'set_myApproveListType' || (theStats === 3) && 'set_myApplyResListType')
  return request({
    url: url,
    method: 'get',
    params: { token, newStats }
  })
}

// 待我审批
// api/Approval/myV1?Token={token}&search={search}&PageIndex={PageIndex}&PageSize={PageSize}
export function ApprovalV1(token, PageIndex, PageSize, search = '') {
  return request({
    url: 'apix/Approval/myV1',
    method: 'get',
    params: { token, search, PageIndex, PageSize }
  })
}

// 我已审批
// api/Approval/historyV1?Token={token}&search={search}&PageIndex={PageIndex}&PageSize={PageSize}
export function Approval_historyV1(token, PageIndex, PageSize, search = '') {
  return request({
    url: 'apix/Approval/historyV1',
    method: 'get',
    params: { token, search, PageIndex, PageSize }
  })
}

// 申请凭证列表
// api/Apply/myExcute?Token={token}&pageIndex={pageIndex}&pageSize={pageSize}&searchText={searchText}
export function myExcute(token, PageIndex, PageSize, searchText = '') {
  return request({
    url: 'apix/Apply/myExcute',
    method: 'get',
    params: { token, searchText, PageIndex, PageSize }
  })
}

// 申请审批详情
// 我的申请详情type=1,ApprovalID='';审批详情type=2;凭证详情type=3,ApprovalID='';
// api/apply/detail?token={token}&applyrequestid={applyrequestId}
export function GetDetail(token, applyrequestid, type, ApprovalID = '') {
  const url = (type === 1) && 'apix/apply/detail' || (type === 2) && 'apix/Approval/recorddetail' || (type === 3) && 'apix/apply/detail'
  return request({
    url: url,
    method: 'get',
    params: { token, applyrequestid, ApprovalID }
  })
}

// 撤销申请
// api/apply/revoke?token={token}&applyrequestid={applyrequestid}
export function revoke(token, applyrequestid) {
  return request({
    url: 'apix/apply/revoke',
    method: 'POST',
    params: { token, applyrequestid }
  })
}

// 越级
// api/Apply/Skip?Token={token}
export function Skip(token, ApplyRequestId, LeaderId, LeaderDepartmentId, BranchId) {
  return request({
    url: 'apix/Apply/Skip',
    method: 'POST',
    params: { token },
    data: { ApplyRequestId, LeaderId, LeaderDepartmentId, BranchId }

  })
}

// 审批
// 同意并通过  api/approval/agreeandpass  type==1
// 同意并转交  api/approval/agreeandnext  type==2
// 拒接  api/approval/refuse  type==3
// ApplyRequestId, ApplyDepartmentId, ApprovalDepartmentId, Remark, PhotoIDs, FileIDs, NextApprover, ExecutProfileId, VideoIDs = [], VoiceIDs = []
export function ToApproval(token, type, Data) {
  const url = (type === 1) && 'apix/approval/agreeandpass' || (type === 2) && 'apix/approval/agreeandnext' || (type === 3) && 'apix/approval/refuse'
  return request({
    url: url,
    method: 'POST',
    params: { token },
    data: Data
  })
}

// /**
//  *  申请列表--主页
//  *  api/approvaltype/gettype?Token={token}
//  *
//  **/

export function gettype(token) {
  return request({
    url: 'apix/approvaltype/gettype',
    method: 'GET',
    params: { token }

  })
}

// 获取登录人的岗位信息
// api/Employee/myjobs?token={token}&profileId={profileId}
export function myjobs(token, profileId) {
  return request({
    url: 'apix/Employee/myjobs',
    method: 'GET',
    params: { token, profileId }

  })
}

// 创建审批申请
// api/Apply/CreateV4?Token={token}
export function CreateApplyRequest(token, Data) {
  return request({
    url: 'apix/Apply/CreateV4',
    method: 'POST',
    params: { token },
    data: Data
  })
}

// 获取考勤规则--补卡
// api/atd/get_rule_day?Token={token}&date={date}
export function get_rule_day(token, date) {
  return request({
    url: 'apix/atd/get_rule_day',
    method: 'GET',
    params: { token, date }
  })
}

// api/ApprovalType/gettemplate
/** 获取申请模板-全部
 *
 * @param {*} token
 */
export function gettemplate(token) {
  return request({
    url: 'apix/ApprovalType/gettemplate',
    method: 'GET',
    params: { token }

  })
}
