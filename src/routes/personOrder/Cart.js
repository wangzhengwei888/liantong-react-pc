import React, {Component} from 'react'
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import {
 Breadcrumb,
 Checkbox,
 Row,
 Col,
 Pagination,
 Input,
 Button,
 Form,
 Menu,
 Dropdown,
 Icon,
 message,
 Modal
} from 'antd'
import {routerRedux} from 'dva/router';
import {Link} from 'dva/router'
import {connect} from 'dva'
import {cart} from './Cart.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import Stepper from '../../components/Stepper/Stepper';
import ActivitySelect from './components/activitySelect';
// import CartList from './components/CartList';
import LoginBtn from '../../components/loginBtn/loginBtn'
import {isLogin} from '../../utils/request'
import {getFullUrl} from '../../utils/common';
import {printCartPDF} from './api';
import { IMAGE_DOMAIN } from '../../utils/common';

const FormItem = Form.Item;

class Cart extends Component {
 constructor(props) {
  super(props);
  this.state = {
   moveToTop: false,
   cartId:[],
   activityIds:[,],
   menu: '默认',
  }
  this.isLogin = isLogin();
 }

 handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
   if (!err) {
    console.log('Received values of form: ', values);
   }
  });
 }
 onCheckAllChange = (e) => {
  this.props.dispatch({type: 'cart/checkAllEFF', payload: e.target.checked});
 }


 //更新购物车数量
 updateCart = (store, checkedGoods, num) => {
  let value = {
   cartId: checkedGoods.cartId,
   count: num
  }
  let val = {
   checkedStore: store,
   checkedGoods,
   checked: true,
   num: num
  }
  this.props.dispatch({type: 'cart/updateCartCountEFF', payload: value, checkGoods: val})

 }


//收藏商品
 addGoodsFavorites = (goodsId) => {
  //   console.log('收藏'+goodsId)
  if (this.isLogin) {
   this.props.dispatch({type: 'cart/addGoodsFavoritesEFF', goodsId: {goodsId: goodsId}})
  } else {
   message.warning('请登录', 1.5, () => {
   })
  }
 }


 //取消收藏
 deleteGoodsFavorites = (goodsId) => {
  //console.log('删除收藏'+goodsId)
  if (this.isLogin) {
   Modal.confirm({
    title: '确定要取消收藏吗？',
    content: '',
    onOk: () => {
     this.props.dispatch({type: 'cart/deleteGoodsFavoritesEFF', goodsId: {goodsId: goodsId}});
    },
    onCancel() {

    },
   })
  } else {
   message.warning('请登录', 1.5, () => {
   })
  }
 }


// 选中商品
 onChange = (store, goods, e) => {
  let value = {
   checkedStore: store,
   checkedGoods: goods,
   checked: e.target.checked
  }
  this.props.dispatch({type: 'cart/checkGoodsEFF', payload: value})
 }

 //删除选中的商品
 delSelGoods = () => {
  let cartId = [];
  this.props.cart.data.forEach(shop => {
   shop.cartVoList.forEach(act => {
    act.cartList.forEach((goods)=>{
     if (goods.checked) {
      cartId.push(goods.cartId);
     }
    })
   })
  })
  if (cartId.length == 0) {
   message.info('请先选择商品', 1)
   return;
  }
  Modal.confirm({
   title: '提示',
   content: '确定删除吗',
   okText: '确定',
   cancelText: '取消',
   onOk: () => {
    let value = {
     cartId: cartId.join(',')
    }
    this.props.dispatch({type: 'cart/deleteCart', payload: value});
   },
   maskClosable: true
  });

 }
 delGoods = (cartId) => {
  const value = {
   cartId: cartId
  }
  console.log(value)
  Modal.confirm({
   title: '您确定要删除吗?',
   content: '',
   onOk: () => {
    console.log('OK');
    console.log(value)
    this.props.dispatch({type: 'cart/deleteCart', payload: value});
   },
   onCancel() {
    console.log('取消');
   },
  });
 }
 goBuy = () => {
  let cartId = [];
  let activityIds = [];
  this.props.cart.data.forEach(shop => {
   shop.cartVoList.forEach(act => {
    act.cartList.forEach((goods)=>{
     if (goods.checked && goods.newGoodsPrice > 0) {
      cartId.push(goods.cartId);
     }
    })
    if(act.actItemId != undefined){
     activityIds.push(act.actItemId)
    }
   })
  })

  if (cartId.length == 0) {
   message.error('请先选择商品', 1)
   return;
  }
  this.props.dispatch(routerRedux.push(`/personOrder/subOrder/${cartId.join(',')}/${activityIds.join(',') == '' ? ',': activityIds.join(',')}`))
 }
 goDetail = (goodsId) => {
  this.props.dispatch(routerRedux.push(`/goodsDetail/${goodsId}`))
 }
 getScroollHieght = () => {
  let winH = document.documentElement.clientHeight || document.body.clientHeight;
  let dataTableH = this.refs.cartListTab && this.refs.cartListTab.offsetHeight
  let ElescrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  // console.log("表格高度" + dataTableH)
  // console.log("可视区域高度" + winH)
  // console.log(ElescrollTop)
  if (dataTableH > winH && ElescrollTop > 485) {
   this.setState({
    moveToTop: true
   })
  } else {
   this.setState({
    moveToTop: false
   })
  }
 }
 componentDidMount = () => {
  document.addEventListener("scroll", this.getScroollHieght, false);
 }
 componentWillUnmount = () => {
  document.removeEventListener("scroll", this.getScroollHieght, false)
 }

 handleMenuClick = (e) => {
  if (e.key == 1) {
   this.props.dispatch({type: 'cart/getCartList', payload: {orderBy: 0}});
  } else if (e.key == 2) {
   this.props.dispatch({type: 'cart/getCartList', payload: {orderBy: 1}});
  }
  this.setState({menu: e.item.props.children})
 }
