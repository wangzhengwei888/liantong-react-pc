import { saveOrderForSinopharmAPI ,subToOrder,
  getInvoiceList, getPrice, getorderlist,
  userAddressListAPI, getAddressAPI, saveAddressAPI, deleteAddressAPI, updateAddressAPI, addShippingAPI,
  couponIsUsertAPI,getPersonOrderList,getPersonOrderDetail,getPersonOrderItemDetail,sureOrder,addCartApi
 } from './api';
import { routerRedux } from 'dva/router';
import { message, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace:'order',
  state:{
    invoiceInfo:[],
    AddCartdata:[],
    order:[],
    Total:[],
    invoChangelist:[],
    addresslist:[],
    cartIds:'',
    personOrderListData:[],
    orderListTotal:0,
    personOrderDetailData:[],
    personOrderItemDetailData:[],
    searchParam:{
      brandName:"",
      goodsCondition: "",
      orderId: "",
      orderItemId:"",
      specName: "",
      status: "",
      pageNo:1,
      pageSize:10
    }
  },
  effects:{
    *subToOrderEFF({ cartId },{ put, call }){
      const data=yield call( subToOrder,cartId );
      // console.log(data)
      if(data.result==1) {
        // yield put({type: 'asdf', preload: data});
        yield put({ type: 'ordertypeState', order: data.data });
       // yield put({type: 'ordertypeState', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *saveOrderForSinopharmEFF({ arr },{ put, call }){
      const data=yield call( saveOrderForSinopharmAPI, arr );
      // console.log(data)
      if(data.result==1) {
          yield put(routerRedux.push(`/payment/${data.data[0].paySn}/${data.data[0].payId}/${data.data[0].orderTotalPrice}`));
          message.success(data.msg,1.5,()=>{});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *getInvoiceList({  },{ put, call }){
      const  data=yield call(getInvoiceList, window.localStorage.getItem('memberId'));
      //console.log(data)
      if(data.result==1){
        // yield put({type: 'invoiceList', data });
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },






    /*获取价格*/
    *getPriceEFF({cartIds},{put,call}){
      const data=yield call(getPrice,cartIds);
      yield put({type: 'invoiceTotal', preload: data});
     /* if(data.result==1) {
        message.info(data.msg,1.5,()=>{});
        console.log(data)
        // yield put(routerRedux.push(`/order/${data.data[0].cartVoList[0].cartIds.replace(/,/g, "")}`));
        yield put(routerRedux.push({
          pathname:`/order`,
          state:{
            // data:data,
            totalGoodsPrice:data[0].totalGoodsPrice
          }
        }));
      }else{
        message.error(data.msg,1.5,()=>{});
      }*/
    },




    *couponIsUsertEFF({  },{ put, call }){
      const  data=yield call(couponIsUsertAPI);
      //console.log(data)
      if(data1.result==1){
        //yield put({type: 'invoiceList', data });
      }else{
        message.error(data1.msg,1.5,()=>{});
      }
    },


    /*选择支付方式*/
    *selectPayType({ payload },{ put }){
        yield put({type: 'PayType', preload: payload});
    },
    /*改变发票*/
    *invoiceChange({ payload },{ put }){
      // debugger
      yield put({type: 'invoChange', preload: payload});
    },
    *orderListEFF({ invState },{ put, call }){
      const data=yield call(getorderlist,invState);
      console.log(data)
      if(data.result==1){
        yield put({type: 'OrderList', orderlistdata: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *personOrderListEFF({val},{ put, call ,select}){
      const searchParam=yield select(state=>state.order);
      const data=yield call(getPersonOrderList,{...searchParam.searchParam, ...val});
      if(data.result==1){
        yield put({type: 'PersonOrderList', personOrderListData: data,total:data.total});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *personOrderDetailEFF({val},{put, call}){
      const data=yield call(getPersonOrderDetail,val);
      if(data.result==1){
        yield put({type: 'PersonOrderDetail', personOrderDetailData: data,});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *personOrderItemDetailEFF({val},{put, call}){
      const data=yield call(getPersonOrderItemDetail,val);
      if(data.result==1){
        yield put({type: 'PersonOrderItemDetail', personOrderItemDetailData: data,});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *personSureOrder({val},{put, call}){
      const data=yield call(sureOrder,val);
      if(data.result==1){
        message.success(data.msg,1.5,()=>{});
        yield put({type: 'PersonOrderItemDetail', personOrderItemDetailData: data,});
        // yield put({type: 'PersonOrderItemDetail', personOrderItemDetailData: data,});
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

    //
    // *addShippingEFF({ cartIds,cityId },{ put, call }){
    //   const data=yield call(addShippingAPI,cartIds,cityId);
    //  // console.log(data)
    //   if(data.result==1){
    //   //  yield put({type: 'OrderList', orderlistdata: data});
    //   }else{
    //     message.error(data.msg,1.5,()=>{});
    //   }
    // },
    //
    //
    // *userAddressListEFF({  },{ put, call }){
    //   const data=yield call(userAddressListAPI);
    //   if(data.result==1){
    //     yield put({type: 'addresslist', addresslist: data.data||[]});
    //   }else{
    //     message.error(data.msg,1.5,()=>{});
    //   }
    // },
    //
    // *getAddressEFF({ addressId },{ put, call }){
    //   const data=yield call( getAddressAPI, addressId );
    //   if(data.result==1){
    //     //yield put({type: 'addressItem', addressitem: data});
    //   }else{
    //     message.error(data.msg,1.5,()=>{});
    //   }
    // },
    //
    // *saveAddressEFF({ addressobj },{ put, call }){
    //   const data=yield call( saveAddressAPI, addressobj );
    //   if(data.result==1){
    //     yield put({ type: 'userAddressListEFF' });
    //   }else{
    //     message.error(data.msg,1.5,()=>{});
    //   }
    // },
    //
    // *deleteAddressEFF({ addressId },{ put, call }){
    //   const data=yield call( deleteAddressAPI, addressId );
    //   if(data.result==1){
    //     yield put({type: 'deleteAddress', addressId: addressId});
    //   }else{
    //     message.error(data.msg,1.5,()=>{});
    //   }
    // },
    //
    // *updateAddressEFF({ addressId },{ put, call }){
    //   const data=yield call( updateAddressAPI, addressId );
    //   if(data.result==1){
    //     yield put({ type: 'updateAddressList', addressId });
    //    // yield put({ type: 'userAddressListEFF' });
    //
    //   }else{
    //     message.error(data.msg,1.5,()=>{});
    //   }
    // },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        ///person/orderDetail/0386a4f086fa4ccea3020b37fb02ee69
        ///person/orderListDetail/0386a4f086fa4ccea3020b37fb02ee69
        const match = pathToRegexp('/order/:cartId').exec(pathname);
        const match1 = pathToRegexp('/person/orderDetail/:orderId').exec(pathname);
        const match2 = pathToRegexp('/person/orderListDetail/:orderItemId').exec(pathname);
        if (match&&match[0].startsWith('/order')) {
          dispatch({ type: 'subToOrderEFF',cartId:match[1]});
          //dispatch({ type: 'getCartIds',cartIds:match[1]});
          //dispatch({ type: 'getOrderDetailEFF', cartId:match[1]});
          //dispatch({ type: 'userAddressListEFF',});
          dispatch({ type: 'getInvoiceList',});
          //dispatch({ type: 'couponIsUsertEFF'});
        }
        if(match1&&match1[0].startsWith('/person/orderDetail')){
          console.log(match1[1]);
          dispatch({ type: 'personOrderDetailEFF',val:match1[1]});
        }
        if(match2&&match2[0].startsWith('/person/orderListDetail')){
          console.log(match2[1]);
          dispatch({ type: 'personOrderItemDetailEFF',val:match2[1]});
        }
        if(pathname == '/person/orderList'){
          dispatch({ type: 'personOrderListEFF'});
        }
      });
    },

  },

  reducers:{

    invoiceTotal(state,{ preload }){
      const { data }=preload;
      console.log(data)
      return {
        ...state,
        Total:data
      }
    },
    ordertypeState(state,{ order }){
      console.log(order)
      return {
        ...state,
        order:order,
      }
     // console.log(orderListContent)
    },
    PayType(state, {preload}) {
      const payload = preload;
      console.log(state)
      let isPdd = state.isPd;
      // 货到付款，自动切换为不使用余额
      if (payload == 2) {
        isPdd = 0;
      }
      console.log(isPdd)
      return {
        ...state,
        paytype: payload,
        isPd:isPdd
      };
    },
    invoChange(state,{ preload }){
      const {data} = preload
      console.log(data)
      return {
        ...state,
        // invoice: payload,
        // invoChangelist: data
      }
    },

    OrderList(state,{ orderlistdata }){
      const {data} = orderlistdata
      console.log(data)
      return {
        ...state,
        // invoice: payload,
        // invoChangelist: data
      }
    },
    PersonOrderList(state,{ personOrderListData,total }){
      const {data} = personOrderListData
      return {
        ...state,
        personOrderListData:data,
        orderListTotal:total
      }
    },
    PersonOrderDetail(state,{ personOrderDetailData }){
      console.log(personOrderDetailData)
      const {data} = personOrderDetailData
      return {
        ...state,
        personOrderDetailData:data,
      }
    },
    PersonOrderItemDetail(state,{ personOrderItemDetailData }){
      console.log(personOrderItemDetailData)
      const {data} = personOrderItemDetailData
      return {
        ...state,
        personOrderItemDetailData:data,
      }
    },


    getCartIds(state,{ cartIds }){
      return {
        ...state,
        cartIds: cartIds
      }
    },

    invoiceList(state,{ data }){
      return {
        ...state,
        invoiceInfo:data,
      }
    },
    addCart (state,{ addCartdata }){
      const { data }=addCartdata;
      return {
        ...state,
        AddCartdata:data,
      }
    },

    // addresslist(state,{ addresslist }){
    //   return {
    //     ...state,
    //     addresslist
    //   }
    // },
    //
    // addressItem(state,{ addressitem }){
    //   return {
    //     ...state,
    //     addressitem
    //   }
    // },
    //
    // deleteAddress(state,{ addressId }){
    //   let newaddresslist=state.addresslist;
    //   newaddresslist.splice(state.addresslist.findIndex((v,i)=>(v.addressId==addressId)),1);
    //   return {
    //     ...state,
    //     newaddresslist
    //   }
    // },
    //
    // updateAddressList(state,{ addressId }){
    //   const newaddresslist = state.addresslist.map((v,i)=>{
    //     if(v.addressId==addressId){
    //         v.isDefault=1;
    //     }else {
    //       v.isDefault=0;
    //     }
    //     return v
    //   })
    //
    //   return {
    //     ...state,
    //     newaddresslist
    //   }
    // },



  }
}
