import request from '@/utils/request'

// 商品列表-套餐列表
export function getmeallist() {
  return request({
    url: 'apix/Recruit/getmeallist',
    method: 'get',
    params: {}
  })
}

// 商品列表-产品列表
export function getproductlist() {
  return request({
    url: 'apix/Recruit/getproductlist',
    method: 'get',
    params: {}
  })
}
