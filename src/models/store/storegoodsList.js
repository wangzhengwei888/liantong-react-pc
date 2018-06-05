//import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { goodsListApi,goodsfilterApi,addCartApi } from './api';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'storegoodsList',
  state:{
    data:[],
    ScreenList:[],
    AddCartdata:[],
    shopListObj:{
      pageNo:'1',
      pageSize:'12',
      storeId:'',
      sortField:"",
      goodsName:'',
      storeClassId:'',
      brandId:"",
      dosageForm:"",
      order:"",
      goodsType:''
    }
  },
  //effects   接收数据
  effects:{
    *goodsListEFF({val},{ put, call, select }){
      console.log(val)
      const goodsList=yield select(state=>state.storegoodsList);
      const data=yield call( goodsListApi,{...goodsList.shopListObj,...val})
      if(data.result==1) {
        yield put({type: 'load', preload: data,shopListObj:{...goodsList.shopListObj,...val}});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *goodsfilterEFF({ val },{put,call,select}){
      const goodsList=yield select(state=>state.storegoodsList);
      let values = {
        storeId:goodsList.shopListObj.storeId,
        goodsName:goodsList.shopListObj.goodsName,
        storeClassId:goodsList.shopListObj.storeClassId,
        brandId:goodsList.shopListObj.brandId,
        dosageForm:goodsList.shopListObj.dosageForm,
      }
      const data=yield call( goodsfilterApi, {...values,...val});
      if(data.result==1) {
        yield put({type: 'screenlist', screenlistdata: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *addCartEFF({ goodsId,goodsPrice,count,specId,saveType, },{put,call}){
      const data=yield call( addCartApi, goodsId,goodsPrice,count,specId,saveType,);
      if(data.result==1) {
        message.success(data.msg,1.5,()=>{});
        yield put({type: 'addCart', addCartdata: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
  },

  //subscriptions 监听数据
  subscriptions: {
    setup({ dispatch, history, state }) {
      // console.log('1==='+history);
      return history.listen(({ pathname, query }) => {
        console.log(pathname)
        if (pathname.indexOf('result') > 0) {
          console.log(pathname)
          let  Search= pathToRegexp('/store/:storeId/result/:searchType/(:searchId)?').exec(pathname);
          console.log(decodeURI(Search[3]))
          let val = Search[3] ?Search[3] : "";
          if(Search){
            let values = {
              brandId: "",
              dosageForm: "",
              goodsName: "",
              goodsType: "",
              order: "",
              pageNo: "1",
              pageSize: "12",
              sortField: "",
              storeClassId: "",
              storeId: decodeURI(Search[1])
            }
            dispatch({ type: 'goodsListEFF',val:{...values,[decodeURI(Search[2])]:decodeURI(val)}});
            dispatch({ type: 'goodsfilterEFF',val:{storeId:decodeURI(Search[1]),[decodeURI(Search[2])]:decodeURI(val)}});
          }

        }
      });
    },
  },

  //reducers 处理数据
  reducers:{
    load (state,{ preload ,shopListObj}){
      const { data }=preload;
      return {
        ...state,
        data:data,
        shopListObj,
      }
    },
    screenlist (state,{ screenlistdata }){
      const { data }=screenlistdata;
      return {
        ...state,
        ScreenList:data,
        isLoading:false,
      }
    },
    addCart (state,{ addCartdata }){
      const { data }=addCartdata;
      return {
        ...state,
        AddCartdata:data,
      }
    },
  }
}
