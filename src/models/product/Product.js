import { message } from 'antd'
import pathToRegexp from 'path-to-regexp'
import { accurateSearchAPI, getpinchecklistAPI, getRecommendAPI, getNewProductsAPI, getPromotionsAPI, getEnrollmentAPI
  ,getGoodsListExactAPI
} from './api'

export default {
  namespace: 'product',
  state: {
    data: [{
      list:[
        {imgUrl:'/upload/img/store/0/1504690555153.jpg',goodsName:'商品名称',goodsProfile:'简介',goodsId:'123',clearing:1,activityName:'活动名称',activityContent:'活动内容',activityId:'1'},//clearing：0促销，1清仓
        {imgUrl:'/upload/img/store/0/1504690555153.jpg',goodsName:'商品名称',goodsProfile:'简介',goodsId:'123',clearing:0,activityName:'活动名称',activityContent:'活动内容',activityId:'1'},
        {imgUrl:'/upload/img/store/0/1504690555153.jpg',goodsName:'商品名称',goodsProfile:'简介',goodsId:'123',clearing:1,activityName:'活动名称',activityContent:'活动内容',activityId:'1'}
      ],
      headImg: {url: '/upload/img/lmadv/1508217294561.png', id:21234}
    }],
    pageinfo:{title:'',classname:'',sel:0},//sel:当前的页面，产品推荐1，促销清仓2，活动报名3
    pinyin:[
          { linkUrl:'',goodsName:'卡费'},
          { linkUrl:'',goodsName:'醇'},
          { linkUrl:'',goodsName:'酸'},
          { linkUrl:'',goodsName:'酯'},
          { linkUrl:'',goodsName:'酮'},
          { linkUrl:'',goodsName:'胺'},
          { linkUrl:'',goodsName:'油'},
          { linkUrl:'',goodsName:'烷'},
          { linkUrl:'',goodsName:'烯'},
          { linkUrl:'',goodsName:'醚'},
          { linkUrl:'',goodsName:'酚'},
          { linkUrl:'',goodsName:'醛'},
          { linkUrl:'',goodsName:'苯'},
          { linkUrl:'',goodsName:'醌'},
          { linkUrl:'',goodsName:'萘'},
          { linkUrl:'',goodsName:'脲'},
          { linkUrl:'',goodsName:'肼'},
          { linkUrl:'',goodsName:'酚'},
          { linkUrl:'',goodsName:'胍'},
          { linkUrl:'',goodsName:'唑'},
          { linkUrl:'',goodsName:'酐'},
          { linkUrl:'',goodsName:'酰'},
          { linkUrl:'',goodsName:'温'},
          { linkUrl:'',goodsName:'蜡'},
          { linkUrl:'',goodsName:'脂'},
          { linkUrl:'',goodsName:'呋喃'},
          { linkUrl:'',goodsName:'素'},
          { linkUrl:'',goodsName:'砜'},
          { linkUrl:'',goodsName:'腈'},
          { linkUrl:'',goodsName:'啶'},
          { linkUrl:'',goodsName:'糖'},
          { linkUrl:'',goodsName:'啉'},
          { linkUrl:'',goodsName:'钠'},
          { linkUrl:'',goodsName:'钾'},
          { linkUrl:'',goodsName:'钙'},
          { linkUrl:'',goodsName:'锰'},
          { linkUrl:'',goodsName:'镁'},
          { linkUrl:'',goodsName:'铜'},
          { linkUrl:'',goodsName:'钴'},
          { linkUrl:'',goodsName:'镍'},
          { linkUrl:'',goodsName:'钛'},
          { linkUrl:'',goodsName:'锂'},
          { linkUrl:'',goodsName:'铝'},
          { linkUrl:'',goodsName:'铅'},
          { linkUrl:'',goodsName:'铁'},
          { linkUrl:'',goodsName:'铬'},
          { linkUrl:'',goodsName:'钼'},
          { linkUrl:'',goodsName:'铋'},
          { linkUrl:'',goodsName:'锶'},
          { linkUrl:'',goodsName:'钡'},
          { linkUrl:'',goodsName:'锌'},

          { linkUrl:'',goodsName:'汞'},
          { linkUrl:'',goodsName:'铵'},
          { linkUrl:'',goodsName:'镉'},
          { linkUrl:'',goodsName:'钒'},

          { linkUrl:'',goodsName:'铌'},
          { linkUrl:'',goodsName:'钨'},
          { linkUrl:'',goodsName:'锡'},
          { linkUrl:'',goodsName:'胶'},

          { linkUrl:'',goodsName:'氯'},
          { linkUrl:'',goodsName:'土'},
          { linkUrl:'',goodsName:'水'},
          { linkUrl:'',goodsName:'石'},

          { linkUrl:'',goodsName:'磷'},
          { linkUrl:'',goodsName:'盐'},
          { linkUrl:'',goodsName:'肟'},
          { linkUrl:'',goodsName:'苄'},

          { linkUrl:'',goodsName:'碘'},
          { linkUrl:'',goodsName:'碱'},
          { linkUrl:'',goodsName:'硅'},
          { linkUrl:'',goodsName:'苷'},

          { linkUrl:'',goodsName:'试纸'},
          { linkUrl:'',goodsName:'碳'},
          { linkUrl:'',goodsName:'锗'},
          { linkUrl:'',goodsName:'镓'},

          { linkUrl:'',goodsName:'筛'},
          { linkUrl:'',goodsName:'芴'},
          { linkUrl:'',goodsName:'蒽'},
          { linkUrl:'',goodsName:'苊'},

          { linkUrl:'',goodsName:'林'},
          { linkUrl:'',goodsName:'环'},
          { linkUrl:'',goodsName:'环'},
          { linkUrl:'',goodsName:'砷'},

          { linkUrl:'',goodsName:'精'},
          { linkUrl:'',goodsName:'吲哚'},
          { linkUrl:'',goodsName:'噻吩'},
          { linkUrl:'',goodsName:'钽'},

          { linkUrl:'',goodsName:'炔'},
          { linkUrl:'',goodsName:'吡咯'},
          { linkUrl:'',goodsName:'膦'},
          { linkUrl:'',goodsName:'铍'},

          { linkUrl:'',goodsName:'硫'},
          { linkUrl:'',goodsName:'铊'},
          { linkUrl:'',goodsName:'溴'},
          { linkUrl:'',goodsName:'镝'},

          { linkUrl:'',goodsName:'硒'},
          { linkUrl:'',goodsName:'宁'}
    ],

    getGoodsListExactData:[],

  },
  effects: {
    // 提交搜索结果
    *accurateSearchEFF({payload},{put, call}){
      const data=yield call( accurateSearchAPI, payload)
      if(data.result==1) {
        yield put({type: '', res: data})
        window.location.href=''
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    // 获得拼音列表
    *getpinchecklistEFF({}, {put, call}){
      const data = yield call ( getpinchecklistAPI )
      if(data.result==1) {
        yield put({type: 'setpinyin', pinyin: data})
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    //获得产品推荐
    *getRecommendEFF({}, {put, call}){
      const data = yield call ( getRecommendAPI, {commType:'recommend',keyword:'',pageSize:10,pageNo:1} )
     console.log(data)
      // if(data.result==1) {
      //   yield put({type: 'setData', data})
      // }else{
      //   message.error(data.msg,1.5, ()=>{})
      // }
    },
    // 新品上市
    *getNewProductsEFF({}, {put, call}){
      const data = yield call ( getNewProductsAPI )
      if(data.result==1){
        yield put({type: 'setData', data})
      }else{
        message.error(data.msg,1.5, ()=>{})
      }
    },
    // 促销清仓
    *getPromotionsEFF({}, {put, call}){
      const data = yield call ( getPromotionsAPI )
      if(data.result==1){
        yield put({type: 'setData', data})
      }else{
        message.error(data.msg,1.5, ()=>{})
      }
    },
    // 活动报名
    *getEnrollmentEFF({page}, {put, call}){
      const data = yield call ( getEnrollmentAPI, {page} )
      // if(data.result==1){
      //   yield put({type: 'setData', data})
      // }else{
      //   message.error(data.msg,1.5, ()=>{})
      // }
    },

    *getGoodsListExactEFF({ val },{ put, call }){
      const data=yield call( getGoodsListExactAPI, val);
      if(data.result==1) {
        yield put({type: 'getGoodsListExact', preload: data});
      }else{
        message.error(data.msg,1.5,()=>{});
      }
     },





  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if(pathname.startsWith('/product')){
          let urlval=query;
          urlval.parentId=2;
         // console.log(urlval)
         dispatch({type:'app/getNavSideEFF',val: urlval})
       //  dispatch({ type: 'app/getArticleContentEFF',val: urlval});
        }

        if(pathname==='/product'){
          // dispatch({ type: 'getpinchecklistEFF'})
        }else if(pathname==='/product/recommend'){
          dispatch({ type: 'editPageInfo',pageinfo:{title:'产品推荐',classname:'recommend_title',sel:1}})
          // dispatch({ type: 'getRecommendEFF' })
        }else if(pathname==='/product/new'){
          dispatch({ type: 'editPageInfo',pageinfo:{title:'新品上市',classname:'product_new_title',sel:0}})
          // dispatch({ type: 'getNewProductsEFF'})
        }else if(pathname==='/product/promotions'){
          dispatch({ type: 'editPageInfo',pageinfo:{title:'促销清仓',classname:'promotions_title',sel:2}})
          // dispatch({type: 'getPromotionsEFF'})
        }else if(pathname==='/product/enrollment'){
          dispatch({ type: 'editPageInfo',pageinfo:{title:'活动报名',classname:'activity_title',sel:3}})
          // dispatch({type: 'getEnrollmentEFF', page:{pageSize:10, pageNo:1}})
        }else if(pathname==='/product/importagent'){
          dispatch({ type: 'editPageInfo',pageinfo:{title:'进口服务',classname:'new_list',sel:4}})
          // dispatch({type: 'getEnrollmentEFF', page:{pageSize:10, pageNo:1}})
        }else if(pathname==='/product/quickorderdescription'){
          dispatch({ type: 'editPageInfo',pageinfo:{title:'快速说明',classname:'new_list',sel:4}})
          // dispatch({type: 'getEnrollmentEFF', page:{pageSize:10, pageNo:1}})
        }
        else if(pathname==='/product/productsort'){
          dispatch({ type: 'editPageInfo',pageinfo:{title:'全部分类',classname:'new_list',sel:4}})
          // dispatch({type: 'getEnrollmentEFF', page:{pageSize:10, pageNo:1}})
        }
      })
    }
  },

  reducers: {
    load (state,{ preload }){
      const { data }=preload;
      return {
        ...state,
        getGoodsListExactData:data
      }
    },

    editPageInfo(state,{ pageinfo }){
      return {
        ...state,
        pageinfo
      }
    },
    setpinyin(state, {pinyin}){
      return {
        ...state,
        pinyin
      }
    },
    setData(state, {data}){
      return {
        ...state,
        data
      }
    }
  }
}
