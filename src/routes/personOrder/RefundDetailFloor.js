import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux,Link} from 'dva/router';
import { Row,Col,Menu, Dropdown,Icon,Breadcrumb,Input,Button,Pagination} from 'antd';
import Img from '../../components/Img/Img';

class RefundDetailFloor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      goodsData: props.data.orderItemsList,
      isGivePrice: props.isGivePrice
      // onOff: true
    }
  }
  render() {
    const data = this.state.data;
    return (
      <div>
        {this.state.goodsData.map((goods,i)=>{
          let status_deleted = goods.orderStatus == 1
            return (
              <table key={i} className="border_bottom">
                <tbody>
                  <tr className={!status_deleted ? 'hasDeleted' : ''}>
                    <td style={{width:'38%'}} >
                      <div className="goods_div1">
                        <Img style={{width:'105px',height:'105px',margin:'2px 5px 2px 0'}} src={goods.goodsImage} />
                        <div style={{margin:'18px 0 18px 15px',textAlign:'left'}}>
                          <p style={{fontSize:'16px',color:'#333',lineHeight:'22px',marginBottom:'16px'}}>{goods.sellerGoodsName}</p>
                          <p>商品编号：{goods.productBuyBillQty}</p>
                          <p>品牌：{goods.productBuyBillQty}</p>
                          <p>规格：{goods.specName} </p>
                          <p>包装：{goods.goodsSpec} </p>
                          <p>储存条件：{goods.storageCondition} </p>
                        </div>
                      </div>
                    </td>
                    <td style={{width:'14%'}} >
                      <div style={{padding: '0 10px',textAlign:'left'}}>
                        <p>CAS号：{goods.productSellBillQty}</p>
                        <p>危险性质：{goods.productSellBillQty}</p>
                        <p>管制信息：<span style={{color: 'red'}}>可以省区内塞的可以省时省粮，用户高温霉菌</span></p>
                      </div>
                    </td>
                    {goods.orderId ? <td style={{width:'32%'}}>￥{goods.orderId}</td> : <td></td>}
                    {this.state.isGivePrice ? <td style={{width:'16%'}}>{goods.orderTransAmount}</td> : <td></td>}
                  </tr>
                </tbody>
              </table>
            )
        })}
      </div>
    )
  }
}

export default connect(({order,refundDetail})=>({order,refundDetail}),(dispatch,own)=>{return {dispatch,own}})(RefundDetailFloor);