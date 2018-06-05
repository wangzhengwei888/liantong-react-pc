import {message} from 'antd';
import {
 subCartToOrder,
 saveOrderForSinopharmAPI,
 saveAddressAPI,
 setDefaultAddressAPI,
 getArea,
 getOrderInvoiceListApi,
 getOrderAddressListApi,
 deleteOrderAddressAPI,
 getDeliveryMethodAPI,
 saveOrderInvoiceAPI,
 getPaymentListAPI
} from './personOrderApi';
import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';
import {getAreaData} from '../../utils/getArea';

export default {
 namespace: 'personOrder',
 state: {
  allGoodsNum: 0,
  init: 1,
  subCartToOrderDate: [],
  areaDataList: getAreaData() || [],
  addressList: [],
  orderInvoiceList: {},
  deliveryMethodData: [],
  shippingTotalFree: 0,
  paymentList: [],
  sendValue: {
   addressId: "",
   shippingName: '',
   paymentCode: '',
   paymentName: '',
   shipFee: '',
   invoiceId: '',
   cartGroupVoList: [],
   predepositAmount: 0.00,
   predepositOrgAmount: 0.00,
   memberConsumePoints:"0",
   pointAllpoint:"0"
  },
  saveOrderDate: [],
  checkedFouthAreaId: '',
  checkedProvinceId: '',
  dictionaryId: 0
 },
 effects: {
  * subCartToOrderEFF({cartIds, activityIds}, {put, call}) {
   const data = yield call(subCartToOrder, cartIds, activityIds);
   if (data.result == 1 && data.data) {
    yield put({type: 'subCartToOrderState', subCartToOrderDate: data.data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

//提交订单
  * saveOrderForSinopharmEFF({msg}, {put, call, select}) {
   const val = yield select(state => state.personOrder);
   console.log(val.sendValue)
   const data = yield call(saveOrderForSinopharmAPI, {
    ...val.sendValue,
    predepositAmount: val.sendValue.predepositAmount.toString(),
    goodsTotalNum: val.allGoodsNum.toString(),
    orderMessage: msg
   });
   if (data.result == 1) {
    message.success(data.msg, 1.5, () => {
    });
    yield put({type: 'saveOrder', preload: data.data})
    // if (data.data[0].onlinePay == true) {
    //yield put(routerRedux.replace('/payment'));

    //yield put(routerRedux.replace('/payment/'+data.data[0].paySn+'/'+data.data[0].orderTotalPrice+'/'+data.data[0].payType+'/'+data.data[0].isControlInfo));
    // } else {
    yield put(routerRedux.replace(`/payment/${data.data[0].orderSn}/${data.data[0].payType}/${data.data[0].orderAmount}/${data.data[0].orderTotalPrice}/${data.data[0].isControlInfo == true ? 1 : 0}`));
    // }


   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  //保存/修改地址
  * saveAddressEFF({payload}, {put, call,select}) {
   console.log(payload)
   const data = yield call(saveAddressAPI, payload);
   const v = yield select(state => state.personOrder);
   if (data.result == 1) {
    let address = data.data[0];
    yield put({type: 'addAddress', payload: data.data[0]})
    if (!payload.orderAddressId) {
     yield put({type: 'changeAddressEFF', address});
    }else{
     let addressList = v.addressList;
     let editList = addressList.filter((list,i)=>{
      return list.addressId == payload.orderAddressId
     })
     console.log(editList)
     if(editList.length > 0 && editList[0].isChecked){
      yield put({type: 'changeAddressEFF', address});
     }
    }
   } else {
    message.error(data.msg, 1.5, () => {
    });
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
  },
  // 获取收货地址
  * getOrderAddressList({}, {put, call}) {
   const data = yield call(getOrderAddressListApi);
   if (data.result == 1) {
    yield put({type: 'addressListData', preload: data.data});
    if (data.data.length > 0) {
     //存在默认地址,直接请求配送信息
     console.log(data.data[0])
     if (data.data[0] && data.data[0].isDefault == 1) {
      let cartId = localStorage.getItem("cartId");
      let payload = {
       provinceId: data.data[0].provinceId,
       areaId: data.data[0].areaId,
       cartIds: cartId,
      }
      yield put({type: 'getDeliveryMethodEFF', payload});
     } else {
      yield put({type: 'deliveryMethod', preload: []});
      yield put({type: 'paymentListData', preload: {}});
     }
    } else {
     yield put({type: 'deliveryMethod', preload: []});
     yield put({type: 'paymentListData', preload: {}});
    }

   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  // 获取支付方式列表
  * getPaymentListEFF({val}, {put, call, select}) {
   const v = yield select(state => state.personOrder);
   let values = {
    groupCode: 'channel_pay_type',
    dictionaryName: val,
    goodsNum: v.allGoodsNum,
    fouthAreaId: v.checkedFouthAreaId || "",
    provinceId: v.checkedProvinceId
   }
   const data = yield call(getPaymentListAPI, values);
   if (data.result == 1) {
    yield put({type: 'paymentListData', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
// 获取发票列表
  * getOrderInvoiceList({cartIds}, {put, call, select}) {
   const data = yield call(getOrderInvoiceListApi, cartIds);
   if (data.result == 1) {
    yield put({type: 'orderInvoiceListData', preload: data.data[0]});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  // 保存发票信息saveOrderInvoiceAPI
  * saveOrderInvoiceEFF({payload}, {put, call, select}) {
   let v = yield select(state => state.personOrder);
   const data = yield call(saveOrderInvoiceAPI, payload);
   if (data.result == 1) {
    message.success(data.msg)
    console.log(payload)
    yield put({type: 'newInvoice', preload: data.data[0]})
    yield put({type: 'getOrderInvoiceList', cartIds: v.subCartToOrderDate[0].cartGroupVoList[0].cartIds})
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  // 设置默认地址
  * setDefaultAddressEFF({orderAddressId}, {put, call}) {
   const data = yield call(setDefaultAddressAPI, orderAddressId);
   if (data.result == 1) {
    yield put({type: 'getOrderAddressList'});
    message.warning('亲爱的用户，您已更换收货地址，因各地的支付与配送方式不同，请重新选择配送方式和支付方式！', 1.5, () => {
    })
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  //删除地址
  * deleteAddressEFF({v}, {put, call}) {
   console.log(v)
   const data = yield call(deleteOrderAddressAPI, {addressId: v.addressId});
   if (data.result == 1) {
    if (v.isChecked) {
     yield put({type: 'getOrderAddressList'});
    }else{
     yield put({type: 'deletedAddressData', v})
    }
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  //切换收货地址
  * changeAddressEFF({address}, {put, call}) {
   console.log("出发方法:" + address)
   let cartId = localStorage.getItem("cartId");
   let payload = {
    provinceId: address.provinceId,
    areaId: address.areaId,
    cartIds: cartId,
   }
   yield put({type: 'getDeliveryMethodEFF', payload});
   yield put({type: 'changeAggress', preload: address});
   message.warning('亲爱的用户，您已更换收货地址，因各地的支付与配送方式不同，请重新选择配送方式和支付方式！', 1.5, () => {
   })
  },
  // 选择配送方式 getDeliveryMethodAPI
  * getDeliveryMethodEFF({payload}, {put, call}) {
   console.log("准备发送请求:" + payload)
   let newPayload = {...payload, groupCode: 'shipping_type'}
   const data = yield call(getDeliveryMethodAPI, newPayload);
   console.log("返回结果了" + data)
   if (data.result == 1) {
    yield put({type: 'deliveryMethod', preload: data.data});
    //如果有配送方式,再请求支付方式
    if (data.data.length > 0) {
     yield put({type: 'getPaymentListEFF', val: data.data[0].dictionaryName});
    }
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

 },

 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    const match = pathToRegexp('/personOrder/subOrder/:cartId/:activityIds').exec(pathname);
    if (pathname.indexOf("/personOrder/subOrder/") >= 0) {
     if (match[2]) {
      localStorage.setItem("cartId", match[1] + "," + match[2])
     } else {
      localStorage.setItem("cartId", match[1])
     }

     dispatch({type: 'subCartToOrderEFF', cartIds: match[1], activityIds: match[2]});
     dispatch({type: 'getAreaDate'});
     dispatch({type: 'getOrderAddressList'});
     dispatch({type: 'getOrderInvoiceList', cartIds: match[1]});
    }
   });
  }
 },


 reducers: {
  subCartToOrderState(state, {subCartToOrderDate}) {
   let allGoodsNum = 0;
   let newCartVoList = subCartToOrderDate[0].cartGroupVoList.map((shop, index) => {
    return {
     cartVoList: shop.cartVoList.map((act) => {
      let carts = act.cartList.map((goods) => {
       allGoodsNum += goods.goodsNum;
       return {
        goodsId: goods.goodsId,
        newGoodsPrice: goods.newGoodsPrice,
        goodsNum: goods.goodsNum,
        cartId: goods.cartId
       }
      })
      return {
       activityId: act.activityRuleList && act.activityRuleList.length > 0 ? act.activityRuleList[0].id : null,
       cartList: carts
      }
     })
    }
   })
   let val = {
    cartGroupVoList: newCartVoList,
    predepositOrgAmount: subCartToOrderDate[0].memberApiBean.availablePredeposit,
    memberConsumePoints:subCartToOrderDate[0].memberApiBean.memberConsumePoints,
    predepositAmount:"0",
    pointAllpoint:"0"
   }
   return {
    ...state,
    subCartToOrderDate: subCartToOrderDate,
    allGoodsNum: allGoodsNum,
    sendValue: {
     ...state.sendValue,
     ...val
    }
   }
  },

  areaData(state, {preload}) {
   return {
    ...state,
    areaDataList: preload
   }
  },
  addressListData(state, {preload}) {
   let val = {
    addressId: preload[0] && preload[0].addressId || ""
   }
   let newperload = []
   if (preload.length > 0) {
    newperload = preload.map((list, index) => {
     if (list.isDefault == 1) {
      list.isChecked = true;
     }
     return list
    })
   }
   return {
    ...state,
    addressList: newperload,
    sendValue: {
     ...state.sendValue,
     ...val
    },
    checkedFouthAreaId: preload[0] && preload[0].fouthAreaId || "",
    checkedProvinceId: preload[0] && preload[0].provinceId || ""
   }
  },
  //删除地址
  deletedAddressData(state, {v}) {
   console.log(v)
   let newAddressList = state.addressList;
   let data = newAddressList.filter((list, i) => {
    if (list.addressId != v.addressId) {
     return list
    }
   })
   // console.log(data)
   return {
    ...state,
    addressList: data,
   }
  },
  //增加收货数据
  addAddress(state, {payload}) {
   // console.log(payload)
   let newAddressList = state.addressList;
   let isOld = false;
   newAddressList = state.addressList.map((list, i) => {
    if (list.addressId == payload.addressId) {
     // console.log(list)
     payload.isChecked = list.isChecked;
     list = payload;
     isOld = true;
    }
    return list
   })
   if (!isOld) {
    newAddressList.push(payload)
   }
   // console.log(newAddressList)
   return {
    ...state,
    addressList: newAddressList,
   }
  },
  //发票列表
  orderInvoiceListData(state, {preload}) {
   let val = {
    invoiceId: state.newInvoice ? state.newInvoice : preload["0"] && preload["0"].invId || preload["1"] && preload["1"].invId || preload["2"] && preload["2"].invId
   }
   return {
    ...state,
    orderInvoiceList: preload,
    sendValue: {
     ...state.sendValue,
     ...val
    }
   }
  },
  newInvoice(state, {preload}) {
   console.log(preload)
   return {
    ...state,
    newInvoice:preload.invId
   }
  },
  // 配送信息数据
  deliveryMethod(state, {preload}) {
   // console.log(preload)
   let val = {
    shippingName: preload[0] && preload[0].dictionaryName || "",
    shippingCode: preload[0] && preload[0].dictionaryId || ''
   }
   return {
    ...state,
    deliveryMethodData: preload,
    sendValue: {
     ...state.sendValue,
     ...val
    },
    dictionaryId: preload[0] && preload[0].dictionaryId
   }
  },
  // 支付方式
  paymentListData(state, {preload}) {
   let val = {
    paymentName: preload.data && preload.data[0] && preload.data[0].dictionaryName || "",
    paymentCode: preload.data && preload.data[0] && preload.data[0].dictionaryValue || "",
    shipFee: preload.shippingTotalFree && preload.shippingTotalFree.toString()
   }
   return {
    ...state,
    paymentList: preload.data || [],
    shippingTotalFree: preload.shippingTotalFree || 0,
    sendValue: {
     ...state.sendValue,
     ...val
    },
    init:state.init+1
   }
  },
  //切换收货地址
  changeAggress(state, {preload}) {
   let newPreload = []
   // console.log(preload)
   newPreload = state.addressList.map((list, index) => {
    if (list.addressId == preload.addressId) {
     list.isChecked = true;
    } else {
     list.isChecked = false;
    }
    return list
   })
   let val = {
    addressId: preload.addressId
   }
   return {
    ...state,
    addressList: newPreload,
    sendValue: {
     ...state.sendValue,
     ...val,
     predepositAmount: "0.00",
     pointAllpoint: "0.00",
    },
    checkedFouthAreaId: preload.fouthAreaId || "",
    checkedProvinceId: preload.provinceId || ""
   }
  },
  // 切换配送方式时,更新配送数据
  changeDeliveryMethod(state, {preload}) {
   let val = {
    shippingName: preload.dictionaryName,
    shippingCode: preload.dictionaryId
   }
   return {
    ...state,
    sendValue: {
     ...state.sendValue,
     ...val,
     predepositAmount: "0.00",
     pointAllpoint: "0.00",
    },
    dictionaryId: preload.dictionaryId
   }
  },
  // 切换支付方式时,更新支付方式数据
  changePayMethod(state, {preload}) {
   let val = {
    paymentName: preload[0].dictionaryName,
    paymentCode: preload[0].dictionaryValue
   }
   return {
    ...state,
    sendValue: {
     ...state.sendValue,
     ...val
    }
   }
  },
  // 切换发票类型时,更新发票数据
  changeInvoice(state, {preload}) {
   let val = {
    invoiceId: preload.invId
   }
   console.log(val)
   return {
    ...state,
    sendValue: {
     ...state.sendValue,
     ...val
    }
   }
  },
  //确定使用预存款金额
  clickPredeposit(state, {preload}) {
   // console.log(preload)
   let val = {
    predepositAmount: preload.toString()
   }
   return {
    ...state,
    sendValue: {
     ...state.sendValue,
     ...val
    }
   }
  },
  //使用积分
  useConsumePoints(state,{v}){
   // console.log(v)
   return {
    ...state,
    sendValue: {
     ...state.sendValue,
     ...v
    }
   }
  },
  //保存订单后的数据
  saveOrder(state, {preload}) {
   return {
    ...state,
    saveOrderDate: preload
   }
  }


 }
}

