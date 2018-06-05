/*收藏店铺、商品*/
import { memberInfo,setMemberInfo,getMemberClassListAPI,getArea} from './memberApi';
import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import {getRegAreaData} from '../../utils/getArea';

export default {
  namespace:'personInfo',
  state:{
    memberInfo:[],
    memberClassList:[],
   areaDataList: getRegAreaData() || []
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
   // 获取地区数据
   * getAreaDate({}, {put, call}) {
    const data = yield call(getArea);
    if (data.result == 1) {
     let area = JSON.stringify(data.data)
     yield put({type: 'areaData', preload: getRegAreaData(area)});
     //地区数据存放到本地缓存,后续直接从本地缓存读取
     localStorage.setItem('area', area)
    } else {
     message.error(data.msg, 1.5, () => {
     });
    }
   },
    *setMemberInfoEFF({payload},{put,call}){
      const data=yield call(setMemberInfo,payload);
      if(data.result==1) {
        message.success(data.msg,1.5,()=>{});
        yield put(routerRedux.push({
         pathname:'/presonAccount/personalInformation'
        }))
        // yield put({type: 'upmemberInfo', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
   *getMemberClassListEFF({},{put, call}){
     const data=yield call(getMemberClassListAPI)
     if(data.result==1) {
      yield put({ type: 'getMemberClassList', preload: data})
     }else{
      message.error(data.msg,1.5,()=>{});
     }
   }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/presonAccount/personalInformation').exec(pathname);
        if (match && match[0].startsWith('/presonAccount/personalInformation')) {
          dispatch({ type: 'getMemberInfoEFF'});
          dispatch({ type: 'getMemberClassListEFF'})
          dispatch({type: 'getAreaDate'});
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
    },
   getMemberClassList(state,{preload}){
     const { data } = preload
     return {
      ...state,
      memberClassList: data
     }
   }
  }
}
