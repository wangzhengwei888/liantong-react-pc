//import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { strollStoreBanner } from './api';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'strollStore',
  state:{
    strollStoreBanner:[]
  },
  //effects   接收数据
  effects:{
    *strollStoreBannerEFF({},{put,call}){
      const data=yield call(strollStoreBanner);
      if(data.result==1) {
        yield put({type: 'strollStoreBanner', strollStoreBannerdData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
  },

  //subscriptions 监听数据
  subscriptions: {
    setup({ dispatch, history, state }) {
      return history.listen(({ pathname, query }) => {
        if (pathname.startsWith('/home/strollStore')) {
          dispatch({ type: 'strollStoreBannerEFF'});
        }
      });
    },
  },

  //reducers 处理数据
  reducers:{
    strollStoreBanner (state,{ strollStoreBannerdData }){
      const { data }=strollStoreBannerdData;
      return {
        ...state,
        strollStoreBanner:data,
      }
    }
  }
}
