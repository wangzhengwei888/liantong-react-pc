
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { GetGoodsDetail,GetGoodsRecommed,GetGoodsRecommedApi,applyChannelApi, addCartAPI, priceFeedbackAPI,addGoodsFavoritesAPI ,addCart,addInquiry,coaListApi,csdsListApi,printCoaPDF,goodsListSearchApi} from './goodsDetailApi';
import pathToRegexp from 'path-to-regexp';
import {deleteGoodsFavorites} from '../personOrder/FavListApi';
//import {addCart} from "../personOrder/FavListApi";

export default {
  namespace:'goodsDetail',
  state:{
    data:[],
    isInfo:false,
    goodRecommedData:[],
    coaListData:[],
    csdsListData:[],
    printCoaPDFData:[],
    data:[],
   defaultImg:""
  },
  effects:{
    *GetGoodsDetail({ goodsId },{ put, call }){
        const data=yield call( GetGoodsDetail, goodsId);
        //console.log(data);
        if(data.result==1) {
          yield put({type: 'good', preload: data});
        }else{
          message.error(data.msg,1.5,()=>{});
        }
    },
    *GetGoodsRecommed({ goodsId },{ put, call }){
      //console.log(goodsId);
      const data=yield call( GetGoodsRecommedApi, goodsId);
      //console.log(data);
      if(data.result==1) {
        yield put({type: 'goodRecommed', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    //相关产品排序
    *GetGoodsRecommedEEF({ val },{ put, call }){
      //console.log(goodsId);
      const data=yield call( GetGoodsRecommed, val);
      //console.log(data);
      if(data.result==1) {
        yield put({type: 'goodRecommed', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

   //相关商品页加入购物车
   *addCart({ val },{ put, call }){
    //console.log(val)
    const data=yield call( addCart, val );
    if(data.result==1) {
     message.success( data.msg, 1.5 );
     yield put({type: 'app/cartCount', preload: data});
    }else{
     message.error(data.msg,1.5,()=>{});
    }
   },

    *applyChannelEFF({ goodsId, remark },{ put, call }){
      const data=yield call( applyChannelApi, goodsId, remark );
      // console.log(data);
      if(data.result==1) {
        message.success( data.msg, 1.5 );
      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },

    *addCartEFF({ goodsId,count,saveType,goodsPrice },{ put, call }){
      const data=yield call( addCartAPI, goodsId,count,saveType,goodsPrice );
       //console.log(data);
      if(data.result==1) {
        //this.props.dispatch({type:'app/getcartCountEFF'});
       // this.props.dispatch(routerRedux.push('/cart'));
        message.success( data.msg, 1.5 );
       yield put({ type:'app/getcartCountEFF' });
       yield put(routerRedux.push('/cart'));

       //console.log(ret);

      }else{
        message.error(data.msg,1.5,()=>{});
      }
    },
    *priceFeedbackEFF({ pOBJ },{ put, call }){
      const data=yield call( priceFeedbackAPI, pOBJ );
      //console.log(data);
      if(data.result==1) {
        message.success( data.msg, 1.5 );
      }else{
        message.error(data.msg,1.5,()=>{});
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
      console.log(goodsId)
      const data=yield call( deleteGoodsFavorites, goodsId );
      if(data.result==1) {
       yield put({type: 'updateCollection', goodsId: goodsId})
       message.success( data.msg, 1.5 );
      }else{
       message.error(data.msg,1.5,()=>{});
      }
     },
   /*OOA报告查询（产品检验报告）coaListApi,csdsListApi*/
    *coaListEEF({ val },{ put, call }){
        const data=yield call( coaListApi, val);
        if(data.result==1) {
          yield put({type: 'coaList', preload: data});
        }else{
          message.error(data.msg,1.5,()=>{});
        }
     },
     /*MSDS(化学品安全说明书)*/
     *csdsListEEF({ val },{ put, call }){
        const data=yield call( csdsListApi, val);
        if(data.result==1) {
          yield put({type: 'csdsList', preload: data});
        }else{
          message.error(data.msg,1.5,()=>{});
        }
    },
    *goodsListSearchEEF({ val },{ put, call }){
      const data=yield call( goodsListSearchApi, val);
      if(data.result==1) {
        yield put({type: 'goodsListSearch', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
  },





  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/goodsDetail/:id').exec(pathname);
        const abc = pathToRegexp('/goodsDetail/relevantGoods/:id').exec(pathname);
        const cms = pathToRegexp('/goodsDetail/goodsCMSPrint/:id').exec(pathname);
       // console.log(match);

        if (match && match[0].startsWith('/goodsDetail')) {
          // console.log(match);
          dispatch({type:'app/getNavSideEFF',val: {parentId:'2'}})
          dispatch({ type: 'GetGoodsDetail',goodsId:match[1]});
          dispatch({ type: 'GetGoodsRecommed',goodsId:match[1]});
        }
        //cms打印填表
        if(pathname.indexOf('/goodsDetail/goodsCMSPrint/') >= 0){
             dispatch({ type: 'GetGoodsDetail',goodsId:cms[1]});
        }

       //导航跳转
          // let Search = pathToRegexp('/home/PeoductSearch/:searchType/*').exec(pathname);
        let  gcSearch= pathToRegexp('/goodsDetail/relevantGoods/:searchType/*').exec(pathname);
        // console.log(gcSearch)
        if(gcSearch){
            if (decodeURI(gcSearch[1]) == 'gcFirstIdSearch') {
              console.log('1111')
              dispatch({type:'app/getNavSideEFF',val: {parentId:'2'}})
              dispatch({type: 'goodsListSearchEEF', val: { searchType: decodeURI(gcSearch[1]),keyword:decodeURI(gcSearch[2])  }});
            }else if(decodeURI(gcSearch[1]) == 'gcSecondIdSearch'){
              console.log('2222')
              dispatch({type:'app/getNavSideEFF',val: {parentId:'2'}})
              dispatch({type: 'goodsListSearchEEF', val: { searchType: decodeURI(gcSearch[1]),keyword:decodeURI(gcSearch[2])  }});
            }else if(decodeURI(gcSearch[1]) == 'gcIdSearch'){
              console.log('3333')
              dispatch({type:'app/getNavSideEFF',val: {parentId:'2'}})
              dispatch({type: 'goodsListSearchEEF', val: { searchType: decodeURI(gcSearch[1]),keyword:decodeURI(gcSearch[2])  }});
            }else if((decodeURI(gcSearch[1]) == 'releventSearch')){
              dispatch({type:'app/getNavSideEFF',val: {parentId:'2'}})
              dispatch({ type: 'GetGoodsRecommed',goodsId:decodeURI(gcSearch[2])});
            }


        }

        if (pathname.startsWith('/goodsDetail/relevantGoods/jumpStyle/gcFirstIdSearch')){
          let val =query
          console.log(val)
        }

        let val =query
        if (pathname.startsWith('/home/goodsPrintList')){
          console.log(val)

         //   let Search = pathToRegexp('/home/goodsPrintList/*').exec(pathname);
            dispatch({type: 'coaListEEF', val:val});
        }
        if (pathname.startsWith('/home/goodsPrintListMSDS')){
          console.log(val)
         dispatch({type: 'csdsListEEF', val:val});
        }


      });
    },
  },

  reducers:{
    good (state,{ preload } ){
      const { data=[] }=preload;
      let newData = [].concat(data);
     let defaultImg = newData[0].goodsCallyList.length > 1 ? newData[0].goodsCallyList.pop() : newData[0].goodsCallyList[1];
      return {
        ...state,
        data:newData,
        isInfo:true,
        defaultImg:defaultImg
      }
    },
    //去掉没有图片的链接
   hideImg(state,{img}){
     let imgList = state.data[0].goodsCallyList;
     let newImgLIst = imgList.filter((list,i)=>{
      return list != img
     })
    if(newImgLIst.length <= 0){
     newImgLIst.push(state.defaultImg)
    }
    let newData = [].concat(state.data)
    newData[0].goodsCallyList = newImgLIst
     return {
      ...state,
      data:newData
     }
   },
    coaList (state,{ preload } ){
      const { data }=preload;
      // console.log(data)
      return {
        ...state,
        coaListData:data,
      }
    },
    csdsList (state,{ preload } ){
      const { data }=preload;
      return {
        ...state,
        csdsListData:data,

      }
    },

   //导航跳转
   goodsListSearch (state,{ preload } ){
    const { data }=preload;
    return {
      ...state,
      goodRecommedData:data,

    }
  },

    goodRecommed (state,{ preload } ){
      const { data=[] }=preload;
      return {
        ...state,
        goodRecommedData:data,
        isInfo:true
      }
    },
    updateCollection(state, {goodsId}) {
      let listApiGoods = state.goodRecommedData[0].listApiGoods;
      // console.log(listApiGoods)
     listApiGoods.map((item) =>{
      if(item.goodsId == goodsId.goodsId) {
       if(item.isFavorite == 1) {
        item.isFavorite = 0
       }else {
        item.isFavorite = 1
       }
      }
      return listApiGoods;
     })
    //  console.log(listApiGoods)
     return {
      ...state,
      data:listApiGoods,

     }

    }



  }
}
