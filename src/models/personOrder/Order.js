import {message} from 'antd';
import { getPersonOrderList,getRecentPurGoods,addCart,updateCartCount } from './OrderApi'

export default {
  namespace: 'order',
  state: {
    getRecentPurGoodsData:[],
    pageNo:'1',
    total:'0',
    personOrderListData: [{
      "orderId": "396ad8dae28644909b9b7fc188d8fad9",
      "orderState": 1,
      "paymentId": "5001",
      "paymentState": 0,
      "paymentName": "在线支付",
      "createTimeStr": "2017-11-14 16:04:44",
      "goodsTotalNum": 3900,
      "shippingFee": "0.00",
      "buyerTel": "13333333333",
      "orderSn": "2017111430788225",
      "goodsAmount": "124800.00",
      "orderStateMemo": "已提交",
      "orderAmount": "124800.00",
      "paymentStateStr": "未付款",
      "storeName": "国控分销",
      "orderItemsList": [
          {
              "orderId": "396ad8dae28644909b9b7fc188d8fad9",
              "goodsImage": "/upload/img/store/0/1504691849013.jpg",
              "sellerGoodsName": "头孢克洛缓释片(施华洛)",
              "productBuyBillQty": 3900,
              "deliveryList": [
                  
              ],
              "productSellBillQty": 3900,
              "orderCreateDateStr": "2017-11-14 16:04:45",
              "orderStatusMemo": "待确认",
              "dosageForm": "缓释片",
              "orderTransAmount": 124800.0,
              "sellerGoodsId": "940",
              "productSellPrice": 32.0,
              "sellerGoodsSpec": "75mg×7T",
              "orderStatus": "1",
              "orderCreateDate": {
                  "date": 14,
                  "hours": 16,
                  "seconds": 45,
                  "month": 10,
                  "timezoneOffset": -480,
                  "year": 117,
                  "minutes": 4,
                  "time": 1510646685000,
                  "day": 2
              },
              "orderItemId": "i2017111415989283",
              "sellerGoodsUnit": "盒",
              "refundReturnList": [
                  
              ]
          }
      ],
      "shippingName": "包邮",
      "buyerName": "zxn",
      "storeId": "0",
      "orderStateStr": "1",
      "createTime": 1510646684807,
      "addressName": "上海市闵行区鹤庆路801号19"
  },
  {
      "orderId": "c10447e1f6244b40bb49525639e9caff",
      "orderState": 1,
      "paymentId": "5001",
      "paymentState": 0,
      "paymentName": "在线支付",
      "createTimeStr": "2017-10-30 17:54:35",
      "goodsTotalNum": 1,
      "shippingFee": "0.00",
      "buyerTel": "13333333333",
      "orderSn": "2017103015915355",
      "goodsAmount": "58.00",
      "orderStateMemo": "已提交",
      "orderAmount": "58.00",
      "paymentStateStr": "未付款",
      "storeName": "平台自营",
      "orderItemsList": [
          {
              "orderId": "c10447e1f6244b40bb49525639e9caff",
              "sellerGoodsName": "痛血康胶囊",
              "productBuyBillQty": 1,
              "goodsImage": "/upload/img/store/0/1504690574139.jpg",
              "deliveryList": [
                  
              ],
              "productSellBillQty": 1,
              "orderCreateDateStr": "2017-10-30 17:54:36",
              "orderStatusMemo": "待确认",
              "dosageForm": "胶囊剂，硬胶囊",
              "orderTransAmount": 58.0,
              "sellerGoodsId": "311791",
              "productSellPrice": 58.0,
              "sellerGoodsSpec": "75mg×7T",
              "orderStatus": "1",
              "orderCreateDate": {
                  "date": 30,
                  "hours": 17,
                  "seconds": 36,
                  "month": 9,
                  "timezoneOffset": -480,
                  "year": 117,
                  "minutes": 54,
                  "time": 1509357276000,
                  "day": 1
              },
              "orderItemId": "i2017103061743918",
              "sellerGoodsUnit": "盒",
              "refundReturnList": [
                  
              ]
          }
      ],
      "shippingName": "包邮",
      "buyerName": "zxn",
      "storeId": "0",
      "orderStateStr": "1",
      "createTime": 1509357275883,
      "addressName": "鹤庆路801号（设备科）19"
  },
  {
      "orderId": "9f8300cec46b47aeb79245a6dd1c1862",
      "orderState": 1,
      "paymentId": "5001",
      "paymentState": 0,
      "paymentName": "在线支付",
      "createTimeStr": "2017-10-30 17:49:21",
      "goodsTotalNum": 1,
      "shippingFee": "0.00",
      "buyerTel": "13333333333",
      "orderSn": "2017103037659474",
      "goodsAmount": "58.00",
      "orderStateMemo": "已提交",
      "orderAmount": "58.00",
      "paymentStateStr": "未付款",
      "storeName": "平台自营",
      "orderItemsList": [
          {
              "orderId": "9f8300cec46b47aeb79245a6dd1c1862",
              "sellerGoodsName": "痛血康胶囊",
              "productBuyBillQty": 1,
              "goodsImage": "/upload/img/store/0/1504690574139.jpg",
              "deliveryList": [
                  
              ],
              "productSellBillQty": 1,
              "orderCreateDateStr": "2017-10-30 17:49:21",
              "orderStatusMemo": "待确认",
              "dosageForm": "胶囊剂，硬胶囊",
              "orderTransAmount": 58.0,
              "sellerGoodsId": "311791",
              "productSellPrice": 58.0,
              "sellerGoodsSpec": "75mg×7T",
              "orderStatus": "0",
              "orderCreateDate": {
                  "date": 30,
                  "hours": 17,
                  "seconds": 21,
                  "month": 9,
                  "timezoneOffset": -480,
                  "year": 117,
                  "minutes": 49,
                  "time": 1509356961000,
                  "day": 1
              },
              "orderItemId": "i2017103085431722",
              "sellerGoodsUnit": "盒",
              "refundReturnList": [
                  
              ]
          }
      ],
      "shippingName": "包邮",
      "buyerName": "zxn",
      "storeId": "0",
      "orderStateStr": "0",
      "createTime": 1509356961263,
      "addressName": "鹤庆路801号（设备科）19"
  }],
    orderListTotal: 2
  },
  effects: {
    *getRecentPurGoodsEEF({val},{put,call}){ 
      const data=yield call(getRecentPurGoods,val);
      if(data.result ==1){
        yield put({ type:'getRecentPurGoods',getRecentPurGoodsData:data });
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    * addCart({val}, {put, call}) {
        console.log(val)
        const data = yield call(addCart, val);
        if (data.result == 1) {
        message.success(data.msg, 1.5);
        yield put({type: 'app/cartCount', preload: data});
        } else {
        message.error(data.msg, 1.5, () => {
        });
        }
    }, 

   * updateCartCount({payload, checkGoods}, {put, call}) {
      const data = yield call(updateCartCount, payload);
      if (data.result == 1) {
        yield put({type: 'app/cartCount', preload: data});
      } else {
        message.error(data.msg, 1.5, () => { });
      }
    },
    // * checkGoodsEFF({payload}, {put}) {
    //   console.log(payload)
    //   yield put({type: 'checkGoods', preload: payload});
    // },

    *personOrderListEFF({val},{ put, call ,select}){
      const searchParam=yield select(state=>state.order);
      const data=yield call(getPersonOrderList,{...searchParam.searchParam, ...val});

      if(data.result==1){
        yield put({type: 'PersonOrderList', personOrderListData: data,total:data.total});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }){
      return history.listen(({ pathname, query }) => {
        if(pathname == '/personOrder/order'){
          // dispatch({ type: 'personOrderListEFF' });
          dispatch({ type:'getRecentPurGoodsEEF' })
        }
      })
    }
  },
  reducers: {
    PersonOrderList(state,{ personOrderListData,total }){
      const {data} = personOrderListData
      return {
        ...state,
        personOrderListData:data,
        orderListTotal:total
      }
    },
    getRecentPurGoods(state,{getRecentPurGoodsData}){
        const {data,pageNo,total}=getRecentPurGoodsData
        return {
          ...state,
          pageNo:pageNo,
          total:total,
          getRecentPurGoodsData:data
        }
    },


  }
}
