import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import {getArea,saveAddressAPI,setDefaultAddressAPI,deleteOrderAddressAPI,getOrderAddressListApi} from "../personOrder/personOrderApi";
import {getAreaData} from "../../utils/getArea";





export default {
 namespace:'address',
 state:{
  areaDataList: getAreaData() || [],
  addressList:[],
 },
 effects:{
  // 获取收货地址
  *getOrderAddressList({ },{put,call}){
   const data = yield call(getOrderAddressListApi);
   if(data.result == 1){
    yield put({type: 'addressList', addressList: data.data});
   }else{
    message.error(data.msg,1.5,()=>{});
   }
  },
  //保存/修改地址
  *saveAddressEFF({ payload },{ put, call }){
   console.log(payload)
   const data=yield call( saveAddressAPI ,payload);
   if(data.result==1){
     yield put({type: 'getOrderAddressList'});
   }else{
    message.error(data.msg,1.5,()=>{});
   }
  },

  // 设置默认地址
  *setDefaultAddressEFF({ orderAddressId },{ put, call }){
   const data=yield call( setDefaultAddressAPI,orderAddressId );
   console.log(data)
   if(data.result==1) {
    yield put({type: 'getOrderAddressList'});
   }else{
    message.error(data.msg,1.5,()=>{});
   }
  },
  //删除地址
  *deleteAddressEFF({ addressId },{ put, call }){
   const data=yield call( deleteOrderAddressAPI ,addressId);
   if(data.result==1){
    yield put({type: 'getOrderAddressList'});
   }else{
    message.error(data.msg,1.5,()=>{});
   }
  },
  // 获取地区数据
  * getAreaDate({}, {put, call}) {
   const data = yield call(getArea);
   if (data.result == 1) {
    let area = JSON.stringify(data.data)
    yield put({type: 'areaData', preload: getAreaData(area)});
    //地区数据存放到本地缓存,后续直接从本地缓存读取
    localStorage.setItem('area', area)
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  }
 },

 subscriptions: {
  setup({ dispatch, history }) {
   return history.listen(({ pathname, query }) => {
    // dispatch({ type: 'userAddressListEFF',});
    console.log(pathname);
    if (pathname=='/presonAccount/addressList') {
     dispatch({ type: 'getOrderAddressList',});
     dispatch({type: 'getAreaDate'});


    }
   });
  }
 },
 reducers: {
  addressList(state,{ addressList }){
   return {
    ...state,
    addressList
   }
  },

  updateAddressList(state,{ addressId }){
   const newaddresslist = state.addressList.map((v,i)=>{
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
  areaData(state, {preload}) {
   return {
    ...state,
    areaDataList: preload
   }
  },

 }
}


//  reducers:{
//   addresslist(state,{ addresslist }){
//    return {
//     ...state,
//     addresslist
//    }
//   },
//
//   addressItem(state,{ addressitem }){
//    return {
//     ...state,
//     addressitem
//    }
//   },
//
//   deleteAddress(state,{ addressId }){
//    let newaddresslist=state.addresslist;
//    newaddresslist.splice(state.addresslist.findIndex((v,i)=>(v.addressId==addressId)),1);
//    return {
//     ...state,
//     newaddresslist
//    }
//   },
//
//   updateAddressList(state,{ addressId }){
//    const newaddresslist = state.addresslist.map((v,i)=>{
//     if(v.addressId==addressId){
//      v.isDefault=1;
//     }else {
//      v.isDefault=0;
//     }
//     return v
//    })
//
//    return {
//     ...state,
//     newaddresslist
//    }
//   },
//
//  }
// }
