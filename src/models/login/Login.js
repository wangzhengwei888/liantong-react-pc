import {
 loginApi,
 checkLoginNameApi,
 registerApi,
 updatePasswordByMobileApi,
 getShopDictionary,
 authen,
 queryAuthen,
 getFileType,
 getClassData,
 getArea
} from './api';
import {routerRedux} from 'dva/router';
import {message, Icon, Modal} from 'antd';
import {setCookie} from '../../utils/common';
import {getRegAreaData} from '../../utils/getArea';


export default {
 namespace: 'login',
 state: {
  data: [],
  // authenInfoData:{},
  // infoUpdate:false,
  // status:0,
  // authenResult:null,
  regBtn: false,
  // fileTypeData:null,
  regResult: false,
  classData: [],
  areaDataList: getRegAreaData() || []
 },
 effects: {
  * login({payload}, {put, call}) {
   console.log(payload)
   // yield put({type:'isShowLoginLoading',isShow:true});
   const data = yield call(loginApi, payload);
   // const callBack =
   // console.log(data.data[0].memberType)
   if (data.result == 0) {//用户名-密码-验证码输入错误
    message.error(data.msg, 1.5, () => {
    });
   } else if (data.result == 2) { //result为2 未绑定手机号 登录失败
    yield put(routerRedux.push({
     pathname: '/presonAccount/presonAccount/bindingPhone'
    }))
    localStorage.setItem('userName', payload.username);
   } else if ((data.result == 1)) {//登陆成功
    let memberId = data.data[0].memberId;
    // 登录成功保存 token,用户名，购物车数量
    localStorage.setItem('token', data.data[0].token);
    localStorage.setItem('userName', data.data[0].memberName);
    localStorage.setItem('memberId', memberId);
    yield put(routerRedux.push({pathname: '/'}));
   }
  },
  * checkLoginNameEEF({loginName}, {put, call}) {
   const data = yield call(checkLoginNameApi, loginName);
   if (data.result == 1) {
    // console.log(data.msg)
    yield put({type: 'checkLoginName', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  * updatePasswordByMobileEEF({val}, {put, call}) {
   const data = yield call(updatePasswordByMobileApi, val);
   if (data.result == 1) {
    console.log(data.msg)
    yield put({type: 'updatePasswordByMobile', preload: data});
    message.success(data.msg, 1.5);
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  //效验绑定手机动态验证码
  * checkMobileCodeEEF({values}, {put, call}) {
   const data = yield call(checkMobileCodeApi, values);
   if (data.result == 1) {
    console.log(data.msg)
    yield put({type: 'checkMobileCode', preload: data});
    message.success(data.msg, 1.5);
    console.log(111)
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },


  // *getAuthenStatus({memberId},{put,call}){
  //   const AuthenResult = yield call(queryAuthen,{memberId});
  //   let pathname = window.location.pathname ;
  //   if(AuthenResult.result == '1'){
  //     if(AuthenResult.data[0].status == '0'){
  //       //审核中
  //       yield put({type: 'authenSataus', preload: 1});
  //       yield put({type: 'authenInfo', preload: AuthenResult.data[0]});
  //       if(pathname.indexOf("/loginAuthen") < 0 ){
  //         yield put(routerRedux.push({
  //           pathname:'/loginAuthen'
  //         }));
  //       }
  //       message.warning("正在审核中");
  //     }else if (AuthenResult.data[0].status == '1' ){
  //       //审核通过
  //       yield put(routerRedux.push({
  //         pathname:'/'
  //       }));
  //     }else{
  //       //审核失败
  //       yield put({type: 'authenSataus', preload: 2});
  //       yield put({type: 'authenResult', preload: AuthenResult.data[0].remarks});
  //       if(pathname.indexOf("/loginAuthen") < 0 ){
  //         yield put(routerRedux.push({
  //           pathname:'/loginAuthen'
  //         }));
  //       }
  //     }
  //
  //   }else if(AuthenResult.result == '2'){
  //     message.error(AuthenResult.msg,1.5,()=>{});
  //     if(pathname.indexOf("/loginAuthen") < 0 ){
  //       yield put(routerRedux.push({
  //         pathname:'/loginAuthen'
  //       }));
  //     }
  //   }else{
  //     message.error(AuthenResult.msg,1.5,()=>{});
  //   }
  // },
  * register({payload}, {put, call}) {
   yield put({type: 'regBtnState', preload: true});
   const data = yield call(registerApi, payload);
   if (data.result == 1) {
    // console.log(data.msg)
    yield put({type: 'setRegResult', preload: true});
   } else {

    message.error(data.msg, 1.5, () => {
    });
    yield put({type: 'regBtnState', preload: false});
   }
  },
  // *getShopDictionaryEFF({},{put,call}){
  //   const data = yield call(getShopDictionary);
  //   console.log(data);
  //   if(data.result == 1){
  //     yield put({type: 'shopDictionary', preload: data});
  //   }else{
  //     message.error(data.msg,1.5,()=>{});
  //   }
  // },
  // *getFileTypeEFF({},{put,call}){
  //   const data = yield call(getFileType);
  //   console.log(data);
  //   yield put({type: 'fileType', preload: data});
  // },
  // //提交，保存用户输入的认证信息
  // *authenInfoEFF({payload},{put,call}){
  //   const data = yield call(authen,payload);
  //   // console.log(data)
  //   if(data.result == 1){
  //     yield put({type: 'authenInfo', preload: payload});
  //     message.success(data.msg,1.5,()=>{});
  //   }else{
  //     message.error(data.msg,1.5,()=>{});
  //   }
  // },
  // 获取所属分类
  * getClass({}, {put, call}) {
   const data = yield call(getClassData);
   if (data.result == 1) {
    yield put({type: 'classData', preload: data.data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
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
 },
 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    // if (pathname === '/loginAuthen') {
    //   let memberId = localStorage.getItem('memberId');
    //   // console.log(memberId)
    //   dispatch({ type: 'getShopDictionaryEFF'});
    //   dispatch({ type: 'getFileTypeEFF'});
    //   dispatch({ type: 'getAuthenStatus',memberId:memberId});
    // }
    if (pathname === '/loginRegister') {
     dispatch({type: 'getClass'});
     dispatch({type: 'getAreaDate'});
    }
   });
  },
 },
 reducers: {
  regBtnState(state, {preload}) {
   return {
    ...state,
    regBtn: preload
   }
  },
  // shopDictionary(state,{ preload }){
  //   const { data }=preload;
  //   return {
  //     ...state,
  //     data:data
  //   }
  // },
  // fileType(state,{ preload }){
  //   const { data }=preload;
  //   return {
  //     ...state,
  //     fileTypeData:data
  //   }
  // },
  // authenInfo(state,{preload}){
  //   return {
  //     ...state,
  //     authenInfoData:preload,
  //     infoUpdate:true
  //   }
  // },
  // authenSataus(state,{preload}){
  //   return {
  //     ...state,
  //     status:preload
  //   }
  // },
  // authenResult(state,{preload}){
  //   return {
  //     ...state,
  //     status:preload
  //   }
  // },
  // getmemberId(state,{preload}){
  //   return {
  //     ...state,
  //     memberId:preload
  //   }
  // },
  setRegResult(state, {preload}) {
   // console.log(preload)
   return {
    ...state,
    regResult: preload
   }
  },
  classData(state, {preload}) {
   return {
    ...state,
    classData: preload
   }
  },
  areaData(state, {preload}) {
   return {
    ...state,
    areaDataList: preload
   }
  },

 }
}
