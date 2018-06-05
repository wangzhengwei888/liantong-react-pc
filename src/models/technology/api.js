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

export  function GetGoodsDetail(goodsId) {
  // 获取验证码  goodsApp
  return get('/goodsApp/getGoodsDetail',{ goodsId });
}

/*OOA报告查询（产品检验报告）*/
export  function coaListApi(val) {
  return get('/goodsApi/coaList',val);
}
// /goodsApi/csdsList

/*MSDS(化学品安全说明书)*/
export  function csdsListApi(val) {
  return get('/goodsApi/csdsList',val);
}
