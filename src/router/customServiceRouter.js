import { registerModel } from '../utils/common';
import {request} from "../utils/request";

export function customServiceRouter(app) {
  return (
    [
      {
        path: '/customservice',
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/customService/customService'))
            registerModel(app, require('../models/home/Home'))
            cb(null,require('../routes/customService/CustomService'))
          },'customservice')
        },
        getIndexRoute(nextState, cb){
          require.ensure([], (require) => {
            cb(null, { component:require('../routes/customService/CustomServiceDefault')})
          },'customservice/default')
        },
        childRoutes:[
          {
            path: 'networkinfo',
            getComponent(nextState, cb){
              require.ensure([], (require) => {
                cb(null,require('../routes/customService/NetworkInfoList'))
              })
            }
          },
          {
            path: 'networkinfo/:id',
            getComponent(nextState, cb){
              require.ensure([], (require) =>{
                cb(null,require('../routes/customService/NetworkDetails'))
              })
            }
          }
        ]
      }
    ]
  )
}
