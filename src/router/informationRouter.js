import { registerModel } from '../utils/common';



export function informationRouter(app) {
  return (
    [
      {
        path: '/information',
        havTop:false,havBottom:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/information/information'));
            cb(null, require('../routes/information/information'))
          },'information');
        },
      },{
      path: 'informationList',
      havTop:false,havBottom:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          // registerModel(app, require('../models/information/informationList'));
          cb(null, require('../routes/information/informationList'))
        },'informationList');
      },
    },{
      path: 'informationDetails',
      havTop:false,havBottom:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          // registerModel(app, require('../models/information/informationDetails'));
          cb(null, require('../routes/information/informationDetails'))
        },'informationDetails');
      },
    },  
    {
      path: 'information/informationList/:acID',
      // havTop:false,havBottom:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/information/information'));
          cb(null, require('../routes/information/informationList'))
        },'informationList');
      },
    },
    {
      path: 'information/informationDetails/:contentId',
      // havTop:false,havBottom:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/information/information'));
          cb(null, require('../routes/information/informationDetails'))
        },'informationDetails');
      },
    },
    




    ]
  );
}



