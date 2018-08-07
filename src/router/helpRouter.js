import { registerModel } from '../utils/common';



export function helpRouter(app) {
  return (
  [
    {
      path: '/help',
    //  havTop:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/help/Help'))
        },'Help');
      },
    },
  ]
  );
}



