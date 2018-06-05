import { post, get } from '../../utils/request';


// export function storelistAPI(){
//
//   return get('/storeapi/storelist')
// }
export  function goodsbatchlistAPI(obj) {
  return get('/goods/api/goodsbatchlist',obj);
}


export  function savePurTemplateAPI(obj) {
  // post(url,values,json)
  return post('/purtemplateapi/savePurTemplate', obj, 'json');
}

export  function getPurTemplateListAPI(obj) {
  return post('/purtemplateapi/getPurTemplateList',obj);
}

export  function getPurTemplateItemAPI(obj) {
  return get('/purtemplateapi/getPurTemplateItem',obj);
}

export  function getPurTemplateItemsListAPI(obj) {
  return post('/purtemplateapi/getPurTemplateItemsList',obj);
}


export  function getAddCartBachAPI(arr) {
//console.log(arr)
  return  post('/cartapi/addCartBach', { list:arr } , 'json');  //[{goodsId,goodsNum,newGoodsPrice}]
}

export  function getRecentPurGoodsAPI(obj) {
  return get('/goods/api/getRecentPurGoods',obj);
}

export  function getGoodsFavoritesAPI(obj) {
  return get('/goods/api/getGoodsFavorites',obj);
}

//获取有文件模板的店铺列表
export  function getStoreorglistAPI(obj) {
  return get('storeapi/storeorglist',obj);
}
