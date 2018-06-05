import { registerModel } from '../utils/common';



export function circleRouter(app) {
  return (
    [
      {
        path: 'circle',
        //havTop:false,        //是否有头部,默认有
        //havBottom:false        //是否有bottom,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/circle/circle'));
            cb(null, require('../routes/circle/circle'))
          },'circle');
        },
      },
      {
        path: 'addcircle',
        //havTop:false,        //是否有头部,默认有
        //havBottom:false        //是否有bottom,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/circle/circle'));
            cb(null, require('../routes/circle/addCircle'))
          },'addcircle');
        },
      },
      {
        path: 'agreeusecircle',
        //havTop:false,        //是否有头部,默认有
        //havBottom:false        //是否有bottom,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/circle/circle'));
            cb(null, require('../routes/circle/agreeUseCircle'))
          },'agreeusecircle');
        },
      },
      {
        path: 'circleDetails/:circleId',
        //preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/person/myAddress'));
            cb(null, require('../routes/circle/circleDetails'))
          },'circleDetails');
        }
      },
      {
        path: 'circle/cardDetail',
        //havTop:false,        //是否有头部,默认有
        //havBottom:false        //是否有bottom,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/circle/circle'));
            cb(null, require('../routes/circle/cardDetail'))
          },'cardDetail');
        },
      },
      {
        path: 'circle/myFollow',
        //havTop:false,        //是否有头部,默认有
        //havBottom:false        //是否有bottom,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/circle/circle'));
            cb(null, require('../routes/circle/myFollow'))
          },'myFollow');
        },
      },
      {
        path: 'circle/addteizi',
        //havTop:false,        //是否有头部,默认有
        //havBottom:false        //是否有bottom,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/circle/circle'));
            cb(null, require('../routes/circle/addteizi'))
          },'addteizi');
        },
      },
    ]
  );
}



