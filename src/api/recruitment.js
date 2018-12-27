import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

/**
 * 添加公司福利标签
 * api/recruitfirmV1/addwelfare?Token={currentToken}&title={title}
 * title
 */
export function addwelfare(title) {
  return request({
    url: 'recruitapi/recruitfirmV1/addwelfare',
    method: 'POST',
    params: {
      token, title
    }
  })
}

/**
 * 查询公司福利标签
 * api/recruitfirmV1/addwelfare?Token={currentToken}&title={title}
 *
 */
export function welfarelist() {
  return request({
    url: 'recruitapi/recruitfirmV1/welfarelist',
    method: 'GET',
    params: {
      token
    }
  })
}

/**
 * 删除公司福利标签
 * api/recruitfirmV1/delwelfare?Token={currentToken}&welId={welId}
 * welId
 */
export function delwelfare(welId) {
  return request({
    url: 'recruitapi/recruitfirmV1/delwelfare',
    method: 'POST',
    params: {
      token, welId
    }
  })
}

/**
 * 获取企业信息
 * api/recruitfirmV1/get_firm?Token={currentToken}
 * welId
 */
export function getdatefirm() {
  return request({
    url: 'recruitapi/recruitfirmV1/get_firm',
    method: 'GET',
    params: {
      token
    }
  })
}

/**
 * 更新企业基本信息
 * api/recruitfirmV1/updatefirm?Token={currentToken}
 * welId
 */
export function updatefirm(data) {
  return request({
    url: 'recruitapi/recruitfirmV1/updatefirm',
    method: 'POST',
    params: {
      token
    },
    data
  })
}

/** 获取（10-行业类型；20-职位类型）
 * GET api/recruitjobV1/get_enums?Token={Token}&type={type}&parentId={parentId}
 * type	（10-行业类型；20-职位类型）
 * parentId	(父级传空；子级传父级ID)
 */
export function getEnums(type, parentId) {
  return request({
    url: 'recruitapi/recruitjobV1/get_enums',
    method: 'GET',
    params: {
      token, type, parentId
    }
  })
}

/** 图片、语音上传
 * POST api/file/FileUpload?Token={Token}
 *
 */
export function FileOrImgUpload(token, Data, FileName, Category, Size, Duration = '') { // FileName, Category, Size
  return request({
    url: 'recruitapi/file/FileUpload',
    method: 'post',
    params: { token },
    data: { Data, FileName, Category, Size, Duration }
  })
}

/** 图片转存
 * POST api/file/PicFileUpload?Token={Token}&
 * filePath={filePath}&FileName={FileName}&Category={Category}&Size={Size}
 */
export function imgUpload(token, filePath, FileName, Size, Category = 1) {
  return request({
    url: 'recruitapi/file/PicFileUpload',
    method: 'post',
    params: { token, filePath, FileName, Category, Size }
  })
}

/** 获取面试邀请模板列表
 * GET api/recruitfirmV1/get_inms?Token={Token}
 */
export function get_inmsList() {
  return request({
    url: 'recruitapi/recruitfirmV1/get_inms',
    method: 'GET',
    params: { token }
  })
}

/** 删除面试邀请模板
 * POST api/recruitfirmV1/del_inm?Token={Token}&imId={imId}
 */
export function del_inm(imId) {
  return request({
    url: 'recruitapi/recruitfirmV1/del_inm',
    method: 'POST',
    params: { token, imId }
  })
}

/** 添加面试邀请模板（成功返回ID）
 * POST api/recruitfirmV1/add_inm?Token={Token}
 *          Id: '',
            Title: '',
            TheContent: '',
            Phone: '',
            Linkman: '',
            Email: '',
            Address: '',
            BusLine: ''
 */
export function add_inm(data) {
  return request({
    url: 'recruitapi/recruitfirmV1/add_inm',
    method: 'POST',
    params: { token },
    data
  })
}

