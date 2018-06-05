
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { compare } from '../../utils/common';
import pathToRegexp from 'path-to-regexp';
import { getIndex,goodsClasslist,getBrandlist ,getTagList,getNav,getAdvList,getArticleContent,informationIndexAPI} from './api';

export default {
  namespace:'home',
  state:{
    data:[],
    goodsClass:[],
    brand:[],
    tagList:[],
    advList:[],
    sideNewsData:[],
    articleContentData:[],
    jia:[
      {
        recommendLeftImg:'/upload/img/store/0/1489479122006.jpg_430x430q90.jpg',
        recommendedMiddle:[
          {title:'推荐产品',list:[
           {imgUrl:'/upload/img/store/0/1504691849013.jpg',name:'小儿七星茶颗粒'},
           {imgUrl:'/upload/img/store/0/1504691849013.jpg',name:'小儿七星茶颗粒'},
           {imgUrl:'/upload/img/store/0/1504691849013.jpg',name:'小儿七星茶颗粒'},
           {imgUrl:'/upload/img/store/0/1504691849013.jpg',name:'小儿七星茶颗粒'}
           ]},
          {title:'热门活动',list:[
           {imgUrl:'/upload/img/store/0/1504691690891.jpg',name:'小儿七星茶颗粒'},
           {imgUrl:'/upload/img/store/0/1504691690891.jpg',name:'小儿七星茶颗粒'},
           {imgUrl:'/upload/img/store/0/1504691690891.jpg',name:'小儿七星茶颗粒'},
           {imgUrl:'/upload/img/store/0/1504691690891.jpg',name:'小儿七星茶颗粒'}
           ]},
          {title:'电子目录',list:[
           {imgUrl:'/upload/img/store/0/1504691690891.jpg',name:'小儿七星茶颗粒'},
           {imgUrl:'/upload/img/store/0/1504691690891.jpg',name:'小儿七星茶颗粒'},
           {imgUrl:'/upload/img/store/0/1504691690891.jpg',name:'小儿七星茶颗粒'},
           {imgUrl:'/upload/img/store/0/1504691690891.jpg',name:'小儿七星茶颗粒'}
           ]}
        ],
       recommendedRightList:[
        {imgUrl:'/upload/img/brand/1508213790953.png',instruction:'多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本',gcId:'12453'},
        {imgUrl:'/upload/img/brand/1508213790953.png',instruction:'',gcId:'124563'},
        {imgUrl:'/upload/img/brand/1508213790953.png',instruction:'',gcId:'1245673'},
        {imgUrl:'/upload/img/brand/1508213790953.png',instruction:'',gcId:'12456783'},
        {imgUrl:'/upload/img/brand/1508213790953.png',instruction:'',gcId:'124593'}
        ],
        recommendedRightHot:[
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'},
         {name:'氯化钾',gcId:'32431'}
         ],
        blogroll:[
         {imgUrl:'/upload/img/brand/1508213790953.png',path:'www.baidu.com'},
         {imgUrl:'/upload/img/brand/1508213790953.png',path:'www.baidu.com'},
         {imgUrl:'/upload/img/brand/1508213790953.png',path:'www.baidu.com'},
         {imgUrl:'/upload/img/brand/1508213790953.png',path:'www.baidu.com'},
         {imgUrl:'/upload/img/brand/1508213790953.png',path:'www.baidu.com'}]
      }
    ]
  },
  effects:{
    *getIndexEFF({ pageNo,pageSize },{ put, call }){
        const data=yield call( getIndex, pageNo,pageSize);
        if(data.result==1) {
          yield put({type: 'load', preload: data});
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
    //获取厂家列表
    *getBrandlistEFF({},{put,call}){
      const data=yield call( getBrandlist);
      if(data.result==1) {
        yield put({type: 'brandlist', brand: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getTagListEFF({},{put,call}){
      const data=yield call( getTagList);
      if(data.result==1) {
        yield put({type: 'taglist', tagListData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getNavEFF({},{put,call}){
      const data=yield call( getNav);
      if(data.result==1) {
        yield put({type: 'navlist', navListData: data});
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
    *getArticleContentEFF({articleId},{put,call}){
      const data=yield call( getArticleContent,articleId);
      if(data.result==1) {
        yield put({type: 'articleContent', articleContentData: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
     //新闻中心和导航数据
     *informationIndexEFF({ },{ put, call }){
      // const goodsList=yield select(state=>state.goodsList);
      const data=yield call( informationIndexAPI,)
      if(data.result==1) {
        yield put({type: 'sideNews', preload: data,});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

  },

  subscriptions: {

    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/'|| pathname === '/home') {
          dispatch({ type: 'getIndexEFF', pageNo: 1, pageSize:20});
         // dispatch({ type: 'getGoodsClassEFF'});
          dispatch({ type: 'getTagListEFF'});
          // dispatch({ type: 'getNavEFF'});
          dispatch({ type: 'getAdvlistEFF'});
          dispatch({ type: 'getBrandlistEFF'});
          dispatch({type: 'informationIndexEFF',});
        }else if(pathname === '/home/strollFactory' || pathname === '/home/strollStore'){
         // dispatch({ type: 'getGoodsClassEFF'});
          // dispatch({ type: 'getNavEFF'});
        }else if(pathname.indexOf('/home/PeoductSearch/') >= 0){
         // dispatch({ type: 'getGoodsClassEFF'});
          // dispatch({ type: 'getNavEFF'});
        }else if(pathname.indexOf('/home/article/') >= 0){
          const match = pathToRegexp('/home/article/:articleId').exec(pathname);
          let articleId = match[1];
          dispatch({ type: 'getArticleContentEFF',articleId});
         // dispatch({ type: 'getGoodsClassEFF'});
          // dispatch({ type: 'getNavEFF'});
        }
      })
    },
  },

  reducers:{
    load (state,{ preload }){
      const { data }=preload;
      return {
        ...state,
        data:data
      }
    },
    loadGoodsClass(state,{goodsClass}){
      const { data }=goodsClass;
      let newData = data.sort(compare('gcSort'));
      return {
        ...state,
        goodsClass:newData
      }
    },
    brandlist(state,{brand}){
      const {data} = brand;
      return {
        ...state,
        brand:data
      }
    },
    taglist(state,{tagListData}){
      const {data} = tagListData;
      return {
        ...state,
        tagList:data
      }
    },
    navlist(state,{navListData}){
      const {data} = navListData;
      return {
        ...state,
        navList:data
      }
    },
    advlist(state,{advListData}){
      const {data} = advListData;
      return {
        ...state,
        advList:data
      }
    },
    articleContent(state,{articleContentData}){
      const {data} = articleContentData;
      return {
        ...state,
        articleContentData:data
      }
    },
    sideNews (state,{ preload }){
      const { data }=preload;
      return {
        ...state,
        sideNewsData:data,
      }
    },

  }
}
