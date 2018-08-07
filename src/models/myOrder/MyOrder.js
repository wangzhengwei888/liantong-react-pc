import {routerRedux} from 'dva/router';
import {message} from 'antd';
import pathToRegexp from 'path-to-regexp';
import {orderlist, orderEnterList} from './api';

export default {
 namespace: 'myOrder',
 state: {
  data: [],
  orderEnterList:[]
 },
 effects: {

  // 获取提速专线列表接口
  * getOrderlistEFF({obj}, {put, call}) {
   console.log(obj)
   const data = yield call(orderlist, obj);
   if (data.code == 0) {
    yield put({type: 'load', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

  // 获取专线订单列表接口
  * getOrderEnterListEFF({line_id}, {put, call}) {
   console.log(line_id)
   const data = yield call(orderEnterList, {line_id});
   if (data.code == 0) {
    yield put({type: 'orderEnter', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
 },

 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {

    if(pathname == "/myOrder"){
     let obj ={
      enter_id: "1",
      pageNo:1,
      status:""
     }
     dispatch({type: 'getOrderlistEFF', obj});
    }
    if(pathname.indexOf("/myOrder/detail") >= 0){
     const match = pathToRegexp('/myOrder/detail/:lineId').exec(pathname);
     console.log(match)
     dispatch({type: 'getOrderEnterListEFF', line_id: match[1]});
    }
   })
  },
 },

 reducers: {
  load(state, {preload}) {
   const {data} = preload;
   return {
    ...state,
    data: data,
   }
  },
  orderEnter(state, {preload}) {
   const {data} = preload;
   return {
    ...state,
    orderEnterList:data
   }
  },
 }
}
