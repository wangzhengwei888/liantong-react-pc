import {routerRedux} from 'dva/router';
import {message} from 'antd';
import pathToRegexp from 'path-to-regexp';
import {setOrderEstimate, getOrderInfo} from './api';

export default {
 namespace: 'myPlan',
 state: {
  orderInfo: {}
 },
 effects: {

  // 提速
  * setOrderEstimateEFF({obj}, {put, call}) {
   console.log(obj)
   const data = yield call(setOrderEstimate, {obj});
   if (data.code == 0) {
    yield put(routerRedux.replace(`/plan/detail/${data.data.order_id}`));
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

  // 提速详情
  * getOrderInfoEFF({order_id}, {put, call}) {
   console.log(order_id)
   const data = yield call(getOrderInfo, {order_id});
   if (data.code == 0) {
    yield put({type: 'load', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
 },

 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    const match = pathToRegexp('/plan/detail/:orderId').exec(pathname);
    console.log(match)
    if(pathname.indexOf("/plan/detail") >= 0){
     dispatch({type: 'getOrderInfoEFF', order_id: match[1]});
    }
   })
  },
 },

 reducers: {
  load(state, {preload}) {
   const {data} = preload;
   return {
    ...state,
    orderInfo: data
   }
  },
 }
}
