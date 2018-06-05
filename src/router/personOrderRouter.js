import { registerModel } from '../utils/common';
//import {request} from "../utils/request";

export function personOrderRouter(app) {
  return (
    [
      {
        path: 'personOrder/myOrder', // 我的订单
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/personOrder/MyOrder'))
            cb(null,require('../routes/personOrder/MyOrder'))
          },'personOrder/myOrder')
        }
      },
      {
        path: 'personOrder/orderDetail/:orderId',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/personOrder/OrderDetail'))
            cb(null,require('../routes/personOrder/OrderDetail'))
          },'personOrder/orderDetail')
        }
      },
      {
        path: 'personOrder/order', // 常购列表
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/personOrder/Order'))
            cb(null,require('../routes/personOrder/Order'))
          },'personOrder/order')
        }
      },
    //  //询价单提交
    //  {
    //   path: 'personOrder/consultList',
    //   getComponent(nextState, cb) {
    //    require.ensure([], (require) => {
    //     registerModel(app, require('../models/personOrder/ConsultList'))
    //     cb(null, require('../routes/personOrder/ConsultList'))
    //    }, 'personOrder/consultList')
    //   }
    //  },
     //询价单列表
      {
        path: 'personOrder/myConsultList',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/personOrder/myConsultList'))
            cb(null, require('../routes/personOrder/myConsultList'))
          }, 'personOrder/myConsultList')
        }
      },

      {
        path: 'personOrder/consultDetail/:consultId/:status',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/personOrder/ConsultDetail'))
            cb(null, require('../routes/personOrder/ConsultDetail'))
          }, 'personOrder/consultDetail')
        }
      },
      {
        path: 'personOrder/favList',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/personOrder/FavList'))
            cb(null, require('../routes/personOrder/FavList'))
          }, 'personOrder/favList')
        }
      },
      {
        path: 'personOrder/cart',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/personOrder/Cart'))
            cb(null, require('../routes/personOrder/Cart'))
          }, 'personOrder/cart')
        }
      },
      {
        path: 'personOrder/afterSale/:orderId/:goodsId',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/personOrder/AfterSale'))
            cb(null, require('../routes/personOrder/AfterSale'))
          }, 'personOrder/afterSale')
        }
      },
     {
      path: 'personOrder/returnApply',
      getComponent(nextState, cb) {
       require.ensure([], (require) => {
        registerModel(app, require('../models/personOrder/AfterSale'))
        cb(null, require('../routes/personOrder/AfterSale'))
       }, 'personOrder/returnApply')
      }
     },
      {
        path: 'personOrder/refundList',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/personOrder/RefundList'))
            cb(null, require('../routes/personOrder/RefundList'))
          }, 'personOrder/refundList')
        }
      },
      {
        path: 'personOrder/refundDetail/:id',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/personOrder/RefundDetail'))
            cb(null, require('../routes/personOrder/RefundDetail'))
          }, 'personOrder/refundDetail')
        }
      },
     {
      path: 'personOrder/subOrder/:cartId/:activityIds',
      getComponent(nextState, cb) {
       require.ensure([], (require) => {
        registerModel(app, require('../models/personOrder/personOrder'))
        cb(null, require('../routes/personOrder/personOrder'))
       }, 'personOrder/cart')
      }
     }
    ]
  )
}
