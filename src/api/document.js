import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

/**
 * 获取根目录文件列表
 * /api/docV1/getRoot
 * rootType 0-全部；1-公司；2-共享；3-个人
 * ordertype 排序类型：1 时间，2文件名，3类型, 4大小
 * isasc 排序类型：1 升序，2 降序
 * pageIndex
 * pageSize
 */
export function getRootDoc(rootType, ordertype, isasc, pageIndex, pageSize) {
  return request({
    url: 'apix/docV1/getRoot',
    method: 'get',
    params: {
      token, rootType, ordertype, isasc, pageIndex, pageSize
    }
  })
}

/**
 * GET /api/docV1/get
 * 根据文件夹id查看该文件夹包含的文档
 * @param {*} catalogId
 * @param {*} key
 * @param {*} rootType 0-全部；1-公司；2-共享；3-个人
 * @param {*} ordertype 排序类型：1 时间，2文件名，3类型, 4大小
 * @param {*} isasc 排序类型：1 升序，2 降序
 * @param {*} pageIndex
 * @param {*} pageSize
 */
export function getCatalogs(catalogId, key, rootType, ordertype, isasc, pageIndex, pageSize) {
  return request({
    url: 'apix/docV1/get',
    method: 'get',
    params: {
      token, catalogId, key, rootType, ordertype, isasc, pageIndex, pageSize
    }
  })
}

/**
 * /api/docV1/upload
 * 批量上传文档(带文件夹)
 *  rootType	1-公司；2-共享；3-个人  query
  *
 */
export function upload(rootType, data) {
  return request({
    url: 'apix/docV1/upload',
    method: 'POST',
    params: {
      token, rootType
    },
    data
  })
}
/**
 * /api/docV1/update2
 * 更新文件（覆盖已有文件，上传文档遇同名问题可调用此接口覆盖
 *  rootType	1-公司；2-共享；3-个人  query
  *
 */
export function reUpload(rootType, data) {
  console.log({ data })

  return request({
    url: 'apix/docV1/update2',
    method: 'POST',
    params: {
      token, rootType
    },
    data
  })
}

/**
 * 检测重名
 * GET /api/docV1/hasSame
 * catalogId  父级文件夹ID
 * name 文件或文件夹名（喊后缀）
 * type 文件类型：1文件 2文件夹 query
 * FilePath
 */
export function hasSame(catalogId, name, type, FilePath) {
  return request({
    url: 'apix/docV1/hasSame',
    method: 'GET',
    params: {
      token, catalogId, name, type, FilePath
    }
  })
}

/**
 * 创建文件夹//
 * // /api/docV1/addcatalog
 * @param {*} rootType 1-公司；2-共享；3-个人
 * @param {*} data:{"Name": "string","ParentId": "string"}
 */
export function addcatalog(rootType, data) {
  // console.log({ rootType, data })
  return request({
    url: 'apix/docV1/addcatalog',
    method: 'POST',
    params: {
      token, rootType
    },
    data
  })
}

/**
 * 重命名
 * POST /api/docV1/renamefile 命名文件
 * /api/docV1/renamefolder 重命名文件夹
 * type 1->文件   0->文件夹
 * @param {*} name-重命名
 * @param {*} Id-文件或文件夹Id
 * fileId/folderId
 */
export function renamefile(name, Id, type = 1) {
  let url, params
  if (type !== 0) {
    url = 'apix/docV1/renamefile'
    const fileId = Id
    params = {
      token, name, fileId
    }
  } else if (type === 0) {
    url = 'apix/docV1/renamefolder'
    const folderId = Id
    params = {
      token, name, folderId
    }
  }
  return request({
    url: url,
    method: 'POST',
    params
  })
}

/**
 * 增加下载次数
 * /api/docV1/AddDownloadTimes
 * url 下载时给的URL路径（建议使用如 Company/244/Documents/2018/01/15/37c9ab08-e575-49e1-aecc-4a16de3296fb.exe）
 * times 要增加的次数（默认1）
 */
export function AddDownloadTimes(url, times) {
  return request({
    url: 'apix/docV1/AddDownloadTimes',
    method: 'GET',
    params: {
      token, url, times
    }
  })
}

/**
 * 删除文件夹及文档
 * /api/docV1/delete
 * data：{folderIds,fileIds}
 *  "folderIds": ["string"],// 文件夹ids，格式 [F9VU, F9VU]
 *  "fileIds": [ "string"] // 文件ids
 */
export function fileOrFolderDelete(data) {
  console.log({ data })
  return request({
    url: 'apix/docV1/delete',
    method: 'POST',
    params: {
      token
    },
    data
  })
}

/**
 * 获取文件上传路径（上传文件前通过此接口获取上传路径）
 * /api/docV1/getuploadpath
 * rootType  0-其他；1-公司；2-共享；3-个人
 */
export function getuploadpath(rootType) {
  return request({
    url: 'apix/docV1/getuploadpath',
    method: 'GET',
    params: {
      token, rootType
    }
  })
}

/**
 * 设置文档状态
 * GET /api/docV1/setDocStatus
 * type 文档类型1文件2文件夹
 * docId 文档ID
 * newStatus 新状态 1公司 2共享 3个人
 */
export function setDocStatus(type, docId, newStatus) {
  return request({
    url: 'apix/docV1/setDocStatus',
    method: 'GET',
    params: {
      token, type, docId, newStatus
    }
  })
}

/**
 * 设置共享范围
 * /api/docV1/setShareRange
 * docId
 * type 文件类型：1文件 2文件夹
 * {"UserList": [ "string"],"DeptList": [  "string"]
 *
 */
export function setShareRange(type, docId, UserList, DeptList) {
  console.log({ type, docId, UserList, DeptList })
  return request({
    url: 'apix/docV1/setShareRange',
    method: 'POST',
    params: {
      token, type, docId
    },
    data: { UserList, DeptList }
  })
}

/**
 * 设置协同范围
 * /api/docV1/setSynergyRange
 * docId
 * type 文件类型：1文件 2文件夹
 * {"UserList": [ "string"],"DeptList": [  "string"]
 */
export function setSynergyRange(type, docId, UserList, DeptList) {
  return request({
    url: 'apix/docV1/setSynergyRange',
    method: 'POST',
    params: {
      token, type, docId
    },
    data: { UserList, DeptList }
  })
}

/**
 * 获取文档目录树
 * /api/docV1/GetRootDocTree
 * rootType  0-其他；1-公司；2-共享；3-个人
 */
export function GetRootDocTree(rootType) {
  return request({
    url: 'apix/docV1/GetRootDocTree',
    method: 'GET',
    params: {
      token, rootType
    }
  })
}

/**
 * 移动文件或文件夹
 * /api/docV1/moveDocs
 * data:[{
 *   "SourceId": "string",//被移动的文件或文件夹ID
 *   "SourceName": "string",// 被移动的文件或文件夹名（带后缀）
 *   "TargetCatalogId": "string",// 目标文件夹ID ,
 *   "Type": "File",// 被移动的文件类型：1文件 2文件夹 = ['File', 'Catalog'],
 *   "IsCover": true,// 是否覆盖（覆盖时，同命文件不会失败，直接覆盖）
 *   "IsClearRange": true //是否清空共享协作范围
 * }]
 */
export function moveDocs(data) {
  return request({
    url: 'apix/docV1/moveDocs',
    method: 'POST',
    params: {
      token
    },
    data
  })
}
