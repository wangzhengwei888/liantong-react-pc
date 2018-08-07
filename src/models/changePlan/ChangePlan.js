import {routerRedux} from 'dva/router';
import {message} from 'antd';
import pathToRegexp from 'path-to-regexp';
import {getLineSpeeded, getOrderInfo,setOrderEstimate} from './api';

export default {
 namespace: 'changePlan',
 state: {
  data:[],
  orderInfo: {}
 },
 effects: {

  // 获取已提速企业专线列表接口(变更计划已定提速专线)
  * getLineSpeededEFF({user_id}, {put, call}) {
   const data = yield call(getLineSpeeded, {user_id});
   if (data.code == 0) {
    yield put({type: 'load', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

  // 获取订单详情接口（订单详情
  * getOrderInfoEFF({order_id}, {put, call}) {
   const data = yield call(getOrderInfo, {order_id});
   if (data.code == 0) {
    yield put({type: 'orderInfo', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

  // 提速
  * setOrderEstimateEFF({obj}, {put, call}) {
   console.log(obj)
   const data = yield call(setOrderEstimate, obj);
   if (data.code == 0) {
    yield put(routerRedux.replace(`/plan/detail/${data.data.order_id}`));
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
 },

 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    let user_id = sessionStorage.getItem("userInfo") && JSON.parse(sessionStorage.getItem("userInfo")).user_id || "1"
     dispatch({type: 'getLineSpeededEFF', user_id: user_id});
    if(pathname == "/changePlan/detail"){
     let order_id = sessionStorage.getItem("order_id")
     dispatch({type: 'getOrderInfoEFF', order_id: order_id});
    }
   })
  },
 },

 reducers: {
  load(state, {preload}) {
   const {data} = preload;
   return {
    ...state,
    data: data
   }
  },
  orderInfo(state, {preload}) {
   const {data} = preload;
   return {
    ...state,
    orderInfo: data
   }
  },
 }
}
