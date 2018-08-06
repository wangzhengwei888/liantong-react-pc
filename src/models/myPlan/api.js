import {  get,post } from '../../utils/request';


//创建订单接口（立即创建）
export function setOrderEstimate({obj}) {
 return post('/order/create',obj);
}

///order/info  获取订单详情接口（订单详情） order_id
export function getOrderInfo({order_id}) {
 return get('/order/info',{order_id});
}
