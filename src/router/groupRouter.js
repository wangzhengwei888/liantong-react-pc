import { registerModel } from '../utils/common';
//import {request} from "../utils/request";

export function groupRouter(app) {
  return (
    [
      {
        path: 'group/fav/:role',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/group/Fav'))
            cb(null,require('../routes/group/Fav'))
          },'group/fav')
        }
      },
      {
        path: 'group/opproval',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/group/Opproval'))
            cb(null,require('../routes/group/Opproval'))
          },'group/opproval')
        }
      },
      {
        path: 'group/manage',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/group/Manage'))
            cb(null,require('../routes/group/Manage'))
          },'group/manage')
        }
      },
      {
        path: 'group/manage-member',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/group/ManageMember'))
            cb(null,require('../routes/group/ManageMember'))
          },'group/manageMember')
        }
      },
      {
        path: 'group/opproval-order',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/group/OpprovalOrder'))
            cb(null,require('../routes/group/OpprovalOrder'))
          },'group/opprovalOrder')
        }
      },
      {
        path: 'group/manage-order',
        getComponent(nextState, cb){
          require.ensure([],(require) => {
            registerModel(app, require('../models/group/ManageOrder'))
            cb(null,require('../routes/group/ManageOrder'))
          },'group/manageOrder')
        }
      },
     {
      path: 'group/fund',
      getComponent(nextState, cb){
       require.ensure([],(require) => {
        // registerModel(app, require('../models/group/Fund'))
        cb(null,require('../routes/group/Fund'))
       },'group/fund')
      }
     }
    ]
  )
}
