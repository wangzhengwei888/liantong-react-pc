import { post, get } from '../../utils/request'

//获取个人中心的订单列表
export function getPersonOrderList(searchParam) {
  return get('', searchParam);
}


//常购清单
export function getRecentPurGoods(obj){
  return get('/goodsApi/getRecentPurGoods',obj);
 }
 

//加入购物车
export function addCart(obj){
  console.log(obj)
  return get('/tradeApi/addCart',obj)
 }
 
 // 修改购物车数量
 export function updateCartCount(obj){
  return get('/tradeApi/updateCartCount',obj)
 }