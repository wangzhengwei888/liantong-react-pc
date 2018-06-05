import { post, get } from '../../utils/request';

//提交搜索结果
export function accurateSearchAPI(obj){
  return post('',obj)
}

//获得拼音列表
export function getpinchecklistAPI(){
  return get('')
}

//获得产品推荐
export function getRecommendAPI(obj){
  return get('/indexApi/getGoodsByCommType',obj)
}

//新品上市
export function getNewProductsAPI(){
  return get('')
}

//促销清仓
export function getPromotionsAPI(){
  return get('')
}

//活动报名
export function getEnrollmentAPI({page}){
  return get('/activitySignupApi/getActivitySignupList',{...page})
}

//精确搜索页面
export function getGoodsListExactAPI(obj){
  return get('/goodsApi/getGoodsListExact',obj)
}

