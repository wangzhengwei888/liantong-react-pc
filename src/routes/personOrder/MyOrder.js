import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Form, Breadcrumb, Button, Table, Row, Col, Pagination, DatePicker, Input, Select, Icon, Modal } from 'antd'
import { routerRedux, Link } from 'dva/router'
import { connect } from 'dva'
import { my_order } from './MyOrder.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import MyOrderFloor from './MyOrderFloor'
import moment  from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 8 }
};

class MyOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: null,
      endValue: null,
      startTime: '',
      endTime:'',
      orderState: '',
      orderFilter: '',
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
    this.props.dispatch({type: 'myOrder/MyOrderListEFF', val: {pageNo: field,orderFilter: this.state.orderFilter,startTime: this.state.startTime,endTime: this.state.endTime,orderState: this.state.orderState}});
  }
 goPage = () => {
  const { orderListTotal,pageSize } = this.props.myOrder;
  let maxPage = Math.ceil(orderListTotal/pageSize)
  let pageNo = this.refs.page.getElementsByTagName("input")[0].value;
  pageNo = pageNo > maxPage ? maxPage : pageNo
  console.log(pageNo)
  if(!!pageNo){
   this.props.dispatch({type: 'myOrder/MyOrderListEFF', val: {pageNo: pageNo,orderFilter: this.state.orderFilter,startTime: this.state.startTime,endTime: this.state.endTime,orderState: this.state.orderState}});
   this.refs.page.getElementsByTagName("input")[0].value = ""
  }
 }


  onStartOk = () => {
    if(this.state.startValue == null){
     let formatTime = moment(Date.now()).format('YYYY-MM-DD');
     let formatValue = moment(Date.now());//参数换成毫秒
     if(this.state.endValue == null || formatValue <= this.state.endValue){
        this.setState({ startTime : formatTime, startValue : formatValue });
        //设置DatePicker的value
        this.props.form.setFieldsValue({
           startTime : formatTime,
           startValue : formatValue
        })
     }
    }
  }
  onEndOk = () => {
   if(this.state.endValue == null){
    let formatTime = moment(Date.now()).format('YYYY-MM-DD');
    let formatValue = moment(Date.now());//参数换成毫秒
    if(this.state.startValue == null || formatValue >= this.state.startValue){
     this.setState({ endTime:formatTime, endValue:formatValue });
     //设置DatePicker的value
     this.props.form.setFieldsValue({
        endTime : formatTime,
        endValue : formatValue
     })
    }
   }
  }

  onStartChange = (value, dateString) => {
   this.setState({startTime:dateString,startValue:value })
  }

  onEndChange = (value, dateString) => {
   this.setState({endTime:dateString,endValue:value })
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

 addCart = (val) => {
  this.props.dispatch({type:'myOrder/addCartEFF',val})
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

 handleChange = (value) => {
  this.setState({orderState: value})
 }
 handleOk = () => {
  if(this.state.orderSn) {
   this.props.form.validateFields((err, values) => {
    this.props.dispatch({type:'myOrder/cancleOrderEFF',val:{orderSn: this.state.orderSn,cancelReason: values.remark}})
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

  handleSubmit = (e) => {
    e.preventDefault();
   this.props.dispatch({type: 'myOrder/MyOrderListEFF', val: {orderFilter: this.state.orderFilter,startTime: this.state.startTime,endTime: this.state.endTime,orderState: this.state.orderState}});
  }
 goPay = (orderId) => {
  this.props.dispatch({type: 'myOrder/goPayEFF', val: {orderId}});
 }

 componentDidMount = () => {
   if(!!this.refs.page){
    console.log(!!this.refs.page)
    console.log(this.refs.page.getElementsByTagName("input"))
   }

 }
 componentWillReceiveProps(nextProps){
  if(!!this.refs.page){
   console.log(!!this.refs.page)
   console.log(this.refs.page.getElementsByTagName("input"))
  }
 }





  render() {
    const { getFieldDecorator } = this.props.form;
    const { personOrderListData, orderListTotal, orderListFilterDate, pageNo, pageSize } = this.props.myOrder
    const { startValue, endValue, endOpen } = this.state;
   const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
   };
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={my_order}>
            <div className="my_account_dynamic_Topimg"></div>

            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="/personOrder/myOrder" style={{fontSize:'16px', fontWeight:'bold' }}>我的订单</Breadcrumb.Item>
            </Breadcrumb>
            <div className="filter_form">
              <Form onSubmit={this.handleSubmit} layout="inline">
                <Col span={4}>
                  <FormItem
                    {...formItemLayout}>
                    {getFieldDecorator('startValue', { setFieldsValue: startValue })(
                      <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD"
                        placeholder="开始日期"
                        onOk={this.onStartOk}
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={1} style={{ width: '10px', paddingTop: '8px', margin: '0 5px' }}>-</Col>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('endValue', { setFieldsValue: endValue })(
                      <DatePicker
                        disabledDate={this.disabledEndDate}
                        showTime
                        format="YYYY-MM-DD"
                        placeholder="结束日期"
                        onOk={this.onEndOk}
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={7} style={{ paddingLeft: '15px' }}>
                  <FormItem label="订单查询：">
                    {getFieldDecorator('orderNumber')(
                      <Input placeholder="订单号/商品编号/名称" onChange={(e)=>this.setState({orderFilter:e.target.value})} />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="订单状态">
                    {getFieldDecorator('select', { initialValue: '9' })(
                      <Select onChange={this.handleChange} style={{ width: 120 }}>
                        <Option value="9">全部订单</Option>
                        <Option value="1">订单已提交</Option>
                        <Option value="2">订单已审核</Option>
                        <Option value="3">订单已确认</Option>
                        <Option value="4">正在备货</Option>
                        <Option value="5">货已发出</Option>
                        <Option value="6">谢谢您的订购</Option>
                        <Option value="7">订单已取消</Option>
                        <Option value="8">订单已关闭</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={2} style={{width: '100px'}} className='search'>
                  <FormItem {...formItemLayout}>
                    <Button type="primary" htmlType="submit" ghost style={{float: 'right'}}>搜索</Button>
                  </FormItem>
                </Col>
              </Form>
            </div>
            <div className="btn_area">
              <span style={{background: '#37b5aa'}} onClick={()=>this.props.dispatch(routerRedux.push('/presonAccount/intelligentUp'))}>资质上传</span>
              {/*<span>订单导出</span>*/}
            </div>
            <div className="orderList_content">
              <Row className="orderList_content_head">
                <Col span={9}>基本信息</Col>
                <Col span={5}>商品属性</Col>
                <Col span={2}>成交单价</Col>
                <Col span={2}>数量</Col>
                <Col span={2}>小计</Col>
                <Col span={4}>操作</Col>
              </Row>
            </div>
            {!!personOrderListData && personOrderListData.length > 0 ?
              <div key={pageNo}>
                {personOrderListData.map((list, index) => {
                  return (
                    <div key={index}>
                      <div className="orderList_content">
                       {
                        list.orderSn ?
                         <div>
                          <div className="orderList_content_head orderList_content_head_sub">
                           <span>订单号：{list.orderSn}</span>
                           <span>状态：<span style={{ color: '#3599BB' }}>{list.orderStateMemo}</span></span>
                           <span>下单时间：<span style={{ fontWeight: 'bold', color: '#333' }}>{list.createTimeStr}</span></span>
                           <span>{list.paymentName}({list.paymentStateStr})</span>
                           <span>运费：<span style={{ color: '#3599BB' }}>{list.shippingFee}</span></span>
                           <span>订单金额：<span style={{ color: '#3599BB' }}>{list.orderAmount&&list.predepositAmount?    (parseFloat(list.orderAmount)+parseFloat(list.predepositAmount)).toFixed(2):''}</span></span>
                           {list.orderState == '1' && list.paymentState == '0' ?
                            <span className="r">
                              <Link title="取消订单" style={{ color: '#3599BB' }} onClick={(orderSn)=>this.showModal(list.orderSn)}>取消订单</Link>
                            </span>
                            : ''
                           }
                           {list.paymentState=='0' && list.paymentCode=='1' && (list.orderState == '1' || list.orderState == '3') ?
                            <span className="r">
                              <Link title="去支付" style={{ color: '#3599BB' }} onClick={()=>this.goPay(list.orderId)}>去支付</Link>
                            </span>
                            : ''
                           }
                           {list.orderState == '4' || list.orderState == '5' || list.orderState == '6' ?
                            <span className="r">
                              <Link title="选择退货商品" style={{ color: '#3599BB' }}>选择退货商品</Link>
                            </span>
                            : ''
                           }
                           <span className="r">
                            <Link title="查看详情" to={`/personOrder/orderDetail/${list.orderId}`} style={{ color: '#3599BB' }}>查看详情</Link>
                          </span>
                          </div>
                          {list.sale ?
                           <div className="saleInfo">
                            <Icon type="flag" />
                            {list.sale}
                           </div> :
                           ''
                          }
                         </div> : null
                       }
                      </div>
                      <MyOrderFloor data={list || []} key={index} addCart={this.addCart}></MyOrderFloor>
                    </div>
                  )
                })}
                <div className="orderList_paging" ref="page">
                  <Pagination showQuickJumper current={pageNo} total={orderListTotal || 1} pageSize={pageSize} onChange={this.onChange} />
                <Button onClick={this.goPage}>确定</Button>
                </div>
              </div>
              : <p style={{ textAlign: "center", margin: '10px' }}>无数据</p>
            }
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

export default connect(({ myOrder }) => ({ myOrder }), (dispatch) => { return { dispatch } })(Form.create()(MyOrder))
