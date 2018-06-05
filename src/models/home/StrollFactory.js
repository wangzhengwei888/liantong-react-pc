//import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { strollFactoryApi,strollFactoryBanner } from './api';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'strollFactory',
  state:{
    StrollFactory:[],
    strollFactoryBanner:[]
  },
  //effects   接收数据
  effects:{
    *strollFactoryEFF({ pageNo,pageSize,brandName },{put,call}){
      const data=yield call( strollFactoryApi, pageNo,pageSize,brandName);
      if(data.result==1) {
        yield put({type: 'strollFactory', strollFactorydata: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *strollFactoryBannerEFF({},{put,call}){
      const data=yield call(strollFactoryBanner);
      if(data.result==1) {
        yield put({type: 'strollFactoryBanner', strollFactoryBannerdData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
  },

  //subscriptions 监听数据
  subscriptions: {
    setup({ dispatch, history, state }) {
      return history.listen(({ pathname, query }) => {
        if (pathname.startsWith('/home/strollFactory')) {
          dispatch({ type: 'strollFactoryEFF',pageNo:1,pageSize:10,brandName:''});
          dispatch({ type: 'strollFactoryBannerEFF'});
        }
      });
    },
  },

  //reducers 处理数据
  reducers:{
    strollFactory (state,{ strollFactorydata }){
      const { data }=strollFactorydata;
      return {
        ...state,
        StrollFactory:data,
      }
    },
    strollFactoryBanner (state,{ strollFactoryBannerdData }){
      const { data }=strollFactoryBannerdData;
      return {
        ...state,
        strollFactoryBanner:data,
      }
    }
  }
}