/**
 * 更新面试邀请模板
 * POST api/recruitfirmV1/update_inm?Token={Token}
 */
export function update_inm(data) {
  return request({
    url: 'recruitapi/recruitfirmV1/update_inm',
    method: 'POST',
    params: { token },
    data
  })
}

/** 获取信息登记表信息
 * GET api/recruitfirmV1/get_rsinfo?Token={Token}
 */
export function get_rsinfo() {
  return request({
    url: 'recruitapi/recruitfirmV1/get_rsinfo',
    method: 'GET',
    params: { token }
  })
}

/** 添加信息登记表自定义模块
 * POST api/recruitfirmV1/add_rc?Token={Token}&title={title}
 */
export function add_rc(title) {
  return request({
    url: 'recruitapi/recruitfirmV1/add_rc',
    method: 'POST',
    params: { token, title }
  })
}

/** 删除信息登记表自定义模块
 * POST api/recruitfirmV1/del_rc?Token={Token}&customId={customId}
 */
export function del_rc(customId) {
  return request({
    url: 'recruitapi/recruitfirmV1/del_rc',
    method: 'POST',
    params: { token, customId }
  })
}

/** 招聘设置-设置信息登记表
 * POST api/recruitfirmV1/update_regist?Token={Token}
 */
export function update_regist(data) {
  return request({
    url: 'recruitapi/recruitfirmV1/update_regist',
    method: 'POST',
    params: { token },
    data
  })
}

/** ************职位发布********************/

/**
 * 获取职位发布列表
 * GET api/recruitjobV1/get_joblist?Token={Token}&depId={depId}&pageIndex={pageIndex}&pageSize={pageSize}&sta={sta}
 */
export function get_joblist(sta, pageIndex, pageSize, depId = '', keyword = '') {
  return request({
    url: 'recruitapi/recruitjobV1/get_joblist',
    method: 'GET',
    params: { token, sta, depId, pageIndex, pageSize, keyword }
  })
}

/** (10-部门枚举；20-岗位枚举)用于简历管理(职位列表)筛选
 * GET api/lbs/get_deppos?Token={Token}&type={type}&parentId={parentId}
 */
export function get_deppos(type = 10, parentId = '') {
  return request({
    url: 'recruitapi/lbs/get_deppos',
    method: 'GET',
    params: { token, type, parentId }
  })
}

/** 更新职位状态
 * POST api/recruitjobV1/updatejob_status?Token={Token}&jobId={jobId}&status={status}
 */
export function updatejob_status(jobId, status) {
  return request({
    url: 'recruitapi/recruitjobV1/updatejob_status',
    method: 'POST',
    params: { token, jobId, status }
  })
}

/** 删除职位
 * POST api/recruitjobV1/deljob?Token={Token}&jobId={jobId}
 */
export function deljob(jobId) {
  return request({
    url: 'recruitapi/recruitjobV1/deljob',
    method: 'POST',
    params: { token, jobId }
  })
}

/** 获取区域信息【Web】
 * parentId	(获取省份默认传1；获取城市传省份ID)
 * GET api/lbs/region_pc?parentId={parentId}
 */
export function region_pc(parentId = 1) {
  return request({
    url: 'recruitapi/lbs/region_pc',
    method: 'GET',
    params: { parentId }
  })
}

/** 获取职位类别
 * api/companyjob/getjob?Token="+Token+"&_categoryID="+ categoryId+ "&key="+ key
 * @param {*} _categoryID
 * @param {*} key
 */
export function getjob(_categoryID = '', key = '') {
  return request({
    url: 'apix/companyjob/getjob',
    method: 'GET',
    params: { token, _categoryID, key }
  })
}

/** 获取职位类别
 * api/companyjob/getcategory
 * @param {*} _categoryID
 * @param {*} key
 */
export function getcategory(key = '') {
  return request({
    url: 'apix/companyjob/getcategory',
    method: 'GET',
    params: { token, key }
  })
}

