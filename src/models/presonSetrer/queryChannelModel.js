import { channelListAPI,channelInfoAPI } from './api';
import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'queryChannel',
  state:{
    orgName:'',
    status:'',
    data:[],
    total:0,
    pageNo:1,
    pageSize:10,
    channelDetailsDaTa:[],
    channelDetails:{
      channelId:'',
      pricePageNo:1,
      pricePageSize:10,
      applyPageNo:1,
      applyPageSize:10,
      goodsName:"",
      brandName:''
    }
  },
  effects:{

    *channelListEFF({ obj },{ put, call, select }){
      const queryChannel = yield select(state => state.queryChannel);
       //console.log(obj)
      const data=yield call( channelListAPI, { ...{ orgName:queryChannel.orgName, status:queryChannel.status, pageNo:queryChannel.pageNo, pageSize:queryChannel.pageSize }, ...obj } );  //orgName, status, pageNo, Pagesize
      if(data.result==1){
        yield put({type: 'addlist', addlist: data, obj });
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *channelDetailsEFF({ obj },{ put, call,select}){
      const channelDetails = yield select(state => state.queryChannel.channelDetails);
      console.log(channelDetails,obj)
      const data=yield call( channelInfoAPI, { ...channelDetails, ...obj } );

      if(data.result==1){
        yield put({type: 'channelDetailsInfo', channelDetailsDaTa: data,channelDetails:{ ...channelDetails, ...obj }});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },



  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        //dispatch({ type: 'userAddressListEFF',});
        const match = pathToRegexp('/person/queryChannelDetails/:Id').exec(pathname);
        if (pathname=='/person/queryChannel'||pathname=='person/queryChannel') {
          dispatch({ type: 'channelListEFF', obj:{ pageNo:1 } });
        }else if(match && match[0].startsWith('/person/queryChannelDetails')){
          dispatch({ type: 'channelDetailsEFF', obj:{channelId:match[1]} });
        }
      });
    }
  },

  reducers:{
    addlist(state,{ addlist, obj }){
      return {
        ...state,
        ...addlist,
        ...obj
      }
    },
    channelDetailsInfo(state,{ channelDetailsDaTa ,channelDetails}){
      const {data} = channelDetailsDaTa;
      return {
        ...state,
        channelDetailsDaTa:data,
        channelDetails
      }
    },
  }
}
