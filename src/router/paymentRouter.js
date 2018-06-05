import {registerModel} from '../utils/common';


export function paymentRouter(app) {
 return (
  [
   // {
   //  path: 'payment',
   //  getComponent(nextState, cb) {
   //   require.ensure([], (require) => {
   //    registerModel(app, require('../models/payment/paymentModel'));
   //    cb(null, require('../routes/payment/payment'))
   //   }, 'payment');
   //  },
   // },
   {
    path: 'payment/:orderSn/:payType/:orderAmount/:orderTotalPrice/:isControlInfo',
    getComponent(nextState, cb) {
     require.ensure([], (require) => {
      registerModel(app, require('../models/payment/paymentModel'));
      registerModel(app, require('../models/personOrder/personOrder'));
      cb(null, require('../routes/payment/payment'))
     }, 'payment');
    },
   },
   {
    path: 'paymentError/:payState/:msg',
    getComponent(nextState, cb) {
     require.ensure([], (require) => {
      registerModel(app, require('../models/payment/paymentModel'));
      cb(null, require('../routes/payment/paymentError'))
     }, 'paymentError');
    },
   }
  ]
 );
}



