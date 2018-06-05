import { post, get } from '../../utils/request';

//加入购物车
export function addCart(obj){
 console.log(obj)
 return get('/tradeApi/addCart',obj)
}

//购物车列表
export function getCartList(obj){
 return get('/tradeApi/cartList',obj);
}

// 修改购物车数量
export function updateCartCount(obj){
 return get('/tradeApi/updateCartCount',obj)
}

//修改购物车数量，返回仍然是原来的数量
export function  updateGoodsCount(value){
  return get('/cartApi/updateCartCount',value);
}


// 删除购物车
export function deleteCart(cartId){
 return get('/tradeApi/deleteCart',cartId)
}

// 打印pdf文件
export function printCartPDF(cartId){
  return get('/tradeApi/printCartPDF',cartId)
 }



/*添加收藏商品*/
export  function addGoodsFavoritesAPI(goodsId) {
    console.log(goodsId)
    return post('goodsApi/addGoodsFavorites',goodsId);
  }

