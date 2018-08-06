import {routerRedux} from 'dva/router';
import {message, Modal} from 'antd';
import {compare} from '../../utils/common';
import {getLoginStatus,getOrderRule} from './api';
import pathToRegexp from 'path-to-regexp';

message.config({top: localStorage.getItem("winH") / 2,});

export default {
 namespace: 'app',
 state: {
  data: {},
  ruleData:{}
 },
 effects: {
  * loginStatus({token}, {put, call}) {
   const data = yield call(getLoginStatus, {token});
   if (data.code == 0) {
    sessionStorage.setItem("userInfo", JSON.stringify(result.data.user))
    sessionStorage.setItem("token", result.data.token)
    yield put({type: 'load', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
     // Modal.warning({
     //  content: '未登录或登录失效,请重新登录',
     //  okText: "去登录",
     //  title: "提示",
     //  onOk: function () {
     //   console.log("aaaaaaaa")
     //  }
     // })
    });
   }
  },
  //价格
  * getOrderRuleEFF({}, {put, call}) {
   const data = yield call(getOrderRule);
   if (data.code == 0) {
    yield put({type: 'rule', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
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
  rule(state, {preload}) {
   const {data} = preload;
   return {
    ...state,
    ruleData: data
   }
  },
 },
 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    let token = query.token || sessionStorage.getItem("token")
    if (token) {
     // Modal.warning({
     //  content: '未登录或登录失效,请重新登录',
     //  okText: "去登录",
     //  title: "提示",
     //  onOk: function () {
     //   console.log("aaaaaaaa")
     //  }
     // })
    } else {
     dispatch({type: 'loginStatus', token: token});
     dispatch({type: 'getOrderRuleEFF'});
    }

   })
  }
 }
}
