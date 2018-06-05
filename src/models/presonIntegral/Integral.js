import { message } from 'antd'
import { delGiftCarAPI, getgiftCartAPI, addCartAPI, placeGiftOrderAPI } from './IntegralApi'

export default {
  namespace: 'integral',
  state: {
    account:[{
      doIntegral:6000
    }],
    giftCart: [{
      goods: [{
        goodsId:'3284898',
        giftInfo: {title:'金士顿储存卡',url:'/upload/img/store/0/1504690574139.jpg',introduce:'金士顿储存卡金士顿储存卡金士顿储存卡'},
        integral: 100,
        num: 10,
        subtotal: 1000
      },{
        goodsId:'950829',
        giftInfo: {title:'金士顿储存卡',url:'/upload/img/store/0/1504690574139.jpg',introduce:'金士顿储存卡金士顿储存卡金士顿储存卡'},
        integral: 100,
        num: 6,
        subtotal: 600
      }],
      total:1600
    }],
    integralMall:[]
  },
  effects: {
    //删除礼品购物车商品
    *delGiftCarEFF({goodsId, index}, {call, put}){
      const data = yield call( delGiftCarAPI, {goodsId} )
      if(data.result==1) {
        yield put({ type: 'delGiftCar', index })
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    //获得礼品购物车商品
    *getgiftCartEFF({}, {call, put}){
      const data = yield call( getgiftCartAPI )
      if(data.result==1) {
        yield put({ type: 'getgiftCart' })
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    //添加到购物车
    *addCartEFF({id}, {call, put}){
      const data = yield call( addCartAPI, {id} )
      if(data.result==1) {
        window.location.href = '/integral/giftShoppingCart'
      }else{
        message.error(data.msg,1.5,()=>{})
      }
    },
    // 提交礼品订单
    *placeGiftOrderEFF({data}, {call, put}){
      console.log(data)
      const res = yield call( placeGiftOrderAPI, {data} )
      // if(res.result==1) {
      //   window.location.href = ''
      // }else{
      //   message.error(res.msg,1.5,()=>{})
      // }
    },
    // 删除收货信息
    *delReceiptInfoEFF({id}, {call, put}){
      console.log({id})
    }
  },
  subscriptions: {
    setup({ dispatch, history }){
      return history.listen(({ pathname, query }) =>{
        if(pathname == '/personIntegral/giftShoppingCart'){
          // dispatch({ type: 'getgiftCartEFF' })
        }else if(pathname == '/personIntegral/mall'){
          setTimeout(()=>dispatch({ type: 'getIntegralMall'}),1000)
        }
      })
    }
  },
  reducers: {
    delGiftCar(state, {index}){
      let Frontgoods = state.giftCart[0].goods.slice(0,index)
      let Aftergoods = state.giftCart[0].goods.slice(index+1,state.giftCart[0].goods.length+1)
      let newgoods = Frontgoods.concat(Aftergoods)
      let newtotal = state.giftCart[0].total-state.giftCart[0].goods[index].subtotal
      return {
        ...state,
        giftCart:[{goods:newgoods, total:newtotal}]
      }
    },
    change(state, {giftCart,subtract}){
      return {
        ...state,
        giftCart:[{goods:[...giftCart], total:state.giftCart[0].total+subtract}]
      }
    },
    getIntegralMall(state, {integralMall}){
      return {
        ...state,
        integralMall:[{
          filterList:[
            {filterName:'积分',condition:['1-9999','10000-49999','50000-599999','1000000以上'],id:'1432'},
            {filterName:'分类',condition:['限时优惠','SCRC定制'],id:'1352'},
            {filterName:'品牌',condition:['SONY','富士','金士顿','希捷','SONY','富士','金士顿','希捷','SONY','富士','金士顿','希捷'],id:'1652'}
          ],
          goodsList:[
            {title:'化学实验室安全管理',img:'/upload/img/store/0/1504690574139.jpg',integral:100,goodsId:'434565'},
            {title:'化学实验室安全管理',img:'/upload/img/store/0/1504690574139.jpg',integral:200,goodsId:'564351'},
            {title:'化学实验室安全管理',img:'/upload/img/store/0/1504690574139.jpg',integral:230,goodsId:'424535'},
            {title:'化学实验室安全管理',img:'/upload/img/store/0/1504690574139.jpg',integral:300,goodsId:'654656'},
            {title:'化学实验室安全管理',img:'/upload/img/store/0/1504690574139.jpg',integral:360,goodsId:'765776'}
          ],
          goodsTotal:5
        }]
      }
    }
  }
}
