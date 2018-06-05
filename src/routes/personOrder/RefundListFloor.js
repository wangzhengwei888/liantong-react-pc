import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux,Link} from 'dva/router';
import { Row,Col,Menu, Dropdown,Icon,Breadcrumb,Input,Button,Pagination} from 'antd';
import Img from '../../components/Img/Img';

class RefundListFloor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      goodsData: props.data.orderItemsList
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
                    <td style={{width:'36%'}} >
                      <div className="goods_div1">
                        <Img style={{width:'140px',height:'140px',margin:'2px 5px 2px 0'}} src={goods.goodsImage} />
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
                    <td style={{width:'16%'}} >
                      <div style={{padding: '0 10px',textAlign:'left'}}>
                        <p>CAS号：{goods.productSellBillQty}</p>
                        <p>危险性质：{goods.productSellBillQty}</p>
                        <p>管制信息：<span style={{color: 'red'}}>可以省区内塞的可以省时省粮，用户高温霉菌</span></p>
                      </div>
                    </td>
                    {goods.orderId ? <td style={{width:'32%'}}>{goods.orderId}</td> : <td></td>}
                    <td style={{width:'16%'}}>{goods.productBuyBillQty}</td>
                  </tr>
                </tbody>
              </table>
            )
        })}
      </div>
    )
  }
}

export default connect(({order,refundList})=>({order,refundList}),(dispatch,own)=>{return {dispatch,own}})(RefundListFloor);