import {  get,post } from '../../utils/request';

//下载
export function downloadAPI(payload){
  // return get('',{payload})
}

//左侧导航栏
export function getleftNavAPI(){
  return get('')
}

//品牌中心动态页面内容
export function getDynamicDataAPI(){
  return get('')
}

//侧边导航
export function getNavListSide(val){
  return get('/indexApi/getNavigationList',val)
}

//文章详情                          
export  function getArticleContent(articleId) {
  return get('/articleApi/articledetail',articleId);
}