/** 职位（保存/去发布）
 * POST api/recruitjobV1/addjob?Token={Token}
 * @param {*} data
 * Status [发布中,未发布,已暂停]
 * data.Id?'保存/去发布':'编辑'
 */
export function addjob(data) {
  const url = data.Id ? 'recruitapi/recruitjobV1/updatejob' : 'recruitapi/recruitjobV1/addjob'
  return request({
    url: url,
    method: 'POST',
    params: { token },
    data
  })
}

/** 获取职位详情
 * GET api/recruitjobV1/get_jobinfo?Token={Token}&jobId={jobId}
 * @param {*} jobId
 */
export function get_jobinfo(jobId) {
  return request({
    url: 'recruitapi/recruitjobV1/get_jobinfo',
    method: 'GET',
    params: { token, jobId }
  })
}

/** 职位发布搜索列表
 * GET api/recruitjobV1/get_joblist?Token={Token}&keyword={keyword}&pageIndex={pageIndex}&pageSize={pageSize}
 * @param {*} keyword
 * @param {*} pageIndex
 * @param {*} pageSize
 */
export function get_searchjoblist(keyword, pageIndex, pageSize) {
  return request({
    url: 'recruitapi/recruitjobV1/get_joblist',
    method: 'GET',
    params: { token, keyword, pageIndex, pageSize }
  })
}

/** ***************************************** */

/**
 * 获取简历列表
 * resumemanageV1/getresumebystatus
 * @param {*} status 新投递：status=0，感兴趣：status=1，待面试：status=2，待录用：status=3，待入职：status=4
 * @param {*} deptId
 * @param {*} jobId
 * @param {*} timeType
 * @param {*} pageIndex
 * @param {*} pageSize
 */
export function getresumebystatus(status, deptId, jobId, timeType, pageIndex, pageSize) {
  return request({
    url: 'recruitapi/resumemanageV1/getresumebystatus',
    method: 'GET',
    params: { token, status, deptId, jobId, timeType, pageIndex, pageSize }
  })
}

/** 简历库
 * GET api/resumemanageV1/resumelibrary?Token={Token}
 * @param {*} status 0:通过，-1:不通过
 * @param {*} deptId
 * @param {*} jobId
 * @param {*} timeType
 * @param {*} pageIndex
 * @param {*} pageSize
 */
export function resumelibrary(status, deptId, jobId, timeType, pageIndex, pageSize) {
  return request({
    url: 'recruitapi/resumemanageV1/resumelibrary',
    method: 'GET',
    params: { token, status, deptId, jobId, timeType, pageIndex, pageSize }
  })
}

/** 简历详情
 * GET api/resumemanageV1/resumedetail?Token={Token}
 * @param {*} resumeId
 * @param {*} orderId
 * @param {*} scan ['新投递','感兴趣','搜索简历','其他']
 * @param {*} isScan
 */
export function resumedetail(resumeId, orderId, scan, isScan) {
  return request({
    url: 'recruitapi/resumemanageV1/resumedetail',
    method: 'GET',
    params: { token, resumeId, orderId, scan, isScan }
  })
}

/** 感兴趣
 * api/resumemanageV1/resumeinterest?Token={currentToken}&resumeId={resumeId}&status={status}
 * @param {*} resumeId
 * @param {*} status 0：不感兴趣；1感兴趣
 */
export function resumeinterest(resumeId, status) {
  return request({
    url: 'recruitapi/resumemanageV1/resumeinterest',
    method: 'POST',
    params: { token, resumeId, status }
  })
}

/** 申请沟通
 * POST api/resumemanageV1/applysend?Token={Token}&orderId={orderId}&resumeId={resumeId}
 * @param {*} resumeId
 * @param {*} orderId
 */
