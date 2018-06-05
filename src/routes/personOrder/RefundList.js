import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Form, Breadcrumb, Button, Table, Row, Col, Pagination, DatePicker, Input, Select } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { refund_list } from './RefundList.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import RefundListFloor from './RefundListFloor'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 8 }
};

class RefundList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      data: [],
      pagination: {},
      loading: true,
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

  onChange = (field, value,dateString) => {
    console.log(field,value,dateString)
    this.setState({
      [field]: dateString,
    });
  }

  onStartChange = (value,dateString) => {
    this.onChange('startValue', value,dateString);
  }

  onEndChange = (value,dateString) => {
    this.onChange('endValue', value,dateString);
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
    this.setState({loading:true});
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    data = data.concat(data);
    let _this = this;
    setTimeout(function(){
      _this.setState({
        pagination: pager,
        data:data,
        loading: false,
      });
    },2000)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { personConsultListData, consultListTotal, orderListFilterDate ,refundListData} = this.props.refundList

    const { startValue, endValue, endOpen } = this.state;
    console.log(refundListData)
    return (
      <div>
       <Search></Search>
       <Navigation preson={true}>
          <div className={refund_list}>
            <div className="my_account_dynamic_Topimg"></div>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="/personOrder/refundList">售后申请</Breadcrumb.Item>
              <Breadcrumb.Item href="/personOrder/refundList" style={{fontSize:'16px', fontWeight:'bold' }}>售后申请记录</Breadcrumb.Item>
            </Breadcrumb>
            <div className="filter_form">
              <Form onSubmit={this.handleSubmit} layout="inline">
                <Col span={4}>
                  <FormItem
                    {...formItemLayout}>
                    {getFieldDecorator('startValue',{setFieldsValue:startValue})(
                      <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD"
                        placeholder="开始日期"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={1} style={{width:'10px',paddingTop:'8px',margin: '0 5px'}}>-</Col>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('endValue',{setFieldsValue:endValue})(
                      <DatePicker
                        disabledDate={this.disabledEndDate}
                        showTime
                        format="YYYY-MM-DD"
                        placeholder="结束日期"
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col span={6} style={{marginLeft:'40px'}}>
                  <FormItem label="退货单查询：">
                    {getFieldDecorator('username')(
                      <Input placeholder="订单号/商品编号/名称" />
                    )}
                  </FormItem>
                </Col>
                <Col span={5} style={{marginLeft:'30px'}}>
                  <FormItem label="退货单状态：">
                    {getFieldDecorator('select',{initialValue:'all'})(
                      <Select>
                        <Option value="all">全部申请表</Option>
                        <Option value="submit">申请已提交</Option>
                        <Option value="accept">申请已受理</Option>
                        <Option value="comfirm">申请已确认</Option>
                        <Option value="refund">客户已退货</Option>
                        <Option value="complete">申请已完成</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={2}>
                  <FormItem {...formItemLayout}>
                    <Button type="primary" htmlType="submit" ghost>搜索</Button>
                  </FormItem>
                </Col>
              </Form>
            </div>
            <div className="orderList_content">
              <Row className="orderList_content_head">
                <Col span={8}>基本信息</Col>
                <Col span={4}>商品属性</Col>
                <Col span={8}>批号</Col>
                <Col span={4}>退货数量</Col>
              </Row>
            </div>
            {!!personConsultListData && personConsultListData.length > 0 ?
              <div>
                {personConsultListData.map((list,index)=>{
                return (
                  <div key={index}>
                    <div className="orderList_content">
                      <div className="orderList_content_head orderList_content_head_sub">
                        <span>退货号：{list.orderId}</span>
                        <span>状态：<span style={{color: '#3599BB'}}>{list.orderStateMemo}</span></span>
                        <span>提交时间：<span style={{fontWeight: 'bold', color: '#333'}}>{list.createTimeStr}</span></span>
                        <span className="detail_btn">
                          <Link title="查看详情" to={`/personOrder//${list.orderId}`}>查看详情</Link>
                        </span>
                      </div>
                    </div>
                    <RefundListFloor data={list || [] } key={index}></RefundListFloor>
                  </div>
                )
              })}
                <div className="orderList_paging">
                  <Pagination showQuickJumper defaultCurrent={1} total={consultListTotal} pageSize={10} onChange={this.onChange} />
                </div>
              </div>
              : <p style={{textAlign:"center",margin:'10px'}}>无数据</p>
            }
          </div>
       </Navigation>
      </div>
    )
  }  
}

export default connect(({refundList})=>({refundList}),(dispatch)=>{return {dispatch}})(Form.create()(RefundList))
