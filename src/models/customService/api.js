import {  get } from '../../utils/request';

export  function getReturnList(values) {
  return get('/orderApi/returnList',values);
}

//左侧导航栏
export function getleftNavAPI(){
  return get('');
}

//公路提货网点列表
export function getInfoListAPI(){
  return get('')
}

//默认页面
export function getDefaultInfoAPI(){
  return get('')
}

//公路提货网点详情
export function getNetworkDetailsAPI(id){
  return get('',{id})
}
