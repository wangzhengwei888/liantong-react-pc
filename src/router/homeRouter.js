import { registerModel } from '../utils/common';



export function homeRouter(app) {
  return (
  [
    {
      path: '/',
    //  havTop:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/home/Home'))
        },'home');
      },
    },
  ]
  );
}



