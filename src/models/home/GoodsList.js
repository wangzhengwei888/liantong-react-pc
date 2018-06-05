//import pathToRegexp from 'path-to-regexp';
import {routerRedux} from 'dva/router';
import {message} from 'antd';
import {goodsListApi, goodsfilterApi, addCartApi, peoductSearchBannerApi,addGoodsFavoritesAPI,addInquiry} from './api';
import pathToRegexp from 'path-to-regexp';
import {deleteGoodsFavorites} from '../personOrder/FavListApi';

export default {
  namespace: 'goodsList',
  state: {
    init:0,
    data: [],
    ScreenList: [],
    AddCartdata: [],
    pageNo:1,
    peoductSearchBannerData: [],
    shopListObj: {
      keyword: '',//（搜索关键词）
      storeId: '',//（店铺ID）
      brandId: '',//（品牌ID）
      brandName:'',
      secondGcId:'',
      thirdGcId:'',
      gcId: '',//（商品分类ID）
      goodsSpec: '',//（规格型号ID）
      arrivalCycle: '',//（到货周期）
      sortField: '',//（排序字段）
      sortOrder: '',//（排序规则 asc 升序 desc 降序）
      maximumPrice: '',//（最大价格）
      minimumPrice: '',//（最小价格）
      pageSize: '10',//（分页条数）
      pageNo: '1',//（页码）
      activityId:'',//(优惠券ID，满减ID等)
    },
    filter:{
      keyword:'',
      gcId: '',
      secondGcId: '',
      thirdGcId:'',
      brandId: '',
      goodsSpec: '',
      arrivalCycle:'',
      brandName:'',
    }
  },
  //effects   接收数据
  effects: {
    * goodsListEFF({val}, {put, call, select}) {
      const goodsList = yield select(state => state.goodsList);
      const data = yield call(goodsListApi, {...goodsList.shopListObj, ...val})
      if (data.result == 1) {
        yield put({type: 'load', preload: data, shopListObj: {...goodsList.shopListObj, ...val}});
      } else {
        message.error(data.msg, 1.5, () => {
        });
      }
    },
    * goodsfilterEFF({val}, {put, call, select}) {
      const goodsList = yield select(state => state.goodsList);
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
    * addCartEFF({goodsId, goodsPrice, count,saveType,}, {put, call}) {
      const data = yield call(addCartApi, goodsId, goodsPrice, count,saveType);
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


    *addGoodsFavoritesEFF({ goodsId },{ put, call }){
      const data=yield call( addGoodsFavoritesAPI, goodsId );
      if(data.result==1) {
       yield put({type: 'updateCollection', goodsId: goodsId})
        message.success( data.msg, 1.5 );
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *deleteGoodsFavoritesEFF({ goodsId },{put,call}){
     const data=yield call( deleteGoodsFavorites, goodsId );
     if(data.result==1) {
      yield put({type: 'updateCollection', goodsId: goodsId})
      message.success( data.msg, 1.5 );
     }else{
      message.error(data.msg,1.5,()=>{});
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
    *addInquiryEFF({  val },{ put, call }){
     const data=yield call( addInquiry, val  );
    // console.log(data)
     if(data.result==1) {
        message.success( data.msg, 1.5 );
     }else{
       message.error(data.msg,1.5,()=>{});
     }
    },
  },

  //subscriptions 监听数据
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname.startsWith('/home/PeoductSearch')) {
          let Search = pathToRegexp('/home/PeoductSearch/:searchType/*').exec(pathname);
          if (Search) {
            let values = {
              pageSize: '10',
              pageNo: '1'
            }
           dispatch({type:'app/getNavSideEFF',val: {parentId:'2'}})
           dispatch({type: 'clearShopListObj'})
           dispatch({type: 'clearFilterObj'})
            if (decodeURI(Search[1]) == 'BrandIdSearch') {
              dispatch({type: 'goodsfilterEFF', val: { brandId: decodeURI(Search[2])}});
              dispatch({type: 'goodsListEFF', val: {...values,  brandId: decodeURI(Search[2])}});
            } else if (decodeURI(Search[1]) == 'gcIdSearch') {
              dispatch({type: 'goodsfilterEFF', val: { gcId: decodeURI(Search[2])}});
              dispatch({type: 'goodsListEFF', val: {...values,  gcId: decodeURI(Search[2])}});
            } else if (decodeURI(Search[1]) == 'keywordSearch') {
              dispatch({type: 'goodsfilterEFF', val: { keyword: decodeURI(Search[2])}});
              dispatch({type: 'goodsListEFF', val: {...values, keyword: decodeURI(Search[2])}});
            }
          }
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
   clearShopListObj(state) {
     return {
      ...state,
      shopListObj: {
        keyword: '',//（搜索关键词）
        storeId: '',//（店铺ID）
        brandId: '',//（品牌ID）
        brandName:'',
        secondGcId:'',
        thirdGcId:'',
        gcId: '',//（商品分类ID）
        goodsSpec: '',//（规格型号ID）
        arrivalCycle: '',//（到货周期）
        sortField: '',//（排序字段）
        sortOrder: '',//（排序规则 asc 升序 desc 降序）
        maximumPrice: '',//（最大价格）
        minimumPrice: '',//（最小价格）
        pageSize: '10',//（分页条数）
        pageNo: '1',//（页码）
        activityId:'',//(优惠券ID，满减ID等)
      },
     }
   },
   clearFilterObj(state) {
    return {
     ...state,
     filter:{
      keyword:'',
       // storeId: '',
       gcId: '',
       thirdGcId:'',
       secondGcId: '',
       brandId: '',
       goodsSpec: '',
       arrivalCycle:'',
       brandName:'',
       thirdGcId:'',
       // activityId: '',
     },
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
