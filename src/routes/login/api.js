import {get, post} from '../../utils/request';


export  function getMobileCode(values) {
  //POST /restApi/v1.0/getMobileCode     获取验证码
  return get('loginApi/sendSmsValidateCode',values);
}

//用户名验证
export  function getCheckLoginName(loginName) {
  return get('/loginApi/checkLoginName',loginName);
}

//用户手机号验证
export  function getCheckLoginMobile(mobile) {
  return get('/loginApi/checkMobile',mobile);
}



//忘记密码页，用户手机号和邮箱验证
export  function checkMobileOrEmail(mobile) {
  return get('/loginApi/checkMobileOrEmail',mobile);
}


//忘记密码页，用户手机号验证码发送
export  function sendForgetPasswordSmsCode(mobile) {
  return get('/loginApi/sendForgetPasswordSmsCode',mobile);
}


