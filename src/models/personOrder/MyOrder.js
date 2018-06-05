import { getMyOrderList,addCart,cancleOrder,goPayAPI } from "./MyOrderApi";
import {message} from 'antd';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'myOrder',
  state: {
  personOrderListData: [],
   pageNo: 1,
   pageSize: 10,
   orderListTotal: 1
  },
  effects: {
   *MyOrderListEFF({val},{ put, call ,select}){
    const {pageSize}=yield select(state=>state.myOrder);
    const data=yield call(getMyOrderList, {pageSize:pageSize, ...val});
    if(data.result==1){
     yield put({type: 'MyOrderList', personOrderListData: data});
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
   *cancleOrderEFF({val},{ put, call }){
    let orderSn = val.orderSn
    const data=yield call( cancleOrder, val );
    if(data.result==1) {
     yield put({type: 'cancleOrder',orderSn})
     message.success( data.msg, 1.5 );
    }else{
     message.error(data.msg,1.5,()=>{});
    }
   },
   *goPayEFF({val},{ put, call}){
    const data=yield call( goPayAPI, val)
    if(data.result==1) {
     yield put({type: 'personOrder/saveOrder', preload: data.data})
     const {orderSn, payType, orderTotalPrice, isControlInfo,orderAmount} = data.data[0]
     yield put(routerRedux.push({
      pathname: `/payment/${orderSn}/1/${orderAmount}/${orderTotalPrice}/${isControlInfo}`
     }))
    }else{
     message.error(data.msg,1.5,()=>{});
    }
   }
  },
  subscriptions: {
   setup({ dispatch, history }){
    return history.listen(({ pathname, query }) => {
     if(pathname == '/personOrder/myOrder'){
      dispatch({type: 'MyOrderListEFF', val: {pageNo:1}})
     }
    })
   }
  },
  reducers: {
   MyOrderList(state, {personOrderListData}){
    const {data} = personOrderListData
    return {
     ...state,
     personOrderListData:data,
     orderListTotal:personOrderListData.total,
     pageNo: personOrderListData.pageNo
    }
   },
   cancleOrder(state, {orderSn}){
    let data = [...state.personOrderListData]
    data.forEach(item => {
     if(item.orderSn == orderSn){
      item.orderState = 7
      item.orderStateMemo = '订单已取消'
     }
    })
    return {
     ...state,
     personOrderListData: data
    }
   }
  }
}
