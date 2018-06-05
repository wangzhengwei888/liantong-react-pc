import {message} from 'antd';
import {consultListTop, subimtConsultList,updateEnquiryGoodsNumApi,deleteEnquiryGoodsAPI} from './ConsultListApi';
import {routerRedux} from 'dva/router';
export default {
 namespace: 'consultList',
 state: {
  consultListTotal: 2,
  consultListTopData: [],
  init:0
 },
 effects: {
  //提交询价单页面上部询价列表
  * consultListTopEEF({}, {put, call}) {
   const data = yield call(consultListTop,);
   if (data.result == 1) {
    yield put({type: 'loaded', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  //更新询价商品数量
  *updateEnquiryGoodsNumEFF({val},{put,call}){
   const data = yield call(updateEnquiryGoodsNumApi,val);
   if (data.result == 1) {
    message.success(data.msg)
   } else {
    message.error(data.msg, 1.5, () => {});
    yield put({type:'initData'})
   }
  },
  //删除询价商品
  *deleteEnquiryGoodsEFF({goodsId},{put,call}){
   const data = yield call(deleteEnquiryGoodsAPI,goodsId);
   if (data.result == 1) {
    message.success(data.msg)
    yield put({type:'consultListTopEEF'})
   } else {
    message.error(data.msg, 1.5, () => {});
    yield put({type:'initData'})
   }
  },
  //提交所有询价商品
  * subimtConsultListEEF({data}, {put, call}) {
   console.log(data)
   const data1 = yield call(subimtConsultList, data);
   if (data1.result == 1) {
    message.success(data1.msg, 1.5);
    yield put(routerRedux.replace('/personOrder/myConsultList'));
   } else {
    message.error(data1.msg, 1.5, () => {
    });
   }
  },


 },
 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    if (pathname.startsWith('/product/consultList')) {
     dispatch({type: 'consultListTopEEF'});

    }
   });
  }

 },
 reducers: {
  loaded(state, {preload}) {
   const {data} = preload;
   return {
    ...state,
    consultListTopData: data,
   }
  },
  initData(state) {
   return {
    ...state,
    init: state.init + 1
   }
  },
 }
}
