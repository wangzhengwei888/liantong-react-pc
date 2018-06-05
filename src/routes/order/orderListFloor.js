/**
 * Created by b2b2c on 2017/8/15.
 */
import React , { Component } from 'react';
import { connect } from 'dva';
import { routerRedux,Link} from 'dva/router';
import { Row,Col,Menu, Dropdown,Icon,Breadcrumb,Input,Button,Pagination} from 'antd';
import Img from '../../components/Img/Img';
// import { orderList_body,} from './orderList.less';


class OrderListFloor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : props.data,
      goodsData : props.data.orderItemsList.length > 0 ? props.data.orderItemsList.slice(0,3) : props.data.orderItemsList,
      onOff:true
    }
  }



  onChange = () => {
    this.setState({
      goodsData : this.state.onOff ? this.state.data.orderItemsList : this.state.data.orderItemsList.slice(0,3) ,
      onOff:!this.state.onOff
    })
  }

  addCarshop = (goodsId,channelPrice,count) => {
    console.log(goodsId,channelPrice,count);
    this.props.dispatch({ type: 'storegoodsList/addCartEFF',goodsId:goodsId,goodsPrice:channelPrice,count:count});
    this.props.dispatch({type:'app/getcartCountEFF'});
  }



  render(){
    const data = this.state.data;
    console.log(data)
    //总单
    let orderState = (goods) => {
      // console.log(goods)
      if(goods.orderStateStr == '3'){
        return(
          <div className="goods_div2">
              <Button style={{margin:'auto'}} type="primary" onClick={console.log("aaaaa")}>确认收货</Button>
          </div>
        )
      }
    }
    //细单
    let listorderState = (goods) => {
      console.log(goods)
      if(goods.orderStatus == '1'){
        return(
          <div className="goods_div2">
            <div>{goods.orderStatusMemo}</div>
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
    return(
          <div className="orderList_content_goods">
            <Row  style={{backgroundColor:'rgb(242,242,242)',paddingTop:'3px',paddingBottom:'3px'}}>
              <Col span={5} style={{textOverflow: 'ellipsis',wordBreak: 'break-all',lineHeight:'30px'}}>订单编号:<span>{data.orderSn || ""}</span></Col>
              <Col span={5}>购买时间：<span>{data.createTimeStr || ""}</span></Col>
              <Col span={5}>店铺名称：<Link to={`/store/${data.storeId}`}>{data.storeName || ""}</Link></Col>
              <Col span={5}>订单金额：<span style={{color:'red',fontWeight:'bold'}}>￥{data.orderAmount || ""}</span></Col>
              <Col span={4}>商品个数：<span>{data.goodsTotalNum}</span></Col>
            </Row>
            <Row  style={{backgroundColor:'rgb(242,242,242)',paddingTop:'3px',paddingBottom:'3px'}}>
              <Col span={5}>支付方式：<span style={{color:'red',fontWeight:'bold'}}>{data.paymentName || ""}</span></Col>
              {data.paymentName == "在线支付" ?
                <Col span={5}>支付状态：<span style={{color:'red',fontWeight:'bold'}}>{data.paymentStateStr || ""}</span></Col> :
                <Col span={5}></Col>
              }

              <Col span={5}>订单状态：<span style={{color:'red',fontWeight:'bold'}}>{data.orderStateMemo || ""}</span></Col>
              <Col span={5}><span style={{color:'red',fontWeight:'bold'}}>{orderState(data)}</span></Col>
              <Col span={4}><Link to={`/person/orderDetail/${data.orderId}`} className="bc_img">查看详情</Link></Col>
            </Row>
            {this.state.goodsData.map((goods,i)=>{
                return(
                  <table key={i} className="border_bottom">
                    <tr>
                      <td style={{width:'51%'}}>
                        <div className="goods_div1">
                          <Img style={{width:'100px',height:'100px',margin:'2px 32px'}} src={goods.goodsImage} />
                          <div style={{margin:'0px 32px',textAlign:'left'}}>
                            <p>{goods.sellerGoodsName}</p>
                            <p>厂家：{goods.sellerGoodsBrand}</p>
                            <p>规格：{goods.specName} </p>
                            <p>剂型：{goods.dosageForm} </p>
                          </div>
                        </div>
                      </td>
                      <td style={{width:'8%'}}>{goods.sellerGoodsUnit}</td>
                      <td className='border_left' style={{width:'8%'}} >￥{goods.discountPrice}</td>
                      <td className='border_left' style={{width:'8%'}} >{goods.productSellBillQty}</td>
                      <td className='border_left' style={{width:'8%'}} >
                        <div>
                          <p>{goods.orderTransAmount}</p><span>（免运费）</span>
                        </div>
                      </td>
                      <td className='border_left'>
                        {listorderState(goods)}
                      </td>
                    </tr>
                  </table>
                )
            })}
            {data.orderItemsList.length > 5 ? (<p style={{borderBottom:'1px solid #e4e4e4',cursor:'pointer'}} onClick={this.onChange}>{this.state.onOff ? "点击查看更多" :"点击折叠"}</p>)
              : null}

          </div>
    )
  }
}

export default connect(({order,storegoodsList})=>({order,storegoodsList}),(dispatch,own)=>{return {dispatch,own}})(OrderListFloor);
