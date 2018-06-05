import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getStoreDetail,storeCollection,getStoreClass,cancleCollection,getAdvlist } from './api';
import pathToRegexp from 'path-to-regexp';
import {isLogin} from "../../utils/request";

export default {
  namespace:'store',
  state:{
    storeDetailData:[],
    isFavData:1,
    // storeGoodsData:[],
    topAdvList:[],
    storeClassData:[]
  },
  effects:{
    *storeDetailEFF({payload},{ put, call }){
      const data=yield call(getStoreDetail,payload);
      if(data.result==1){
        yield put({type: 'storeDetail', preload: data});
        yield put({type: 'isFav', preload: data.data.store[0].isFav});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *storeCollectionEFF({payload},{put,call}){
      const data=yield call(storeCollection,payload);
      if(data.result==1){
        message.success(data.msg,1.5,()=>{})
        yield put({type: 'isFav', preload: 1});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *cancleCollectionEFF({payload},{put,call}){
      const data=yield call(cancleCollection,payload);
      if(data.result==1){
        yield put({type: 'isFav', preload: 0});
        message.success(data.msg,1.5,()=>{})
        // yield put({type: 'storeDetail', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    // *storeGoodsEFF({payload},{ put, call }){
    //   const data=yield call(getStoreGoods,payload);
    //   if(data.result==1){
    //     yield put({type: 'storeGoods', preload: data});
    //   }else{
    //     message.error(data.msg,1.5,()=>{});
    //   }
    // },
    *storeClassEFF({payload},{ put, call }){
      const data=yield call(getStoreClass,payload);
      if(data.result==1){
        yield put({type: 'storeClass', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getTopAdvlistEFF({apId,apKey},{put,call}){
      const data=yield call( getAdvlist,apId,apKey);
      if(data.result==1) {
        yield put({type: 'topadvlist', advListData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *getAllEFF({ payload },{put,call}){
      yield [
        put({type: 'storeClassEFF', payload: payload}),
        put({type: 'storeDetailEFF', payload: payload})
      ]
      //if(data.result==1) {

      //}else{
        //message.error(data.msg,1.5,()=>{});
     // }
    }

  },

  reducers:{
    storeDetail(state,{preload}){
      const { data=[] }=preload;
      return {
        ...state,
        storeDetailData:data
      }
    },
    isFav(state,{preload}){
      const  res=preload;
      return {
        ...state,
        isFavData:res
      }
    },
    storeClass(state,{preload}){
      const { data=[] }=preload;
      return {
        ...state,
        storeClassData:data
      }
    },
    topadvlist(state,{advListData}){
      const {data} = advListData;
      return {
        ...state,
        topAdvList:data
      }
    }
  },
  subscriptions:{
    setup({ dispatch, history }){
      return history.listen(({ pathname })=>{
        const match = pathToRegexp('/store/:storeId*').exec(pathname);
        if (match && match[0].startsWith('/store')) {
          let v = {storeId:match[1]}

          dispatch({ type: 'getAllEFF',payload:v});
         // dispatch({ type: 'storeDetailEFF',payload:v});
         // dispatch({ type: 'storeClassEFF',payload:v});

        }
      })
    }
  }
}
