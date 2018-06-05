import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Row, Col, Menu, Dropdown, Icon, Breadcrumb, Input, Button, Pagination } from 'antd';
import Img from '../../components/Img/Img';

class MyConsultListFloor extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
 addCart = (goodsId, goodsPrice, count) => {
  let val ={
   goodsId:goodsId,
   goodsPrice:goodsPrice,
   count:count,
   saveType:1
  }
  this.props.addCart(val);
 }
 goInquiry=(goodsId,count)=>{
   let val ={
    goodsId,
    num:count
   }
  this.props.goInquiry(val);
 }
  render() {
    const {data} = this.props;
    console.log(data )

    return (
      <div>
        {data.quoteGoodsList.length > 0 && data.quoteGoodsList.map((goods, i) => {
          return (
            <div  className="border_bottom" key={i}>
              <div>
                <Row type="flex" justify="space-between" >
                 <Col span={4}><Img style={{ width: '140px', height: '140px', margin: '2px 5px 2px 0' }} src={goods.goodsImage} /></Col>
                 <Col span={20}>
                  <div style={{width: '100%', textAlign: 'left'}}><div style={{ fontSize: '16px', color: '#333', lineHeight: '22px' }}>{goods.goodsName}</div></div>
                  <Row type="flex" justify="space-between" style={{ width: '100%' }}>
                   <Col span={5}>
                    {(goods.brandName && goods.goodsSerial) ? <p>品牌/原厂货号：<span>{goods.brandName}/{goods.goodsSerial}</span></p> : (goods.brandName) ? <p>品牌：<span>{goods.brandName}</span></p> : (goods.goodsSerial) ? <p>原厂货号：<span>{goods.goodsSerial}</span></p> : ""
                    }
                    {(goods.goodsErpCode) ? <p>国药编码：<span>{goods.goodsErpCode}</span></p> : ""}
                    {(goods.specName) ? <p>规格：<span>{goods.specName}</span></p> : ""}
                    {(goods.goodsSpec) ? <p>包装：<span>{goods.goodsSpec}</span></p> : ""}
                    {(goods.storageCondition && goods.shippingCondition) ?
                     <p>储存/运输条件：<span>{goods.storageCondition}/{goods.shippingCondition}</span></p> : (goods.storageCondition) ? <p>储存条件：<span>{goods.storageCondition}</span></p> : (goods.shippingCondition) ? <p>运输条件：<span>{goods.shippingCondition}</span></p> : ""
                    }
                   </Col>
                   <Col span={6}>
                    { goods.isReagent == '1' ?
                     <div>
                      {(goods.casNo) ? <p>CAS号：<span>{goods.casNo}</span></p> : ""}
                      {(goods.dangerousNature) ? <p>危险性质：<span dangerouslySetInnerHTML={{ __html: goods.dangerousNature }}></span></p> : ""}
                      {(goods.controlInfo) ? <p>管制信息：<span style={{color: 'red'}} dangerouslySetInnerHTML={{ __html: goods.controlInfo }}></span></p> : ""}
                     </div>
                     : goods.isReagent == '0' && goods.goodsDescription ? <p className='describe'style={{width:'190px',height:'107px', overflow: 'hidden',textOverflow:' ellipsis',
                      whiteSpace: 'wrap', wordWrap:'break-word', lineClamp:'5'}}>描述：<span dangerouslySetInnerHTML={{ __html:goods.goodsDescription.length > 80 ? goods.goodsDescription.substr(0,80) + "..." : goods.goodsDescription}}></span></p> : ""
                    }
                   </Col>
                   <Col span={2}>
                    <div style={{display: 'flex',alignItems: 'center',height:'100%',justifyContent:'center'}}>￥{(goods.goodsCostPrice || 0).toFixed(2)}</div>
                   </Col>
                   <Col span={2}>
                    <div style={{display: 'flex',alignItems: 'center',height:'100%',justifyContent:'center'}}>{goods.buyNum}</div>
                   </Col>
                   <Col span={2}>
                    <div style={{display: 'flex',alignItems: 'center',height:'100%',justifyContent:'center'}}>￥{((goods.goodsCostPrice || 0) * (goods.buyNum || 0)).toFixed(2)}</div>
                   </Col>
                   <Col span={2}>
                    <div style={{display: 'flex',alignItems: 'center',height:'100%',justifyContent:'center'}}>{goods.endTimeStr}</div>
                   </Col>
                   <Col span={2}>
                    <div style={{display: 'flex',alignItems: 'center',height:'100%',justifyContent:'center',color: 'red', fontWeight:'bold'}}>{goods.remark}</div>
                   </Col>
                   <Col span={3} style={{textAlign:'center'}}>
                    <div style={{display: 'flex',alignItems: 'center',height:'100%',justifyContent:'center',flexDirection:'column'}}>
                     {goods.isEnd == 1 ?
                      <span title="加入购物车" style={{ color: 'orange', display: 'bolck', fontSize:"14px", cursor:"pointer" }} onClick={()=>this.addCart(goods.goodsId,goods.goodsCostPrice,goods.buyNum)}>加入购物车</span>
                      : goods.isEnd == 2 ?
                      <span title="加入询价单" style={{ color: 'orange', display: 'bolck', fontSize:"14px", cursor:"pointer" }} onClick={()=> this.goInquiry(goods.goodsId,goods.buyNum) }>加入询价单</span>
                     : ""
                     }
                      {/*<Link title="商品详情" target='_blank' style={{ color: '#3599BB', display: 'bolck',fontSize:"14px" }} to={`/goodsDetail/${goods.goodsId}`}>商品详情</Link>*/}


                    </div>

                   </Col>
                  </Row>
                 </Col>
                </Row>
              </div>
            </div>
          )
          })}
      </div>
    )
  }
}

export default connect(({ myConsultList}) => ({ myConsultList }), (dispatch, own) => { return { dispatch, own } })(MyConsultListFloor);
