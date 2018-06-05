import {del, get, post} from '../../utils/request';

//获取账户安全性信息
export function getSecurityInfoAPI(){
 return get('/memberApi/memberDetail')
}
//获取邮箱验证码
export function getEmailValidateCodeAPI(values,type){
  return get('/memberApi/sendMemberEmail', {memberEmail: values,type:type} )
}

//获得手机绑定验证码
export  function getPhoneValidateCodeAPI(values) {
 console.log(values)
 //POST /restApi/v1.0/getMobileCode     获取验证码
 return get('loginApi/sendSmsValidateCode',{mobile:values.mobile,type:values.type});
}
//获得手机解绑验证码
export  function getPhoneValidateCodeTwoAPI(values) {
 //POST /restApi/v1.0/getMobileCode     获取验证码
 console.log(values)
 return get('loginApi/sendSmsValidateCode',{mobile:values.mobile,type:values.type});
}
//效验手机动态验证码
export function bindingPhoneAPI(forminfo){
 return post('loginApi/checkMobileCode',forminfo);
}
//验证手机唯一性
export  function getCheckLoginNameAPI(loginName) {
 return get('/loginApi/checkLoginName',loginName);
}
//解绑手机
export function unboundPhoneAPI(forminfo){
 return del('/memberApi/deleteMemberMobile', {forminfo})
}
//解绑邮箱
export function unboundEmialAPI(forminfo){
 return del('/memberApi/delectEmail', {forminfo})
}
//获取预存款信息
export function depositAPI(val){
 return get('/memberApi/predepositLogList',val)
}
//效验用户已绑定手机验证码
export function checkAPI(values){
 return post('/memberApi/checkCode',values)
}
