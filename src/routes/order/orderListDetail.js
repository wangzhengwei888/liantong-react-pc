/**
 * Created by b2b2c on 2017/8/14.
 */
import React , { Component } from 'react';
import { connect } from 'dva';
import { Row, Col,Table,Button} from 'antd';
import { orderDetail_body,} from './orderDetail.less';


class OrderListDetail extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }



  sureOrder = (record) => {
    let val = {
      deliveryId:record.deliveryId,
      itemOrderId:record.orderRecId,
      receiveNum:record.sendNum
    }
    this.props.dispatch({type:'order/personSureOrder',val})
  }

  addCarshop = (recordt) => {
    let price = this.props.order.personOrderItemDetailData[0].discountPrice;
    this.props.dispatch({ type: 'order/addCartEFF',goodsId:recordt.goodsId,goodsPrice:price,count:recordt.sendNum});
    this.props.dispatch({type:'app/getcartCountEFF'});
  }

  render(){
    console.log(this.props.order.personOrderItemDetailData)
    const itemDetailData = this.props.order.personOrderItemDetailData;
    const columns = [{
      title: '发货时间',
      dataIndex: 'sendDateStr',
      key: 'sendDateStr',
      className:'text_center',
    }, {
      title: '发货批号',
      dataIndex: 'lotno',
      key: 'lotno',
      className:'text_center',
    }, {
      title: '生产日期',
      dataIndex: 'prdDateStr',
      key: 'prdDateStr',
      className:'text_center',
    },{
      title: '有效期',
      dataIndex: 'endDateStr',
      key: 'endDateStr',
      className:'text_center',
    }, {
      title: '发货数量',
      dataIndex: 'sendNum',
      key: 'sendNum',
      className:'text_center',
    }, {
      title: '发货备注',
      dataIndex: 'sendRemark',
      key: 'sendRemark',
      className:'text_center',
    },{
      title: '收货数量',
      dataIndex: 'receiveNum',
      key: 'receiveNum',
      className:'text_center',
    }, {
      title: '收货时间',
      dataIndex: 'receiveDateStr',
      key: 'receiveDateStr',
      className:'text_center',
    }, {
      title: '状态',
      dataIndex: 'deliveryStatusStr',
      className:'text_center',
    }, {
      title: '操作',
      dataIndex: 'orderRecId',
      key: 'orderRecId',
      className:'text_center',
      render: (text, record, index) => {
        if(record.deliveryStatus == "0"){
          return <div className="order_operation">
            <div>无</div>
          </div>
        }else if(record.deliveryStatus == "1"){
          return <div className="order_operation">
            <Button style={{margin:'auto'}} type="primary" onClick={()=>{this.sureOrder(record)}}>确认收货</Button>
            <Button style={{margin:'10px auto 0 auto'}} type="primary">拒收</Button>
          </div>
        }else if(record.deliveryStatus == "2"){
          return <div className="order_operation">
            <Button style={{margin:'auto'}} type="primary" onClick={()=>{this.addCarshop(record)}}>再次购买</Button>
            <Button style={{margin:'auto'}} type="primary" onClick={()=>{this.sureOrder(record)}}>确认收货</Button>
          </div>
        }else if(record.deliveryStatus == "3"){
          return <div className="order_operation">
            <Button style={{margin:'auto'}} type="primary" onClick={()=>{this.addCarshop(record)}}>再次购买</Button>
          </div>
        }

      }
    }];

    const columns1 = [{
      title: '退货时间',
      dataIndex: 'createTimeStr',
      key: 'createTimeStr',
      className:'text_center',
    }, {
      title: '退货批号',
      dataIndex: 'batchNo',
      key: 'batchNo',
      className:'text_center',
    }, {
      title: '生产日期',
      dataIndex: 'prdDateStr',
      key: 'prdDateStr',
      className:'text_center',
    },{
      title: '有效期',
      dataIndex: 'endDateStr',
      key: 'endDateStr',
      className:'text_center',
    }, {
      title: '退货数量',
      dataIndex: 'goodsNum',
      key: 'goodsNum',
      className:'text_center',
    }, {
      title: '退货说明',
      dataIndex: 'buyerMessage',
      key: 'buyerMessage',
      className:'text_center',
    },{
      title: '卖家说明',
      dataIndex: 'sellerMessage',
      key: 'sellerMessage',
      className:'text_center',
    }, {
      title: '处理时间',
      dataIndex: 'sellerTimeStr',
      key: 'sellerTimeStr',
      className:'text_center',
    },  {
      title: '操作',
      dataIndex: 'refundId',
      key: 'refundId',
      className:'text_center',
      render: (text, record) => {
        return <div className="order_operation">
          <Button style={{margin:'auto'}} type="primary">确认收货</Button>
        </div>
      }
    }];


    return(
      itemDetailData.length > 0 ?
      <div className={orderDetail_body}>
        <div className="order_box1">
          <h3>订单信息</h3>
          <Row type="flex" justify="space-between" className="lineheight_32">
            <Col span={18}>订单明细编号：<span>{itemDetailData[0].orderItemId || ""}</span></Col>
            <Col span={6} >订单日期：<span>{itemDetailData[0].orderCreateDateStr || ""}</span></Col>
          </Row>
          <Row type="flex" justify="space-between" className="lineheight_32">
            <Col span={6}>商品总价：<span style={{color:'red'}}>￥{itemDetailData[0].orderTransAmount || ""}</span></Col>
            <Col span={6}>规格：<span style={{color:'red'}}>{itemDetailData[0].specName || ""}</span></Col>
            <Col span={6}>单位：<span style={{color:'red'}}>{itemDetailData[0].sellerGoodsUnit || ""}</span></Col>
            <Col span={6}>单价：<span style={{color:'red'}}>￥{itemDetailData[0].discountPrice || ""}</span></Col>
          </Row>
          <Row type="flex" justify="space-between" className="lineheight_32">
            <Col span={6}>生产厂家：<span style={{color:'red'}}>{itemDetailData[0].sellerGoodsBrand || ""}</span></Col>
            <Col span={6}>商品数量：<span style={{color:'red'}}>{itemDetailData[0].productSellBillQty || ""}</span></Col>
            <Col span={6}>订单状态：<span style={{color:'red'}}>{itemDetailData[0].orderStatusMemo || ""}</span></Col>
            <Col span={6}></Col>
          </Row>
        </div>
        <div className="order_box2">
          <h3>发货明细</h3>
          <Table
            columns={columns}
            dataSource={itemDetailData[0].deliveryList}
            bordered
            pagination={false}
          />
        </div>
        <div className="order_box2">
          <h3>退货信息</h3>
          <Table
            columns={columns1}
            dataSource={itemDetailData[0].refundReturnList}
            bordered
            pagination={false}
          />
        </div>
      </div> : <div style={{textAlign:'center'}}>没有数据</div>
    );
  }
}

export default connect(({order})=>({order}),(dispatch,own)=>{return {dispatch,own}})(OrderListDetail);


