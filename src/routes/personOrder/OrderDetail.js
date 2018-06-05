import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Form, Breadcrumb, Button, Table, Row, Col, Pagination, Input, Icon, Modal } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { order_detail } from './OrderDetail.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import OrderDetailFloor from './OrderDetailFloor'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 8 }
};


class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      data: [],
      pagination: {},
      loading: true,
      visible: false,
      orderSn: ''
    }
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value, dateString) => {
    console.log(field, value, dateString)
    this.setState({
      [field]: dateString,
    });
  }

  onStartChange = (value, dateString) => {
    this.onChange('startValue', value, dateString);
  }

  onEndChange = (value, dateString) => {
    this.onChange('endValue', value, dateString);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  handleTableChange = (pagination) => {
    this.setState({ loading: true });
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    data = data.concat(data);
    let _this = this;
    setTimeout(function () {
      _this.setState({
        pagination: pager,
        data: data,
        loading: false,
      });
    }, 2000)
  }
 addCart = (val) => {
  this.props.dispatch({type:'orderDetail/addCartEFF',val})
 }
 handleAddCarts = ()=>{
  let purTemplateItems=[];
  this.props.orderDetail.personOrdeDetailData[0].orderItemsList.forEach((v, index, array) => {
   if(v.goodsId!=''){
    purTemplateItems.push({ goodsId:v.goodsId, newGoodsPrice:v.productSellPrice, goodsNum:1,goodsSource: v.dosageForm })
   }
  })
  this.props.dispatch({
   type:'orderDetail/getAddCartBachEFF',
   arr: purTemplateItems
  })
 }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
 goPay = (orderId) => {
  this.props.dispatch({type: 'myOrder/goPayEFF', val: {orderId}});
 }

  handleOk = () => {
   if(this.state.orderSn) {
    this.props.form.validateFields((err, values) => {
     this.props.dispatch({type:'orderDetail/cancleOrderEFF',val:{orderSn: this.state.orderSn,cancelReason: values.remark,orderId:this.props.params.orderId}})
     this.setState({
      visible: false,
      orderSn: ''
     })
    })
   }
  }
  showModal = (orderSn) => {
   this.setState({
    visible: true,
    orderSn: orderSn
   })
  }
  handleCancel = (e) => {
   this.setState({
    visible: false,
    orderSn: ''
   });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let { personOrdeDetailData, consultListTotal } = this.props.orderDetail
    const { startValue, endValue, endOpen } = this.state;
    const formItemLayout = {
     labelCol: { span: 6 },
     wrapperCol: { span: 16 },
    };
    let det = personOrdeDetailData[0] || {}
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={order_detail}>
          <div className="my_account_dynamic_Topimg"></div>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item>订单详情</Breadcrumb.Item>
            </Breadcrumb>
            <div className="wapper">
              <p><b>订单信息：</b></p>
              <div className="btn_area">
                {det.orderState == '1' && det.paymentState == '0' ?
                  <span style={{background: '#e5e5e5', color: '#666', fontWeight: 'bold'}} onClick={(orderSn)=>this.showModal(det.orderSn)}>订单取消</span>
                  : ''
                }
                {det.paymentState == 0 && det.paymentCode=='1' && (det.orderState == 1 || det.orderState == 3) ?
                  <span style={{background: '#fc0d1b'}} onClick={()=>this.goPay(det.orderId)}>在线支付</span>
                  : ''
                }
                {/*{(det.orderState != 7 && det.orderState != 8) ?*/}
                  {/*<span>订单导出</span>*/}
                  {/*: ''*/}
                {/*}*/}
              </div>
             <Row className="detial_info">
              <Col span={6}>订单编号：{det.orderSn}</Col>
              <Col span={6}>下单时间：{det.createTimeStr && det.createTimeStr.slice(0,19)}</Col>
              <Col span={6}>订单状态：{det.orderStateMemo}</Col>
             </Row>
             <Row className="detial_info">
              <Col span={6}>商品总价：<span className="em">￥{det.goodsAmount}</span></Col>
              <Col span={6}>总运费：<span className="em">￥{det.shippingFee}</span></Col>
              <Col span={6}>积分抵扣：<span className="em">￥{det.pointRmbNum ? det.pointRmbNum.toFixed(2) : '0.00'}</span></Col>
              <Col span={6}>订单总价：<span className="em">￥{det.orderTotalPrice}</span></Col>
             </Row>
             <Row className="detial_info">
              <Col span={6}>预存款支付：<span className="em">￥{(det.predepositAmount) || '0.00'}</span></Col>
              <Col span={6}>应支付金额：<span className="em">￥{det.orderAmount>0 ? det.orderAmount : '0.00'}</span></Col>
             </Row>
             {
              det.controlInfo ?
               <p className="detial_info" style={{color: '#fc0d1b'}}>订单包含管制类产品（一般危险化学品／易制爆化学品／一类易制毒化学品／二、三类易制毒化学品／剧毒化学品），要按照国家规定提供相关证件备案后方可购买</p> : null
             }
             {
              det.controlInfo ? <Link to='/customservice?parentId=6&articleId=513ace30b988496b835227c55a17a473' target="_blank" className="detial_info blue_btn">点击查看管制类商品所需相关购买材料>></Link> : null
             }
              <p className="line"></p>
              <p className="detial_info"><b>订货人信息：</b></p>
              <Row className="detial_info">
                <Col span={6}>登陆名称：{det.buyerName}</Col>
                <Col span={6}>订货人姓名：{det.buyerTrueName}</Col>
                <Col span={6}>绑定手机：{det.buyerTel}</Col>
              </Row>
              <p className="line"></p>
              <p className="detial_info"><b>收货人信息：</b></p>
              <Row className="detial_info">
                <Col span={6}>收货人：{det.address && det.address.trueName}</Col>
                <Col span={6}>收货地区：{det.address && det.address.provinceName}{det.address && det.address.cityName}{det.address && det.address.areaInfo}</Col>
                <Col span={6}>收货地址：{det.address && det.address.address}</Col>
                <Col span={6}>手机号：{det.address && det.address.mobPhone}</Col>
              </Row>
              <Row className="detial_info">
                <Col span={6}>固定电话：{det.address && det.address.telPhone}</Col>
                <Col span={6}>邮政编码：{det.address && det.address.zipCode}</Col>
              </Row>
             {
              det.member && det.member.memberType == '0' ?
               <div>
                <p className="line"></p>
                <p className="detial_info"><b>配送信息：</b></p>
                <Row className="detial_info">
                 <Col span={6}>{det.shippingName}</Col>
                </Row>
                <p className="line"></p>
                <p className="detial_info"><b>支付信息：</b></p>
                <Row className="detial_info">
                 <Col span={6}>支付方式：{det.paymentName}</Col>
                 <Col span={6}>支付状态：<span className="em">{det.paymentStateStr}</span></Col>
                </Row>
                <p className="line"></p>
                <p className="detial_info"><b>发票信息：</b></p>
                <Row className="detial_info">
                 <Col span={6}>发票类型：{det.invoiceEntity && (det.invoiceEntity.invState==0 ? '个人发票' : det.invoiceEntity.invState==1 ? '增值税普通发票' : det.invoiceEntity.invState==2 ? '增值税专用发票' : '') }</Col>
                 {det.invoiceEntity && (det.invoiceEntity.invTitle && (det.invoiceEntity.invState!=0)) ? <Col span={6}>开票抬头：{det.invoiceEntity && det.invoiceEntity.invTitle}</Col> : null}
                 {det.invoiceEntity && (det.invoiceEntity.invCode && (det.invoiceEntity.invState!=0)) ? <Col span={6}>纳税人编号：{det.invoiceEntity && det.invoiceEntity.invCode}</Col> : null}
                </Row>
                <Row className="detial_info">
                 {det.invoiceEntity && (det.invoiceEntity.invRegAddr && (det.invoiceEntity.invState == 2)) ? <Col span={6}>纳税人地址：{det.invoiceEntity && det.invoiceEntity.invRegAddr}</Col> : null}
                 {det.invoiceEntity && (det.invoiceEntity.invRecMobphone && (det.invoiceEntity.invState == 2)) ? <Col span={6}>纳税人电话：{det.invoiceEntity && det.invoiceEntity.invRecMobphone}</Col> : null}
                 {det.invoiceEntity && (det.invoiceEntity.invRegBname && (det.invoiceEntity.invState == 2)) ? <Col span={6}>开户银行：{det.invoiceEntity && det.invoiceEntity.invRegBname}</Col> : null}
                </Row>
                <Row className="detial_info">
                 {det.invoiceEntity && (det.invoiceEntity.invRegBaccount && (det.invoiceEntity.invState == 2)) ? <Col span={6}>银行账号：{det.invoiceEntity && det.invoiceEntity.invRegBaccount}</Col> : null}
                </Row>
               </div> : null
             }
              <p className="line"></p>
              <p className="detial_info"><b>购物清单：</b></p>
              <div className="orderList_content">
                <Row className="orderList_content_head">
                  <Col span={6}>基本信息</Col>
                  <Col span={4}>商品属性</Col>
                  <Col span={2}>成交单价(元)</Col>
                  <Col span={2}>订购数量</Col>
                  <Col span={2}>发货数量</Col>
                  <Col span={2}>小计</Col>
                  <Col span={2}>到货时间</Col>
                  <Col span={2}>商品状态</Col>
                  <Col span={2}>操作</Col>
                </Row>
              </div>
              {det.sale ?
              <div className="saleInfo">
                <Icon type="flag" />
                {det.sale}
              </div> :
              ''
              }
              <div>
                <div>
                  <OrderDetailFloor data={(det.orderItemsList) || []} orderId={det.orderId} orderState={det.orderState} orderMessage={det.orderMessage} addCart={this.addCart} handleAddCarts={this.handleAddCarts}></OrderDetailFloor>
                </div>

                {/*<p className="line"></p>*/}
                {/*<p className="detial_info"><b>满额赠礼：</b></p>*/}
                {/*<Row className="detial_info">*/}
                  {/*<Col span={6}>SCRC护目镜</Col>*/}
                {/*</Row>*/}

               {
                det.goodsShippingTransLists || det.invoiceShippingTransLists || det.orderServiceMessage ?
                 <div>
                  <p className="line"></p>
                  <p className="detial_info"><b>订单信息跟踪：</b></p>
                  {det.orderServiceMessage ? <p>客服备注：{det.orderServiceMessage}</p> : null}
                  <Row className="detial_info detail_padding">
                   {
                    det.goodsShippingTransLists ?
                     <div>
                      <Col span={6}>商品物流明细（<Link to={'http://new.reagent.com.cn/customservice?parentId=6&articleId=cbf2ce88bcea4ac0a2819dce806240e7'} target='_black' style={{textDecoration: 'underline'}}>查看公路托运自提网点</Link>）</Col>
                      <table>
                       <tbody>
                       <tr>
                        <th>发货时间</th>
                        <th>运输公司</th>
                        <th>发运信息</th>
                       </tr>
                       {
                        det.goodsShippingTransLists && det.goodsShippingTransLists.map(item => {
                         return (
                          <tr>
                           <td>{item.createTime}</td>
                           <td>{item.shippingName}</td>
                           <td>{item.shippingInformation}</td>
                          </tr>
                         )
                        })
                       }
                       </tbody>
                      </table>
                     </div> : null
                   }
                   {
                    det.invoiceShippingTransLists ?
                     <div>
                      <Col span={6}>发票物流明细</Col>
                      <table>
                       <tbody>
                       <tr>
                        <th>发票寄出时间</th>
                        <th>运输公司</th>
                        <th>发运信息</th>
                       </tr>
                       {
                        det.invoiceShippingTransLists && det.invoiceShippingTransLists.map(item => {
                         return (
                          <tr>
                           <td>{item.createTime}</td>
                           <td>{item.shippingName}</td>
                           <td>{item.shippingInformation}</td>
                          </tr>
                         )
                        })
                       }
                       </tbody>
                      </table>
                     </div> : null
                   }
                  </Row>
                 </div> : null
               }

                {det.orderState == 7 ?
                <div>
                  <p className="line"></p>
                  <p className="detial_info"><b>订单取消信息：</b></p>
                  <Row className="detial_info">
                    <Col span={24}>取消者：{det.cancelOperator}</Col>
                    <Col span={24}>取消原因：{det.cancelCause}</Col>
                  </Row>
                </div> : ''}
              </div>
            </div>
           <Modal
            title="取消订单"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={400}
            footer={
             <Row type="flex" justify="space-around">
              <Col> <Button type="primary" onClick={this.handleOk}>确定</Button></Col>
              <Col> <Button  onClick={this.handleCancel}>取消</Button></Col>
             </Row>
            }
           >
            <FormItem
             { ...formItemLayout }
             label={ <span style={{ fontSize:'16px', fontWeight:'bold' }}>取消原因</span>}
            >
             {getFieldDecorator('remark', {
             })(
              <Input type="textarea" rows={4} />
             )}
            </FormItem>
           </Modal>
          </div>
        </Navigation>
      </div>
    )
  }
}

export default connect(({ orderDetail }) => ({ orderDetail }), (dispatch) => { return { dispatch } })(Form.create()(OrderDetail))
