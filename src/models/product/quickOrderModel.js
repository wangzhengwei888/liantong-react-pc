import {  goodsbatchlistAPI, savePurTemplateAPI, getPurTemplateListAPI, getPurTemplateItemAPI, getPurTemplateItemsListAPI, getAddCartBachAPI, getRecentPurGoodsAPI, getGoodsFavoritesAPI,getStoreorglistAPI } from './api';
import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import {isLogin} from '../../utils/request';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'QuickOrder',
  state:{
    goodsbatchlist:[],
    PurTemplateList:[],
    selectData:[],
    storeOrgListData:[],
    PurTemplateItem:{
      templateId:'',
      data:[],
      total:0,
      pageNo:1,
      pageSize:10
    },
    RecentPurGoods:{
      storeId:'',
      goodsName:'',
      dataType:'',
      data:[],
      total:0,
      pageNo:1,
      pageSize:10
    }
  },
  effects:{

    *goodsbatchlistEFF({ obj },{ put, call }){
      const data=yield call( goodsbatchlistAPI, obj );
      if(data.result==1){
        console.log(data)
        yield put({type: 'addList', reducesObj:{ goodsbatchlist: data.data }});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *savePurTemplateEFF({ obj },{ put, call }){
      const data=yield call( savePurTemplateAPI, obj );
      if(data.result==1){
       // yield put({type: 'addList', goodsbatchlist: data.data});
        message.success(data.msg,1.5,()=>{});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *getAddCartBachEFF({ arr },{ put, call }){
      const data=yield call( getAddCartBachAPI, arr );
      if(data.result==1){
        // console.log(data)
        // yield put({type: 'app/cartCount', preload: data});
        // yield put({type: 'addList', goodsbatchlist: data.data});
        yield put({ type:'app/getcartCountEFF' });
        message.success(data.msg,1.5,()=>{});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },


    *getPurTemplateListEFF({ obj },{ put, call }){
      const data=yield call( getPurTemplateListAPI, obj );
      if(data.result==1){
         yield put({type: 'addList', reducesObj:{
           PurTemplateList: data.data,
           PurTemplateItem:{
             templateId:'',
             data:[],
             total:0,
             pageNo:1,
             pageSize:10
           }
         }});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getPurTemplateItemEFF({ obj },{ put, call, select }){
      const QuickOrder = yield select(state => state.QuickOrder);
      const { templateId, pageNo, pageSize  } = QuickOrder.PurTemplateItem;
      const data=yield call( getPurTemplateItemAPI, { templateId, pageNo, pageSize, ...obj } );
      if(data.result==1){
         yield put({type: 'PurTemplateItem', obj: { data:data.data, ...obj }});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },


    *getPurTemplateItemsListEFF({ obj },{ put, call }){
      const data=yield call( getPurTemplateItemsListAPI, obj );
      if(data.result==1){
        // yield put({type: 'addList', goodsbatchlist: data.data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *getRecentPurGoodsEFF({ obj },{ put, call, select }){
      // console.log("aaaa")
      const QuickOrder = yield select(state => state.QuickOrder);
      const {  storeId, goodsName, dateType, pageNo, pageSize  } = QuickOrder.RecentPurGoods;
      //console.log(4);
      const data=yield call( getRecentPurGoodsAPI, { storeId, goodsName, dateType, pageNo, pageSize, ...obj });
      if(data.result==1){
        // message.success(data.msg,1.5,()=>{});
        yield put({type: 'addList', reducesObj:{
          RecentPurGoods:{
            storeId,
            goodsName,
            dateType,
            pageNo,
            pageSize,
            ...obj,
            data:data.data,
            total:0,
          }
        }});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *getGoodsFavoritesEFF({ obj },{ put, call, select }){
      const QuickOrder = yield select(state => state.QuickOrder);
      const {  storeId, goodsName, pageNo, pageSize  } = QuickOrder.RecentPurGoods;
      //console.log(4);
      const data=yield call( getGoodsFavoritesAPI, { storeId, goodsName, pageNo, pageSize, ...obj });
      if(data.result==1){
        // message.success(data.msg,1.5,()=>{});
        yield put({type: 'addList', reducesObj:{
          RecentPurGoods:{
            storeId,
            goodsName,
            pageNo,
            pageSize,
            ...obj,
            data:data.data,
            total:0,
          }
        }});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },






    *userAddressListEFF({  },{ put, call }){
      const data=yield call(userAddressListAPI);
      if(data.result==1){
        yield put({type: 'addresslist', addresslist: data.data||[]});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *getAddressEFF({ addressId },{ put, call }){
      const data=yield call( getAddressAPI, addressId );
      if(data.result==1){
        //yield put({type: 'addressItem', addressitem: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *saveAddressEFF({ addressobj },{ put, call }){
      const data=yield call( saveAddressAPI, addressobj );
      if(data.result==1){
        yield put({ type: 'userAddressListEFF' });
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *deleteAddressEFF({ addressId },{ put, call }){
      const data=yield call( deleteAddressAPI, addressId );
      if(data.result==1){
        yield put({type: 'deleteAddress', addressId: addressId});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *updateAddressEFF({ addressId },{ put, call }){
      const data=yield call( updateAddressAPI, addressId );
      if(data.result==1){
        yield put({ type: 'updateAddressList', addressId });
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *getStoreorglistEFF({ },{ put, call }){
      const data=yield call( getStoreorglistAPI);
      if(data.result==1){
        yield put({ type: 'storeorglist', list:data });
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },


  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        //dispatch({ type: 'userAddressListEFF',});
        if (pathname=='/quickOrder'||pathname=='quickOrder') {
          // dispatch({ type: 'userAddressListEFF',});
          if(!isLogin()){
            window.location.href = 'login';
          }else{
            dispatch({ type: 'getStoreorglistEFF',});
          }

        }
      });
    }
  },

  reducers:{
    addList(state,{ reducesObj }){
      //单个加入商品
      if(reducesObj.selectData){
        reducesObj.selectData.forEach((goods)=>{
          if(goods.activityApiVo){
            if(goods.activityApiVo.taocanList.isActivity == '1'){
              goods.channelPrice = goods.activityApiVo.taocanList.taocanPrice //套餐价格
              goods.goodsNowStorage = goods.activityApiVo.taocanList.storageNum //库存
              goods.isSellpiece = 0 //强制最小起购数量
              goods.packTotal = goods.activityApiVo.taocanList.minBuyNum //强制最小起购数量
            }else if(goods.activityApiVo.qianggouList.isActivity == '1'){
              goods.maxBuyNum = goods.activityApiVo.qianggouList.maxBuyNum //个人最大购买
              goods.goodsNowStorage = goods.activityApiVo.qianggouList.storageNum //库存
              goods.channelPrice = goods.activityApiVo.qianggouList.newGoodsPrice //价格
            }else if(goods.activityApiVo.qingcangList.isActivity == '1'){
              goods.maxBuyNum = goods.activityApiVo.qingcangList.maxBuyNum //个人最大购买
              goods.goodsNowStorage = goods.activityApiVo.qingcangList.storageNum //库存
              goods.channelPrice = goods.activityApiVo.qingcangList.newGoodsPrice //价格
            }
          }
        })
      }
      return {
        ...state,
        ...reducesObj
      }
    },

    addressItem(state,{ addressitem }){
      return {
        ...state,
        addressitem
      }
    },

    addSelectData(state,{ arr }){
      // console.log(arr)
      arr.forEach((goods)=>{
        if(goods.activityApiVo){
          if(goods.activityApiVo.taocanList.isActivity == '1'){
            goods.channelPrice = goods.activityApiVo.taocanList.taocanPrice //套餐价格
            goods.goodsNowStorage = goods.activityApiVo.taocanList.storageNum //库存
            goods.isSellpiece = 0 //强制最小起购数量
            goods.packTotal = goods.activityApiVo.taocanList.minBuyNum //强制最小起购数量
          }else if(goods.activityApiVo.qianggouList.isActivity == '1'){
            goods.maxBuyNum = goods.activityApiVo.qianggouList.maxBuyNum //个人最大购买
            goods.goodsNowStorage = goods.activityApiVo.qianggouList.storageNum //库存
            goods.channelPrice = goods.activityApiVo.qianggouList.newGoodsPrice //活动价格
          }else if(goods.activityApiVo.qingcangList.isActivity == '1'){
            goods.maxBuyNum = goods.activityApiVo.qingcangList.maxBuyNum //个人最大购买
            goods.goodsNowStorage = goods.activityApiVo.qingcangList.storageNum //库存
            goods.channelPrice = goods.activityApiVo.qingcangList.newGoodsPrice //活动价格
          }
        }
      })

      return {
        ...state,
        selectData:[...state.selectData, ...arr]
      }
    },

    PurTemplateItem(state,{ obj }){

      return {
        ...state,
        PurTemplateItem:{...state.PurTemplateItem, ...obj}
      }
    },

    deleteSelect(state,{idarr}){
      const arr=state.selectData;
      let data=arr.filter((i,index)=>{
        console.log(idarr.indexOf(i.goodsId))
        return idarr.indexOf(i.goodsId)==-1;
      })
     console.log(data)
      return {
        ...state,
        selectData:data
      }
    },





    updateAddressList(state,{ addressId }){
      const newaddresslist = state.addresslist.map((v,i)=>{
        if(v.addressId==addressId){
          v.isDefault=1;
        }else {
          v.isDefault=0;
        }
        return v
      })

      return {
        ...state,
        newaddresslist
      }
    },

    storeorglist(state,{list}){
      const {data} = list;
      return {
        ...state,
        storeOrgListData:data
      }
    }

  }
}
