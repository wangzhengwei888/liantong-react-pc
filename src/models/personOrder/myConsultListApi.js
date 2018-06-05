import { post, get } from '../../utils/request';


// 再次购买
export function addCart(obj){
 return get('/tradeApi/addCart',obj)
}

//批量加入购物车
export  function getAddCartBachAPI(arr) {
 return  post('/tradeApi/addCartBach', { list:arr } , 'json');  //[{goodsId,goodsNum,newGoodsPrice}]
}

//询价单列表
export function quoteOrderListApi(obj){
    return get('/goodsApi/quoteOrderList',obj);
}
//加入询价单
export function addInquiry(val){
 //console.log( goodsId,num)
 return get('/goodsApi/applyEnquiryGoods',val)
}

