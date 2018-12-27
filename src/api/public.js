import request from '@/utils/request'
import { getFileType } from '@/utils/fileType'

// /api/file/FileUpload
// 图片、文件、语音上传
// ['FACE', 'IMAGE', 'FILES']
export function FileOrImgUpload(token, Data, FileName, Category, Size) { // FileName, Category, Size
  return request({
    url: 'apix/file/upload',
    method: 'post',
    params: { token },
    data: { Data, FileName, Category }
  })
}

// 圖片
export function imgUpload(token, filePath, FileName, Size, Category = 1) {
  // POST /api/file/PicFileUpload
  return request({
    url: 'apix/file/PicFileUpload',
    method: 'post',
    params: { token, filePath, FileName, Category, Size }
  })
}

// 文件
export function fileUpload(token, SaveUrl, FileName, Exten, Size, ImageUrl = '') {
  // console.log({
  //   FileName, Exten, SaveUrl, ImageUrl, Size
  // })
  return request({
    url: 'apix/file/save4id',
    method: 'post',
    params: { token },
    data: { FileName, Exten, SaveUrl, ImageUrl, Size }
  })
}

/**
 * 获取文件Token
 * /api/bigfile/getToken
 * name
 * size
 */
export function getFileToken(name, size) { // FileName, Category, Size
  return request({
    url: 'apix/bigfile/getToken',
    method: 'post',
    params: { name, size }
  })
}
