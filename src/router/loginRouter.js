import { registerModel } from '../utils/common';



export function loginRouter(app) {
  return (
    [
      {
        path: 'login',
        havTop:true,        //是否有头部,默认有
        havBottom:true,        //是否有bottom,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/login/Login'));
            cb(null, require('../routes/login/Login'))
          },'login');
        },
      },
     // {
     //  //网销用户跳转页-手机绑定
     //  path: 'bindPhone',
     //  havTop:true,        //是否有头部,默认有
     //  havBottom:true,        //是否有bottom,默认有
     //  getComponent(nextState, cb){
     //   require.ensure([], (require) => {
     //    registerModel(app, require('../models/login/Login'));
     //    cb(null, require('../routes/login/bindPhone'))
     //   },'bindPhone');
     //  },
     // },
      {
        path: 'loginAuthen',
        havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/login/Login'));
            cb(null, require('../routes/login/authen'))
          },'loginAuthen');
        },
      },
      {
        path: 'loginRegister',//注册
        havTop:true,
       havBottom:true,
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/login/Login'));
            cb(null, require('../routes/login/register'))
          },'loginRegister');
        },
      },
      {
        path: 'loginForgetPassword',//忘记密码
       havTop:true,
       havBottom:true,       //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/login/Login'));
            cb(null, require('../routes/login/forgetPassword'))
          },'loginForgetPassword');
        },
      },
    ]
  );
}



