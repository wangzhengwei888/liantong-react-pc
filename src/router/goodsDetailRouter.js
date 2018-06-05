import { registerModel } from '../utils/common';



export function goodsDetailRouter(app) {
  return (
    [
      {
        path: 'goodsDetail/:goodsId',
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/goodsDetail/goodsDetail'));
            cb(null, require('../routes/goods/goodsDetail'))
          },'goodsDetail');
        },
      },
      // {
      //   path: 'goodsDetail/relevantGoods/:goodsId',//相关的商品列表页   
      //   getComponent(nextState, cb){
      //     require.ensure([], (require) => {
      //       //registerModel(app, require('../models/app/App'));
      //       registerModel(app, require('../models/goodsDetail/goodsDetail'));
      //      // registerModel(app, require('../models/home/Home'));
      //       cb(null, require('../routes/goods/relevantGoods'))
      //     },'relevantGoods');
      //   },
      // },
      {
        path: 'goodsDetail/relevantGoods/(:searchType)/:goodsId',//相关的商品列表页   
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            //registerModel(app, require('../models/app/App'));
            registerModel(app, require('../models/goodsDetail/goodsDetail'));
           // registerModel(app, require('../models/home/Home'));
            cb(null, require('../routes/goods/relevantGoods'))
          },'relevantGoods');
        },
      },
      //导航跳转
      //一级导航
      {
        path: 'goodsDetail/relevantGoods/(:searchType)/(:gcId)',//相关的商品列表页   
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            //registerModel(app, require('../models/app/App'));
            registerModel(app, require('../models/goodsDetail/goodsDetail'));
           // registerModel(app, require('../models/home/Home'));
            cb(null, require('../routes/goods/relevantGoods'))
          },'relevantGoods');
        },
      },


      {
          path:'goodsDetail/goodsCMSPrint/:goodsId',//CMD打印页面
          getComponent(nextState,cb){
           require.ensure([],(require)=>{
             registerModel(app,require('../models/goodsDetail/goodsDetail'));
             cb(null,require('../routes/goods/goodsCMSPrint'))
           },'goodsCMSPrint')
          }
      },
    ]
  );
}



