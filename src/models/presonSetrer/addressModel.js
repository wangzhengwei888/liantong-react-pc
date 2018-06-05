import { userAddressListAPI, getAddressAPI, saveAddressAPI, deleteAddressAPI, updateAddressAPI } from './api';
import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'address',
  state:{
    addresslist:[]
  },
  effects:{
    *userAddressListEFF({  },{ put, call }){
      const data=yield call(userAddressListAPI);
      if(data.result==1){
       console.log(data);
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
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        //dispatch({ type: 'userAddressListEFF',});
        if (pathname=='/person/myAddress'||pathname=='person/myAddress') {
           dispatch({ type: 'userAddressListEFF',});
         }
      });
    }
  },

  reducers:{
      addresslist(state,{ addresslist }){
      return {
        ...state,
        addresslist
      }
    },

    addressItem(state,{ addressitem }){
      return {
        ...state,
        addressitem
      }
    },

    deleteAddress(state,{ addressId }){
      let newaddresslist=state.addresslist;
      newaddresslist.splice(state.addresslist.findIndex((v,i)=>(v.addressId==addressId)),1);
      return {
        ...state,
        newaddresslist
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

  }
}
