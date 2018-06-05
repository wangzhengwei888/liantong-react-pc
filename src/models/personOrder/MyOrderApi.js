import { post, get } from '../../utils/request';

//我的订单列表
export function getMyOrderList(obj){
 return get('/orderApi/orderlist', obj)
}

//订单详情
export function getOrderDetail(orderId){
 return get('/orderApi/orderdetail', orderId)
}

// 再次购买
export function addCart(obj){
 console.log(obj)
 return get('/tradeApi/addCart',obj)
}

//批量加入购物车
export function getAddCartBachAPI(arr) {
 return  post('/tradeApi/addCartBach', { list:arr } , 'json');  //[{goodsId,goodsNum,newGoodsPrice}]
}

// 取消订单
export function cancleOrder(val){
 return get('/orderApi/cancleorder',val)
}
// 去支付
export function goPayAPI(val){
 return get('/orderApi/getOrderPay',val)
}
