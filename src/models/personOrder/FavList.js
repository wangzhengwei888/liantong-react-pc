import {message} from 'antd';
import {
 addCart,
 updateCartCount,
 deleteGoodsFavorites,
 getAddCartBachAPI,
 getGoodsFavoritesList,
 searchFavGoodsApi
} from './FavListApi';


export default {
 namespace: 'favList',
 state: {
  goodsFavoritesList: [],
  checkAll: false,
  init: 1
 },
 effects: {

  * getGoodsFavoritesListEEF({}, {put, call}) {
   const data = yield call(getGoodsFavoritesList);
   if (data.result == 1) {
    yield put({type: 'goodsFavoritesList', goodsFavoritesListDate: data});
   } else {
    message.error(data.msg, 1.5, () => {});
   }
  },

  * updateCartCount({payload, checkGoods}, {put, call}) {
   const data = yield call(updateCartCount, payload);
   if (data.result == 1) {
    yield put({type: 'app/cartCount', preload: data});
    checkGoods.checkGoods.goodsNum = checkGoods.num;
    yield put({type: 'checkGoodsEFF', payload: checkGoods});
   } else {
    message.error(data.msg, 1.5, () => {
    });
    yield put({type: 'updateDataCount'});
   }
  },
  * deleteGoodsFavoritesEFF({payload}, {put, call}) {
   const data = yield call(deleteGoodsFavorites, payload);
   if (data.result == 1) {
    yield put({type: 'updateData', goodsId: payload.goodsId});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  * checkAllEFF({payload}, {put}) {
   console.log(payload)
   yield put({type: 'checkAll', preload: payload});
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
  * getAddCartBachEFF({arr}, {put, call}) {
   console.log(arr)
   const data = yield call(getAddCartBachAPI, arr);
   if (data.result == 1) {
    console.log(data)
    yield put({type: 'app/cartCount', preload: data});
    // yield put({type: 'addList', goodsbatchlist: data.data});
    message.success(data.msg, 1.5, () => {
    });
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  * checkGoodsEFF({payload}, {put}) {
   console.log(payload)
   yield put({type: 'checkGoods', preload: payload});
  },
  * searchFavGoods({payload}, {put, call}) {
   console.log(payload)
   const data = yield call(searchFavGoodsApi, payload);
   if (data.result == 1) {
    yield put({type: 'goodsFavoritesList', goodsFavoritesListDate: data});
   } else {
    message.error(data.msg, 1.5, () => {});
   }
  }

 },

 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    if (pathname === '/personOrder/favList') {
     dispatch({type: 'getGoodsFavoritesListEEF'});
    }
   });
  }
 },

 reducers: {
  goodsFavoritesList(state, {goodsFavoritesListDate}) {
   const {data} = goodsFavoritesListDate;
   return {
    ...state,
    goodsFavoritesList: data,
    checkAll: false,
   }
  },
  checkGoods(state, {preload}) {
   // 遍历当前店铺的所有商品
   console.log(preload)
   let newGoods = preload.checkedGoods;
   newGoods.checked = preload.checked;
   const data = state.goodsFavoritesList.map(goods => {
    if (preload.checkedGoods.goodsId == goods.goodsId) {
     goods = newGoods;
    }
    return goods;
   })

   let isCheckAll = true;
   if (data.find(goods => !goods.checked)) {
    isCheckAll = false;
   }
   return {
    ...state,
    checkAll: isCheckAll,
    goodsFavoritesList: data
   }
  },
  updateData(state, {goodsId}) {
   let goodsIdList = goodsId.split(",");
   let mapedList = state.goodsFavoritesList;
   for (let i = 0; i < goodsIdList.length; i++) {
    mapedList = mapedList.filter(item => {
     return item.goodsId != goodsIdList[i]
    })
   }
   return {
    ...state,
    goodsFavoritesList: mapedList,
    checkAll:mapedList.length > 0 && state.checkAll ? true : false
   }
  },
  checkAll(state, {preload}) {
   const data = state.goodsFavoritesList.map(goods => {
    goods.checked = preload;
    return goods;
   })
   return {
    ...state,
    checkAll: preload,
    goodsFavoritesList: data
   }
  },
 }
}


