import {  get,post,del } from '../../utils/request'
//获取会员信息
export function memberInfo(){
 return get('/memberApi/memberDetail')
}
//修改会员信息
export function setMemberInfo(values){
 return post('/memberApi/updateMember',values)
}
//获取所属行业列表
export function getMemberClassListAPI() {
 return get('/dictApi/memberClassList')
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
//获取预存款信息
export function depositAPI(val){
 return get('/memberApi/predepositLogList', val)
}

