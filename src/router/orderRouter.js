import { registerModel } from '../utils/common';



export function orderRouter(app) {
  return (
    [
      {
        path: '/quickOrder',
        // preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
             registerModel(app, require('../models/product/quickOrderModel'));
            cb(null, require('../routes/order/quickOrder'))
          },'quickOrder');
        },
      },
      {
        path: '/person/orderDetail/:id',
        preson:true,            //是否是个人中心部分，默认不是，是个人中心，则会引入个人中心对应的头部尾部
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/order/order'));
            cb(null, require('../routes/order/orderDetail'))
          },'orderDetail');
        },
      },
      {
        path: '/person/orderList',
        preson:true,            //是否是个人中心部分，默认不是，是个人中心，则会引入个人中心对应的头部尾部
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/order/order'));
            cb(null, require('../routes/order/orderList'))
          },'orderList');
        },
      },
      {
        path: '/person/orderListDetail/:id',
        preson:true,            //是否是个人中心部分，默认不是，是个人中心，则会引入个人中心对应的头部尾部
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/order/order'));
            cb(null, require('../routes/order/orderListDetail'))
          },'orderList');
        },
      },
      {
        path: '/person/orderReturns/:id',
        preson:true,            //是否是个人中心部分，默认不是，是个人中心，则会引入个人中心对应的头部尾部
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            //registerModel(app, require('../models/home/Home'));
            cb(null, require('../routes/order/orderReturns'))
          },'orderReturns');
        },
      },
      {
        path: '/person/orderForm',
        preson:true,            //是否是个人中心部分，默认不是，是个人中心，则会引入个人中心对应的头部尾部
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            //registerModel(app, require('../models/home/Home'));
            cb(null, require('../routes/order/orderForm'))
          },'orderForm');
        },
      },
      {
        path: 'order/:cartId',
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/order/order'));
            cb(null, require('../routes/order/order'))
          },'order');
        },
      },
     // {
     //  path: '/person/orderFormDetail/:smId',
     //  preson:true,        //是否是个人中心部分，默认不是，是个人中心，则会引入个人中心对应的头部尾部
     //  getComponent(nextState, cb){
     //   require.ensure([], (require) => {
     //    registerModel(app, require('../models/order/order'));
     //    cb(null, require('../routes/order/orderDetail'))
     //   },'order');
     //  },
     // },
     // {
     //  path: '/person/backGoods',
     //  preson:true,        //是否是个人中心部分，默认不是，是个人中心，则会引入个人中心对应的头部尾部
     //  getComponent(nextState, cb){
     //   require.ensure([], (require) => {
     //    registerModel(app, require('../models/order/order'));
     //    cb(null, require('../routes/person/backGoods'))
     //   },'order');
     //  },
     // }
    ]
  );
}



