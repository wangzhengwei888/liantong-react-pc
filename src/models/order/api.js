import { post, get } from '../../utils/request';

export function subToOrder(cartId){
  return get('/cartApi/subCartToOrder',{cartId});
}


export  function saveOrderForSinopharmApi(arr) {
//console.log(arr)
  return  post('/orderApi/saveOrderForSinopharm', { cartVoList:arr } , 'json');  //[{goodsId,goodsNum,newGoodsPrice}]
}






/*获取发票列表*/
export  function getInvoiceList(memberId) {
  return get('/invoiceApi/invoiceInfo',{ memberId:memberId });
}

export  function couponIsUsertAPI() {
  return get('/cartList/couponIsUser');
}
//获取个人中心的订单列表
export  function getPersonOrderList(searchParam) {
  return get('/orderApi/orderlist',searchParam);
}
//获取个人中心的订单详情
export  function getPersonOrderDetail(orderid) {
  return get('orderApi/orderdetail',{orderid});
}

//获取个人中心商品发货明细
export  function getPersonOrderItemDetail(orderItemId) {
  return get('orderApi/orderitemdetail',{orderItemId});
}

/*获取价格*/
export function getPrice(cartIds){
  return get('/cartApi/getPrice',{cartIds})
}
//订单列表
export function getorderlist(invState){
  return get('orderApi/orderList',{ invState })
}



export function addShippingAPI( cartIds,cityId ){
  return get('/cartApi/addShipping',{ cartIds,cityId })
}

export function userAddressListAPI(){
  //根据会员id获取收货地址列表
  return get('/addressApi/addressList')
}

export function getAddressAPI( addressId ){
  //根据会员id获取收货地址
  return get('/addressApi/getAddressByAddressId', { addressId })
}

export function saveAddressAPI( addressobj ){
  //根据会员id获取收货地址
  //console.log(addressobj);
  return get('/addressApi/saveAddress',  addressobj )
}

export function deleteAddressAPI( addressId ){
  //根据会员id获取收货地址
  return get('/addressApi/delAddress',  { addressId } )
}

export function updateAddressAPI( addressId ){
  //根据会员id获取收货地址
  return get('/addressApi/updateAddressDef',  { addressId } )
}

export function sureOrder( val ){
  //确认收货
  return get('/orderApi/finishorder', val )
}

/*添加购物车*/
export  function addCartApi (goodsId,goodsPrice,count) {
  console.log(goodsId,goodsPrice,count);
  return get('/cartapi/addCart',{
    goodsId,goodsPrice,count
  });
}
