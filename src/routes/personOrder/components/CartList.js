import React, {Component} from 'react'
import {BodyHeadImg} from '../../../components/Advertising/Advertising'
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
import {cart} from './CartList.less'
import Img from "../../../components/Img/Img"
import Stepper from '../../../components/Stepper/Stepper';
import ActivitySelect from './components/activitySelect';
import LoginBtn from '../../../components/loginBtn/loginBtn'
import {isLogin} from '../../../utils/request'
import {getFullUrl} from '../../../utils/common';
import {printCartPDF} from './api';
import { IMAGE_DOMAIN } from '../../../utils/common';

const FormItem = Form.Item;

class CartList extends Component {
 constructor(props) {
  super(props);
  this.state = {
   moveToTop: false,
   cartId:[],
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


 //删除收藏
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




 render() {
  const {data=[], index , init} = this.props
  // const {getFieldDecorator} = this.props.form;
 // console.log(this.props.cart.pdfData )

  return (
    <div key={index} ref="cartListTab">
     <ActivitySelect nowPrice={'100'} data={act.activityApiVo} />
     {act.cartList.map((goods, i) => {
      let status_deleted = goods.orderStatus == 1
      return (
       <div key={i}>
        <table  className="border_bottom">
         <tbody className={goods.goodsState == 0 ? 'overdue' : ''}>
         <tr>
          <td style={{width: '2%'}}><Checkbox onChange={(e) => this.onChange(data, goods, e)}
                                              checked={goods.checked}></Checkbox></td>
          <td style={{width: '36%'}}>
           <div className="goods_div1">
            <Img style={{width: '105px', height: '105px', margin: '2px 16px', cursor: 'pointer'}} src={goods.goodsImages}onClick={() => this.goDetail(goods.goodsId)}/>
            <div style={{margin: '18px 15px', textAlign: 'left', position: 'relative'}}>
             <p className='goods_name' onClick={() => this.goDetail(goods.goodsId)}>{goods.goodsName}</p>
             <p>品牌/原厂货号：{goods.brandName}/{goods.goodsSerial}</p>
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
             <p className='describe'>描述：<span dangerouslySetInnerHTML={{__html: goods.goodsDescription}}></span>
             </p> : null
           }
          </td>
          <td style={{width: '10%'}}>
           <p>￥{Number(goods.newGoodsPrice).toFixed(2)}</p>
          </td>
          <td style={{width: '12%'}}>
           <div>
            <Stepper isOnBlur={true} disabled={false}
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
            goods.goodsState == 1 ? <div>
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
 }
}

export default connect(({cart}) => ({cart}), (dispatch) => {
 return {dispatch}
})(Form.create()(CartList))
