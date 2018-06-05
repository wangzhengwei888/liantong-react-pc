import { registerModel } from '../utils/common';

export function featureServiceRouter(app) {
  return (
    [
      {
        path: '/featureservice',//技术中心
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/featureService/featureService'))
            registerModel(app, require('../models/home/Home'))
            cb(null, require('../routes/featureService/FeatureService'))
          },'featureService')
        },
        getIndexRoute (nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/featureService/featureService'));
            // cb(null, { component:require('../routes/brand/StaticState')}) //静态页面
            cb(null, { component:require('../routes/featureService/Dynamic')})  //d
          },'featureService/static');
        }
      }
    ]
  )
}
