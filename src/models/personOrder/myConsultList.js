import { addCart , quoteOrderListApi,addInquiry} from "./myConsultListApi";
import {message} from 'antd';

export default {
  namespace: 'myConsultList',
  state: {
  personOrderListData: [],
   sendValues:{
    pageNo: 1,
    pageSize: 10,
    ListTotal: 0,
    keyword:'',
    quoteStatus:'',
    startDate:'',
    endDate:''
   }

  },
  effects: {
    //询价单列表
    * quoteOrderListEFF({val}, {put, call,select}) {
      const {sendValues}=yield select(state=>state.myConsultList);
      const data=yield call(quoteOrderListApi, {...sendValues, ...val});
      if (data.result == 1) {
      yield put({type: 'getMyConsultList', MyConsultListData: data});
      } else {
      message.error(data.msg, 1.5, () => {
      });
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
   // /加入询价单
   *addInquiryEFF({ val },{ put, call }){
    const data=yield call( addInquiry, val  );
    if(data.result==1) {
     message.success( data.msg, 1.5 );
    }else{
     message.error(data.msg,1.5,()=>{});
    }
   },

  },

  subscriptions: {
   setup({ dispatch, history }){
    return history.listen(({ pathname, query }) => {
     if(pathname == '/personOrder/myConsultList'){
      dispatch({type: 'quoteOrderListEFF'})
     }
    })
   }
  },
  reducers: {

   getMyConsultList(state, {MyConsultListData}) {
    const {data} = MyConsultListData;
    let val = {
     pageNo: MyConsultListData.pageNo,
     pageSize: MyConsultListData.pageSize,
     ListTotal: MyConsultListData.count
    }
    return {
     ...state,
     MyConsultListData: data,
     sendValues: {
      ...state.sendValues,
      ...val
     }
    }
   },




  }
}
