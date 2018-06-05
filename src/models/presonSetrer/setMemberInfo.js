/*收藏店铺、商品*/
import { memberInfo,setMemberInfo} from './api';
import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'personInfo',
  state:{
    memberInfo:[]
  },
  effects:{
    *getMemberInfoEFF({},{put,call}){
      const data=yield call(memberInfo);
      if(data.result==1) {
        yield put({type: 'upmemberInfo', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *setMemberInfoEFF({payload},{put,call}){
      const data=yield call(setMemberInfo,payload);
      if(data.result==1) {
        console.log(data)
        message.success(data.msg,1.5,()=>{});
        // yield put({type: 'upmemberInfo', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/person/personalInformation').exec(pathname);
        if (match && match[0].startsWith('/person/personalInformation')) {
          dispatch({ type: 'getMemberInfoEFF'});
        }
      });
    },
  },

  reducers:{
    upmemberInfo(state,{ preload }){
      const { data }=preload;
      return {
        ...state,
        memberInfo:data,
      }
    }

  }
}
