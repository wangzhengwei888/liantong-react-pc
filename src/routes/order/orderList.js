/**
 * Created by b2b2c on 2017/8/15.
 */
import React , { Component } from 'react';
import { connect } from 'dva';
import { routerRedux,Link} from 'dva/router';
import { Row,Col,Menu, Dropdown,Icon,Form,Breadcrumb,Input,Button,Pagination,Select} from 'antd';
import { orderList_body,} from './orderList.less';
import OrderListFloor from './orderListFloor';
const FormItem = Form.Item;
const Option = Select.Option;
function onChange(pageNumber) {
  console.log('Page: ', pageNumber);
}
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show:false
    }
  }

  showFilter = () => {
    this.setState({
      show:!this.state.show
    })
  }

  onChange = (pageNumber) => {
    let val ={
      pageNo:pageNumber
    }
    this.props.dispatch({type:'order/personOrderListEFF',val})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, val) => {
      if (!err) {
        val.pageNo = 1;
        console.log(val);
        this.props.dispatch({type:'order/personOrderListEFF',val})
      }
    });
  }
  render(){
    const {personOrderListData,orderListTotal} = this.props.order;
    const { getFieldDecorator } = this.props.form;
    return(
      <div className={orderList_body}>
        <div className="orderList_head">
          <Breadcrumb separator=">">
            <Breadcrumb.Item><a>我的商城</a></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/person/orderList">我的订单</Link></Breadcrumb.Item>
            <Breadcrumb.Item><a style={{fontWeight:'bold',fontSize:'14px'}} href="">订单列表</a></Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="orderList_search">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={6}>
                <FormItem {...formItemLayout} label="商品名称">
                  {getFieldDecorator('goodsCondition')(
                    <Input placeholder="商品编号/名称" />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label="订单状态">
                  {getFieldDecorator('status',{initialValue:'01'})(
                    <Select >
                      <Option value="01">待付款</Option>
                      <Option value="02">已付款，待确认</Option>
                      <Option value="03">已确认，待发货</Option>
                      <Option value="04">已发货</Option>
                      <Option value="05">已收货</Option>
                      <Option value="06">已完成</Option>
                      <Option value="07">待审核</Option>
                      <Option value="99">已取消</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6} style={{textAlign:'center'}}>
                <FormItem {...formItemLayout}>
                <span style={{color:'#3497ce',cursor:"pointer"}}
                      className="ant-dropdown-link"
                      onClick={this.showFilter}
                >
                  高级搜索 <Icon type={this.state.show ? "up" : "down"} />
                </span>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout}>
                  <Button type="primary" htmlType="submit" ghost>搜索</Button>
                </FormItem>
              </Col>
            </Row>
            <Row className={this.state.show ? "showClass" : 'hideClass'}>
              <Col span={6}>
                <FormItem {...formItemLayout} label="总订单号">
                  {getFieldDecorator('orderId')(
                    <Input placeholder="总订单号" />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label="明细订单号">
                  {getFieldDecorator('orderItemId')(
                    <Input placeholder="明细订单号" />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label="厂家名称">
                  {getFieldDecorator('brandName')(
                    <Input placeholder="厂家名称" />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem {...formItemLayout} label="规格名称">
                  {getFieldDecorator('specName')(
                    <Input placeholder="规格名称" />
                  )}
                </FormItem>
              </Col>
            </Row>




          </Form>
        </div>
        <div className="orderList_content">
          <Row className="orderList_content_head">
            <Col span={12}>商品信息</Col>
            <Col span={2}>单位</Col>
            <Col span={2}>单价（元）</Col>
            <Col span={2}>数量</Col>
            <Col span={2}>价格</Col>
            <Col span={4}>状态与操作</Col>
          </Row>
          {!!personOrderListData && personOrderListData.length > 0 ?
              <div>
                {personOrderListData.map((list,index)=>{
                return (<OrderListFloor data={list || [] } key={index}></OrderListFloor>)
              })}
                <div className="orderList_paging">
                  <Pagination showQuickJumper defaultCurrent={1} total={orderListTotal} pageSize={10} onChange={this.onChange} />
                </div>
              </div>


            : <p style={{textAlign:"center",margin:'10px'}}>无数据</p>
          }


        </div>

      </div>
    )
  }
}

export default connect(({order})=>({order}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(OrderList));
