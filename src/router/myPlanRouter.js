import { registerModel } from '../utils/common';



export function myPlanRouter(app) {
  return (
  [
    {
      path: '/plan',
    //  havTop:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/myPlan/MyPlan'));
          cb(null, require('../routes/myPlan/myPlan'))
        },'myPlan');
      },
    },
   {
    path: '/plan/detail/:orderId',
    //  havTop:false,        //是否有头部,默认有
    getComponent(nextState, cb){
     require.ensure([], (require) => {
      registerModel(app, require('../models/myPlan/MyPlan'));
      cb(null, require('../routes/myPlan/myPlanDetail'))
     },'myPlan');
    },
   },
  ]
  );
}



