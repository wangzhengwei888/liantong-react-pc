//订单结算接口
import { post, get } from '../../utils/request';

//订单结算
export function subCartToOrder(cartIds,activityIds){
 //console.log(cartId)
 return get('/tradeApi/subCartToOrder',{cartIds,activityIds})
}


//提交订单
export function saveOrderForSinopharmAPI(value){
 console.log(value)
    return post('/orderApi/saveOrderForSinopharm',value , 'json');
}
//保存收货地址信息
export function saveAddressAPI( value ){
    return get('/tradeApi/saveOrderAddress',value)
}

//设置默认地址
export function setDefaultAddressAPI( orderAddressId ){
    return get('/tradeApi/saveDefaultOrderAddress', {orderAddressId} )
}
//删除地址deleteOrderAddress
export function deleteOrderAddressAPI( addressId ){
 return get('/tradeApi/deleteOrderAddress', {addressId} )
}
//获取地区数据
export function getArea(){
 return post('/dictApi/areaList')
}
//getOrderAddressList获取收货地址列表
export function getOrderAddressListApi(){
 return post('/tradeApi/getOrderAddressList')
}
//getOrderInvoiceList获取发票列表
export function getOrderInvoiceListApi(cartIds){
 return post('/tradeApi/getOrderInvoiceList',{cartIds})
}

//选择配送方式 getDeliveryMethod
export function getDeliveryMethodAPI( value ){
 console.log("到api页面:"+ value)
 return get('/tradeApi/getDeliveryMethod',value)
}
//保存发票信息saveOrderInvoice
export function saveOrderInvoiceAPI( value ){
 console.log(value)
 return post('/tradeApi/saveOrderInvoice',value,'json')
}
//获取支付方式 paymentList
export function getPaymentListAPI( values ){
 return post('/tradeApi/paymentList',values)
}

