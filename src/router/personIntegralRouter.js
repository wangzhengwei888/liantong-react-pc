import { registerModel } from '../utils/common';
import {request} from "../utils/request";

export function presonIntegralRouter(app) {
  return (
    [
      {
        path: 'personIntegral/giftShoppingCart',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/presonIntegral/Integral'))
            cb(null,require('../routes/personIntegral/GiftShoppingCart'))
          },'personIntegral/giftShoppingCart')
        }
      },
      {
        path: 'personIntegral/mall',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/presonIntegral/Integral'))
            cb(null,require('../routes/personIntegral/IntegralMall'))
          },'personIntegral/mall')
        }
      },
      {
        path: 'personIntegral/giftorder',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/presonIntegral/Integral'))
            cb(null,require('../routes/personIntegral/GiftOrder'))
          },'personIntegral/giftorder')
        }
      }
    ]
  )
}
