import { post, get } from '../../utils/request';
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



//获取会员信息
export function memberInfo(){
  return get('/memberApi/memberDetail')
}
//修改会员信息
export function setMemberInfo(values){
  return post('/memberApi/updateMemberInfo',values)
}


//采购权限查看列表接口
export function channelListAPI( obj ){
  return get('/channelApi/channelList',obj)
}
//采购权限详情接口
export function channelInfoAPI( obj ){
  console.log(obj)
  return get('/channelApi/channelInfo',obj)
}


