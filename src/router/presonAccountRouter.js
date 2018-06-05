import { registerModel } from '../utils/common';
import {request} from "../utils/request";

export function presonAccountRouter(app) {
  return (
    [
      {
        path:'presonAccount/presonAccount',
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/presonAccount/Security'))
            cb(null, require('../routes/presonAccount/SecurityHome'))
          },'security')
        }
      },
      {
        path: 'presonAccount/presonAccount/setPassword',
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/presonAccount/Security'))
            cb(null, require('../routes/presonAccount/SetPassword'))
          },'presonAccount/setpassword')
        }
      },
      {
        path: 'presonAccount/presonAccount/bindingEmail',
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/presonAccount/Security'))
            cb(null, require('../routes/presonAccount/Binding'))
          },'presonAccount/bindingEmail')
        }
      },
      {
        path: 'presonAccount/presonAccount/removeEmail',
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/presonAccount/Security'))
            cb(null,require('../routes/presonAccount/Unbound'))
          },'presonAccount/removeEmail')
        }
      },
      {
        path: 'presonAccount/presonAccount/bindingPhone',
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/presonAccount/Security'))
            cb(null,require('../routes/presonAccount/Binding'))
          },'presonAccount/bindingPhone')
        }
      },
     {
      path: 'presonAccount/presonAccount/bindingSuccess',
      getComponent(nextState, cb){
       require.ensure([], (require) => {
        registerModel(app, require('../models/presonAccount/Security'))
        cb(null,require('../routes/presonAccount/BindingSuccess'))
       },'presonAccount/bindingPhoneSuccess')
      }
     },
     {
      path: 'presonAccount/presonAccount/emailSuccess',
      getComponent(nextState, cb){
       require.ensure([], (require) => {
        registerModel(app, require('../models/presonAccount/Security'))
        cb(null,require('../routes/presonAccount/BindingSuccess'))
       },'presonAccount/bindingPhoneSuccess')
      }
     },
      {
        path: 'presonAccount/presonAccount/removePhone',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/presonAccount/Security'))
            cb(null,require('../routes/presonAccount/Unbound'))
          },'presonAccount/removePhone')
        }
      },
     {
      path: 'presonAccount/personalInformation',
      getComponent(nextState, cb){
       require.ensure([],(require) => {
        registerModel(app, require('../models/presonAccount/setMemberInfo'))
        cb(null,require('../routes/presonAccount/personalInformation'))
       },'presonAccount/personalInformation')
      }
     },
     {
      path: 'presonAccount/addressList',
      getComponent(nextState, cb){
       require.ensure([],(require) => {
        registerModel(app, require('../models/presonAccount/address'))
        cb(null,require('../routes/presonAccount/addressList'))
       },'presonAccount/addressList')
      }
     },
     {
      path: 'presonAccunt/myAccount',
      getComponent(nextState, cb){
       require.ensure([], (require) => {
         registerModel(app, require('../models/presonAccount/Security'))
        cb(null,require('../routes/presonAccount/MyAccount'))
       },'presonAccount/myAccount')
      }
     },
     {
      path: 'presonAccount/intelligentUp',
      getComponent(nextState, cb){
       require.ensure([], (require) => {
        registerModel(app, require('../models/presonAccount/authen'))
        cb(null,require('../routes/presonAccount/intelligentUp'))
       },'presonAccount/intelligentUp')
      }
     },
     {
      //资质上传历史记录
      path: 'presonAccount/intelligentUp/intelligentHistory',
      getComponent(nextState, cb){
       require.ensure([], (require) => {
        registerModel(app, require('../models/presonAccount/authen'))
        cb(null,require('../routes/presonAccount/intelligentHistory'))
       },'presonAccount/intelligentHistory')
      }
     },
     {
      //预存款信息
      path: 'presonAccount/deposit',
      getComponent(nextState, cb){
       require.ensure([], (require) => {
         registerModel(app, require('../models/presonAccount/Security'))
        cb(null,require('../routes/presonAccount/deposit'))
       },'presonAccount/deposit')
      }
     },
     {
      //采购模板管理
      path: 'presonAccount/managerTemplates',
      getComponent(nextState, cb){
       require.ensure([], (require) => {
        registerModel(app, require('../models/presonAccount/Security'))
        cb(null,require('../routes/presonAccount/managerTemplates'))
       },'presonAccunt/managerTemplates')
      }
     },

    ]
  )
}
