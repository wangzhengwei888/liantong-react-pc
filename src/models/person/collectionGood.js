/*收藏店铺、商品*/
import { deleteGoodsFavoritesAPI,goodsCollectListAPI} from './userApi';
import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'collectionGood',
  state:{
    goodsCollectListData:[],
    collectionGoodList:[],
    collectionStoreList:[],
    listObj:{
      pageNo:1,
      pageSize:10,
      storeId:'',
      goodsName:'',
    },
    isInfo:false,
  },
  effects:{
    // *collectionEFF({value},{put,call}){
    //   // debugger
    //   const data=yield call(memberfavotites,value);
    //   // console.log(data)
    //   if(data.result==1) {
    //     console.log(data)
    //     // yield put({type: 'asdf', preload: data});
    //     yield put({type: 'collectionList', preload: data});
    //   }else{
    //     message.error(data.msg,1.5,()=>{});
    //   }
    // },
    //
    // *storecollectionEFF({ payload },{ put }){
    //   yield put({type: 'pageChange', preload: payload});
    // },
    //
    // //取消收藏按钮
    // *cancleCollectionEFF({payload},{put,call}){
    //   const data=yield call(storecollection,payload);
    //
    //   console.log(data)
    //
    //   if(data.result==1) {
    //     console.log(data)
    //     message.error(data.msg,1.5);
    //     yield put({type: 'collectionCount',goodsId:payload.goodsId});
    //   }else{
    //     message.error(data.msg,1.5,()=>{});
    //   }
    // },
    //商品收藏列表
    *goodsCollectListEFF({value},{put,call,select}){
      // debugger
      const collectionGood=yield select(state=>state.collectionGood);
      let val = {
        pageNo:collectionGood.listObj.pageNo,
        pageSize:collectionGood.listObj.pageSize,
        storeId:collectionGood.listObj.storeId,
        goodsName:collectionGood.listObj.goodsName,
      }
      const data=yield call(goodsCollectListAPI,{...val,...value});
      // console.log(data)
      if(data.result==1) {
        console.log(data)
        // yield put({type: 'asdf', preload: data});
        yield put({type: 'goodsCollectList', preload: data,listObj:{...collectionGood.listObj,...val}});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //删除收藏商品
    *deleteGoodsFavoritesEFF({payload},{put,call}){
      console.log(payload)
      const data=yield call(deleteGoodsFavoritesAPI,payload);
      // console.log(data)
      console.log(payload)
      if(data.result==1) {
        message.success( data.msg, 1.5 );
      }else{
        message.error(data.msg,1.5,()=>{});
      }

      // if(data.result==1) {
      //   console.log(data)
      //   message.error(data.msg,1.5);
      //   yield put({type: 'collectionCount',goodsId:payload.goodsId});
      // }else{
      //   message.error(data.msg,1.5,()=>{});
      // }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/person/collection_goods/:type').exec(pathname);
        if (match && match[0].startsWith('/person/collection_goods')) {
          console.log(match);
          const value={
            pageNo:1,
            pageSize:10,
            storeId:'',
            goodsName:'',
            // storeId:match[1]
          }
          // const value={
          //   pageNo:1,
          //   pageSize:10,
          //   type:match[1]
          // }
          // dispatch({ type: 'collectionEFF',value });
          dispatch({ type: 'goodsCollectListEFF',value });
        }
      });
    },
  },

  reducers:{
    goodsCollectList(state,{ preload,listObj }){//商品收藏列表
      const { data }=preload;
      // debugger
      console.log(data)
      console.log(preload)
      return {
        ...state,
        goodsCollectListData:data,
        listObj,
        isInfo:true,
      }
    },


    // collectionList(state,{ preload }){//商品
    //   const { data }=preload;
    //   // debugger
    //   console.log(data)
    //   return {
    //     ...state,
    //     collectionGoodList:data,
    //     isInfo:true,
    //     pageNo:1,
    //     pageSize:3,
    //   }
    // },
    // //
    // collectionCount(state,{preload,goodsId}){
    //   console.log(state);
    //   console.log(preload)
    //   console.log(goodsId)
    //   if(goodsId){
    //     let cartIdList = goodsId.split(",");
    //     let data = state.collectionGoodList;
    //     for(let i = 0; i < cartIdList.length; i++){
    //         console.log(cartIdList[i])
    //         data = data.filter(item => {return item.goods.goodsId != cartIdList[i] })
    //      }
    //     console.log(data)
    //     return {
    //       ...state,
    //       collectionGoodList:data
    //     }
    //   }else{
    //     return {
    //       ...state,
    //       collectionGoodList:data
    //     }
    //   }
    // },
    // pageChange(state,{ preload }){//商品
    //   const { data }=preload;
    //   console.log(data)
    //   return {
    //     ...state,
    //     pageNo:data,
    //   }
    // },
  }
}
