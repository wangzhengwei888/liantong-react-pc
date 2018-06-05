import { registerModel } from '../utils/common';

export function technologyRouter(app) {
  return (
    [
      {
        path: '/technology',//技术中心
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/technology/Technology'))
            registerModel(app, require('../models/home/Home'))
            cb(null, require('../routes/technology/Technology'))
          },'technology')
        },
        getIndexRoute (nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/technology/Technology'));
            // cb(null, { component:require('../routes/brand/StaticState')}) //静态页面
            cb(null, { component:require('../routes/technology/Dynamic')})  //d
          },'technology/static');
        },
        childRoutes: [
          {
            path: 'goodsCMSPrint',//CMD打印页面
            getComponent(nextState, cb) {
              require.ensure([], (require) => {
                registerModel(app, require('../models/technology/Technology'))
                registerModel(app,require('../models/goodsDetail/goodsDetail'));
                cb(null, require('../routes/technology/goodsCMSPrint'))
              }, 'technology/goodsCMSPrint')
            }
          },
          {
            path:'goodsPrintList',//CMD打印列表页面
            getComponent(nextState,cb){
            require.ensure([],(require)=>{
              registerModel(app,require('../models/technology/Technology'));
              registerModel(app,require('../models/goodsDetail/goodsDetail'));
              cb(null,require('../routes/technology/goodsPrintList'))
            },'technology/goodsPrintList')
            }
        },
        {
            path:'goodsPrintListMSDS',//CMD打印列表页面
            getComponent(nextState,cb){
            require.ensure([],(require)=>{
              registerModel(app,require('../models/technology/Technology'));
              registerModel(app,require('../models/goodsDetail/goodsDetail'));
              cb(null,require('../routes/technology/goodsPrintListMSDS'))
            },'technology/goodsPrintListMSDS')
            }
         },
          


        ],

      }
    ]
  )
}
