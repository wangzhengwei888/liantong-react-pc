import { registerModel } from '../utils/common';



export function homeRouter(app) {
  return (
  [
    {
      path: '/',
    //  havTop:false,        //是否有头部,默认有
    havHeadAdvertising:true,
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/home/Home'))
        },'home');
      },
    },
    {
      path: 'home/PeoductSearch/(:searchType)/(:keyword)',//商品列表
      //havTop:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/app/App'));
          registerModel(app, require('../models/home/GoodsList'));
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/home/peoductSearch'))
        },'PeoductSearch');
      },
    },



    {
      path: 'home/PeoductSearchTwo',//商品列表
      //havTop:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/app/App'));
          registerModel(app, require('../models/home/GoodsListTwo'));
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/home/peoductSearchTwo'))
        },'PeoductSearchTwo');
      },
    },
    {
        path:'home/goodsPrintList',//CMD打印列表页面
        getComponent(nextState,cb){
        require.ensure([],(require)=>{
          registerModel(app,require('../models/goodsDetail/goodsDetail'));
          cb(null,require('../routes/goods/goodsPrintList'))
        },'goodsPrintList')
        }
    },
    {
        path:'home/goodsPrintListMSDS',//CMD打印列表页面
        getComponent(nextState,cb){
        require.ensure([],(require)=>{
          registerModel(app,require('../models/goodsDetail/goodsDetail'));
          cb(null,require('../routes/goods/goodsPrintListMSDS'))
        },'goodsPrintListMSDS')
        }
     },


    // {
    //   path: 'home/goodsPrintList',//商品列表
    //   //havTop:false,        //是否有头部,默认有
    //   getComponent(nextState, cb){
    //     require.ensure([], (require) => {
    //       //registerModel(app, require('../models/app/App'));
    //       registerModel(app, require('../models/home/GoodsListTwo'));
    //       //registerModel(app, require('../models/home/Home'));
    //       cb(null, require('../routes/home/peoductSearchTwo'))
    //     },'PeoductSearchTwo');
    //   },
    // },


    {
      path: 'home/strollFactory',//逛厂家
      //havTop:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
         // registerModel(app, require('../models/home/Home'));
          registerModel(app, require('../models/home/StrollFactory'));
          cb(null, require('../routes/home/strollFactory'))
        },'strollFactory');
      },
    },
    {
      path: 'home/strollStore',//逛店铺
      //havTop:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          // registerModel(app, require('../models/home/strollFactory'));
          registerModel(app, require('../models/home/Home'));
          registerModel(app, require('../models/home/StrollStore'));
          cb(null, require('../routes/home/strollStore'))
        },'strollStore');
      },
    },
    {
      path: 'home/article/:articleId',//站内文章
      //havTop:false,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/home/article'))
        },'article');
      },
    }
  ]
  );
}



