import { registerModel } from '../utils/common';

export function drugReagentRouter(app) {
  return (
    [
      {
        path: 'drugreagent',//技术中心
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/drugReagent/drugReagent'))
            registerModel(app, require('../models/home/Home'))
            cb(null, require('../routes/drugReagent/DrugReagent'))
          },'drugReagent')
        },
        getIndexRoute (nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/drugReagent/drugReagent'));
            // cb(null, { component:require('../routes/brand/StaticState')}) //静态页面
            cb(null, { component:require('../routes/drugReagent/Dynamic')})  //d
          },'drugReagent/static');
        }
      }
    ]
  )
}
