import {message} from 'antd';
import {returnListApi} from './RefundListApi';

export default {
	namespace: 'refundList',
	state: {
		personConsultListData: [{
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
		  "orderStateMemo": "已报价",
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
			  },
			  {
				"orderId": "396ad8dae28644909b9b7fc188d8fad9",
				"goodsImage": "/upload/img/store/0/1504690574139.jpg",
				"sellerGoodsName": "头孢克洛缓释片2(施华洛)",
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
		  "orderStateMemo": "未报价",
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
				  "dosageForm": "",
				  "orderTransAmount": 0,
				  "sellerGoodsId": "311791",
				  "productSellPrice": 0,
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
	  }],
		consultListTotal: 2,
		refundListData:[],	
    },
	effects: {
		//退货申请列表
		* returnListEEF({payload}, {put, call}) {
			const data = yield call(returnListApi,payload);
			if (data.result == 1) {
			 yield put({type: 'getReturnList', preload: data});
			} else {
			 message.error(data.msg, 1.5, () => {
			 });
			}
		},
	},
	subscriptions: {
		setup({dispatch, history}) {
			return history.listen(({pathname, query}) => {
			 if (pathname === '/personOrder/refundList') {
			  dispatch({type: 'returnListEEF'});	
			 }
			});
		}

	},
	reducers: {
		
		getReturnList(state, {preload}) {
			const {data} = preload;
			return {
			 ...state,
			 refundListData: data,
			}
		},


	}
}