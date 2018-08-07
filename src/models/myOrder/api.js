import {  get,post } from '../../utils/request';


// 获取提速专线列表接口 enter_id  status
export function orderlist(obj) {
 return get('/order/list', obj);
}
//获取专线订单列表接口（我的订单订单列表） /order/enter/list
export function orderEnterList(obj) {
 return get('/order/enter/list', obj);
}
