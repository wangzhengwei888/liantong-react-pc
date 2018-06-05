import pathToRegexp from 'path-to-regexp';
import {message} from 'antd';
import { getOrderDetail, returnOrder } from "./AfterSaleApi";
import {routerRedux} from 'dva/router';
export default {
  namespace: 'afterSale',
  state: {
   orderSn: '',
   goodsDetail: {},
   orderId:'',
   goodsId:'',
   _type: 0
  },
 effects: {
  *getOrderDetailEFF({orderId,goodsId},{ put, call }){
   const data=yield call(getOrderDetail, {orderId:orderId});
   let goodsid = goodsId
   let orderid = orderId
   if(data.result==1){
    yield put({type: 'OrderDetail', OrderDetailData: data, goodsId: goodsid, orderId: orderid});
   }else{
    message.error(data.msg,1.5,()=>{});
   }
  },
  *returnOrderEFF({obj},{ put, call, select }){
   const {orderId,goodsId}=yield select(state=>state.afterSale);
   const data=yield call(returnOrder, {orderId,goodsId,...obj})
   if(data.result==1){
    yield put(routerRedux.push({
     pathname:'/personOrder/refundList'
    }))
    message.success(data.msg,1.5,()=>{});
   }else{
    message.error(data.msg,1.5,()=>{});
   }
  },
  *setTypeEFF({type},{put}){
   console.log(type)
  }
 },
 subscriptions: {
   setup({dispatch, history}){
    return history.listen(({pathname, query}) =>{
     const match = pathToRegexp('/personOrder/afterSale/:orderId/:goodsId').exec(pathname);
     if(match && match[0].startsWith('/personOrder/afterSale')){
      dispatch({type: 'getOrderDetailEFF',orderId: match[1], goodsId: match[2]})
      dispatch({type: 'setType', n: 1})
     }
     if(pathname == '/personOrder/returnApply'){
      dispatch({type: 'setType', n: 0})
     }
    })
   }
 },
 reducers: {
  OrderDetail(state, {OrderDetailData,goodsId,orderId}){
   const {data} = OrderDetailData;
   let goods = {}
   data.forEach(item => {
    item.orderItemsList.forEach(it => {
     if(it.goodsId == goodsId){
      goods = it
     }
    })
   })
   return {
    ...state,
    orderSn: data[0] ? data[0].orderSn : '',
    goodsDetail: goods,
    orderId: orderId,
    goodsId: goodsId
   }
  },
  setType(state, {n}){
   return {
    ...state,
    _type: n
   }
  }
 }
}
