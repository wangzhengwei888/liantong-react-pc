import {  get,post } from '../../utils/request';


export  function logout() {
  return get('/loginApi/loginout');
}



//广告
export  function getAdvList() {
  return get('/indexApi/indexAllAdvList');
}

//商品分类
export  function goodsClasslist() {
  return get('/indexApi/goodsClassList');
}

export  function applyChannelApi( goodsId, remark,applyUser,tel ) {
  return post('/channelApi/applyChannel',{ goodsId , remark,applyUser,tel });
}

// //导航
// export function getNav(){
//   return get('/indexApi/navigationList')
// }
//导航
export function getNavList(){
  return get('/indexApi/getNavigationList')
}

//侧边导航
export function getNavListSide(val){
  return get('/indexApi/getNavigationList',val)
}

//文章详情                          
export  function getArticleContent(articleId) {
  return get('/articleApi/articledetail',articleId);
}

///storeApi/storelist
export function getStoreList(){
  return get('/storeApi/storelist')
}


export function getcartCount(){
  return get('/tradeApi/cartCount')
}

export  function getArticle() {
  return get('/articleApi/articlealllist');
}
//热门搜索关键词
export function getHotkeywords(){
  return get('/dictApi/dictList',{groupCode:"keywords_search"})
}
//友情链接
export function getLinkUrl(){
  return get('/dictApi/dictList',{groupCode:"linkurl"})
}

