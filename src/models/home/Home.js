import {routerRedux} from 'dva/router';
import {message} from 'antd';
import {compare} from '../../utils/common';
import pathToRegexp from 'path-to-regexp';
import {getLineList} from './api';

export default {
 namespace: 'home',
 state: {
  data: [],
 },
 effects: {
  * getIndexEFF({user_id}, {put, call}) {
   const data = yield call(getLineList, {user_id});
   if (data.code == 0) {
    yield put({type: 'load', preload: data});
    let hlwLineNoArr = [];
    data.data.map((list, index) => {
     hlwLineNoArr.push(list.hlwLineNo)
    })
    // sessionStorage.setItem("hlwLineNoArr", JSON.stringify(hlwLineNoArr))
    sessionStorage.setItem("lineArr", JSON.stringify(data.data))
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

 },

 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    let userInfo = sessionStorage.getItem("userInfo")
    if (pathname === '/') {
     // if (userInfo) {
      // dispatch({type: 'getIndexEFF', user_id: JSON.parse(sessionStorage.getItem("userInfo")).user_id});
      dispatch({type: 'getIndexEFF', user_id: "1"});
     // }

    }
   })
  },
 },

 reducers: {
  load(state, {preload}) {
   const {data} = preload;
   return {
    ...state,
    data: data
   }
  },
 }
}
