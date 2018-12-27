import request from '@/utils/request'

//* *********************************************难易度******************************************************* */
// /api/kpirule/facility_create [Web]难易度新增【绩效考核】
export function facility_create(token, model) {
  return request({
    url: 'apix/kpirule/facility_create',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/kpirule/facility_edit [Web]难易度编辑【绩效考核】
export function facility_edit(token, model) {
  return request({
    url: 'apix/kpirule/facility_edit',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/kpirule/facility_set_status [Web]难易度停用/启用【绩效考核】
export function facility_set_status(token, facId, enable) {
  return request({
    url: 'apix/kpirule/facility_set_status',
    method: 'post',
    params: { token, facId, enable }
  })
}

// /api/KPIRule/GetFacilities [web]获取工作难度选项表【绩效考核】
export function GetFacilities(token) {
  return request({
    url: 'apix/KPIRule/GetFacilities',
    method: 'get',
    params: { token }
  })
}

// /api/kpirule/facility_get_list [Web]难易度列表【绩效考核】
export function facility_get_list(token, pageIndex, pageSize) {
  return request({
    url: 'apix/KPIRule/facility_get_list',
    method: 'get',
    params: { token, pageIndex, pageSize }
  })
}

// /api/kpirule/facility_get_info [Web]难易度详情【绩效考核】
export function facility_get_info(token, facId) {
  return request({
    url: 'apix/KPIRule/facility_get_info',
    method: 'get',
    params: { token, facId }
  })
}
//* *********************************************工作项类别******************************************************* */
// /api/KPIRule/WorkItemType_create [Web]工作项类别新增【绩效考核】
export function WorkItemType_create(token, model) {
  return request({
    url: 'apix/KPIRule/WorkItemType_create',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/KPIRule/WorkItemType_edit [Web]工作项类别编辑【绩效考核】
export function WorkItemType_edit(token, model) {
  return request({
    url: 'apix/KPIRule/WorkItemType_edit',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/KPIRule/WorkItemType_set_status [Web]工作项类别启用/停用【绩效考核】
export function WorkItemType_set_status(token, facId, enable) {
  return request({
    url: 'apix/KPIRule/WorkItemType_set_status',
    method: 'post',
    params: { token, facId, enable }
  })
}

// /api/KPIRule/WorkItemType_get_list [Web]工作项类别列表【绩效考核】
export function WorkItemType_get_list(token, pageIndex, pageSize) {
  return request({
    url: 'apix/KPIRule/WorkItemType_get_list',
    method: 'get',
    params: { token, pageIndex, pageSize }
  })
}

// /api/KPIRule/WorkItemType_get_info [Web]工作项类别详情【绩效考核】
export function WorkItemType_get_info(token, WITId) {
  return request({
    url: 'apix/KPIRule/WorkItemType_get_info',
    method: 'get',
    params: { token, WITId }
  })
}

// /api/KPIRule/GetWorkItemTypes [web]获取工作项类别选项表【绩效考核】
export function GetWorkItemTypes(token) {
  return request({
    url: 'apix/KPIRule/GetWorkItemTypes',
    method: 'get',
    params: { token }
  })
}

// /api/KPIRule/xl_getcategory [Web]下拉选项--获取职位类别【绩效考核】
export function xl_getcategory(token) {
  return request({
    url: 'apix/KPIRule/xl_getcategory',
    method: 'get',
    params: { token }
  })
}

//* *********************************************职位工作类别管理******************************************************* */
// /api/KPIRule/JobWorkType_create [Web]职位工作类别新增【绩效考核】
export function JobWorkType_create(token, model) {
  return request({
    url: 'apix/KPIRule/JobWorkType_create',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/KPIRule/JobWorkType_edit [Web]职位工作类别编辑【绩效考核】
export function JobWorkType_edit(token, model) {
  return request({
    url: 'apix/KPIRule/JobWorkType_edit',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/KPIRule/JobWorkTypeset_status [Web]职位工作类别停用/启用【绩效考核】
export function JobWorkTypeset_status(token, JWTId, enable) {
  return request({
    url: 'apix/KPIRule/JobWorkTypeset_status',
    method: 'post',
    params: { token, JWTId, enable }
  })
}

// /api/KPIRule/JobWorkType_get_list [Web]职位工作类别列表【绩效考核】
export function JobWorkType_get_list(token, pageIndex, pageSize) {
  return request({
    url: 'apix/KPIRule/JobWorkType_get_list',
    method: 'get',
    params: { token, pageIndex, pageSize }
  })
}

// /api/KPIRule/JobWorkType_get_info [Web]职位工作类别详情【绩效考核】
export function JobWorkType_get_info(token, JWTId) {
  return request({
    url: 'apix/KPIRule/JobWorkType_get_info',
    method: 'get',
    params: { token, JWTId }
  })
}

// /api/KPIRule/GetJobWorkTypes [web]获取职位工作类别选项表【绩效考核】
export function GetJobWorkTypes(token) {
  return request({
    url: 'apix/KPIRule/GetJobWorkTypes',
    method: 'get',
    params: { token }
  })
}

//* *********************************************工作内容管理******************************************************* */
// /api/KPIRule/GetWorkContentDetail [web]获取工作内容详情【绩效考核】
export function GetWorkContentDetail(token, contentid) {
  return request({
    url: 'apix/KPIRule/GetWorkContentDetail',
    method: 'get',
    params: { token, contentid }
  })
}

// /api/KPIRule/AddOrUpdateMissItem [web]修改或添加失误项（Item中missID为空则为添加，可批量）【绩效考核】
export function AddOrUpdateMissItem(token, model) {
  return request({
    url: 'apix/KPIRule/AddOrUpdateMissItem',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/KPIRule/GetContentListByJobId [web]根据职位ID获取工作内容列表【绩效考核】
export function GetContentListByJobId(token, jobid, pageIndex, pageSize) {
  return request({
    url: 'apix/KPIRule/GetContentListByJobId',
    method: 'get',
    params: { token, jobid, pageIndex, pageSize }
  })
}

// /api/KPIRule/GetJobCatContentList [web]获取职位列表和对应工作内容更新时间【绩效考核】
export function GetJobCatContentList(token, pageIndex, pageSize) {
  return request({
    url: 'apix/KPIRule/GetJobCatContentList',
    method: 'get',
    params: { token, pageIndex, pageSize }
  })
}

// /api/KPIRule/SetWrokContentStatus [web]设置工作内容状态（停用/启用）【绩效考核】
export function SetWrokContentStatus(token, ContentId, newStatus) {
  return request({
    url: 'apix/KPIRule/SetWrokContentStatus',
    method: 'get',
    params: { token, ContentId, newStatus }
  })
}

// /api/KPIRule/AddOrUpdateWorkContent [web]新增或更新工作内容【绩效考核】
export function AddOrUpdateWorkContent(token, model) {
  return request({
    url: 'apix/KPIRule/AddOrUpdateWorkContent',
    method: 'post',
    params: { token },
    data: model
  })
}

//* *********************************************工作登记******************************************************* */

// /api/KPIManage/GetWCListToSelect [Web]获取当前用户工作登记时可选的工作内容（key-value）【绩效考核】
export function GetWCListToSelect(token) {
  return request({
    url: 'apix/KPIManage/GetWCListToSelect',
    method: 'get',
    params: { token }
  })
}

// /api/KPIManage/work_list [Web]工作审核列表【绩效考核】
export function work_list(token, pageIndex, pageSize, date) {
  return request({
    url: 'apix/KPIManage/work_list',
    method: 'get',
    params: { token, pageIndex, pageSize, date }
  })
}

// /api/KPIManage/GetMissListToSelect [Web] 根据当前选择的工作内容获取失误项（key-value）【绩效考核】
export function GetMissListToSelect(token, contentId) {
  return request({
    url: 'apix/KPIManage/GetMissListToSelect',
    method: 'get',
    params: { token, contentId }
  })
}

// /api/KPIManage/AddOrUpdateRegItem [Web] 新增或修改工作登记（regId为空为修改）【绩效考核】
export function AddOrUpdateRegItem(token, model) {
  return request({
    url: 'apix/KPIManage/AddOrUpdateRegItem',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/KPIManage/GetWorkContentRegList [Web] 获取工作登记-已登记列表【绩效考核】
export function GetWorkContentRegList(token, dateTime, pageIndex, pageSize) {
  return request({
    url: 'apix/KPIManage/GetWorkContentRegList',
    method: 'get',
    params: { token, dateTime, pageIndex, pageSize }
  })
}

// /api/KPIManage/work_item_list [Web]工作内容审核列表【绩效考核】
export function work_item_list(token, pId, pageIndex, pageSize, date) {
  return request({
    url: 'apix/KPIManage/work_item_list',
    method: 'get',
    params: { token, pId, pageIndex, pageSize, date }
  })
}

// /api/KPIManage/work_item_check [Web]工作内容审核【绩效考核】
export function work_item_check(token, model) {
  return request({
    url: 'apix/KPIManage/work_item_check',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/KPIManage/work_item_check_all [Web]一键审核当天所有直属员工【绩效考核-新需求06-10】
export function work_item_check_all(token, theDate) {
  return request({
    url: 'apix/KPIManage/work_item_check_all',
    method: 'post',
    params: { token, theDate }
  })
}

// /api/KPIManage/m_get_men [Web]获取直属员工(key:员工ID;value:员工名字)【绩效考核】
export function m_get_men(token) {
  return request({
    url: 'apix/KPIManage/m_get_men',
    method: 'get',
    params: { token }
  })
}

// /api/KPIManage/m_check_man [Web]月通用考核【绩效考核】
export function m_check_man(token, model) {
  return request({
    url: 'apix/KPIManage/m_check_man',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/KPIStatis/ReSumDirectMonthKpi [web]重新月结指定用户的所有直属员工（不含自己）【绩效考核】
export function ReSumDirectMonthKpi(token, pid, sumTime) {
  return request({
    url: 'apix/KPIStatis/ReSumDirectMonthKpi',
    method: 'get',
    params: { token, pid, sumTime }
  })
}
