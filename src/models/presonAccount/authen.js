import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import {saveAttachmentFileAPI,getAttachmentListAPI,setUpdateAttachment} from "./authenApi";

export default {
 namespace:'authen',
 state:{
  AttachmentListData: [],
  pageNo: 1,
  pageSize: 10,
  count: 0,
  type:''
 },
 effects:{
  // 上传认证文件信息
  *saveAttachmentFileEFF({val},{put,call}){
   console.log(val)
   const data = yield call(saveAttachmentFileAPI,val);
   if(data.result == 1){
    message.success(data.msg,1.5,()=>{});
    yield put({type:'getAttachmentListEFF',val:{type:'2'}})
   }else{
    message.error(data.msg,1.5,()=>{});
   }
  },
  //上传历史记录
  *getAttachmentListEFF({val},{put,call,select}){
   let v = yield select(state=>state.authen)
   let newVal ={
    pageNo:val && val.pageNo ? val.pageNo : v.pageNo,
    pageSize:val && val.pageSize ? val.pageSize : v.pageSize,
    type:val && val.type ? val.type : v.type,
    fileType: val && val.fileType ? val.fileType : 'createDate'
   }
   const data = yield call(getAttachmentListAPI,newVal);
   if(data.result == 1){
    yield put({type:'AttachmentList',data:data})
   }else{
    message.error(data.msg,1.5,()=>{});
   }
  },
 // 启用/禁用
  *setUpdateAttachmentEFF({val},{put,call}){
   const data = yield call(setUpdateAttachment,val);
   if(data.result == 1){
    message.success(data.msg,1.5,()=>{});
    yield put({type:'getAttachmentListEFF',val:{type:'2'}})
   }else{
    message.error(data.msg,1.5,()=>{});
   }
  }
 },

 subscriptions: {
  setup({ dispatch, history }) {
   return history.listen(({ pathname, query }) => {
    console.log(pathname);
    if (pathname=='/presonAccount/intelligentUp/intelligentHistory') {
      dispatch({type:'getAttachmentListEFF',val:{pageNo:1}})
    }else if(pathname == "/presonAccount/intelligentUp"){
     dispatch({type:'getAttachmentListEFF',val:{type:'2',pageNo:1}})
    }
   });
  }
 },
 reducers: {
  AttachmentList(state,{ data }){
   return {
    ...state,
    AttachmentListData:data.data,
    pageNo: data.pageNo,
    pageSize: data.pageSize,
    count: data.count,
   }
  },
 }
}
