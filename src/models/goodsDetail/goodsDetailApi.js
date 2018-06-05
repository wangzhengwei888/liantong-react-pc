import { get, post } from '../../utils/request';
/*商品详情*/
export  function GetGoodsDetail(goodsId) {
  // 获取验证码  goodsApp
  return get('/goodsApp/getGoodsDetail',{ goodsId });
}


//商品详情页，下的相关推荐
export  function GetGoodsRecommedApi(goodsId) {
  return get('/goodsApi/GoodsRecommed',{ goodsId });
}


// 相关推荐列表
export  function GetGoodsRecommed(val) {
  return get('/goodsApi/GoodsRecommed',val);
}

export  function applyChannelApi( goodsId, remark ) {
  //POST /goodsApi/GetGoodsDetail?goodsId=2
  // 获取验证码
  return post('/channelApi/applyChannel',{ goodsId , remark });
}

export  function addCartApi(goodsId,count,specId,saveType,goodsPrice) {
  return get('/cartApi/addCart',{
    goodsId,count,specId,saveType,goodsPrice
  });
}

export  function priceFeedbackAPI(pOBJ) {
  return get('/channelApi/priceFeedback',pOBJ);
}



//加入购物车
export function addCart(obj){
//  console.log(obj)
  return get('/tradeApi/addCart',obj)
 }

  //加入询价单
export function addInquiry(val){
  //console.log( goodsId,num)
  return get('/goodsApi/applyEnquiryGoods',val)
 }


/*相关商品添加入收藏商品*/
export  function addGoodsFavoritesAPI(goodsId) {
 // console.log(goodsId)
  return post('goodsApi/addGoodsFavorites',goodsId);
}

/*商品列表接口*/
export  function goodsListApi(shopListObj) {
  return get('/goodsApi/getGoodsList',shopListObj);
}

//导航跳转商品列表
export  function goodsListSearchApi(val) {
  return get('/goodsApi/getGoodsList',val);
}



// /goodsApi/coaList

/*OOA报告查询（产品检验报告）*/
export  function coaListApi(val) {
  return get('/goodsApi/coaList',val);
}
// /goodsApi/csdsList

/*MSDS(化学品安全说明书)*/
export  function csdsListApi(val) {
  return get('/goodsApi/csdsList',val);
}