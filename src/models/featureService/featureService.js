import { message } from 'antd'
import pathToRegexp from 'path-to-regexp'
import { downloadAPI,getleftNavAPI,getDynamicDataAPI,getNavListSide,getArticleContent} from './api'

export default {
  namespace: 'featureService',
  state: {
    leftNav: [
      {classification:'自主品牌',children:[{title:'沪试',children:[]},{title:'沃凯',children:[]},{title:'京试',children:[]},{title:'申玻',children:[]},{title:'SCRC',children:[]}]},
      {classification:'代理品牌',children:[{title:'化学分析',children:[{title:'TCI',children:[]},{title:'MERCK',children:[]},{title:'HONEYWELL',children:[]}]},{title:'生命科学',children:[{title:'GE',children:[]},{title:'PHARMACOSMOS',children:[]},{title:'BACHEM',children:[]}]},{title:'环境监测',children:[{title:'HACH',children:[]}]},{title:'实验耗材',children:[{title:'BRAND',children:[]},{title:'CORNING',children:[]},{title:'WHATMAN',children:[]}]}]}
    ],
    data:[{
      currentLocation:['品牌中心','代理品牌','生命科学','GE'],
      fourLevel:[{title:'数码产品检测机构',current:1,brandId:'1'},{title:'数码产品检测机构',current:0,brandId:'1'},{title:'数码产品检测机构',current:0,brandId:'1'},{title:'数码产品检测机构',current:0,brandId:'1'},{title:'数码产品检测机构',current:0,brandId:'1'},{title:'数码产品检测机构',current:0,brandId:'1'}],
      headImg: {url:'/upload/img/lmadv/1508217294561.png',id: '32323'},
      brandIntroduction: {img:'/upload/img/lmadv/1508217294561.png',id:'43223'},
      authoriseAgency: {img:'/upload/img/lmadv/1505714443603.jpg',id:'543324'},
      productIntroduction:{img:'/upload/img/lmadv/1508217294561.png',id:'111'},
      download_data:[{title:'资料下载',url:'http://p0.so.qhimg/t016b4b75f2dc5fb984.jpg'},{title:'资料下载',url:'http://p0.so.qhimgs1.com/bdr/_240_/t016b4b75f2dc5fb984.jpg'},{title:'资料下载',url:'http://p0.so.qhimgs1.com/bdr/_240_/t016b4b75f2dc5fb984.jpg'},{title:'资料下载',url:'http://p0.so.qhimgs1.com/bdr/_240_/t016b4b75f2dc5fb984.jpg'},{title:'资料下载',url:'http://p0.so.qhimgs1.com/bdr/_240_/t016b4b75f2dc5fb984.jpg'},{title:'资料下载',url:'http://p0.so.qhimgs1.com/bdr/_240_/t016b4b75f2dc5fb984.jpg'},{title:'资料下载',url:'http://p0.so.qhimgs1.com/bdr/_240_/t016b4b75f2dc'}],
      others: {img:'/upload/img/lmadv/1508217294561.png',id:'23'}
    }],
    articleContentData:[],
    navlistSide:[],

  },
  effects: {
    //下载
    *downloadEFF({payload},{put, call}){
      console.log(payload)
      const data = yield call ( downloadAPI, payload )
    },
    //左侧导航栏
    *getleftNavEFF({},{put, call}){
      const data=yield call( getleftNavAPI )
      if(data.result==1) {
        yield put({type: 'getleftNav', leftNav: data})
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    *getDynamicDataEFF({},{put, call}){
      const data=yield call( getDynamicDataAPI )
      if(data.result==1) {
        yield put({type: 'getDynamicData', data})
      }else{
        message.error(data.msg,1.5,()=>{})
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

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if(pathname == '/featureservice'){
          // dispatch({ type: getleftNavEFF })
          // dispatch({ type: getDynamicDataEFF })
        };
       
        if(pathname.startsWith('/featureservice')){
          let urlval=query;
          console.log(query)  
          urlval.parentId=7;
          console.log(urlval)
          
         dispatch({type:'app/getNavSideEFF',val: urlval})
         dispatch({ type: 'app/getArticleContentEFF',val: urlval});
        }


      })
    }
  },
  reducers: {
    getleftNav(state, { leftNav }){
      return {
        ...state,
        leftNav
      }
    },
    getDynamicData(state, { data }){
      return {
        ...state,
        data
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




  }
}
