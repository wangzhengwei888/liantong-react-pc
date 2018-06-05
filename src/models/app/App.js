import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { compare } from '../../utils/common';
import { logout,goodsClasslist,getNavList,getNavListSide,getStoreList,getcartCount,getArticle,getArticleContent,getHotkeywords,getLinkUrl,applyChannelApi,getAdvList} from './api';
import pathToRegexp from 'path-to-regexp';
import {isLogin} from "../../utils/request";
message.config({top: localStorage.getItem("winH")/2,});

export default {
  namespace:'app',
  state:{
    goodsClass:[],
    navList:[],
    navlistSide:[],
    advList:[],
    cartCountData:"0",
    storeListData:[],
    articleData:[],
    articleContentData:[],
    hotkeywordsData:[],
    linkUrlData:[],
    navStaticList:[
      {
        id:1,
        title:"首页",
        navUrl:"/",
      },
      {
        id:2,
        title:"产品中心",
        navUrl:"/product",
        nextArr: [
          { id:1, title:'精确搜索',navUrl:'/product'},
          { id:2, title:'产品推荐',navUrl:'/product/recommend'},
          { id:3, title:'新品上市',navUrl:'/product/new'},
          { id:4, title:'促销清仓',navUrl:'/product/promotions'},
          { id:5, title:'活动报名',navUrl:'/product/enrollment'},
          { id:6, title:'进口服务',navUrl:'/product/importagent'},
          { id:7, title:'快速订购说明',navUrl:'/product/quickorderdescription'},
          { id:8, title:'全部分类',navUrl:'/product/productsort'}
        ],
      },
      {
        id:3,
        title:"品牌中心",
        navUrl:"/brand",

      },
      {
        id:4,
        title:"技术中心",
        navUrl:"/technology",

      },
      {
        id:5,
        title:"新闻中心",
        navUrl:"/newhome",
        nextArr:[
          {
            id:1,
            title:"列表",
            navUrl:"/newlist",
          }
        ]
      },
      {
        id:6,
        title:"客服中心",
        navUrl:"/customservice",
      },
      {
        id:7,
        title:"特色服务",
        navUrl:"/featureservice",
      }, {
        id:8,
        title:"国药试剂",
        navUrl:"/drugreagent",
      }
    ]
  },
  effects:{
    *logout({},{ put, call }){
      const data=yield call(logout);
      if(data.result==1){
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('memberId');
        window.location.reload();
        yield put({type: 'cartCount', preload: {data:[{cartCount:0}]}});
        yield put(routerRedux.push({
          pathname:'/',
        }));
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *applyChannelEFF({ goodsId, remark,applyUser,tel },{ put, call }){
      const data=yield call( applyChannelApi, goodsId, remark,applyUser,tel );
      // console.log(data);
      if(data.result==1) {
        message.success( data.msg, 1.5 );
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getGoodsClassEFF({},{put,call}){
      const data=yield call( goodsClasslist);
      if(data.result==1) {
        yield put({type: 'loadGoodsClass', goodsClass: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getNavEFF({},{put,call}){
      const data=yield call( getNavList);
      if(data.result==1) {
        yield put({type: 'navlist', navListData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //侧边导航
    *getNavSideEFF({val},{put,call}){
      const data=yield call( getNavListSide,val);
      if(data.result==1) {
        yield put({type: 'navlistSide', navListData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //文章详情
    *getArticleContentEFF({val},{put,call}){
      const data=yield call( getArticleContent,val);
      if(data.result==1) {
        yield put({type: 'articleContent', articleContentData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *getStoreListEFF({},{put,call}){
      const data=yield call( getStoreList );
      if(data.result==1) {
        yield put({type: 'storeList', storeListData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getcartCountEFF({},{put,call}){
      const data=yield call(getcartCount);
      if(data.result==1) {
        yield put({type: 'cartCount', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *getArticleEFF({},{put,call}){
      const data = yield call( getArticle);
      if(data.result==1){
        yield put({type: 'article', articleData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getHotkeywordsEFF({},{put,call}){
      const data = yield call( getHotkeywords);
      if(data.result==1){
        yield put({type: 'hotkeywords', hotkeywordsData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getLinkUrlEFF({},{put,call}){
      const data = yield call( getLinkUrl);
      if(data.result==1){
        yield put({type: 'linkUrl', linkUrlData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getAdvlistEFF({},{put,call}){
      const data=yield call( getAdvList);
      if(data.result==1) {
        yield put({type: 'advlist', advListData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
  },

  reducers:{
    loadGoodsClass(state,{goodsClass}){
      const { data }=goodsClass;
      let newData = data.sort(compare('gcSort'));
      return {
        ...state,
        goodsClass:newData
      }
    },
    navlist(state,{navListData}){
      const {data} = navListData;
      return {
        ...state,
        navList:data
      }
    },

    navlistSide(state,{navListData}){
      const {data} = navListData;
      return {
        ...state,
        navlistSide:data
      }
    },
    //文章详情
    articleContent(state,{articleContentData}){
      const {data} = articleContentData;
      return {
        ...state,
        articleContentData:data
      }
    },


    storeList(state,{storeListData}){
      const {data} = storeListData;
      return {
        ...state,
        storeListData:data
      }
    },
    cartCount(state,{preload}){
      const { cartCount }=preload.data[0];
      return {
        ...state,
        cartCountData:cartCount
      }
    },
   article(state,{articleData}){
      const {data} = articleData;
      return {
        ...state,
        articleData:data
      }
    },
    hotkeywords(state,{hotkeywordsData}){
      const {data} = hotkeywordsData;
      return {
        ...state,
        hotkeywordsData:data
      }
    },
    linkUrl(state,{linkUrlData}){
      const {data} = linkUrlData;
      return {
        ...state,
        linkUrlData:data
      }
    },
    advlist(state,{advListData}){
      const {data} = advListData;
      return {
        ...state,
        advList:data
      }
    }
  },
  subscriptions:{
    setup({ dispatch, history }){
        return history.listen(({ pathname })=>{
          const match = pathToRegexp('/person/:bar?*').exec(pathname);
          dispatch({ type: 'getAdvlistEFF'});
          dispatch({ type: 'getNavEFF'});
          if(pathname != "/login" && pathname != "/presonAccount/presonAccount/bindingPhone"){
           dispatch({ type: 'getcartCountEFF'});
          }

        //  dispatch({ type: 'getLinkUrlEFF'});
       //   if(pathname != "/login"){
          //  dispatch({ type: 'getStoreListEFF'});
          //  dispatch({ type: 'getArticleEFF'});
           // dispatch({ type: 'getHotkeywordsEFF'});
            // if(isLogin()){
            //
            // }
       //   }
          // if (match && match[0].startsWith('/person') || pathname == "/order/orderList"  || pathname == "/quickOrder" || pathname == "/cart") {
          //   dispatch({ type: 'getGoodsClassEFF'});
          //   dispatch({ type: 'getNavEFF'});
          // }
        })
    }
  }
}
