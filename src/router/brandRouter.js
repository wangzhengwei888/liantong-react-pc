// import { registerModel } from '../utils/common';

// export function brandRouter(app) {
//   return (
//     [
//       {
//         path: 'brand/:parentId',//品牌中心
//         //havTop:false,        //是否有头部,默认有
//         getComponent(nextState, cb){
//           require.ensure([], (require) => {
//             registerModel(app, require('../models/brand/Brand'))
//             registerModel(app, require('../models/home/Home'))
//             cb(null, require('../routes/brand/Brand'))
//           },'brand')
//         },
//         getIndexRoute (nextState, cb) {
//           require.ensure([], (require) => {
//             registerModel(app, require('../models/brand/Brand'));
//             // cb(null, { component:require('../routes/brand/StaticState')}) //静态页面
//             cb(null, { component:require('../routes/brand/Dynamic')})  //d
//           },'brand/static');
//         }
//       },
//      {
//       path: 'brandStatic',//品牌中心
//       //havTop:false,        //是否有头部,默认有
//       getComponent(nextState, cb){
//        require.ensure([], (require) => {
//         registerModel(app, require('../models/brand/Brand'))
//         registerModel(app, require('../models/home/Home'))
//         cb(null, require('../routes/brand/BrandSta'))
//        },'BrandSta')
//       },
//      }

//     ]
//   )
// }


import { registerModel } from '../utils/common';

export function brandRouter(app) {
  return (
    [
      {
        path: '/brand',//品牌中心
        //havTop:false,        //是否有头部,默认有
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/brand/Brand'))
            registerModel(app, require('../models/home/Home'))
            cb(null, require('../routes/brand/Brand'))
          },'brand')
        },
        getIndexRoute (nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('../models/brand/Brand'));
            // cb(null, { component:require('../routes/brand/StaticState')}) //静态页面
            cb(null, { component:require('../routes/brand/Dynamic')})  //d
          },'brand/static');
        },
        childRoutes: [
          // {
          //   path: 'recommend',//产品推荐
          //   //havTop:false,        //是否有头部,默认有
          //   getComponent(nextState, cb) {
          //     require.ensure([], (require) => {
          //       registerModel(app, require('../models/product/Product'))
          //       cb(null, require('../routes/product/RecommendedPromotions'))
          //     }, 'product/recommend')
          //   }
          // },    
        ]

      },
    //  {
    //   path: 'brandStatic',//品牌中心
    //   //havTop:false,        //是否有头部,默认有
    //   getComponent(nextState, cb){
    //    require.ensure([], (require) => {
    //     registerModel(app, require('../models/brand/Brand'))
    //     registerModel(app, require('../models/home/Home'))
    //     cb(null, require('../routes/brand/BrandSta'))
    //    },'BrandSta')
    //   },
    //  }

    ]
  )
}