import { registerModel } from '../utils/common';
import {request} from "../utils/request";

export function presonInvoiceRouter(app) {
  return (
    [
      {
        path:'presonInvoice/invoiceInfo',
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/personInvoice/invoiceInfo'))
            cb(null, require('../routes/personInvoice/invoiceInfo'))
          },'invoiceInfo')
        }
      },
    ]
  )
}
