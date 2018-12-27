var url_down = {
  'imgapiurl': 'http://192.168.10.47:9081/', // 本地图片服务器
  'bigfileurl': 'http://192.168.10.47/api/bigfile/download?path=', // 本地大文件地址
  'apiurl': 'http://192.168.10.47/', // 本地api地址
  'onlineurl': 'http://192.168.10.47/', // 分享地址
  'RecruitApiurl': 'http://192.168.10.47:9082/', // 招聘api地址
  'RecruitBigfileurl': 'http://192.168.10.47:9082/bf/', // 招聘大文件地址
  'SharePageurl': 'http://192.168.10.47:8088/'
}

var url_up = {
  'apiurl': 'http://webapi.work-oa.com/', // 线上api地址,
  'imgapiurl': 'http://img.work-oa.com/', // 线上图片服务器
  'bigfileurl': 'http://webapi.work-oa.com/api/bigfile/download?path=', // 线上大文件地址
  'onlineurl': 'http://www.work-oa.com/', // 分享地址
  'RecruitApiurl': 'http://jobapi.work-oa.com/', // 招聘api地址
  'RecruitBigfileurl': 'http://jobapi.work-oa.com/bf/', // 招聘大文件地址
  'SharePageurl': 'http://oa.work-oa.com/'
}

export function globalvariable() {
  if (process.env.NODE_ENV === 'development') {
    return url_down // 线下
  } else if (process.env.NODE_ENV === 'production') {
    return url_up // 线上
  }
}

export function consoleLog() {
  const data = arguments
  console.log(...data)
}
