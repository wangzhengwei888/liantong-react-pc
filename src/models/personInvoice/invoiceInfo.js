import { getOrderInvoiceListApi,saveOrderInvoiceAPI  } from './invoiceInfoApi';
import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';

export default {
 namespace:'invoiceInfo',
 state:{
  orderInvoiceList:[]
 },
 effects:{
  // 获取发票列表
  * getOrderInvoiceList({}, {put, call}) {
   const data = yield call(getOrderInvoiceListApi);
   if (data.result == 1) {
    yield put({type: 'orderInvoiceListData', preload: data.data[0]});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  // 保存发票信息saveOrderInvoiceAPI
  * saveOrderInvoiceEFF({payload}, {put, call, select}) {
   let v = yield select(state => state.personOrder);
   const data = yield call(saveOrderInvoiceAPI, payload);
   if (data.result == 1) {
    message.success(data.msg)
    yield put({type: 'getOrderInvoiceList'})
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
 },

 subscriptions: {
  setup({ dispatch, history }) {
   return history.listen(({ pathname, query }) => {
    //dispatch({ type: 'userAddressListEFF',});
    if (pathname=='/presonInvoice/invoiceInfo') {
     dispatch({ type: 'getOrderInvoiceList',});
    }
   });
  }
 },

 reducers:{
  //发票列表
  orderInvoiceListData(state, {preload}) {
   return {
    ...state,
    orderInvoiceList: preload,
   }
  },
 }
}
