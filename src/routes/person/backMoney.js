/**
 * 个人中心退货
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Form,Select,Input,Row,Col,DatePicker,Button,Table, Icon } from 'antd';
import Img from '../../components/Img/Img';
import { backMoney_body } from './backMoney.less';


const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 8 }
};
const columns = [{
  title: '订单编号',
  dataIndex: 'orderNumber',
  key: 'orderNumber',
}, {
  title: '退货编号',
  dataIndex: 'backGoodsNumber',
  key: 'backGoodsNumber',
}, {
  title: '商户名称',
  dataIndex: 'storeName',
  key: 'storeName',
},{
  title: '退货时间',
  dataIndex: 'backGoodsTime',
  key: 'backGoodsTime',
},{
  title: '卖家审核',
  dataIndex: 'busAuditing',
  key: 'busAuditing',
},{
  title: '平台退款',
  dataIndex: 'returnMoney',
  key: 'returnMoney',
}, {
  title: '操作',
  key: 'action',
  render: () => (
    <span>
      <Link to="/person/backDetail" style={{color:'#333'}} >查看</Link>
    </span>
  ),
}];

let data = [{
  key: '1',
  orderNumber: '20170902',
  backGoodsNumber: '20170902',
  storeName: '衣品天成',
  backGoodsTime:'20170909',
  busAuditing:'同意',
  returnMoney:'待处理'
},{
  key: '2',
  orderNumber: '20170902',
  backGoodsNumber: '20170902',
  storeName: '衣品天成',
  backGoodsTime:'20170909',
  busAuditing:'同意',
  returnMoney:'待处理'
},{
  key: '3',
  orderNumber: '20170902',
  backGoodsNumber: '20170902',
  storeName: '衣品天成',
  backGoodsTime:'20170909',
  busAuditing:'同意',
  returnMoney:'待处理'
},{
  key: '4',
  orderNumber: '20170902',
  backGoodsNumber: '20170902',
  storeName: '衣品天成',
  backGoodsTime:'20170909',
  busAuditing:'同意',
  returnMoney:'待处理'
}];


class  BackGoods extends Component{
  constructor(props){
    super(props);
    this.state={
      startValue: null,
      endValue: null,
      endOpen: false,
      data: [],
      pagination: {},
      loading: true,
    }
  }
  componentWillUnmount(){

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

  componentDidMount() {
    const pagination = { ...this.state.pagination };
    pagination.total = 200;
    pagination.pageSize = 4;
    let _this = this;
    setTimeout(function(){
      console.log("aaa")
      _this.setState({
        data:data,
        loading: false,
        pagination
      })
    },1000)
  }


  render (){
    const { getFieldDecorator } = this.props.form;
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div className={backMoney_body}>
        <div className="backMoney_content">
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">客户服务 > </a>
            <span>退款记录</span>
          </div>

          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={2} style={{marginRight:'6px'}}>
                <FormItem>
                  {getFieldDecorator('select',{initialValue:'order'})(
                    <Select>
                      <Option value="order">订单编号</Option>
                      <Option value="goods">退货编号</Option>
                      <Option value="name">店铺名</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={4} style={{marginRight:'50px'}}>
                <FormItem>
                  {getFieldDecorator('username')(
                    <Input placeholder="订单编号/退货编号/店铺名" />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  label="退货时间"
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
              <Col span={1} style={{width:'10px',paddingTop:'8px'}}>-</Col>
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
              <Col>
                <FormItem
                  wrapperCol={{ span: 6}}
                  style={{float:'right'}}
                >
                  <Button type="primary" htmlType="submit">搜索</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
          {/*列表*/}
          <Table columns={columns}
                 dataSource={this.state.data}
                 pagination={this.state.pagination}
                 loading={this.state.loading}
                 onChange={this.handleTableChange}
          />

        </div>
      </div>
    );
  }
}

export default connect(({BackGoods})=>({BackGoods}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(BackGoods));
