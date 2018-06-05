import {message} from 'antd';
import {addCart, getCartList, updateCartCount, deleteCart,addGoodsFavoritesAPI,updateGoodsCount,printCartPDF} from './CartApi';
import {deleteGoodsFavorites} from '../personOrder/FavListApi';

export default {
 namespace: 'cart',
 state: {
  data: [],
  pdfData:[],
  goodsNum: 0,
  goodsTotalPrice: 0,
  checkAll: false,
  init: 1,
  cartId:[],
  actItemId:''
 },
 effects: {
  * getCartList({payload}, {put, call}) {
   const data = yield call(getCartList,payload);
   if (data.result == 1) {
    yield put({type: 'loaded', preload: data});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },

  //  //购物车单个商品改变品数量
  //  *updateGoodsCountEFF({payload },{ put, call }){
  //   const data=yield call( updateCartCount, payload);
  //   if(data.result==1) {
  //      message.success( data.msg, 1.5);
  //    //  yield put({type: 'app/cartCount', preload: data});
  //      yield put({type: 'updateGoodsCount', preload: data});
  //   }else{
  //     message.error(data.msg,1.5,()=>{});
  //   }
  // },


  * updateCartCountEFF({payload, checkGoods}, {put, call}) {
   console.log(checkGoods)
   const data = yield call(updateCartCount, payload);
   if (data.result == 1) {
    yield put({type: 'app/cartCount', preload: data});
    checkGoods.checkedGoods.goodsNum = checkGoods.num;
    yield put({type: 'checkGoodsEFF', payload: checkGoods});
   } else {
    message.error(data.msg, 1.5, () => {});
    yield put({type: 'updateDataCount'});
   }
  },
  * deleteCart({payload}, {put, call}) {
   const data = yield call(deleteCart, payload);
   console.log(payload)
   if (data.result == 1) {
    yield put({type: 'updateData', cartId: payload.cartId});
    yield put({type: 'app/cartCount', preload: data});
    yield put({type: 'refreshTotalPriceAndCount'});
   } else {
    message.error(data.msg, 1.5, () => {
    });
   }
  },
  //打印pdf
  * printCartPDFEEF({payload}, {put, call}) {
      const data = yield call(printCartPDF, payload);
      console.log(data)
      if (data.result == 1) {
        yield put({type: 'pdfData', preload: data});
        //message.success(data.msg,1.5)
      } else {
        message.error(data.msg, 1.5, () => { });
      }
    },


  *addGoodsFavoritesEFF({ goodsId },{ put, call }){
    const data=yield call( addGoodsFavoritesAPI, goodsId );
    console.log(data);
    if(data.result==1) {
    yield put({type: 'updateCollection', goodsId: goodsId})
     // yield put({type: 'updateData', goodsId: goodsId});
       message.success( data.msg, 1.5 );
       console.log(goodsId)
    }else{
      message.error(data.msg,1.5,()=>{});
    }
  },
  *deleteGoodsFavoritesEFF({ goodsId },{put,call}){
   const data=yield call( deleteGoodsFavorites, goodsId );
    if(data.result==1) {
     yield put({type: 'updateCollection', goodsId: goodsId})
   // yield put({type: 'updateData', goodsId: goodsId});
     message.success( data.msg, 1.5 );
    }else{
     message.error(data.msg,1.5,()=>{});
    }
   },


  * checkAllEFF({payload}, {put}) {
   yield put({type: 'checkAll', preload: payload});
   yield put({type: 'refreshTotalPriceAndCount'});
  },
  * checkGoodsEFF({payload}, {put}) {
   yield put({type: 'checkGoods', preload: payload});
   yield put({type: 'refreshTotalPriceAndCount'});
  },
  * addIdEFF({payload}, {put}) {
   yield put({type: 'addItemId', preload: payload});
   yield put({type: 'refreshTotalPriceAndCount'});
  },




 },

 subscriptions: {
  setup({dispatch, history}) {
   return history.listen(({pathname, query}) => {
    if (pathname === '/personOrder/cart') {
     dispatch({type: 'getCartList'});
    // dispatch({type: 'getCartList'});
    }
   });
  }
 },

 reducers: {


  loaded(state, {preload}) {
   const {data} = preload;
   return {
    ...state,
    data: data,
    checkAll: false,
    goodsTotalPrice:0
   }
  },

  pdfData(state, {preload}) {
    const {data} = preload;
    return {
     ...state,
     pdfData: data,
    }
   },

  addItemId(state, {preload}) {
   const {id} = preload;
   return {
    ...state,
    actItemId:id
   }
  },

  updateCollection(state, {goodsId}) {

   let data = state.data.map(shop => {
    shop.cartVoList.map(act => {

     act.cartList.map((goods)=>{
      if(goods.goodsId == goodsId.goodsId) {
       if(goods.isFavorite == 1) {
        goods.isFavorite = 0
       }else {
        goods.isFavorite = 1
       }
      }
      return goods;
     })
     return act;
    })
    return shop;
   })

    // data = data.filter(shop => {
    //   return shop.list.length != 0
    //  })
   return {
    ...state,
     data:data,
   }
  },

  updateData(state, {cartId}) {
   // console.log(state.data)
   // console.log(cartId)
   let carts;
   let cartIdList = cartId.split(",");
   let data = state.data.map((shop,v,shopA) => {
    let newShop = shop.cartVoList.map((act)=>{
     let mapedList = act.cartList;
     console.log(mapedList);
     for(let i = 0; i < cartIdList.length; i++){
      mapedList =  mapedList.filter(item => {
       return item.cartId != cartIdList[i]
      })
      carts = shop.cartIds.replace((cartIdList[i]),"")
     }
     return {...act,cartList:mapedList} //这里就是没替换上
    })
    return {
     ...shop,cartIds:carts,cartVoList:newShop
    }
   })
   return {
    ...state,
    data:data
   }
  },
  updateDataCount(state) {
   return {
    ...state,
    init: state.init + 1
   }
  },
  checkAll(state, {preload}) {
   state.data.forEach(shop => {
    shop.checked = preload;
    shop.cartVoList.forEach(act => {
     act.cartList.forEach((goods)=>{
      // let loseEfficacy = goods.showGoodsStorage <= 0 || goods.newGoodsPrice <= 0
      // goods.checked = loseEfficacy ? false : preload;
      // if(goods.newGoodsPrice && goods.newGoodsPrice > 0 ){
       goods.checked = preload;
      // }
     })
    })
   })
   return {
    ...state,
    checkAll: preload,
    data:state.data
   }
  },

  checkGoods(state, {preload}) {
   preload.checkedStore.cartVoList.forEach((act,i)=>{
    act.cartList.forEach(goods => {
     if (preload.checkedGoods.goodsId == goods.goodsId && preload.checkedGoods.specId == goods.specId) {
      goods.checked = preload.checked;
     }
    })
   })
   let isAllGoodsChecked = true;
   // 当前店铺商品 checked 不存在false,
   // console.log(isAllGoodsChecked);
   preload.checkedStore.cartVoList.forEach((i,v)=>{
    if(i.cartList.find(item => !item.checked)){
     isAllGoodsChecked = false;
    }})

   state.data.forEach(shop => {
    if (preload.checkedStore.storeId == shop.storeId) {
     // shop.list = mapedList;
     shop.checked = isAllGoodsChecked;
    }
    return shop;
   })

   let isCheckAll = true;
   if (state.data.find(shop => !shop.checked)) {
    isCheckAll = false;
   }
   return {
    ...state,
    checkAll: isCheckAll,
    data:state.data,
   }
  },
  refreshTotalPriceAndCount(state) {
   // console.log(state)
   let totalPrice = 0;
   let goodsNum = 0;
   let newCartId = [];

   state.data.forEach(shop => {
    shop.cartVoList.forEach((act)=>{
     // console.log(act)
     if(act.groupType == '20' && act.activity.activityType == '30'){
      let activityMoney = '0';
      act.cartList.forEach((goods) => {
       if (goods.checked) {
        goodsNum += goods.goodsNum;
        totalPrice = parseFloat(totalPrice) + parseFloat(goods.newGoodsPrice * goods.goodsNum);
        newCartId.push(goods.goodsId);
        activityMoney = parseFloat(activityMoney) + parseFloat(goods.newGoodsPrice * goods.goodsNum);
       }
       act.activityMoney = activityMoney;
       let reverseData = act.activityRuleList;
       reverseData.reverse();
       let maxAct = reverseData.find((i)=>{
        return   activityMoney >= i.limitWhere;
       })
       reverseData.reverse();
       let actObj = reverseData.filter((i)=>{
        return   state.actItemId == i.id;
       })
       act.actItemId = (actObj.length > 0 && maxAct != undefined ?
        (actObj[0].limitWhere > maxAct.limitWhere ? maxAct.id : state.actItemId)
        : maxAct != undefined ? maxAct.id : '');
      })
     }else{
      act.cartList.forEach((goods) => {
       if (goods.checked) {
        goodsNum += goods.goodsNum;
        totalPrice = parseFloat(totalPrice) + parseFloat(goods.newGoodsPrice * goods.goodsNum)
        newCartId.push(goods.goodsId)
       }
      })
     }
    })
   });
   console.log(goodsNum)
   totalPrice = totalPrice.toFixed(2);
   return {
    ...state,
    goodsNum: goodsNum,
    goodsTotalPrice: totalPrice,
    cartId:newCartId,
    checkAll:goodsNum > 0 && state.checkAll ? true : false
   }
  }

 }
}
