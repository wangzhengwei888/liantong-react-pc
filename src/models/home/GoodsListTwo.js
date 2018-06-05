//import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';
import {message} from 'antd';
import {
 getGoodsListExactApi,
 addCartApi,
 goodsfilterApi,
 peoductSearchBannerApi,
 addGoodsFavoritesAPI,
 addInquiry
} from './api';
import pathToRegexp from 'path-to-regexp';
import {deleteGoodsFavorites} from '../personOrder/FavListApi';

export default {
 namespace: 'goodsListTwo',
 state: {
  init: 0,
  data: [],
  ScreenList: [],
  AddCartdata: [],
  pageNo: 1,
  peoductSearchBannerData: [],
  shopListObj: {
   keyword: '',//（搜索关键词）
   storeId: '',//（店铺ID）
   brandId: '',//（品牌ID）
   brandName: '',
   secondGcId: '',
   thirdGcId: '',
   gcId: '',//（商品分类ID）
   goodsSpec: '',//（规格型号ID）
   arrivalCycle: '',//（到货周期）
   sortField: '',//（排序字段）
   sortOrder: '',//（排序规则 asc 升序 desc 降序）
   maximumPrice: '',//（最大价格）
   minimumPrice: '',//（最小价格）
   pageSize: '10',//（分页条数）
   pageNo: '1',//（页码）
   activityId: '',//(优惠券ID，满减ID等)
   goodsName: '',
   goodsEname: '',
   sinopharmGoodsCode: '',
   goodsFirstCode: '',
   casNo: '',
   unNo: '',
   molecularFormula: '',
   molecularWeight: '',
   specName: '',
  },
  filter: {
   keyword: '',
   gcId: '',
   secondGcId: '',
   thirdGcId: '',
   brandId: '',
   goodsSpec: '',
   arrivalCycle: '',
   brandName: '',
  }
 },
 //effects   接收数据
 effects: {
  * goodsListEFF({val}, {put, call, select}) {
   const goodsList = yield select(state => state.goodsListTwo);
   const data = yield call(getGoodsListExactApi, {...goodsList.shopListObj, ...val})
   if (data.result == 1) {
    yield put({type: 'load', preload: data, shopListObj: {...goodsList.shopListObj, ...val}});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  * goodsfilterEFF({val}, {put, call, select}) {
   const goodsList = yield select(state => state.goodsListTwo);
   const data = yield call(goodsfilterApi, {...goodsList.filter, ...val});
   // console.log(data)
   if (data.result == 1) {
    // console.log(data)
    yield put({type: 'screenlist', screenlistdata: data , filter : {...goodsList.filter, ...val}});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

  * addCartEFF({goodsId, goodsPrice, count, saveType,}, {put, call}) {
   const data = yield call(addCartApi, goodsId, goodsPrice, count, saveType);
   console.log(data)
   if (data.result == 1) {
    message.success(data.msg, 1.5, () => {
    });
    yield put({type: 'app/getcartCountEFF'});
    yield put({type: 'addCart', addCartdata: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  * addGoodsFavoritesEFF({goodsId}, {put, call}) {
   const data = yield call(addGoodsFavoritesAPI, goodsId);
   if (data.result == 1) {
    yield put({type: 'updateCollection', goodsId: goodsId})
    message.success(data.msg, 1.5);
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  * deleteGoodsFavoritesEFF({goodsId}, {put, call}) {
   const data = yield call(deleteGoodsFavorites, goodsId);
   if (data.result == 1) {
    yield put({type: 'updateCollection', goodsId: goodsId})
    message.success(data.msg, 1.5);
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  * peoductSearchBannerEFF({}, {put, call}) {
   const data = yield call(peoductSearchBannerApi);
   if (data.result == 1) {
    yield put({type: 'peoductSearchBanner', peoductSearchBannerData: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  // /加入询价单
  * addInquiryEFF({val}, {put, call}) {
   const data = yield call(addInquiry, val);
   if (data.result == 1) {
    message.success(data.msg, 1.5);
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },


 },

 //subscriptions 监听数据
 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    if (pathname.startsWith('/home/PeoductSearchTwo')) {
     let val = query
     console.log(val)
     dispatch({type: 'goodsListEFF', val: val});
     dispatch({type: 'goodsfilterEFF',val:val});
    }
   });
  },
 },


 //reducers 处理数据
 reducers: {
  load(state, {preload, shopListObj}) {
   const {data,pageNo} = preload;
   return {
    ...state,
    data: data,
    pageNo:pageNo,
    shopListObj,
    init:state.init + 1,
   }
  },
  screenlist(state, {screenlistdata , filter}) {
   const {data} = screenlistdata;
   return {
    ...state,
    ScreenList: data,
    filter,
   }
  },
  addCart(state, {addCartdata}) {
   const {data} = addCartdata;
   return {
    ...state,
    AddCartdata: data,
   }
  },
  peoductSearchBanner(state, {peoductSearchBannerData}) {
   const {data} = peoductSearchBannerData;
   return {
    ...state,
    peoductSearchBannerData: data,
   }
  },
  updateCollection(state, {goodsId}) {
   let listApiGoods = [...state.data[0].listApiGoods]
   listApiGoods.forEach((item) =>{
    if(item.goodsId == goodsId.goodsId) {
     if(item.isFavorite == 1) {
      item.isFavorite = 0
     }else {
      item.isFavorite = 1
     }
    }
   })
   return {
    ...state,
    data:[
     ...state.data,
     listApiGoods
    ]
   }
  }
 }
}
