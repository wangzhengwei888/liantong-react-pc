import {  get } from '../../utils/request';



export  function getStoreDetail(values) {
  return get('/storeApi/storedetail',values);
}
// export  function getStoreGoods(values) {
//   return get('/storeApi/storegoods',values);
// }
export  function getStoreClass(values) {
  return get('/storeApi/storeclass',values);
}

//店铺收藏
export  function storeCollection(values) {
  return get('/storeApi/storecollection',values);
}

//取消店铺收藏
export  function cancleCollection(values) {
  return get('/storeApi/canclecollection',values);
}

//自营店铺轮播图
export  function getAdvlist(Apid,apKey) {
  return get('/indexApi/indexAdvList',{apId,apKey});
}


export  function goodsListApi(shopListObj) {
  console.log(shopListObj)
  return get('/storeApi/storegoods',shopListObj);
}
//
export  function goodsfilterApi(storeId) {

  return get('/storeApi/storegoodsfilter',storeId);
}
/*添加购物车*/
export  function addCartApi (goodsId,goodsPrice,count) {
  console.log(goodsId,goodsPrice,count);
  return get('/cartApi/addCart',{
    goodsId,goodsPrice,count
  });
}