export function applysend(resumeId, orderId) {
  return request({
    url: 'recruitapi/resumemanageV1/applysend',
    method: 'POST',
    params: { token, resumeId, orderId }
  })
}
/**
 * 获取所有城市信息
 * GET api/lbs/region_all
 */
export function region_all() {
  return request({
    url: 'recruitapi/lbs/region_all',
    method: 'Get'
  })
}

/** 简历搜索
 * GET api/resumemanageV1/search?
 * @param {*} cityName
 * @param {*} districtName
 * @param {*} work
 * @param {*} study
 * @param {*} salary
 * @param {*} time
 * @param {*} jobName
 * @param {*} pageIndex
 * @param {*} pageSize
 */
export function doSearch(cityName, districtName, work, study, salary, time, jobName, pageIndex, pageSize) {
  return request({
    url: 'recruitapi/resumemanageV1/search',
    method: 'Get',
    params: { token, cityName, districtName, work, study, salary, time, jobName, pageIndex, pageSize }
  })
}
/** 不通過
 * api/resumemanageV1/resumeunpass
 * @param {*} data
 * OrderId      订单Id
 * Status -1:感兴趣不通过， -2:投递不通过，-3:面试不通过，-4:待录用，-5:入职不通过
 * Reason       不通过原因
 * Evaluation1  专业技能
 * Evaluation2  沟通能力
 * Evaluation3  个人素养
 * Evaluation4  总体评价
 */
export function resumeunpass(data) {
  return request({
    url: 'recruitapi/resumemanageV1/resumeunpass',
    method: 'POST',
    params: { token },
    data
  })
}

/** 邀请面试（投递）
 * POST api/resumemanageV1/inviteinterview?Token={Token}
 * @param {*} data
 *
    OrderId: this_s.OrderId,
    InterviewDept: this_s.getDep,
    InterviewDeptId:this_s.DepId,
    InterviewJob: this_s.getPosition,
    InterviewJobId: this_s.workId,
    InviteTemp: this_s.InviteTempId,
    InterviewTime: Time,
    Status:2
 */
export function inviteinterview(data) {
  return request({
    url: 'recruitapi/resumemanageV1/inviteinterview',
    method: 'POST',
    params: { token },
    data
  })
}

/** 待录用(面試通過)
 * POST api/resumemanageV1/invitentry?Token={Token}
 * @param {*} data
* OrderId: this.OrderId,
  InterviewDept: this.FormforInvite.depName,
  InterviewDeptId: this.FormforInvite.depId,
  InterviewJob: this.FormforInvite.jobName,
  InterviewJobId: this.FormforInvite.jobId,
  Evaluation1: this.Evaluation1,
  Evaluation2: this.Evaluation2,
  Evaluation3: this.Evaluation3,
  Evaluation4: this.Evaluation4,
  Status:3
 */
export function invitentry(data) {
  return request({
    url: 'recruitapi/resumemanageV1/invitentry',
    method: 'POST',
    params: { token },
    data
  })
}

/** 待入职(确认入职)
 * POST api/resumemanageV1/entryconfirm?Token={Token}
 * @param {*} data
* OrderId: this.OrderId,
  InterviewDept: this.FormforInvite.depName,
  InterviewDeptId: this.FormforInvite.depId,
  InterviewJob: this.FormforInvite.jobName,
  InterviewJobId: this.FormforInvite.jobId,
  ExpectedEntryTime: this.FormforInvite.time,
  Status: 4
 */
export function entryconfirm(data) {
  return request({
    url: 'recruitapi/resumemanageV1/entryconfirm',
    method: 'POST',
    params: { token },
    data
  })
}

/** 入职(加入小赢)
 * POST api/resumemanageV1/entrycomplete?Token={Token}
 * @param {*} data
 * {OrderId，
 * EntryConfirm=true，
 * Status=5
 * }
 */
export function entrycomplete(data) {
  return request({
    url: 'recruitapi/resumemanageV1/entrycomplete',
    method: 'POST',
    params: { token },
    data
  })
}
