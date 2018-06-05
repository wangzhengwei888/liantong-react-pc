import { post, get } from '../../utils/request';

//报价单详情
export function quoteGoodsDetailApi(val){
 console.log(val)
 return get('/goodsApi/quoteGoodsDetail',val)
}
//加入询价单
export function addInquiry(val){
 //console.log( goodsId,num)
 return get('/goodsApi/applyEnquiryGoods',val)
}

// 再次购买
export function addCart(obj){
 return get('/tradeApi/addCart',obj)
}
