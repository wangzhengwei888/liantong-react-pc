import React, {Component} from 'react'
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import {Form, Breadcrumb, Button, Table, Row, Col, Pagination, DatePicker, Input, Select, Icon} from 'antd'
import {Link} from 'dva/router'
import {connect} from 'dva'
import {myConsultList} from './myConsultList.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import MyConsultListFloor from './MyConsultListFloor'

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
 labelCol: {span: 8}
};

class MyConsultList extends Component {
 constructor(props) {
  super(props)
  this.state = {
   startValue: null,
   endValue: null,
   startDate: '',
   endDate: '',
   quoteStatus: '',
   keyword: '',
   endOpen: false,
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
 //翻页
 onPageChange = (pageNo) => {
  let val ={
   pageNo: pageNo
  }
  this.props.dispatch({type: 'myConsultList/quoteOrderListEFF', val});
 }

 onStartChange = (value, dateString) => {
  this.setState({startDate: dateString, startValue: value})
 }

 onEndChange = (value, dateString) => {
  this.setState({endDate: dateString, endValue: value})
 }

 handleStartOpenChange = (open) => {
  if (!open) {
   this.setState({endOpen: true});
  }
 }

 handleEndOpenChange = (open) => {
  this.setState({endOpen: open});
 }

 addCart = (val) => {
  this.props.dispatch({type: 'myConsultList/addCartEFF', val})
 }
 //加入询价单
 goInquiry = (val) => {
  this.props.dispatch({ type:'myConsultList/addInquiryEFF' , val });
 }

 //下拉列表选择
 handleChange = (value) => {
  this.setState({quoteStatus: value})
 }

 handleSubmit = (e) => {
  e.preventDefault();
  let val={
   keyword: this.state.keyword,
   startDate: this.state.startDate,
   endDate: this.state.endDate,
   quoteStatus: this.state.quoteStatus,
   pageNo:1
  }
  console.log(val)
  this.props.dispatch({type: 'myConsultList/quoteOrderListEFF', val});
 }


 render() {
  const {getFieldDecorator} = this.props.form;
  const {sendValues,MyConsultListData} = this.props.myConsultList
  const {startValue, endValue, endOpen} = this.state;
  return (
   <div>
    <Search></Search>
    <Navigation preson={true}>
     <div className={myConsultList}>
      <div className="my_account_dynamic_Topimg"></div>

      <Breadcrumb separator=">" className='security_nav_bar'>
       <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
       <Breadcrumb.Item>我的询价单</Breadcrumb.Item>
      </Breadcrumb>
      <div className="filter_form">
       <Form onSubmit={this.handleSubmit} layout="inline">
        <Col span={4}>
         <FormItem
          {...formItemLayout}>
          {getFieldDecorator('startDate', {setFieldsValue: startValue})(
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
        <Col span={1} style={{width: '10px', paddingTop: '8px', margin: '0 5px'}}>-</Col>
        <Col span={4}>
         <FormItem>
          {getFieldDecorator('endDate', {setFieldsValue: endValue})(
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
        <Col span={7} style={{ paddingLeft: '15px' }}>
         <FormItem label="订单查询：">
          {getFieldDecorator('keyword')(
           <Input placeholder="订单号/商品编号/名称" onChange={(e) => this.setState({keyword: e.target.value})}/>
          )}
         </FormItem>
        </Col>
        <Col span={6}>
         <FormItem label="订单状态">
          {getFieldDecorator('quoteStatus', {initialValue: ''})(
           <Select onChange={this.handleChange}>
            <Option value="">全部询价单</Option>
            <Option value="0">未报价</Option>
            <Option value="1">已报价</Option>
            <Option value="2">已取消</Option>
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
      {/*
            <div className="btn_area" style={{display:'none'}}>
              <span style={{background: '#37b5aa'}}>资质上传</span>
              <span>订单导出</span>
            </div>
            */}
      <div className="orderList_content">
       <Row className="orderList_content_head">
        <Col span={7}>基本信息</Col>
        <Col span={6}>商品属性</Col>
        <Col span={2}>成交单价</Col>
        <Col span={1}>数量</Col>
        <Col span={2} style={{textAlign:"right"}}>小计</Col>
        <Col span={2}>有效期</Col>
        <Col span={2}>备注</Col>
        <Col span={2}>操作</Col>
       </Row>
      </div>
      {MyConsultListData && MyConsultListData.length > 0 ?
       <div>
        {MyConsultListData.map((list, index) => {
         return (
          <div key={index}>
           <div className="orderList_content">
            <div className="orderList_content_head orderList_content_head_sub">
             <span>询价单号：{list.quoteSn}</span>
             <span>状态：<span
              style={{color: '#3599BB'}}>{list.quoteStatus == '0' ? '未报价' : list.quoteStatus == '1' ? '已报价' : '已取消'}</span></span>
             <span>下单时间：<span style={{fontWeight: 'bold', color: '#333'}}>{list.createTimeStr}</span></span>
             <span className="r">
                            <Link title="查看详情" to={`/personOrder/consultDetail/${list.id}/${list.quoteStatus}`} style={{color: '#3599BB'}}>查看详情</Link>
                          </span>
            </div>

           </div>
           <MyConsultListFloor data={list || {}} key={index} addCart={(val) => {this.addCart(val)}} goInquiry={(val)=>{this.goInquiry(val)}}></MyConsultListFloor>
          </div>
         )
        })
        }
        <div className="orderList_paging">
         <Pagination showQuickJumper current={sendValues.pageNo} total={sendValues.ListTotal || 1} pageSize={sendValues.pageSize}
                     onChange={this.onPageChange}/>
        </div>
       </div>
       : <p style={{textAlign: "center", margin: '10px'}}>无数据</p>
      }
     </div>
    </Navigation>
   </div>
  )
 }
}

export default connect(({myConsultList}) => ({myConsultList}), (dispatch) => {
 return {dispatch}
})(Form.create()(MyConsultList))

