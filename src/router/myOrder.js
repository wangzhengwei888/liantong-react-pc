import { registerModel } from '../utils/common';



export function myOrderRouter(app) {
  return (
  [
    {
      path: '/myOrder',
    //  havTop:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/myOrder/MyOrder'))
        },'MyOrder');
      },
    },
   {
    path: '/myOrder/detail',
    //  havTop:false,        //是否有头部,默认有
    getComponent(nextState, cb){
     require.ensure([], (require) => {
      registerModel(app, require('../models/home/Home'));
      cb(null, require('../routes/myOrder/MyOrderDetail'))
     },'MyOrderDetail');
    },
   }
  ]
  );
}



