/*收藏店铺、商品*/
import { memberfavotites,storecollection} from './userApi';
import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'collectionStore',
  state:{
    collectionStoreList:[],
    isInfo:false,
    totalRecords:2,
    pageNo:1,
    pageSize:10
  },
  effects:{
    *collectionEFF({value},{put,call}){
      // debugger
      const data=yield call(memberfavotites,value);
      // console.log(data)
      if(data.result==1) {
        console.log(data)
        // yield put({type: 'asdf', preload: data});
        yield put({type: 'collectionList', preload: data, v:value});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //取消收藏按钮
    *cancleCollecStoreEFF({payload},{put,call}){
      const data=yield call(storecollection,payload);
      if(data.result==1) {
        console.log(data)
        message.success(data.msg,1.5);
        yield put({type: 'collectionCount',preload:payload.storeId});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/person/collection_store/:type').exec(pathname);
        console.log(match)
        if (match && match[0].startsWith('/person/collection_store')) {
          const value={
            pageNo:1,
            pageSize:1,
            type:match[1]
          }
          dispatch({ type: 'collectionEFF',value });
        }
      });
    },
  },

  reducers:{
    collectionList(state,{ preload,v }){//商品
      const { data }=preload;
      console.log(v)
      return {
        ...state,
        collectionStoreList:data,
        isInfo:true,
        pageNo:v.pageNo,
        pageSize:v.pageSize
      }
    },
    //过滤已删除的
    collectionCount(state,{preload}){
      console.log(state);
      console.log(preload)

      if(preload){
        let cartIdList = preload.split(",");
        let data = state.collectionStoreList;
        for(let i = 0; i < cartIdList.length; i++){
          console.log(cartIdList[i])
          data = data.filter(item => {return item.store.storeId != cartIdList[i] })
        }
        console.log(data)
        return {
          ...state,
          collectionStoreList:data
        }
      }else{
        return {
          ...state,
          collectionStoreList:data
        }
      }
    },
  }
}
