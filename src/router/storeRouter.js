import { registerModel } from '../utils/common';



export function storeRouter(app) {
  return (
    [
      {
        path: 'store/:storeId',
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/store/store'));
            registerModel(app, require('../models/store/storegoodsList'));
            cb(null, require('../routes/store/store'))
          },'store');
        },
      },
      {
        path: 'store/:storeId/detail',
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/store/store'));
            registerModel(app, require('../models/store/storegoodsList'));
            cb(null, require('../routes/store/storeDetail'))
          },'storeDetail');
        },
      },
      {
        path: 'store/:storeId/info',
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/store/store'));
            registerModel(app, require('../models/store/storegoodsList'));
            cb(null, require('../routes/store/storeInfo'))
          },'storeInfo');
        },
      },
      {
        path: 'store/:storeId/result/:goodsName*',
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/store/store'));
            registerModel(app, require('../models/store/storegoodsList'));
            cb(null, require('../routes/store/storeResult'))
          },'storeResult');
        },
      }
    ]
  );
}



