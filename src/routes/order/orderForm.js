/**
 * Created by b2b2c on 2017/8/18.
 */
import React , { Component } from 'react';
import { connect } from 'dva';
import { Row, Col,Table,Button} from 'antd';
import { orderForm_body,} from './orderForm.less';
class OrderForm extends Component{
  constructor(props){
    super(props);
    this.state={
      SendOut:false,
      returnedGoods:1,
    }
  }



  render(){

    let operation1 = ()=>{

      if( this.state.ExpandNum){
        return(
          <Button type="primary">退换货</Button>
        )
      }else {
        return(
            <Button type="primary">确认收货</Button>
          )
      }
    }

    let operation2 = ()=>{
      switch (this.state.returnedGoods)
      {
        case 1:
          return(
            <div className="order_operation">
              <a style={{padding:'6px 0',color:'black'}}>待确认</a>
              <a style={{padding:'6px 0',color:'#3497CE'}}>取消申请</a>
            </div>
          )
          break;
        case 2:
          return(
            <div className="order_operation">
              <a style={{padding:'6px 0',color:'rgb(41,168,152)'}}>退货完成</a>
            </div>
          )
          break;
        case 3:
          return(
            <div className="order_operation">
              <a  style={{padding:'6px 0'}}>已拒绝</a>
            </div>
          )
          break;
        case 4:
          return(
            <div className="order_operation">
              <a style={{padding:'6px 0'}}>已取消</a>
            </div>
          )
          break;
      }
    }

    const columns1 = [{
      title: '发货时间',
      dataIndex: 'GoodsNmae',
      className:'text_center',
    }, {
      title: '发货批号',
      dataIndex: 'Units',
      className:'text_center',
    }, {
      title: '生产日期',
      dataIndex: 'Price',
      className:'text_center',
    },{
      title: '有效期',
      dataIndex: 'Orders',
      className:'text_center',
    }, {
      title: '发货数量',
      dataIndex: 'Specifleds',
      className:'text_center',
    }, {
      title: '发货备注',
      dataIndex: 'Receiving',
      className:'text_center',
    },{
      title: '收货数量',
      dataIndex: 'SalesReturn',
      className:'text_center',
    }, {
      title: '收货时间',
      dataIndex: 'Total',
      className:'text_center',
    }, {
      width:'',
      title: '状态',
      dataIndex: 'state',
      className:'text_center',
    },{
      width:'',
      title: '操作',
      dataIndex: 'operation',
      className:'text_center',
    }];

    const data1 = [{
      key: '1',
      GoodsNmae:'2017-08-18 14:09:53',
      Units: '盒',
      Price: '￥300',
      Orders: '1',
      Specifleds: '1',
      Receiving: '1',
      SalesReturn: '1',
      Total: '1',
      state: '订单已发货',
      operation:operation1() ,
    },{
      key: '2',
      GoodsNmae:'2017-08-18 14:09:53',
      Units: '盒',
      Price: '￥300',
      Orders: '1',
      Specifleds: '1',
      Receiving: '1',
      SalesReturn: '1',
      Total: '1',
      state: '订单已发货',
      operation: operation1(),
    }, ];

    const columns2 = [{
      title: '发货时间',
      dataIndex: 'GoodsNmae',
      className:'text_center',
    }, {
      title: '发货批号',
      dataIndex: 'Units',
      className:'text_center',
    }, {
      title: '生产日期',
      dataIndex: 'Price',
      className:'text_center',
    },{
      title: '有效期',
      dataIndex: 'Orders',
      className:'text_center',
    }, {
      title: '发货数量',
      dataIndex: 'Specifleds',
      className:'text_center',
    }, {
      title: '发货备注',
      dataIndex: 'Receiving',
      className:'text_center',
    },{
      title: '收货数量',
      dataIndex: 'SalesReturn',
      className:'text_center',
    }, {
      title: '收货时间',
      dataIndex: 'Total',
      className:'text_center',
    }, {
      width:'',
      title: '状态',
      dataIndex: 'state',
      className:'text_center',
    },{
      width:'',
      title: '操作',
      dataIndex: 'operation',
      className:'text_center',
    }];

    const data2 = [{
      key: '1',
      GoodsNmae:'2017-08-18 14:09:53',
      Units: '盒',
      Price: '￥300',
      Orders: '1',
      Specifleds: '1',
      Receiving: '1',
      SalesReturn: '1',
      Total: '1',
      state: '订单已发货',
      operation: operation2(),
    }, ];
    return(
      <div className={orderForm_body}>
        <div className="order_box1">
          <h3>订单信息</h3>
          <Row type="flex" justify="space-between" className="lineheight_32">
            <Col span={12}>订单明细编号：<span>1212231232124</span></Col>
            <Col style={{textAlign:'right'}} span={12}>订单日期：<span>2017-08-18 11:54:39</span></Col>
          </Row>
          <Row type="flex" justify="space-between" className="lineheight_32">
            <Col span={7}>商品名称：<span>达美康</span></Col>
            <Col span={7}>规<span style={{margin:'0px 10px'}}></span>格：<span>￥139</span></Col>
            <Col span={6}>单<span style={{margin:'0px 10px'}}></span>位：<span>￥139</span></Col>
            <Col style={{textAlign:'right'}} span={4}>单<span style={{margin:'0px 10px'}}></span>价：<span>￥139</span></Col>
          </Row>
          <Row type="flex"  className="lineheight_32">
            <Col span={7}>生产厂家：<span>天津华金制药</span></Col>
            <Col span={7}>订单数量：<span>10</span></Col>
          </Row>
        </div>
        <div className="order_box2">
          <h3>发货明细</h3>
          <Table
            columns={columns1}
            dataSource={data1}
            bordered
            //footer={() => ''}
          />
        </div>
        <div className="order_box2" style={{borderTop:'1px solid rgb(228,228,228)'}}>
          <h3>产品清单</h3>
          <Table
            columns={columns2}
            dataSource={data2}
            bordered
            //footer={() => ''}
          />
        </div>
      </div>
    );
  }
}

export default connect(({orderForm})=>({orderForm}),(dispatch,own)=>{return {dispatch,own}})(OrderForm);
