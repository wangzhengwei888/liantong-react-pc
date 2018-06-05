import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getReturnList, getleftNavAPI, getInfoListAPI, getDefaultInfoAPI, getNetworkDetailsAPI } from './api';
import pathToRegexp from 'path-to-regexp';
import {isLogin} from "../../utils/request";

export default {
  namespace:'customService',
  state:{
    returnListData:[],
    leftNav: [
      {classification:'购物指南',children:[{title:'公路提货网点',to:'/customservice/networkinfo'}]},
      {classification:'购物指南',children:[]},
      {classification:'购物指南',children:[]}
    ],
    networkList:[{
      infoList:[{region:'华中地区',ProvincesCities:['湖北省','河南省'],infoId:'123456'},{region:'华中地区',ProvincesCities:['湖北省','河南省'],infoId:'123456'},{region:'华中地区',ProvincesCities:['湖北省','河南省'],infoId:'123456'},{region:'华中地区',ProvincesCities:['湖北省','河南省'],infoId:'123456'},{region:'华中地区',ProvincesCities:['湖北省','河南省'],infoId:'123456'}],
      currentPage: 1,
      totalPage: 1,
      num: 4
    }],
    defaultPageInfo:[{
      headImg:{
        url:'/upload/img/lmadv/1508217294561.png',
        id: '32323'
      }
    }],
    networkDetails:[{
      area:'华中地区',
      ProvincesCities:['湖北省','河南省'],
      region:[
        {place:'周口',ProvincesCities:'河南省',phone:'123456789',address:'详细地址详细地址详细地址'},
        {place:'',ProvincesCities:'河南省',phone:'123456789',address:'详细地址详细地址详细地址'},
        {place:'周口',ProvincesCities:'河南省',phone:'123456789',address:''},
        {place:'周口',ProvincesCities:'河南省',phone:'123456789',address:'详细地址详细地址详细地址'}
        ]
    }],
    articleContentData:[],
    navlistSide:[],
  },
  effects:{
    // *returnListEFF({payload},{ put, call }){
    //   const data=yield call(getReturnList,payload);
    //   if(data.result==1){
    //     yield put({type: 'returnList', preload: data});
    //   }else{
    //     message.error(data.msg,1.5,()=>{});
    //   }
    // },
    //左侧导航栏
    *getleftNavEFF({}, { put, call }){
      const data=yield call( getleftNavAPI )
      if(data.result==1){
        yield put({type: 'getleftNav', leftNav: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //公路提货网点信息列表
    *getInfoListEFF({}, { put, call }){
      const data=yield call( getInfoListAPI )
      if(data.result==1){
        yield put({type: 'getInfoList', data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //默认页面信息
    *getDefaultInfoEFF({}, { put, call }){
      const data=yield call( getDefaultInfoAPI )
      if(data.result==1){
        yield put({type: 'getDefaultInfo', data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //公路提货网点详情
    *getNetworkDetailsEFF({id}, { put, call }){
      const data=yield call( getNetworkDetailsAPI, id )
      if(data.result==1){
        yield put({type: 'getNetworkDetails', data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    }
  },

  reducers:{
    returnList(state,{preload}){
      const { data=[] }=preload;
      return {
        ...state,
        returnListData:data
      }
    },
    getInfoList(state, {data}){
      return {
        ...state,
        data
      }
    },
    getleftNavEFF(state, {leftNav}){
      return {
        ...state,
        leftNav
      }
    },
    getDefaultInfo(state, {data}){
      return {
        ...state,
        defaultPageInfo:data
      }
    },
    getNetworkInfo(state, {data}){
      return {
        ...state,
        networkList:data
      }
    },
    getNetworkDetails(state, {data}){
      return {
        ...state,
        networkDetails:data
      }
    }
  },
  subscriptions:{
    setup({ dispatch, history }){
      return history.listen(({ pathname,query })=>{
        if(pathname.startsWith('/customservice')){
          let urlval=query;
          urlval.parentId=6;
          console.log(urlval)         
         dispatch({type:'app/getNavSideEFF',val: urlval})
         dispatch({ type: 'app/getArticleContentEFF',val: urlval}); 
        }

        const match = pathToRegexp('/customservice/networkinfo/:id').exec(pathname);
        // if (pathname == "/person/backGoods") {
        //   let v ={
        //     pageNo:1,
        //     pageSize:10
        //   }
        //   dispatch({ type: 'returnListEFF',payload:v});
        // }
        if(pathname == '/customservice'){
          // dispatch({ type: 'getDefaultInfoEFF'})
          // dispatch({ type: 'getleftNavEFF'})
        }else if(pathname == '/customservice/networkinfo'){
          // dispatch({ type: 'getInfoListEFF'})
          // dispatch({ type: 'getleftNavEFF'})
        }else if(match && match[0].startsWith('/customservice/networkinfo')){
          // dispatch({ type: 'getNetworkDetailsEFF',id:match[1]})
          // dispatch({ type: 'getleftNavEFF'})
        }
      })
    }
  }
}
