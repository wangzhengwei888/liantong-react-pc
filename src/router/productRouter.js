import { registerModel } from '../utils/common';



export function productRouter(app) {
  return (
    [
      {
        path: '/product',//产品中心
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/product/Product'))
            registerModel(app, require('../models/home/Home'))
            registerModel(app, require('../models/home/GoodsListTwo'));
            cb(null, require('../routes/product/Product'))
          },'product')
        },
        getIndexRoute (nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/product/Product'));
            cb(null, { component:require('../routes/product/Accurate')})
          },'product/accurate');
        },
        childRoutes: [
          {
            path: 'recommend',//产品推荐
            //havTop:false,        //是否有头部,默认有
            getComponent(nextState, cb) {
              require.ensure([], (require) => {
                registerModel(app, require('../models/product/Product'))
                cb(null, require('../routes/product/RecommendedPromotions'))
              }, 'product/recommend')
            }
          },
          {
            path: 'new',//新品上市
            getComponent(nextState, cb){
              require.ensure([], (require) => {
                registerModel(app, require('../models/product/Product'))
                cb(null, require('../routes/product/New'))
              },'product/recommend')
            }
          },
          {
            path: 'promotions',//促销清仓
            getComponent(nextState, cb){
              require.ensure([], (require) => {
                registerModel(app, require('../models/product/Product'))
                cb(null, require('../routes/product/RecommendedPromotions'))
              },'product/promotions')
            }
          },
          {
            path: 'enrollment',//活动报名
            getComponent(nextState, cb){
              require.ensure([], (require) => {
                registerModel(app, require('../models/product/Product'))
                cb(null, require('../routes/product/RecommendedPromotions'))
              },'product/enrollment')
            }
          },
          {
            path: 'importagent',//活动报名
            getComponent(nextState, cb){
              require.ensure([], (require) => {
                registerModel(app, require('../models/product/Product'))
                cb(null, require('../routes/product/ImportAgent'))
              },'product/ImportAgent')
            }
          },
          {
            path: 'quickorderdescription',//快速订购说明
            getComponent(nextState, cb){
              require.ensure([], (require) => {
                registerModel(app, require('../models/product/Product'))
                cb(null, require('../routes/product/QuickOrderDescription'))
              },'product/ImportAgent')
            }
          },
          {
            path: 'quickOrder',//快速订购主页
            getComponent(nextState, cb){
              require.ensure([], (require) => {
                //  registerModel(app, require('../models/product/Product'));
                 registerModel(app, require('../models/product/quickOrderModel'));
                cb(null, require('../routes/product/quickOrder'))
              },'product/quickOrder');
            },
          },
          {
            path: 'productsort',//全部分类
            getComponent(nextState, cb){
              require.ensure([], (require) => {
                registerModel(app, require('../models/product/Product'))
                cb(null, require('../routes/product/ProductSort'))
              },'product/ProductSort')
            }
          },        
          {
            path: 'enrollment/:id',//活动报名详情
            getComponent(nextState, cb){
              require.ensure([], (require) => {
                registerModel(app, require('../models/product/Product'))
                cb(null, require('../routes/product/ActivityDetails'))
              },'product/activitydetails')
            }
          },
           //询价单提交
          {
            path: 'consultList',
            getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/personOrder/ConsultList'))
              cb(null, require('../routes/personOrder/ConsultList'))
            }, 'personOrder/consultList')
            }
          },



        ]
      }
    ]
  );
}



