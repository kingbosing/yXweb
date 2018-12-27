import request from '@/utils/request'
// /api/auth/myfunc 获取登录用户的功能权限 获取的权限包括可使和不可使用的权限；主要用于工作界面，功能模块的显示
export function GetMyfunc(token) {
  return request({
    url: 'apix/auth/myfunc',
    method: 'get',
    params: { token }
  })
}
