


import { post, get } from '../../utils/request';

//加入购物车
export function addCart(obj){
 console.log(obj)
 return get('/tradeApi/addCart',obj)
}


// 修改购物车数量
export function updateCartCount(obj){
 return get('/tradeApi/updateCartCount',obj)
}

// 删除收藏商品
export function deleteGoodsFavorites(goodsId){
 return get('/goodsApi/deleteGoodsFavorites',goodsId)
}


/*添加收藏商品*/
export  function addGoodsFavoritesAPI(goodsId) {
    console.log(goodsId)
    return post('goodsApi/addGoodsFavorites',goodsId);
  }

//收藏列表
export  function getGoodsFavoritesList() {
    return post('goodsApi/getGoodsFavoritesList');
  }
//批量加入购物车
export  function getAddCartBachAPI(arr) {
//console.log(arr)
 return  post('/tradeApi/addCartBach', { list:arr } , 'json');  //[{goodsId,goodsNum,newGoodsPrice}]
}
//收藏列表搜索
export  function searchFavGoodsApi(goodsName) {
//console.log(arr)
 return  post('/goodsApi/getGoodsFavoritesList',goodsName);
}

