import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Row, Col, Menu, Dropdown, Icon, Breadcrumb, Input, Button, Pagination } from 'antd';
import Img from '../../components/Img/Img';

class OrderDetailFloor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goodsData: props.data,
      isShowRefund: props.isShowRefund
      // onOff: true
    }
  }
 addCart = (goodsId, goodsPrice, dosageForm, count) => {
  let val ={
   goodsId:goodsId,
   goodsPrice:goodsPrice,
   count:count,
   saveType:dosageForm
  }
  this.props.addCart(val);
 }
 handleAddCarts = () => {
  this.props.handleAddCarts()
 }
  render() {
    let data = this.props.data;
    return (
      <div>
        {data.map((goods, i) => {
          // let status_deleted = goods.orderStatus == 1
          return (
            <table key={i} className="border_bottom">
              <tbody>
                <tr>
                 <td style={{ width: '11%' }}>
                  <Img style={{ width: '105px', height: '105px', }} src={goods.goodsImage} />
                 </td>
                 <td style={{ width: '89%' }} >
                  <div><p style={{ fontSize: '16px', color: '#333', lineHeight: '22px', textAlign: 'left',paddingLeft:'10px' }}>{goods.goodsName}</p></div>
                  <div className="order_d_div1">
                   <div style={{ marginLeft: '10px', textAlign: 'left',width: '18%', height:'100%' }}>
                    {(goods.brandName && goods.goodsSerial) ?
                     <p>品牌/原厂货号：<span>{goods.brandName}/{goods.goodsSerial}</span></p> :
                     (goods.brandName) ? <p>品牌：<span>{goods.brandName}</span></p> :
                      (goods.goodsSerial) ? <p>原厂货号：<span>{goods.goodsSerial}</span></p> : null
                    }
                    {(goods.goodsErpCode) ? <p>国药编码：<span>{goods.goodsErpCode}</span></p> : null}
                    {(goods.specName) ? <p>规格：<span>{goods.specName}</span></p> : null}
                    {(goods.goodsSpec) ? <p>包装：<span>{goods.goodsSpec}</span></p> : null}
                    {(goods.storageCondition && goods.shippingCondition) ?
                     <p>储存/运输条件：<span>{goods.storageCondition}/{goods.shippingCondition}</span></p> :
                     (goods.storageCondition) ? <p>储存条件：<span>{goods.storageCondition}</span></p> :
                      (goods.shippingCondition) ? <p>运输条件：<span>{goods.shippingCondition}</span></p> : null
                    }
                   </div>
                   <div style={{ padding: '0 10px', textAlign: 'left',width: '14%', height:'100%' }}>
                    { goods.isReagent == '1' ?
                     <div>
                      {(goods.casNo) ? <p>CAS号：<span>{goods.casNo}</span></p> : null}

                      {(goods.dangerousNature) ? <p>危险性质：<span dangerouslySetInnerHTML={{ __html: goods.dangerousNature }}></span></p> : null}
                      {(goods.controlInfo) ? <p>管制信息：<span style={{color: 'red'}} dangerouslySetInnerHTML={{ __html: goods.controlInfo }}></span></p> : null}
                     </div>
                     : goods.isReagent == '0' && goods.goodsDescription ? <p className='describe'   style={{width:'100px',height:'100px', overflow: 'hidden',textOverflow:'ellipsis',
                      whiteSpace: 'wrap', wordWrap:'break-word'}}>描述：<span dangerouslySetInnerHTML={{ __html: goods.goodsDescription.length > 80 ? goods.goodsDescription.substr(0,80) + "..." : goods.goodsDescription}}></span></p> : null
                    }
                   </div>
                   <div style={{ width: '10%', display: 'flex', alignItems:'center', justifyContent:'center' }}>￥{goods.productSellPrice.toFixed(2)}</div>
                   <div style={{ width: '9%', display: 'flex', alignItems:'center', justifyContent:'center' }}>{goods.productSellBillQty}</div>
                   <div style={{ width: '10%', display: 'flex', alignItems:'center', justifyContent:'center' }}>{goods.productSendQty}</div>
                   <div style={{ width: '9%', display: 'flex', alignItems:'center', justifyContent:'center' }}>￥{(goods.productSellPrice * goods.productSellBillQty).toFixed(2)}</div>
                   <div style={{ width: '10%', display: 'flex', alignItems:'center', justifyContent:'center' }}>{goods.sendTime}</div>
                   <div style={{ width: '9%', display: 'flex', alignItems:'center', justifyContent:'center' }}>{goods.orderStatusMemo}</div>
                   <div style={{ width: '10%', display: 'flex', alignItems:'center', justifyContent:'center', flexDirection: 'column' }}>
                    <Link title="商品详情" target='_blank' style={{ color: '#3599BB', display: 'bolck', 'whiteSpace': 'wrap', fontSize:"14px" }} to={`/goodsDetail/${goods.goodsId}`}>商品详情</Link><br/>
                    <span title="再次购买" style={{ color: 'orange', display: 'bolck', 'whiteSpace': 'wrap', fontSize:"14px", cursor: 'pointer'}} onClick={()=>this.addCart(goods.goodsId,goods.productSellPrice, goods.dosageForm)}>再次购买</span><br/>
                    {this.props.orderState==4 || this.props.orderState==5 || this.props.orderState==6 ?
                     <Link title="退货/退款" style={{ color: '#3599BB', display: 'bolck', 'whiteSpace': 'wrap', fontSize:"14px" }} to={`/personOrder/afterSale/${this.props.orderId}/${goods.goodsId}`}>退货/退款</Link>
                     : ''
                    }
                   </div>
                  </div>
                 </td>

                  {/*<td style={{ width: '24%' }} >*/}
                    {/*<div className="goods_div1">*/}
                      {/*<Img style={{ width: '105px', height: '105px', margin: '2px 5px 2px 0', border: '1px solid #e4e4e4' }} src={goods.goodsImage} />*/}
                      {/*<div style={{ margin: '18px 0 18px 15px', textAlign: 'left' }}>*/}
                        {/*<p style={{ fontSize: '16px', color: '#333', lineHeight: '22px', marginBottom: '16px' }}>{goods.goodsName}</p>*/}
                        {/*<p>商品编号：{goods.productBuyBillQty}</p>*/}
                        {/*<p>品牌：{goods.brandName}</p>*/}
                        {/*<p>规格：{goods.specName} </p>*/}
                        {/*<p>包装：{goods.goodsSpec} </p>*/}
                        {/*<p>储存条件：{goods.storageCondition} </p>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                  {/*</td>*/}
                  {/*<td style={{ width: '16%' }} >*/}
                    {/*<div style={{ padding: '0 10px', textAlign: 'left' }}>*/}
                      {/*<p>CAS号：{goods.productSellBillQty}</p>*/}
                      {/*<p>危险性质：{goods.productSellBillQty}</p>*/}
                      {/*<p>管制信息：<span style={{ color: 'red' }}>可以省区内塞的可以省时省粮，用户高温霉菌</span></p>*/}
                    {/*</div>*/}
                  {/*</td>*/}
                  {/*<td style={{ width: '8%' }}>￥{goods.productSellPrice}</td>*/}
                  {/*<td style={{ width: '8%' }}>{goods.productBuyBillQty}</td>*/}
                  {/*<td style={{ width: '8%' }}>{goods.productBuyBillQty}</td>*/}
                  {/*<td style={{ width: '8%' }}>{goods.orderTransAmount}</td>*/}
                  {/*<td style={{ width: '8%' }}></td>*/}
                  {/*<td style={{ width: '8%' }}>{goods.orderStatusMemo}</td>*/}
                  {/*<td style={{ width: '8%' }}>*/}
                    {/*<Link title="商品详情" style={{ color: '#3599BB', display: 'bolck', 'whiteSpace': 'wrap', fontSize:"14px" }} to={`/goodsDetail/${goods.orderId}`}>商品详情</Link><br/>*/}
                    {/*<Link title="再次购买" style={{ color: 'orange', display: 'bolck', 'whiteSpace': 'wrap', fontSize:"14px"}} to={`/goodsDetail/${goods.orderItemId}`}>再次购买</Link><br/>*/}
                    {/*{this.state.isShowRefund ?*/}
                      {/*<Link title="退货/退款" style={{ color: '#333', display: 'bolck', 'whiteSpace': 'wrap', fontSize:"14px" }} to={`/goodsDetail/${goods.orderItemId}`}>退货/退款</Link>*/}
                      {/*: ''*/}
                    {/*}*/}
                  {/*</td>*/}
                </tr>
              </tbody>
            </table>
          )
        })}
        <div>
          <p>备注：{this.props.orderMessage}</p>
          <div className="btn_wapper"><a className="r add_cart_btn" onClick={()=>this.handleAddCarts()}>整单加入购物车</a></div>
        </div>
      </div>
    )
  }
}

export default connect(({ order, orderDetail }) => ({ order, orderDetail }), (dispatch, own) => { return { dispatch, own } })(OrderDetailFloor);