//打印pdf 函数onPrint

 onPrint = (e) => {
  let cartId = [];
  // console.log(this.props.cart.data)
  this.props.cart.data.forEach(shop => {
   shop.cartVoList.forEach((act,i)=>{
    act.cartList.forEach(goods => {
     if (goods.checked) {
      cartId.push(goods.cartId);
     }
    })
   })
  })

  if (cartId.length == 0) {
    message.info('请先选择商品', 1)
    e.preventDefault();
    return;
   }
   const value={
    cartId:cartId.join(',')
  }
   console.log(value)
   let path=window.open('about:blank');
   printCartPDF(value).then(r => {
     if (r.result == 1) {
        console.log(r.url)

        let url=`${IMAGE_DOMAIN}${r.url}`;
        console.log(url)
      //  path.location.href='http://www.baidu.com'
      path.location.href=url
        console.log(url);

     } else {
      message.error(r.msg, 1.5);
     }
    })

 }

 // 添加活动id
 addItemId = (id) => {
  // this.setState({
  //  activityIds:id
  // })
  // console.log(this.state.activityIds)
  this.props.dispatch({type: 'cart/addIdEFF', payload: {id}});
 }


 CartList = (data, index, init) => {
  // console.log(data);
  // console.log(data.list[0].newGoodsPrice);
  //console.log(goods.newGoodsPrice,goods.GoodsPrice);

   //groupType 活动类型（10 打折促销 20 促销活动 30 无活动商品)
   //activityType  分组类型（满减10 套餐20 限时抢购60 清仓70）

  return <div key={index} ref="cartListTab">
   {data.cartVoList.map((act, ind) => {
    if (act.groupType == '10' && act.cartList.length > 0 ) {
     return (
      <div key={ind}>
       {/*<ActivitySelect  addItemId={this.addItemId} data={act}/>*/}
       <div className='act_head'>促销活动商品</div>
       {act.cartList.map((goods, i) => {
        let status_deleted = goods.orderStatus == 1
        return (
         <div key={i}>
          <table className="border_bottom">
           <tbody className={goods.goodsState == 0 || !goods.newGoodsPrice || goods.newGoodsPrice <=0 ? 'overdue' : ''}>
           <tr>
            <td style={{width: '2%'}}>{goods.newGoodsPrice && goods.newGoodsPrice > 0 ? <Checkbox onChange={(e) => this.onChange(data, goods, e)}
                                                                                                  checked={goods.checked}></Checkbox> : ""}</td>
            <td style={{width: '36%'}}>
             <div className="goods_div1">
              <Img style={{width: '105px', height: '105px', margin: '2px 16px', cursor: 'pointer'}}
                   src={goods.goodsImages} onClick={() => this.goDetail(goods.goodsId)}/>
              <div style={{margin: '18px 15px', textAlign: 'left', position: 'relative'}}>
               <p className='goods_name' onClick={() => this.goDetail(goods.goodsId)}>{goods.goodsName}</p>
               {(goods.brandName && goods.goodsSerial) ?
                <p>品牌/原厂货号：<span>{goods.brandName}/{goods.goodsSerial}</span></p> :
                (goods.brandName) ? <p>品牌：<span>{goods.brandName}</span></p> :
                 (goods.goodsSerial) ? <p>原厂货号：<span>{goods.goodsSerial}</span></p> : null
               }
               {(goods.goodsErpCode) ? <p>国药编码：{goods.goodsErpCode}</p> : null}
               {(goods.specName) ? <p>规格：{goods.specName}</p> : null}
               {(goods.goodsSpec) ? <p>包装：{goods.goodsSpec}</p> : null}
               {(goods.storageCondition && goods.shippingCondition) ?
                <p>储存/运输条件：<span>{goods.storageCondition}/{goods.shippingCondition}</span></p> :
                (goods.storageCondition) ? <p>储存条件：<span>{goods.storageCondition}</span></p> :
                 (goods.shippingCondition) ? <p>运输条件：<span>{goods.shippingCondition}</span></p> : null
               }
              </div>
             </div>
            </td>

            <td style={{width: '18%'}}>
             {goods.isReagent == '1' ?
              <div style={{padding: '0 10px', textAlign: 'left'}}>
               {(goods.casNo) ? <p>CAS号：{goods.casNo}</p> : null}
               {(goods.dangerousNature) ?
                <p>危险性质:<span dangerouslySetInnerHTML={{__html: goods.dangerousNature}}></span></p> : null}
               {(goods.controlInfo) ?
                <p>管制信息：<span style={{color: 'red'}} dangerouslySetInnerHTML={{__html: goods.controlInfo}}></span>
                </p> : null}
              </div>
              :
              goods.isReagent == '0' && goods.goodsDescription ?
               <p className='describe' style={{width:'190px'}}><span dangerouslySetInnerHTML={{__html: goods.goodsDescription.length > 60 ? goods.goodsDescription.substr(0,60) + "..." : goods.goodsDescription}}></span>
               </p> : null
             }
            </td>
            <td style={{width: '10%'}}>
             <p>￥{Number(goods.newGoodsPrice).toFixed(2)}</p>
            </td>
            <td style={{width: '12%'}}>
             <div>
              <Stepper isOnBlur={true} disabled={goods.goodsState == 0 || !goods.newGoodsPrice || goods.newGoodsPrice <=0 ? true : false}
                       nowNum={100000000000000} btnClassName='btnClass' inputClassName='inputClass'
                       num={goods.goodsNum} min={1}
                       step={1}
                       key={goods.goodsNum + init}
                       onUpdate={(val) => this.updateCart(data, goods, val)}/>
             </div>
            </td>
            <td style={{width: '8%', position: 'relative'}}>
             <a style={{color: 'red', fontWeight: 'bold'}}>￥{(goods.newGoodsPrice * goods.goodsNum).toFixed(2)}</a>
             <div className='price_up_down'>
              {
               goods.goodsPrice - goods.newGoodsPrice == 0 ? null
                : <p>{
                 goods.newGoodsPrice - goods.goodsPrice > 0 ?
                  <p style={{border: '1px solid #199ED8'}}>
                   价格上升：￥{(goods.newGoodsPrice - goods.goodsPrice * 1.00).toFixed(2)}</p>
                  :
                  <p style={{border: '1px solid #199ED8'}}>
                   价格下降：￥{(goods.goodsPrice - goods.newGoodsPrice * 1.00).toFixed(2)}</p>
                }</p>
              }
             </div>

            </td>
            <td style={{width: '14%'}}>
             {
              goods.goodsState == 1 && goods.newGoodsPrice > 0 ? <div>
                <Link className="icon-view-detail" title="查看详情" to={`/goodsDetail/${goods.goodsId}`}></Link>

                {
                 goods.isFavorite == 1 ? <a className='isguanzhu12'
                                            href='javascript:void(0)'
                                            onClick={() => this.deleteGoodsFavorites(goods.goodsId)}/> :
                  <a className='isguanzhu11'
                     href='javascript:void(0)'
                     onClick={() => this.addGoodsFavorites(goods.goodsId)}
                  />
                }
                {/*
            <Icon type="heart" className="icon-collection" onClick={() => this.addGoodsFavorites(goods.goodsId)}/>*/}
                <Icon type="delete" className="icon-delete" title="删除" onClick={() => this.delGoods(goods.cartId)}/>
               </div>
               :
               <div>
                <a style={{color: '#ccc', lineHeight: '28px'}}>已过期</a>
                <Icon type="delete" className="icon-delete" title="删除" onClick={() => this.delGoods(goods.cartId)}/>
               </div>
             }

            </td>
           </tr>
           </tbody>
          </table>
         </div>
        )
       })}
       {/*{data.list.length > 10 ? <p key={index} style={{borderBottom:'1px solid #e4e4e4',cursor:'pointer',fontSize:'14px'}} onClick={this.onChangeHide}>{this.state.onOff ? "点击查看更多 >>" :"点击折叠 >>"}</p> : null}*/}

      </div>
     )
    } else if (act.groupType == '20' && act.activity.activityType == '30' && act.cartList.length > 0 ) {
     // console.log(act);
     return (
      <div key={ind}>
       <ActivitySelect  addItemId={this.addItemId} data={act}/>
       {act.cartList.map((goods, i) => {
        let status_deleted = goods.orderStatus == 1
        return (
         <div key={i}>
          <table className="border_bottom">
           <tbody className={goods.goodsState == 0 || !goods.newGoodsPrice || goods.newGoodsPrice <=0 ? 'overdue' : ''}>
           <tr>
            <td style={{width: '2%'}}>{goods.newGoodsPrice && goods.newGoodsPrice > 0 ? <Checkbox onChange={(e) => this.onChange(data, goods, e)}
                                                                                                  checked={goods.checked}></Checkbox> : ""}</td>
            <td style={{width: '36%'}}>
             <div className="goods_div1">
              <Img style={{width: '105px', height: '105px', margin: '2px 16px', cursor: 'pointer'}}
                   src={goods.goodsImages} onClick={() => this.goDetail(goods.goodsId)}/>
              <div style={{margin: '18px 15px', textAlign: 'left', position: 'relative'}}>
               <p className='goods_name' onClick={() => this.goDetail(goods.goodsId)}>{goods.goodsName}</p>
               {(goods.brandName && goods.goodsSerial) ?
                <p>品牌/原厂货号：<span>{goods.brandName}/{goods.goodsSerial}</span></p> :
                (goods.brandName) ? <p>品牌：<span>{goods.brandName}</span></p> :
                 (goods.goodsSerial) ? <p>原厂货号：<span>{goods.goodsSerial}</span></p> : null
               }
               {(goods.goodsErpCode) ? <p>国药编码：{goods.goodsErpCode}</p> : null}
               {(goods.specName) ? <p>规格：{goods.specName}</p> : null}
               {(goods.goodsSpec) ? <p>包装：{goods.goodsSpec}</p> : null}
               {(goods.storageCondition && goods.shippingCondition) ?
                <p>储存/运输条件：<span>{goods.storageCondition}/{goods.shippingCondition}</span></p> :
                (goods.storageCondition) ? <p>储存条件：<span>{goods.storageCondition}</span></p> :
                 (goods.shippingCondition) ? <p>运输条件：<span>{goods.shippingCondition}</span></p> : null
               }
              </div>
             </div>
            </td>

            <td style={{width: '18%'}}>
             {goods.isReagent == '1' ?
              <div style={{padding: '0 10px', textAlign: 'left'}}>
               {(goods.casNo) ? <p>CAS号：{goods.casNo}</p> : null}
               {(goods.dangerousNature) ?
                <p>危险性质:<span dangerouslySetInnerHTML={{__html: goods.dangerousNature}}></span></p> : null}
               {(goods.controlInfo) ?
                <p>管制信息：<span style={{color: 'red'}} dangerouslySetInnerHTML={{__html: goods.controlInfo}}></span>
                </p> : null}
              </div>
              :
              goods.isReagent == '0' && goods.goodsDescription ?
               <p className='describe'style={{width:'190px'}}><span dangerouslySetInnerHTML={{__html: goods.goodsDescription.length > 60 ? goods.goodsDescription.substr(0,60) + "..." : goods.goodsDescription}}></span>
               </p> : null
             }
            </td>
            <td style={{width: '10%'}}>
             <p>￥{Number(goods.newGoodsPrice).toFixed(2)}</p>
            </td>
            <td style={{width: '12%'}}>
             <div>
              <Stepper isOnBlur={true} disabled={goods.goodsState == 0 || !goods.newGoodsPrice || goods.newGoodsPrice <=0 ? true : false}
                       nowNum={100000000000000} btnClassName='btnClass' inputClassName='inputClass'
                       num={goods.goodsNum} min={1}
                       step={1}
                       key={goods.goodsNum + init}
                       onUpdate={(val) => this.updateCart(data, goods, val)}/>
             </div>
            </td>
            <td style={{width: '8%', position: 'relative'}}>
             <a style={{color: 'red', fontWeight: 'bold'}}>￥{(goods.newGoodsPrice * goods.goodsNum).toFixed(2)}</a>
             <div className='price_up_down'>
              {
               goods.goodsPrice - goods.newGoodsPrice == 0 ? null
                : <div>{
                 goods.newGoodsPrice - goods.goodsPrice > 0 ?
                  <p style={{border: '1px solid #199ED8'}}>
                   价格上升：￥{(goods.newGoodsPrice - goods.goodsPrice * 1.00).toFixed(2)}</p>
                  :
                  <p style={{border: '1px solid #199ED8'}}>
                   价格下降：￥{(goods.goodsPrice - goods.newGoodsPrice * 1.00).toFixed(2)}</p>
                }</div>
              }
             </div>

            </td>
            <td style={{width: '14%'}}>
             {
              goods.goodsState == 1 && goods.newGoodsPrice > 0 ? <div>
                <Link className="icon-view-detail" title="查看详情" to={`/goodsDetail/${goods.goodsId}`}></Link>

                {
                 goods.isFavorite == 1 ? <a className='isguanzhu12'
                                            href='javascript:void(0)'
                                            onClick={() => this.deleteGoodsFavorites(goods.goodsId)}/> :
                  <a className='isguanzhu11'
                     href='javascript:void(0)'
                     onClick={() => this.addGoodsFavorites(goods.goodsId)}
                  />
                }
                {/*
            <Icon type="heart" className="icon-collection" onClick={() => this.addGoodsFavorites(goods.goodsId)}/>*/}
                <Icon type="delete" className="icon-delete" title="删除" onClick={() => this.delGoods(goods.cartId)}/>
               </div>
               :
               <div>
                <a style={{color: '#ccc', lineHeight: '28px'}}>已过期</a>
                <Icon type="delete" className="icon-delete" title="删除" onClick={() => this.delGoods(goods.cartId)}/>
               </div>
             }

            </td>
           </tr>
           </tbody>
          </table>
         </div>
        )
       })}
       {/*{data.list.length > 10 ? <p key={index} style={{borderBottom:'1px solid #e4e4e4',cursor:'pointer',fontSize:'14px'}} onClick={this.onChangeHide}>{this.state.onOff ? "点击查看更多 >>" :"点击折叠 >>"}</p> : null}*/}

      </div>
     )
    } else if (act.groupType == '20' && act.activity.activityType == '100' && act.cartList.length > 0 ) {
     // console.log(act);
     return (
      <div key={ind}>
       {/*<ActivitySelect  addItemId={this.addItemId} data={act}/>*/}
       <div className='act_head'>促销活动商品</div>
       {act.cartList.map((goods, i) => {
        let status_deleted = goods.orderStatus == 1
        return (
         <div key={i}>
          <table className="border_bottom">
           <tbody className={goods.goodsState == 0 || !goods.newGoodsPrice || goods.newGoodsPrice <=0 ? 'overdue' : ''}>
           <tr>
            <td style={{width: '2%'}}>{goods.newGoodsPrice && goods.newGoodsPrice > 0 ? <Checkbox onChange={(e) => this.onChange(data, goods, e)}
                                                                                                  checked={goods.checked}></Checkbox> : ""}</td>
            <td style={{width: '36%'}}>
             <div className="goods_div1">
              <Img src={goods.goodsImages} onClick={() => this.goDetail(goods.goodsId)}/>
              <div style={{margin: '18px 15px', textAlign: 'left', position: 'relative'}}>
               <p className='goods_name' onClick={() => this.goDetail(goods.goodsId)}>{goods.goodsName}</p>
               {(goods.brandName && goods.goodsSerial) ?
                <p>品牌/原厂货号：<span>{goods.brandName}/{goods.goodsSerial}</span></p> :
                (goods.brandName) ? <p>品牌：<span>{goods.brandName}</span></p> :
                 (goods.goodsSerial) ? <p>原厂货号：<span>{goods.goodsSerial}</span></p> : null
               }
               {(goods.goodsErpCode) ? <p>国药编码：{goods.goodsErpCode}</p> : null}
               {(goods.specName) ? <p>规格：{goods.specName}</p> : null}
               {(goods.goodsSpec) ? <p>包装：{goods.goodsSpec}</p> : null}
               {(goods.storageCondition && goods.shippingCondition) ?
                <p>储存/运输条件：<span>{goods.storageCondition}/{goods.shippingCondition}</span></p> :
                (goods.storageCondition) ? <p>储存条件：<span>{goods.storageCondition}</span></p> :
                 (goods.shippingCondition) ? <p>运输条件：<span>{goods.shippingCondition}</span></p> : null
               }
              </div>
             </div>
            </td>

            <td style={{width: '18%'}}>
             {goods.isReagent == '1' ?
              <div style={{padding: '0 10px', textAlign: 'left'}}>
               {(goods.casNo) ? <p>CAS号：{goods.casNo}</p> : null}
               {(goods.dangerousNature) ?
                <p>危险性质:<span dangerouslySetInnerHTML={{__html: goods.dangerousNature}}></span></p> : null}
               {(goods.controlInfo) ?
                <p>管制信息：<span style={{color: 'red'}} dangerouslySetInnerHTML={{__html: goods.controlInfo}}></span>
                </p> : null}
              </div>
              :
              goods.isReagent == '0' && goods.goodsDescription ?
               <p className='describe' style={{width:'190px'}}><span dangerouslySetInnerHTML={{__html: goods.goodsDescription.length >60 ? goods.goodsDescription.substr(0,60) + "..." : goods.goodsDescription}}></span>
               </p> : null
             }
            </td>
            <td style={{width: '10%'}}>
             <p>￥{Number(goods.newGoodsPrice).toFixed(2)}</p>
            </td>
            <td style={{width: '12%'}}>
             <div>
              <Stepper isOnBlur={true} disabled={goods.goodsState == 0 || !goods.newGoodsPrice || goods.newGoodsPrice <=0 ? true : false}
                       nowNum={100000000000000} btnClassName='btnClass' inputClassName='inputClass'
                       num={goods.goodsNum} min={1}
                       step={1}
                       key={goods.goodsNum + init}
                       onUpdate={(val) => this.updateCart(data, goods, val)}/>
             </div>
            </td>
            <td style={{width: '8%', position: 'relative'}}>
             <a style={{color: 'red', fontWeight: 'bold'}}>￥{(goods.newGoodsPrice * goods.goodsNum).toFixed(2)}</a>
             <div className='price_up_down'>
              {
               goods.goodsPrice - goods.newGoodsPrice == 0 ? null
                : <p>{
                 goods.newGoodsPrice - goods.goodsPrice > 0 ?
                  <p style={{border: '1px solid #199ED8'}}>
                   价格上升：￥{(goods.newGoodsPrice - goods.goodsPrice * 1.00).toFixed(2)}</p>
                  :
                  <p style={{border: '1px solid #199ED8'}}>
                   价格下降：￥{(goods.goodsPrice - goods.newGoodsPrice * 1.00).toFixed(2)}</p>
                }</p>
              }
             </div>

            </td>
            <td style={{width: '14%'}}>
             {
              goods.goodsState == 1 && goods.newGoodsPrice > 0 ? <div>
                <Link className="icon-view-detail" title="查看详情" to={`/goodsDetail/${goods.goodsId}`}></Link>

                {
                 goods.isFavorite == 1 ? <a className='isguanzhu12'
                                            href='javascript:void(0)'
                                            onClick={() => this.deleteGoodsFavorites(goods.goodsId)}/> :
                  <a className='isguanzhu11'
                     href='javascript:void(0)'
                     onClick={() => this.addGoodsFavorites(goods.goodsId)}
                  />
                }
                {/*
            <Icon type="heart" className="icon-collection" onClick={() => this.addGoodsFavorites(goods.goodsId)}/>*/}
                <Icon type="delete" className="icon-delete" title="删除" onClick={() => this.delGoods(goods.cartId)}/>
               </div>
               :
               <div>
                <a style={{color: '#ccc', lineHeight: '28px'}}>已过期</a>
                <Icon type="delete" className="icon-delete" title="删除" onClick={() => this.delGoods(goods.cartId)}/>
               </div>
             }

            </td>
           </tr>
           </tbody>
          </table>
         </div>
        )
       })}
       {/*{data.list.length > 10 ? <p key={index} style={{borderBottom:'1px solid #e4e4e4',cursor:'pointer',fontSize:'14px'}} onClick={this.onChangeHide}>{this.state.onOff ? "点击查看更多 >>" :"点击折叠 >>"}</p> : null}*/}

      </div>
     )
    } else if (act.groupType == '30' && act.cartList.length > 0) {
     return (
      <div key={ind} ref="cartListTab">
       <div className='act_head'>普通商品</div>
       {act.cartList.map((goods, i) => {
        let status_deleted = goods.orderStatus == 1
        return (
         <div key={i}>
          <table  className="border_bottom" >
           <tbody className={goods.goodsState == 0 || !goods.newGoodsPrice || goods.newGoodsPrice <=0 ? 'overdue' : ''}>
           <tr>
            <td style={{width: '2%'}}>{goods.newGoodsPrice && goods.newGoodsPrice > 0 ? <Checkbox onChange={(e) => this.onChange(data, goods, e)}
                                                                                                  checked={goods.checked}></Checkbox> : ""}</td>
            <td style={{width: '36%'}}>
             <div className="goods_div1">
              <Img src={goods.goodsImages}onClick={() => this.goDetail(goods.goodsId)}/>
              <div style={{margin: '18px 15px', textAlign: 'left', position: 'relative'}}>
               <p className='goods_name' onClick={() => this.goDetail(goods.goodsId)}>{goods.goodsName}</p>
               {(goods.brandName && goods.goodsSerial) ?
                <p>品牌/原厂货号：<span>{goods.brandName}/{goods.goodsSerial}</span></p> :
                (goods.brandName) ? <p>品牌：<span>{goods.brandName}</span></p> :
                 (goods.goodsSerial) ? <p>原厂货号：<span>{goods.goodsSerial}</span></p> : null
               }
               {(goods.goodsErpCode) ? <p>国药编码：{goods.goodsErpCode}</p> : null}
               {(goods.specName) ? <p>规格：{goods.specName}</p> : null}
               {(goods.goodsSpec) ? <p>包装：{goods.goodsSpec}</p> : null}
               {(goods.storageCondition && goods.shippingCondition) ?
                <p>储存/运输条件：<span>{goods.storageCondition}/{goods.shippingCondition}</span></p> :
                (goods.storageCondition) ? <p>储存条件：<span>{goods.storageCondition}</span></p> :
                 (goods.shippingCondition) ? <p>运输条件：<span>{goods.shippingCondition}</span></p> : null
               }
              </div>
             </div>
            </td>

            <td style={{width: '18%',verticalAlign:'top'}}>
             {goods.isReagent == '1' ?
              <div style={{padding: '20px 10px 0px', textAlign: 'left'}}>
               {(goods.casNo) ? <p>CAS号：{goods.casNo}</p> : null}
               {(goods.dangerousNature) ?
                <p>危险性质:<span dangerouslySetInnerHTML={{__html: goods.dangerousNature}}></span></p> : null}
               {(goods.controlInfo) ?
                <p>管制信息：<span style={{color: 'red'}} dangerouslySetInnerHTML={{__html: goods.controlInfo}}></span>
                </p> : null}
              </div>
              :
              goods.isReagent == '0' && goods.goodsDescription ?
               <p className='describe'style={{width:'190px'}}><span dangerouslySetInnerHTML={{__html: goods.goodsDescription.length >60 ? goods.goodsDescription.substr(0,60) + "..." : goods.goodsDescription }}></span>
               </p> : null
             }
            </td>
            <td style={{width: '10%'}}>
             <p>￥{Number(goods.newGoodsPrice).toFixed(2)}</p>
            </td>
            <td style={{width: '12%'}}>
             <div>
              <Stepper isOnBlur={true} disabled={goods.goodsState == 0 || !goods.newGoodsPrice || goods.newGoodsPrice <=0 ? true : false}
                       nowNum={100000000000000} btnClassName='btnClass' inputClassName='inputClass'
                       num={goods.goodsNum} min={1}
                       step={1}
                       key={goods.goodsNum + init}
                       onUpdate={(val) => this.updateCart(data, goods, val)}/>
             </div>
            </td>
            <td style={{width: '8%', position: 'relative'}}>
             <a style={{color: 'red', fontWeight: 'bold'}}>￥{(goods.newGoodsPrice * goods.goodsNum).toFixed(2)}</a>
             <div className='price_up_down' >
              {
               goods.goodsPrice - goods.newGoodsPrice == 0 ? null
                : <p>{
                 goods.newGoodsPrice - goods.goodsPrice > 0 ?
                  <p style={{border: '1px solid #199ED8'}}>
                   价格上升：￥{(goods.newGoodsPrice - goods.goodsPrice * 1.00).toFixed(2)}</p>
                  :
                  <p style={{border: '1px solid #199ED8'}}>
                   价格下降：￥{(goods.goodsPrice - goods.newGoodsPrice * 1.00).toFixed(2)}</p>
                }</p>
              }
             </div>

            </td>
            <td style={{width: '14%'}}>
             {
              goods.goodsState == 1 && goods.newGoodsPrice > 0 ? <div>
                <Link className="icon-view-detail" title="查看详情" to={`/goodsDetail/${goods.goodsId}`}></Link>

                {
                 goods.isFavorite == 1 ? <a className='isguanzhu12'
                                            href='javascript:void(0)'
                                            onClick={() => this.deleteGoodsFavorites(goods.goodsId)}/> :
                  <a className='isguanzhu11'
                     href='javascript:void(0)'
                     onClick={() => this.addGoodsFavorites(goods.goodsId)}
                  />
                }
                {/*
            <Icon type="heart" className="icon-collection" onClick={() => this.addGoodsFavorites(goods.goodsId)}/>*/}
                <Icon type="delete" className="icon-delete" title="删除" onClick={() => this.delGoods(goods.cartId)}/>
               </div>
               :
               <div>
                <a style={{color: '#000', lineHeight: '28px'}}>已过期</a>
                <Icon type="delete" className="icon-delete" title="删除" onClick={() => this.delGoods(goods.cartId)}/>
               </div>
             }

            </td>
           </tr>
           </tbody>
          </table>
         </div>
        )
       })}
       {/*{data.list.length > 10 ? <p key={index} style={{borderBottom:'1px solid #e4e4e4',cursor:'pointer',fontSize:'14px'}} onClick={this.onChangeHide}>{this.state.onOff ? "点击查看更多 >>" :"点击折叠 >>"}</p> : null}*/}

      </div>
     )
    }
   })
   }
  </div>
 }

 render() {
  const {data, checkAll, goodsTotalPrice, init,goodsNum} = this.props.cart
  const {getFieldDecorator} = this.props.form;
  const {cartCountData} = this.props.app;
 // console.log(this.props.cart.pdfData )

  return (
   <div>
    <Search></Search>
    <Navigation preson={true}>
     <div className={cart}>
      <div className="my_account_dynamic_Topimg"></div>
      <Breadcrumb separator=">" className='security_nav_bar'>
       <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
       <Breadcrumb.Item href="/personOrder/cart" style={{fontSize:'16px', fontWeight:'bold' }}>我的购物车</Breadcrumb.Item>
      </Breadcrumb>

      <div className='sort_bar'>
       <div className='sort_conditions'>
        排序条件：
        <Dropdown overlay={
         <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="1">默认</Menu.Item>
          <Menu.Item key="2">0-9或者A-Z</Menu.Item>
         </Menu>
        }>
         <Button style={{marginLeft: '8px', width: '110px'}}>
          {this.state.menu} <Icon type="down"/>
         </Button>
        </Dropdown>
        {/*
           <Button type="primary">排序</Button>
        */}

        <i
       // href={getFullUrl(`/tradeApi/printCartPDF?cartId=${cartId.join(',')}`)}
         onClick={this.onPrint}
           style={{cursor: 'pointer',color: '#fff', background: '#25b29f', padding: '5px 10px', marginLeft: '5px', borderRadius: '10%',fontStyle:'normal',display:'none'}}
        >
          生成PDF</i>
       </div>

       <a href="javascript:window.history.go(-1)">返回继续购物></a>

      </div>
      <div className="orderList_content">
       <Row className="orderList_content_head">
        <Col span={2}>
         <Checkbox
          onChange={this.onCheckAllChange}
          checked={checkAll}
         >
          全选
         </Checkbox></Col>
        <Col span={7}>基本信息</Col>
        <Col span={4}>商品属性</Col>
        <Col span={3}>成交单价</Col>
        <Col span={2}>数量</Col>
        <Col span={3}>小计</Col>
        <Col span={3}>操作</Col>
       </Row>
      </div>
      {!!data && data.length > 0 && cartCountData > 0 ?
       <div>
        {data.map((list, index) => {
         // return <CartList data={list} index={index} init={init} />
         return this.CartList(list || [], index, init)
        })}
        {!!data && data.length > 0 ? <div className={this.state.moveToTop ? "gift_cart_settlement moveToTop" : "gift_cart_settlement"}>
         <Checkbox
          onChange={this.onCheckAllChange}
          checked={checkAll}
         >
          全选
         </Checkbox>
         <a onClick={() => this.delSelGoods()}>删除选中商品</a>
         <button onClick={() => this.goBuy()}>去结算</button>
         <span className="price_text">商品总价（不含运费）<span
          style={{color: 'red', fontWeight: 'bold'}}>¥{Number(goodsTotalPrice).toFixed(2)}</span></span>
        </div> : <p style={{textAlign: "center", margin: '10px'}}>无数据</p>}

       </div>
       : <p style={{textAlign: "center", margin: '10px'}}>无数据</p>
      }
     </div>
    </Navigation>
   </div>
  )
 }
}

export default connect(({cart,app}) => ({cart,app}), (dispatch) => {
 return {dispatch}
})(Form.create()(Cart))
