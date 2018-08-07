import { registerModel } from '../utils/common';



export function changePlanRouter(app) {
  return (
  [
    {
      path: '/changePlan',
    //  havTop:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/changePlan/ChangePlan'));
          cb(null, require('../routes/changePlan/ChangePlan'))
        },'ChangePlan');
      },
    },
   {
    path:'/changePlan/detail',
    getComponent(nextState,cb){
     require.ensure([], (require) => {
      registerModel(app, require('../models/changePlan/ChangePlan'));
      cb(null, require('../routes/changePlan/ChangePlanDetail'))
     },'ChangePlanDetail');
    }
   }
  ]
  );
}



