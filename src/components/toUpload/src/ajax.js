import { getFileType } from '../../../utils/fileType'
import { getToken, getMyProfileId } from '@/utils/auth'
import { FileOrImgUpload, imgUpload, fileUpload } from '@/api/public'

function getError(action, option, xhr) {
  let msg
  // if (xhr.response) {
  //   msg = `${xhr.response.error || xhr.response}`;
  // } else if (xhr.responseText) {
  //   msg = `${xhr.responseText}`;
  // } else {
  //   msg = `fail to post ${action} ${xhr.status}`;
  // }

  const err = new Error(msg)
  err.status = xhr
  err.method = 'post'
  err.url = action
  return err
}

function getBody(xhr) {
  const text = xhr.data.Data || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export default function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return
  }

  const action = option.action

  var filetype
  if (getFileType(option.file.name) == 'img') {
    filetype = 'IMAGE'
  } else {
    filetype = 'FILES'
  }

  const TData = {
    Data: option.file.Data,
    FileName: option.file.name,
    Category: filetype,
    Size: option.file.size
  }
  console.log(option)
  const Extenlist = option.file.name.split('.')
  const Exten = Extenlist[Extenlist.length - 1]
  new Promise(function(resolve, reject) {
    FileOrImgUpload(getToken(), option.file.Data, option.file.name, filetype, option.file.size).then(function(res) {
    // console.info('****888**')
      // console.info(res.data)
      resolve(res.data)
      // console.log(res.data)
      // if (res.data && res.data.successful) {
      //   // console.info('****1111**')

    //   option.onSuccess(getBody(res))
    // } else {
    //   console.log('发生错误！')
    //   // option.onError(getError('error', '11', '22'))
    // }
    })
  }).then(c => {
    console.log(c)
    const path = c.Data
    if (getFileType(option.file.name) == 'img') {
      imgUpload(getToken(), path, option.file.name, option.file.size).then(res => {
        // console.log(res)
        if (res.data && res.data.successful) {
          // console.info('****1111**')
          option.onSuccess(getBody(res))
        } else {
          console.log('发生错误！')
          // option.onError(getError('error', '11', '22'))
        }
      })
    } else {
      fileUpload(getToken(), path, option.file.name, Exten, option.file.size, path).then(res => {
        // console.log(res.data)
        res.data.Data = { ID: res.data.Data }
        if (res.data && res.data.successful) {
          // console.info('****1111**')
          option.onSuccess(getBody(res))
        } else {
          console.log('发生错误！')
          // option.onError(getError('error', '11', '22'))
        }
      })
    }
  })
}
