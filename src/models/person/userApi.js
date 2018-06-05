import { post, get } from '../../utils/request';


// /*收藏店铺，商品*/
// export  function memberfavotites(value) {
//   return get('/memberapi/memberfavotites',value);
// }
// /*删除收藏*/
// //storeId,favType,goodsId
// export  function storecollection(value) {
//  return get('/storeapi/storecollection',value);
//  }
/*保存或修改发票信息*/
/*export  function addInvoice(invTitle,invContent,invState) {
 //POST /restApi/v1.0/getMobileCode     获取验证码
 return get('/invoiceapi/addInvoice',{
 invTitle,
 invContent,
 invState});
 }*/
// 商品收藏列表
export  function  goodsCollectListAPI(value) {
  return get('goodsApi/getGoodsFavorites',value);
}
/*删除收藏商品*/
export  function deleteGoodsFavoritesAPI(value) {
  return get('goodsApi/deleteGoodsFavorites',value);
}
// /*添加收藏商品*/
// //storeId,favType,goodsId
// export  function storecollection(value) {
//   return get('goodsApi/addGoodsFavorites',value);
// }

