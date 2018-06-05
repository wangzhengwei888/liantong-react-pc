import { post, get } from '../../utils/request';



export  function loginApi(values) {
  return post('/loginApi/login',values);
  console.log(values)
}

//用户名验证
export  function checkLoginNameApi(loginName) {
  // /restApi/v1.0/sign
  return post('/loginApi/checkLoginName',loginName);
}

//保存修改的密码
export  function updatePasswordByMobileApi(values) {
  return post('/memberApi/updatePasswordByMobile',values);
}



export  function registerApi(values) {
  // /restApi/v1.0/sign
  return post('/loginApi/register',values);
}
export function getShopDictionary(){
  return get('/dictApi/dictList',{groupCode:"org_type"})
}

export function getFileType(){
  return get('/dictApi/dictList',{groupCode:"cert_type"})
}

//企业信息完善
export function authen(values,json="json"){
  return post('/memberApi/memberAuthenticate',values,json)
}

//资质图片上传
export function filesUpload(values){
  return post('/memberApi/memberFilesUpload',values)
}


//企业信息认证查询memberAuthenticateQuery
export function queryAuthen(values){
  console.log(values)
  return post('/memberApi/memberAuthenticateQuery',values)
}

//获取所属分类
export function getClassData(){
 return post('/dictApi/memberClassList')
}

//获取地区数据
export function getArea(){
 return post('/dictApi/areaList')
}


