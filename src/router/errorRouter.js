import { registerModel } from '../utils/common';



export function errorRouter(app) {
  return (
    [
      {
        path: '*',
        //havTop:false,        //是否有头部,默认有
        //havBottom:false        //是否有bottom,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/cart/cart'));
            cb(null, require('../routes/error/error'))
          },'error');
        },
      },
    ]
  );
}



