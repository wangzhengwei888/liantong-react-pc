import {  get,post,del } from '../../utils/request'

//获取账户安全性信息
export function getSecurityInfoAPI(){
  return get('/memberApi/memberDetail')
}
//获取邮箱验证码
export function getEmailValidateCodeAPI({val}){
  return get('/memberApi/sendMemberEmail',val)
}

//修改密码
export function modifyPasswordAPI(password){
  return post('/memberApi/updatePassword', password)
}
//绑定邮箱
export function bindingEmailAPI(forminfo){
  return post('/memberApi/emailValidateCode', forminfo)
}
//校验手机号码-邮箱
export function checkMobileAPI(values){
 return post('/loginApi/checkMobileOrEmail',values)
}
//绑定手机
export function bindingPhoneAPI(forminfo){
 return post('/loginApi/checkMobileCode', forminfo)
}
//解绑手机
export function unboundPhoneAPI(forminfo){
  return get('/memberApi/deleteMemeberMobile', forminfo)
}
//解绑邮箱
export function unEmailAPI(forminfo){
 return get('/memberApi/deleteEmail', forminfo)
}
//获取预存款信息
export function depositAPI(val){
 return get('/memberApi/predepositLogList',val)
}
//效验用户已绑定手机验证码
export function checkAPI(values){
 return post('/memberApi/checkCode',values)
}


