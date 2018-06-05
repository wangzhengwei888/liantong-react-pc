import { registerModel } from '../utils/common';



export function newRouter(app) {

  return (
    [
      {
        path: '/newhome',
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/newModel/newhome'));
            cb(null, require('../routes/new/Newhome'))
          },'newhome');
        },
      },
      {
        path: '/newlist',
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/newModel/newlist'));
            cb(null, require('../routes/new/NewList'))
          },'newlist');
        },
      },
      {
        path: '/newdetail/:id',
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/newModel/newdetail'));
            cb(null, require('../routes/new/NewDetail'))
          },'newlist');
        },
      }
    ]
  );
}

