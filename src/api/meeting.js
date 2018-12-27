import request from '@/utils/request'

// /api/meeting/getmymeetinglist  获取我的会议安排
export function getmymeetinglist(token, pageIndex, pageSize, search, status = -1) {
  return request({
    url: 'apix/meeting/get_mymeeting',
    method: 'get',
    params: { token, pageIndex, pageSize, search, status }
  })
}

// 会议详情
// api/meeting/share_meeting?MeetingId={MeetingId}"
export function share_meeting(MeetingId) {
  return request({
    url: 'apix/meeting/share_meeting',
    method: 'get',
    params: { MeetingId }
  })
}

// 获取会议室密钥
// api/meetingroom/get_roomkey?Token={Token}&meetingId={meetingId}
export function get_roomkey(token, MeetingId) {
  return request({
    url: 'apix/meetingroom/get_roomkey',
    method: 'get',
    params: { token, MeetingId }
  })
}

// 取消会议
// /api/meeting/cancel
export function cancel_meeting(token, MeetingId) {
  return request({
    url: 'apix/meeting/cancel',
    method: 'get',
    params: { token, MeetingId }
  })
}

// 提前结束会议
// /api/meeting/over
export function over_meeting(token, MeetingId) {
  return request({
    url: 'apix/meeting/over',
    method: 'get',
    params: { token, MeetingId }
  })
}

// /api/file/PicFileUpload
// 图片上传
export function PicFileUpload(token, filePath, FileName, Category, Size) {
  return request({
    url: 'apix/file/PicFileUpload',
    method: 'post',
    params: { token, filePath, FileName, Category, Size }
  })
}

// /api/file/FileUpload
// 图片、文件、语音上传
// ['FACE', 'IMAGE', 'FILES']
export function FileUpload(token, Data, FileName, Category, Size) { // FileName, Category, Size
  // /api/bigfile/upload2
  return request({
    url: 'apix/file/FileUpload',
    method: 'post',
    params: { token },
    data: { Data, FileName, Category, Size }
  })
}

// 保存会议纪要
// POST /api/meeting/save_minutes
export function save_minutes(token, MeetingId, FileId, IsSummary) {
  return request({
    url: 'apix/meeting/save_minutes',
    method: 'post',
    params: { token },
    data: { MeetingId, FileId, IsSummary }
  })
}

// 再发送
// api/meeting/remindagainV1?Token={Token}&MeetingId={MeetingId}
export function remindagain(token, MeetingId) {
  return request({
    url: 'apix/meeting/remindagainV1',
    method: 'get',
    params: { token, MeetingId }
  })
}

// 获取会议室列表
export function GetMeetingRoomList(token, status, roomSize, pageIndex, pageSize) {
  return request({
    url: 'apix/meetingroom/get',
    method: 'get',
    params: { token, status, roomSize, pageIndex, pageSize }
  })
}

// 根据会议室ID获取会议室详情
export function MeetingRoomDetails(token, roomId) {
  return request({
    url: 'apix/meetingroom/getroomdetail',
    method: 'get',
    params: { token, roomId }
  })
}

// 删除会议室
export function DeleteMeetingRoom(token, roomId) {
  return request({
    url: 'apix/meetingroom/deleteV1',
    method: 'post',
    params: { token, roomId }
  })
}

// 新建会议室
export function CreateMeetingRoom(token, meeting) {
  console.log(token)
  return request({
    url: 'apix/meetingroom/createV1',
    method: 'post',
    params: { token },
    data: meeting
  })
}

// 会议室信息修改
export function ModifyMeetingRoom(token, meeting) {
  return request({
    url: 'apix/meetingroom/modifyV1',
    method: 'post',
    params: { token },
    data: meeting
  })
}

// 获取我的草稿
export function GetmyDraft(token, pageIndex, pageSize) {
  return request({
    url: 'apix/meeting/getmydraft',
    method: 'get',
    params: { token, pageIndex, pageSize }
  })
}

// 删除草稿
export function DeleteDraft(token, meetingId) {
  return request({
    url: 'apix/meeting/canceldraftsave',
    method: 'post',
    params: { token, meetingId }
  })
}

// 保存为草稿
export function CreateDraftMeeting(token, meeting) {
  return request({
    url: 'apix/meeting/saveasdraftV1',
    method: 'post',
    params: { token },
    data: meeting
  })
}

// 新建会议
export function CreateMeeting(token, meeting) {
  console.log(token)

  return request({
    url: 'apix/meeting/createV1',
    method: 'post',
    // params: { token },
    data: meeting
  })
}

// 获取会议室列表 --适用于新建会议
export function used_times_list(token, theDate, mixsize, maxsize) {
  return request({
    url: 'apix/meetingroom/used_times_list',
    method: 'get',
    params: { token, theDate, mixsize, maxsize }
  })
}

// 会议类型
export function GetMeetingType(token, Status) {
  return request({
    url: 'apix/meeting/getmeetingtypeV1',
    method: 'get',
    params: { token, Status }
  })
}

// 提前提醒时间
export function GetMeetingRemind(token) {
  return request({
    url: 'apix/meeting/getmeetingremindtype',
    method: 'get',
    params: { token }
  })
}

// 会议室列表
// api/meetingroom/get
export function meetingroom_get(token, status = false, roomSize = -1, pageIndex = 1, pageSize = 100) {
  return request({
    url: 'apix/meetingroom/get',
    method: 'get',
    params: { token, status, roomSize, pageIndex, pageSize }
  })
}

// 根据会议室ID获取对应的会议安排
// api/meeting/getmeetinglistbyroomid
export function getmeetinglistbyroomid(token, MeetingRoomId, pageSize, pageIndex) {
  return request({
    url: 'apix/meeting/getmeetinglistbyroomid',
    method: 'get',
    params: { token, MeetingRoomId, pageIndex, pageSize }
  })
}

// 会议管理--搜索
// api/meetingmanager/searchmeeting
export function searchmeeting(token, Key, pageSize, pageIndex) {
  return request({
    url: 'apix/meetingmanager/searchmeeting',
    method: 'get',
    params: { token, Key, pageIndex, pageSize }
  })
}
