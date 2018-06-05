import { registerModel } from '../utils/common';



export function personRouter(app) {
  return (
    [
      {
        path: 'person',
        //havTop:false,        //是否有头部,默认有
        //havBottom:false        //是否有bottom,默认有
        preson:true,            //是否是个人中心部分，默认不是，是个人中心，则会引入个人中心对应的头部尾部
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/person/orderList'));
            cb(null, require('../routes/order/orderList'))
          },'orderDetail');
        },
      },{
      path: 'person/collection_goods/:type',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/person/collectionGood'));
          cb(null, require('../routes/person/collection_goods'))
        },'person/collection_goods');
      },
    },{
      path: 'person/collection_store/:type',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/person/collectionStore'));
          cb(null, require('../routes/person/collection_store'))
        },'person/collection_store');
      },
    },{
      path: 'person/predepositIndex',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/person/predepositIndex'))
        },'person/predepositIndex');
      },
    },
      {
        path: 'person/backGoods',
        preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/customService/customService'));
            cb(null, require('../routes/person/backGoods'))
          },'person/backGoods');
        },
      },{
      path: 'person/personIntegral',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/person/integral'))
        },'person/personIntegral');
      },
    },{
        path: 'person/backMoney',
        preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            //registerModel(app, require('../models/home/Home'));
            cb(null, require('../routes/person/backMoney'))
          },'person/backMoney');
        },
      },{
        path: 'person/changeGoods',
        preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            //registerModel(app, require('../models/home/Home'));
            cb(null, require('../routes/person/changeGoods'))
          },'person/changeGoods');
        },
      },{
      path: 'person/backDetail',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/person/backDetail'))
        },'person/backDetail');
      },
    },{
      path: 'person/myconsult',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/person/myconsult'))
        },'person/myconsult');
      },
    },{
      path: 'person/urserCoupon',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/person/urserCoupon'))
        },'person/urserCoupon');
      },
    },{
      path: 'person/giftExchange',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/person/giftExchange'))
        },'person/giftExchange');
      },
    },{
      path: 'person/messageList',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/person/messageList'))
        },'person/messageList');
      },
    },{
      path: 'person/messageDetail',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/person/messageDetail'))
        },'person/messageDetail');
      },
    },{
      path: 'person/groupManagement',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/person/groupManagement'))
        },'person/groupManagement');
      },
    },{
      path: 'person/groupManagementDetail',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          //registerModel(app, require('../models/home/Home'));
          cb(null, require('../routes/person/groupManagementDetail'))
        },'person/groupManagementDetail');
      },
    },{
      path: 'person/personalInformation',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          registerModel(app, require('../models/presonSetrer/setMemberInfo'));
          cb(null, require('../routes/person/personalInformation'))
        },'person/personalInformation');
      },
    },
      {
        path: 'person/myAddress',
        preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
             registerModel(app, require('../models/presonSetrer/addressModel'));
            cb(null, require('../routes/person/myAddress'))
          },'person/myAddress');
        },
      },
      {
        path: 'person/evaluateBask',
        preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/person/myAddress'));
            cb(null, require('../routes/person/evaluateBask'))
          },'person/evaluateBask');
        },
      },
      {
        path: 'person/setPassword',
        preson: true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/person/myAddress'));
            cb(null, require('../routes/person/setPassword'))
          }, 'person/setPassword');
        }
      },
      {
        path: 'person/myLevel',
        preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/person/myAddress'));
            cb(null, require('../routes/person/myLevel'))
          },'person/myLevel');
        }
      },
      {
        path: 'person/setSecurity',
        preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            // registerModel(app, require('../models/person/myAddress'));
            cb(null, require('../routes/person/setSecurity'))
          },'person/setSecurity');
        }
      },{
      path: 'person/circleList',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          // registerModel(app, require('../models/person/myAddress'));
          cb(null, require('../routes/person/circleList'))
        },'person/circleList');
      }
    },{
      path: 'person/circleListAdm',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          // registerModel(app, require('../models/person/myAddress'));
          cb(null, require('../routes/person/circleListAdm'))
        },'person/circleListAdm');
      }
    },{
      path: 'person/circlePostList',
      preson:true,        //是否有头部,默认有
      getComponent(nextState, cb){
        require.ensure([], (require) => {
          // registerModel(app, require('../models/person/myAddress'));
          cb(null, require('../routes/person/circlePostList'))
        },'person/circlePostList');
      }
    },
      {
        path: 'person/queryChannel',
        preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
             registerModel(app, require('../models/presonSetrer/queryChannelModel'));
            cb(null, require('../routes/person/queryChannel'))
          },'queryChannel');
        }
      },
      {
        path: 'person/queryChannelDetails/:id',
        preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/presonSetrer/queryChannelModel'));
            cb(null, require('../routes/person/queryChannelDetails'))
          },'queryChannel');
        }
      },
      {
        path: 'person/purchaseTemplet',
        preson:true,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/product/purchaseTempletModel'));
            cb(null, require('../routes/person/purchaseTemplet'))
          },'queryChannel');
        }
      }
    ]
  );
}
