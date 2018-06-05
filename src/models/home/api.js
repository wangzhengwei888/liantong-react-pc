import {  get,post } from '../../utils/request';


//楼层
export  function getIndex( pageNo,pageSize  ) {

  return get('/indexApi/indexWebList',{ pageNo, pageSize });
}

//广告
export  function getAdvList() {

  return get('/indexApi/indexAllAdvList');
}


export  function getArticleContent(articleId) {
  return get('/articleApi/articledetail',{articleId});
}

/*商品列表接口*/

export  function goodsListApi(shopListObj) {
  return get('/goodsApi/getGoodsList',shopListObj);
}
//商品搜索过滤器
export  function goodsfilterApi(val) {
  return get('/goodsApi/getGoodsFilter',val);
}


//商品精准搜索过滤器
export  function getGoodsListExactApi(val) {
  return get('/goodsApi/getGoodsListExact',val);
}

//首页商品分类
export  function goodsClasslist() {

  return get('/indexApi/goodsClassList');
}



//首页厂家优惠列表
export  function getBrandlist() {
  return get('/indexApi/indexBrandList',{pageSize:6});
}

//推荐商品
export function getTagList(){
  return get('/indexApi/tagList')
}

//导航
export function getNav(){
  return get('/indexApi/navigationList')
}

/*添加购物车*/
export  function addCartApi (goodsId,goodsPrice,count,saveType,) {
  console.log(count)
  return get('/tradeApi/addCart',{
    goodsId,goodsPrice,count,saveType,
  });
}


/*商品添加入收藏商品*/
export  function addGoodsFavoritesAPI(goodsId) {
  console.log(goodsId)
  return post('goodsApi/addGoodsFavorites',goodsId);
}

// 逛厂家
export function strollFactoryApi(pageNo,pageSize,brandName) {
  return get('/brandApi/brandlist',{pageNo,pageSize,brandName});
}


// 逛厂家轮播图 /indexApi/indexAdvList?apKey=brandbanner
export function strollFactoryBanner() {
  return get('/indexApi/indexAdvList',{apKey:'brandbanner'});
}

// 逛店铺轮播图 /indexApi/indexAdvList?apKey=storebanner
export function strollStoreBanner() {
  return get('/indexApi/indexAdvList',{apKey:'storebanner'});
}


// 搜索列表广告位：apKey=goodslistbanner
export function peoductSearchBannerApi() {
  return get('/indexApi/indexAdvList',{apKey:'goodslistbanner'});
}



 //加入询价单
 export function addInquiry(val){
  //console.log( goodsId,num)
  return get('/goodsApi/applyEnquiryGoods',val)
 }

 //新闻中心和导航数据
export function informationIndexAPI (){
  return get('contentExhibitionApi/index ',{});
}
