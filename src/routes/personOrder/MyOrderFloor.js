import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Row, Col, Menu, Dropdown, Icon, Breadcrumb, Input, Button, Pagination } from 'antd';
import Img from '../../components/Img/Img';

class MyConsultListFloor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      goodsData: props.data.orderItemsList,
      isShowRefund: props.isShowRefund
    }
  }
 addCart = (goodsId, goodsPrice, dosageForm,count) => {
  let val ={
   goodsId:goodsId,
   goodsPrice:goodsPrice,
   count:count,
   saveType:dosageForm
  }
  this.props.addCart(val);
 }
  render() {
    const data = this.props.data;
    return (
      <div>
        {data.orderItemsList.map((goods, i) => {
          let status_deleted = goods.orderStatus == 1
          return (
            <div key={i} className="border_bottom">
              <div>
                <Row type="flex" justify="space-between" className={!status_deleted ? 'hasDeleted' : ''}>
                 <Col span={4}><Img style={{ width: '140px', height: '140px', margin: '2px 5px 2px 0' }} src={goods.goodsImage} /></Col>
                 <Col span={20}>
                  <div style={{width: '100%', textAlign: 'left'}}><div style={{ fontSize: '16px', color: '#333', lineHeight: '22px' }}>{goods.goodsName}</div></div>
                  <Row type="flex" justify="space-between" style={{ width: '100%' }}>
                   <Col span={6}>
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
                   </Col>
                   <Col span={6}>
                    { goods.isReagent == '1' ?
                     <div>
                      {(goods.casNo) ? <p>CAS号：<span>{goods.casNo}</span></p> : null}

                      {(goods.dangerousNature) ? <p>危险性质：<span dangerouslySetInnerHTML={{ __html: goods.dangerousNature }}></span></p> : null}
                      {(goods.controlInfo) ? <p>管制信息：<span style={{color: 'red'}} dangerouslySetInnerHTML={{ __html: goods.controlInfo }}></span></p> : null}
                     </div>
                     : goods.isReagent == '0' && goods.goodsDescription ? <p className='describe'>描述：<span dangerouslySetInnerHTML={{ __html: goods.goodsDescription.length > 80 ? goods.goodsDescription.substr(0,80) + "..." : goods.goodsDescription}}></span></p> : null
                    }
                   </Col>
                   <Col span={2}>
                    <div style={{display: 'flex',alignItems: 'center',height:'100%',justifyContent:'center'}}>￥{goods.productSellPrice?   goods.productSellPrice.toFixed(2):''}</div>
                   </Col>
                   <Col span={3}>
                    <div style={{display: 'flex',alignItems: 'center',height:'100%',justifyContent:'center'}}>{goods.productSellBillQty}</div>
                   </Col>
                   <Col span={2}>
                    <div style={{display: 'flex',alignItems: 'center',height:'100%',justifyContent:'center',color: 'red', fontWeight:'bold'}}>{goods.productSellPrice&&goods.productSellBillQty ?   (parseFloat(goods.productSellPrice)*parseFloat(goods.productSellBillQty)).toFixed(2):''}</div>
                   </Col>
                   <Col span={5}>
                    <div style={{display: 'flex',alignItems: 'center',height:'100%',justifyContent:'center', flexDirection: 'column'}}>
                     <div>
                      <Link title="商品详情" target='_blank' style={{ color: '#3599BB', display: 'bolck', 'whiteSpace': 'nowrap', fontSize:"14px" }} to={`/goodsDetail/${goods.goodsId}`}>商品详情</Link>
                      <span title="再次购买" style={{ color: 'orange', display: 'bolck', 'whiteSpace': 'nowrap', fontSize:"14px", marginLeft:"10px", cursor:"pointer" }} onClick={()=>this.addCart(goods.goodsId,goods.productSellPrice,goods.dosageForm)}>再次购买</span>
                     </div>
                     <br/>
                     {data.orderState==4 || data.orderState==5 || data.orderState==6 ?
                      <Link title="退货/退款" style={{ color: '#3599BB', display: 'bolck', 'whiteSpace': 'wrap', fontSize:"14px" }} to={`/personOrder/afterSale/${data.orderId}/${goods.goodsId}`}>退货/退款</Link>
                      : ''
                     }
                    </div>
                   </Col>
                  </Row>
                 </Col>
                </Row>

              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(({ order, myOrder }) => ({ order, myOrder }), (dispatch, own) => { return { dispatch, own } })(MyConsultListFloor);
