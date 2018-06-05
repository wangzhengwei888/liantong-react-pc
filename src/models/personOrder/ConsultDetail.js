import {message} from 'antd';
import pathToRegexp from 'path-to-regexp'
import {
 quoteGoodsDetailApi,addInquiry,addCart
} from './ConsultDetailApi';


export default {
 namespace: 'ConsultDetail',
 state: {
  personConsultDetail: [],
  sendValue:{
   quoteId:'',
   pageNo:1,
   pageSize:10
  }

 },
 effects: {
  * quoteGoodsDetailEFF({val}, {put, call,select}) {
   let v = yield select(state => state.ConsultDetail)
   console.log(v.sendValue)
   const data = yield call(quoteGoodsDetailApi, {...v.sendValue,...val});
   if (data.result == 1) {
    yield put({type: 'personConsultDetailList', data: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  // /加入询价单
  *addInquiryEFF({  val },{ put, call }){
   const data=yield call( addInquiry, val  );
   if(data.result==1) {
    message.success( data.msg, 1.5 );
   }else{
    message.error(data.msg,1.5,()=>{});
   }
  },
  * addCartEFF({val}, {put, call}) {
   const data = yield call(addCart, val);
   if (data.result == 1) {
    message.success(data.msg, 1.5);
    yield put({type: 'app/cartCount', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

 },

 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    const match = pathToRegexp('/personOrder/consultDetail/:id/:status').exec(pathname);
    console.log(match)
    if (pathname.indexOf("/personOrder/consultDetail") >= 0) {
     dispatch({type: 'quoteGoodsDetailEFF',val:{quoteId:match[1],quoteStatus:match[2]}});
    }
   });
  }
 },

 reducers: {
  personConsultDetailList(state, {data}) {
   return {
    ...state,
    personConsultDetail: data.data,
   }
  },
 }
}


