/**
 * Created by b2b2c on 2017/8/14.
 */
import React , { Component } from 'react';
import { connect } from 'dva';
import { Row, Col,Table,Button} from 'antd';
import { routerRedux,Link} from 'dva/router';
import { orderDetail_body,} from './orderDetail.less';



class OrderDetail extends Component{
  constructor(props){
    super(props);
    this.state={
        data : this.props.order.personOrderDetailData.length > 0 ? this.props.order.personOrderDetailData[0].orderItemsList.slice(0,3) : [],
        onOff:true
    }
  }


  onClick = (id) => {
    console.log(id)
    this.props.dispatch(routerRedux.push(`/person/orderListDetail/${id}`));
  }

  onChangeLength = () => {
    if(this.state.onOff){
      this.setState({
        data:this.props.order.personOrderDetailData[0].orderItemsList
      })
    }else{
      this.setState({
        data:this.props.order.personOrderDetailData[0].orderItemsList.slice(0,3)
      })
    }
    this.setState({
      onOff:!this.state.onOff
    })
  }



  render(){
    const detailData = this.props.order.personOrderDetailData;
    let orderState = (goods) => {
      console.log(goods)
      if(goods.orderStatus == '1'){
        return(
          <div className="goods_div2">
            <div>{goods.orderStatusMemo}</div>
            {/*<span style={{color:'red',cursor:'pointer'}}>取消订单</span>*/}
            <Link to={`/person/orderListDetail/${goods.orderItemId}`} style={{color:'red',}}>查看明细</Link>
          </div>
        )
      }
      if(goods.orderStatus == '2'){
        return(
          <div className="goods_div2">
            <div>{goods.orderStatusMemo}</div>
            <Link to={`/person/orderListDetail/${goods.orderItemId}`} style={{color:'red',}}>查看明细</Link>
          </div>
        )
      }else if(goods.orderStatus == '3'){
        return(
          <div className="goods_div2">
            <div>{goods.orderStatusMemo}</div>
            <Link to={`/person/orderListDetail/${goods.orderItemId}`} style={{color:'red',}}>查看明细</Link>
          </div>
        )
      }else if(goods.orderStatus == '4'){
        return(
          <div className="goods_div2">
            <div>{goods.orderStatusMemo}</div>
            <Link to={`/person/orderListDetail/${goods.orderItemId}`} style={{color:'red',}}>查看明细</Link>
            {/*<Link to={`/person/orderListDetail/${goods.orderItemId}`} style={{color:'red',}}>确认收货</Link>*/}
          </div>
        )
      }else if(goods.orderStatus == '5'){
        return(
          <div className="goods_div2">
            <div>{goods.orderStatusMemo}</div>
            <Link to={`/person/orderReturns/${goods.orderItemId}`} style={{color:'red',}}>退换货</Link>
            <Link to={`/person/orderListDetail/${goods.orderItemId}`} style={{color:'red',}}>查看明细</Link>
            <span style={{color:'red',cursor:"pointer"}} onClick={() => this.addCarshop(goods.goodsId,goods.channelPrice,'1')}>再次购买</span>
          </div>
        )
      }
    }
    const columns = [{
      key:'sellerGoodsName',
      title: '商品名称',
      dataIndex: 'sellerGoodsName',
      className:'text_center',
      render: (text, record) => {
        return <div className="order_goods">
          <div style={{border:'1px solid #ddd'}}><img style={{width:'100px',height:'100px',}} src={record.goodsImage} /></div>
          <div style={{textAlign:'left',fontSize:'.8rem'}}>
            <h4 style={{padding:'6px 0',fontWeight:'bold'}}>{record.sellerGoodsName}</h4>
            <p style={{padding:'6px 0'}}>生产厂家：{record.sellerGoodsBrand}</p>
            <p style={{padding:'6px 0'}}>规格：{record.specName}</p>
            <p style={{padding:'6px 0'}}>剂型：{record.dosageForm}</p>
          </div>
        </div>
      }
    }, {
      key:'sellerGoodsUnit',
      title: '单位',
      dataIndex: 'sellerGoodsUnit',
      className:'text_center',
    }, {
      title: '单价',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      className:'text_center',
    },{
      title: '订单数量',
      dataIndex: 'productSellBillQty',
      key: 'productSellBillQty',
      className:'text_center',
    }, {
      title: '发货数量',
      dataIndex: 'Specifleds',
      key: 'Specifleds',
      className:'text_center',
    }, {
      title: '收货数量',
      dataIndex: 'Receiving',
      key: 'Receiving',
      className:'text_center',
    },{
      title: '退货数量',
      dataIndex: 'SalesReturn',
      key: 'SalesReturn',
      className:'text_center',
    }, {
      title: '商品总价',
      dataIndex: 'Total',
      key: 'Total',
      className:'text_center',
    }, {
      width:'14%',
      title: '状态与操作',
      dataIndex: 'Operation',
      key: 'Operation',
      className:'text_center',
      render: (text, record) => {
        console.log(record)
          return (orderState(record))
      }
    }];


    return(
      detailData.length > 0 ?
        (<div className={orderDetail_body}>
          <div className="order_box1">
            <h3>订单信息</h3>
            <Row type="flex" justify="space-between" className="lineheight_32">
              <Col span={6} style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>订单编号：{detailData[0].orderId || ""}</Col>
              <Col span={6}>卖家名称：<span style={{color:'red'}}>{detailData[0].storeName || ""}</span></Col>
              <Col span={6}>订单状态：<span style={{color:'red'}}>{detailData[0].orderStateMemo || ""}</span></Col>
              <Col span={6}>支付状态：<span style={{color:'red'}}>{detailData[0].paymentStateStr || ""}</span></Col>
            </Row>
            <Row type="flex" justify="space-between" className="lineheight_32">
              <Col span={6}>商品总金额：<span style={{color:'red'}}>￥{detailData[0].goodsAmount || ""}</span></Col>
              <Col span={6}>应付金额：<span style={{color:'red'}}>￥{detailData[0].orderAmount || ""}</span></Col>
              <Col span={6}>运费价格：<span style={{color:'red'}}>￥{detailData[0].shippingFee || ""}</span></Col>
              <Col span={6}>优惠金额：<span style={{color:'red'}}>￥0</span></Col>
            </Row>
            <Row type="flex" justify="space-between" className="lineheight_32">
              <Col span={6}>支付方式：<span>{detailData[0].paymentName || ""}</span></Col>
              <Col span={6}>余额支付：<span style={{color:'red'}}>￥0</span></Col>
              <Col span={6}>下单时间：<span style={{color:'red'}}>{detailData[0].createTimeStr || ""}</span></Col>
              <Col span={6}></Col>
            </Row>
          </div>
          <div className="order_box1">
            <h3>收货人信息</h3>
            <Row type="flex" justify="space-between">
              <Col span={5}>收货人：<span>{detailData[0].buyerName || ""}</span></Col>
              <Col span={5}>手机号：<span>{detailData[0].buyerTel || ""}</span></Col>
              <Col span={5}>邮编：<span>12139</span></Col>
            </Row>
            <p>收货地址：<span>{detailData[0].addressName || ""}</span></p>
          </div>
          <div className="order_box1">
            <h3>发票信息</h3>
            <p><span style={{marginRight:'20px'}}>增值税发票</span><span style={{color:'rgb(129,163,235)',cursor:'pointer'}}>查看</span></p>
          </div>
          <div className="order_box2">
            <h3>产品清单</h3>
            <Table
              columns={columns}
              dataSource={this.state.data.length > 0 ? this.state.data : this.props.order.personOrderDetailData[0].orderItemsList.slice(0,3)}
              bordered
              pagination={false}
            />
            {this.props.order.personOrderDetailData[0].orderItemsList.length > 3 ? <p style={{textAlign:'center',cursor:'pointer',padding:'10px 0'}} onClick={this.onChangeLength}>{this.state.onOff ? "点击查看更多" : "点击折叠"}</p> : ""}
          </div>
        </div>)
        : <div></div>

    );
  }
}

export default connect(({order})=>({order}),(dispatch,own)=>{return {dispatch,own}})(OrderDetail);


