import pathToRegexp from 'path-to-regexp';
import {message} from 'antd';
import { getOrderDetail, addCart, getAddCartBachAPI, cancleOrder } from "./MyOrderApi";
import {routerRedux} from 'dva/router';

export default {
	namespace: 'orderDetail',
	state: {
		  personOrdeDetailData: [],
		  consultListTotal: 2
	  },
   effects: {
    *getOrderDetailEFF({orderId},{ put, call }){
     const data=yield call(getOrderDetail, {orderId:orderId});
     if(data.result==1){
      yield put({type: 'OrderDetail', OrderDetailData: data});
     }else{
      message.error(data.msg,1.5,()=>{});
     }
    },
    *addCartEFF({val},{ put, call }){
     const data=yield call( addCart, val );
     if(data.result==1) {
      message.success( data.msg, 1.5 );
      yield put({type: 'app/getcartCountEFF', preload: data});
     }else{
      message.error(data.msg,1.5,()=>{});
     }
    },
    *getAddCartBachEFF({ arr },{ put, call }){
     const data=yield call( getAddCartBachAPI, arr );
     if(data.result==1){
      yield put({type: 'app/getcartCountEFF', preload: data});
      message.success(data.msg,1.5,()=>{});
     }else{
      message.error(data.msg,1.5,()=>{});
     }
    },
    *cancleOrderEFF({val},{ put, call }){
     let orderSn = val.orderSn
     let orderId = val.orderId
     const data=yield call( cancleOrder, {orderSn: val.orderSn,cancelReason:val.cancelReason} );
     if(data.result==1) {
      yield put({type: 'cancleOrder',orderSn})
      message.success( data.msg, 1.5 );
      if(orderId){
       yield put(routerRedux.push({
        pathname: `/personOrder/orderDetail/${orderId}`
       }))
      }
     }else{
      message.error(data.msg,1.5,()=>{});
     }
    }
   },
   subscriptions: {
    setup({ dispatch, history }){
     return history.listen(({ pathname, query }) => {
      const match = pathToRegexp('/personOrder/orderDetail/:cartId').exec(pathname);
      if(match && match[0].startsWith('/personOrder/orderDetail')){
       dispatch({type: 'getOrderDetailEFF',orderId: match[1]})
      }
     })
    }
   },
   reducers: {
    OrderDetail(state, {OrderDetailData}){
     const {data} = OrderDetailData
     return {
      ...state,
      personOrdeDetailData:data
     }
    },
    cancleOrder(state, {orderSn}){
     let data = [...state.personOrdeDetailData]
     data.forEach(item => {
      if(item.orderSn == orderSn){
       item.orderState = 7
       item.orderStateMemo = '订单已取消'
      }
     })
     return {
      ...state,
      personOrdeDetailData: data
     }
    }
   }
  }
