import request from '@/utils/request'

// 任务管理
// ../apix/v2/task/GetManageList?searchtype=' + searchTypes[searchtype] + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&searchText=' + searchText
export function GetManageList(token, searchtype, pageIndex, pageSize, searchText) {
  return request({
    url: 'apix/v2/task/GetManageList',
    method: 'get',
    params: {
      token,
      searchtype,
      pageIndex,
      pageSize,
      searchText
    }
  })
}

// 检查当前人员是否被移除GET /api/v2/task/CheckParterRemoved
export function CheckParterRemoved(token, taskId) {
  return request({
    url: 'apix/v2/task/CheckParterRemoved',
    method: 'get',
    params: {
      token,
      taskId
    }
  })
}

// 查看新任务，修改状态 POST /api/v2/task/SetNewTaskViewed
export function SetNewTaskViewed(token, taskId) {
  return request({
    url: 'apix/v2/task/SetNewTaskViewed',
    method: 'post',
    params: {
      token,
      taskId
    }
  })
}

// 参与某任务POST /api/v2/task/JoinTask
export function JoinTask(token, taskId) {
  return request({
    url: 'apix/v2/task/JoinTask',
    method: 'post',
    params: {
      token,
      taskId
    }
  })
}

// 我的任务GET /api/v2/task/GetMyTaskList
export function GetMyTaskList(token, searchtype, pageIndex, pageSize, searchText, isTop) {
  return request({
    url: 'apix/v2/task/GetMyTaskList',
    method: 'get',
    params: {
      token,
      searchtype,
      pageIndex,
      pageSize,
      searchText,
      isTop
    }
  })
}

// 新建/编辑 任务 /api/v2/task/OperateTask
export function OperateTask(token, Data, operation, taskid) {
  return request({
    url: 'apix/v2/task/OperateTask',
    method: 'POSt',
    data: Data,
    params: {
      token,
      operation,
      taskid
    }
  })
}

// /api/v2/task/GetTaskDetail
// 根据任务ID， 获取任务详细信息, 人员信息， 事件信息， 审核历史信息
export function GetTaskDetail(token, taskId, pageIndex, pageSize) {
  return request({
    url: 'apix/v2/task/GetTaskDetail',
    method: 'Get',
    params: {
      taskId,
      pageIndex,
      pageSize
    }
  })
}

// /api/v2/task/GetTaskForModify
// 点击编辑任务，根据任务ID， 获取任务信息进行编辑
export function GetTaskForModify(token, taskId) {
  return request({
    url: 'apix/v2/task/GetTaskForModify',
    method: 'Get',
    params: {
      taskId
    }
  })
}

// 添加事件
// ../apix/v2/task/CreateEvent
export function CreateEvent(token, Data) {
  return request({
    url: 'apix/v2/task/CreateEvent',
    method: 'POST',
    data: Data
  })
}

// 编辑事件
// ../apix/v2/task/UpdateEvent
export function UpdateEvent(token, Data) {
  return request({
    url: 'apix/v2/task/UpdateEvent',
    method: 'POST',
    data: Data
  })
}

// ../apix/v2/task/EventComplete?eventid=' + eventid + '&isComplete=' + isComplete
export function EventComplete(token, eventid, isComplete) {
  return request({
    url: 'apix/v2/task/EventComplete',
    method: 'POST',
    params: {
      eventid,
      isComplete
    }
  })
}

// 提交审核
// ../apix/v2/task/SubmitTaskAudit?taskId=' + that.TaskId
export function SubmitTaskAudit(taskId) {
  return request({
    url: 'apix/v2/task/SubmitTaskAudit',
    method: 'POST',
    params: {
      taskId
    }
  })
}

// 审核任务
// ../apix/v2/task/AuditTask
export function AuditTask(Data) {
  return request({
    url: 'apix/v2/task/AuditTask',
    method: 'POST',
    data: Data
  })
}

// 修改进度条
// ../apix/v2/task/SetSpeedOfTask?taskId=' + that.TaskId + '&speedPercent=' + speedPercent
export function SetSpeedOfTask(taskId, speedPercent) {
  return request({
    url: 'apix/v2/task/SetSpeedOfTask',
    method: 'POST',
    params: {
      taskId,
      speedPercent
    }
  })
}

// 根据任务号ID， 获取说有事件信息（分页）， 按最后修改时间倒序排列
// apix/v2/task/GetEventList?taskId=' + that.listData.TaskId + '&pageIndex=' + index + '&pageSize=' +that.size
export function GetEventList(taskId, pageIndex, pageSize) {
  return request({
    url: 'apix/v2/task/GetEventList',
    method: 'POST',
    params: {
      taskId,
      pageIndex,
      pageSize
    }
  })
}

// 根据任务号ID，获取所有审核的历史信息（分页）， 按最后修改时间倒序排列
// ./apix/v2/task/GetTaskAuditRecords?taskId=' + that.listData.TaskId + '&pageIndex=' + index + '&pageSize=' + that.Auditsize
export function GetTaskAuditRecords(taskId, pageIndex, pageSize) {
  return request({
    url: 'apix/v2/task/GetTaskAuditRecords',
    method: 'POST',
    params: {
      taskId,
      pageIndex,
      pageSize
    }
  })
}
