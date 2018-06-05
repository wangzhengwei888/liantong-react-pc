import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { compare } from '../../utils/common';
import pathToRegexp from 'path-to-regexp';


export default {
  namespace:'newdetail',
  state:{
  },
  effects:{
    *logout({},{ put, call }){
      const data=yield call(logout);
      if(data.result==1){


        // yield put({type: 'cartCount', preload: {data:[{cartCount:0}]}});
        // yield put(routerRedux.push({
        //   pathname:'/',
        // }));
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    }
  },

  reducers:{
    loadGoodsClass(state,{goodsClass}){
      const { data }=goodsClass;
      let newData = data.sort(compare('gcSort'));
      return {
        ...state,
        goodsClass:newData
      }
    }
  },
  subscriptions:{
    setup({ dispatch, history }){
      return history.listen(({ pathname })=>{

        //const match = pathToRegexp('/person/:bar?*').exec(pathname);

      })
    }
  }
}
