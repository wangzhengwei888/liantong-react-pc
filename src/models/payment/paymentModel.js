//import { } from './api';
import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import { compare } from '../../utils/common';
import pathToRegexp from 'path-to-regexp';

export default {
 namespace:'payment',
 state:{
  saveOrderDate:[]
 },
 effects:{
//提交订单
  * saveOrderForSinopharmEFF({msg}, {put, call, select}) {
   const val = yield select(state => state.personOrder);
   console.log(val.sendValue)
   const data = yield call(saveOrderForSinopharmAPI, {
    ...val.sendValue,
    predepositAmount: val.sendValue.predepositAmount.toString(),
    goodsTotalNum: val.allGoodsNum.toString(),
    orderMessage: msg
   });
   if (data.result == 1) {
    message.success(data.msg, 1.5, () => {});
    yield put({type: 'saveOrder', preload: data.data})
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

 },

 subscriptions: {
  setup({ dispatch, history }) {
   return history.listen(({ pathname, query }) => {
    // if(pathname == '/person/orderList'){
    //   dispatch({ type: 'personOrderListEFF'});
    // }
   });
  },

 },
 reducers:{
  //保存订单后的数据
  saveOrder(state, {preload}) {
   return {
    ...state,
    saveOrderDate: preload
   }
  }
 }
}
