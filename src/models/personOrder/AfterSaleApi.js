import { get, post } from '../../utils/request'

//订单详情
export function getOrderDetail(orderId){
 return get('/orderApi/orderdetail', orderId)
}

//提交申请
export function returnOrder(obj){
 console.log(obj)
 return get('/orderApi/returnOrder', obj)
}
