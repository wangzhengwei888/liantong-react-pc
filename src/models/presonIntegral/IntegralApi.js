import {  get,post,del } from '../../utils/request'

//删除礼品购物车商品
export function delGiftCarAPI(goodsId){
  return del('')
}

//获得礼品购物车中的商品
export function getgiftCartAPI() {
  return get('')
}

//添加到购物车
export function addCartAPI(id) {
  return post('', {id})
}

// 提交礼品订单
export function placeGiftOrderAPI(data) {
  console.log(data)
}
