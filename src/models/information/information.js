
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { informationIndexAPI,informationDetailedAPI,articleListAPI,evaluationAPI } from './api';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'information',
  state:{
    indexData:[],
    informationDetailed:[],
    articleList:[],
    evaluation:[],
    listVal:{
      acId:'',
      pageNo:1,
      pageSize:10,
    },
  },
  //effects   接收数据
  effects:{
      //新闻中心和导航数据
    *informationIndexEFF({ },{ put, call }){
      // const goodsList=yield select(state=>state.goodsList);
      const data=yield call( informationIndexAPI,)
      if(data.result==1) {
        yield put({type: 'load', preload: data,});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //资讯详情页数据
    *informationDetailedEFF({contentId},{ put, call }){
      // const goodsList=yield select(state=>state.goodsList);
      const data=yield call( informationDetailedAPI,contentId)
      if(data.result==1) {
        yield put({type: 'detailedData', preload: data,});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //资讯列表页数据
    *articleListEFF({val},{ put, call,select }){
      const information=yield select(state=>state.information);
      const data=yield call( articleListAPI,{...information.listVal,...val})
      if(data.result==1) {
        yield put({type: 'articleListData', preload: data,listVal:{...information.listVal,...val},});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //评价列表
    *evaluationEFF({val},{ put, call }){
      // const information=yield select(state=>state.information);
      // console.log(val);
      const data=yield call( evaluationAPI,val)
      if(data.result==1) {
        yield put({type: 'evaluationData', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
  },

  //subscriptions 监听数据
  subscriptions: {
    setup({ dispatch, history, state }) {
      return history.listen(({ pathname, query }) => {
        // console.log(pathname);
        dispatch({type: 'informationIndexEFF',});
        if (pathname.startsWith('/information/informationDetails')) {
          const match = pathToRegexp('/information/informationDetails/:contentId').exec(pathname);
          dispatch({ type: 'informationDetailedEFF',contentId:match[1],pageNo:1,pageSize:10});
          dispatch({ type: 'evaluationEFF',val:{contentId:match[1]}});
        }else if (pathname.startsWith('/information/informationList')) {
          const match = pathToRegexp('/information/informationList/:acid').exec(pathname);
          // console.log(match[1]);
          dispatch({ type: 'articleListEFF',val:{acId:match[1],pageNo:1,pageSize:10}});
        }
      });
    },
  },



  //reducers 处理数据
  reducers:{
    load (state,{ preload }){
      const { data }=preload;
      return {
        ...state,
        indexData:data,
      }
    },
    detailedData (state,{ preload }){
      const {data} = preload;
      return {
        ...state,
        informationDetailed:data,
      }
    },
    articleListData (state,{ preload,listVal }){
      const {data} = preload;
      return {
        ...state,
        articleList:data,
        listVal,
      }
    },
    evaluationData (state,{ preload }){
      const {data} = preload;
      return {
        ...state,
        evaluation:data,
      }
    },
  }
}
