import {  get,post } from '../../utils/request';


// /line/speeded  获取已提速企业专线列表接口(变更计划已定提速专线)
export function getLineSpeeded({user_id}) {
 return get('/line/speeded',{user_id});
}
///order/info  获取订单详情接口（订单详情） order_id
export function getOrderInfo({order_id}) {
 return get('/order/info',{order_id});
}

//修改订单接口（立即创建）
export function setOrderEstimate(obj) {
 return post('/order/create',obj);
}
