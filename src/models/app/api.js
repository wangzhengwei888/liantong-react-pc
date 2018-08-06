import {  get,post } from '../../utils/request';

export function getLoginStatus(obj) {
 console.log(obj)
 return get('/user/login',obj);
}

//获取单价 /order/rule
export function getOrderRule() {
 return get('/order/rule');
}
