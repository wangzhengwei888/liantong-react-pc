import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux,Link} from 'dva/router';
import { Row,Col,Menu, Dropdown,Icon,Breadcrumb,Input,Button,Checkbox,Modal} from 'antd';
import Price from '../../components/Price/price';
import Img from '../../components/Img/Img';


class FavListFloor extends Component {
  constructor(props) {
   super(props)
  }
 // 删除商品
 delGoods = (goodsId) => {
  Modal.confirm({
   title:'提示',
   content:'确定删除吗',
   okText:'确定',
   cancelText:'取消',
   onOk:() => {
    this.props.delGoods(goodsId);
   },
   maskClosable:true
  });
 }
 // 选中商品
 checkGoods = (goods, e) => {
 // console.log(goods,e)
  this.props.checkGoods(goods, e.target.checked);
 }
 addCart = (goodsId,goodsPrice) => {
 // console.log(goodsId,goodsPrice)
  this.props.addCart(goodsId,goodsPrice);
 }


  render() {
    const data = this.props.data;
   // console.log(data)
    return (
      <div>
              <table className="border_bottom">
                <tbody>
                  <tr>
                    <td style={{width: '4%'}}>
                      <Checkbox
                        className={ (data.goodsStorePrice<=0||data.goodsStorePrice=='') ? 'yincang' :'' }
                        onChange={e => this.checkGoods(data,e)} checked={data.checked }>
                      </Checkbox>
                    </td>
                    <td style={{width:'36%'}} >
                      <div className="goods_div1">
                      {/*
                        data.goodsStorePrice人民币价格=牌价
                        SCurrencyPrice  外币价格

                      {Number(this.props.scj) ?
                         (Number(this.props.pj)> 0 ?
                          (Number(this.props.pj).toFixed(2) + "  CNY")
                          : (this.props.bz ? (Number(this.props.bj) + this.props.bz)
                          : <span onClick={this.showModal}>请询价</span> ))
                           : (Number(this.props.pj) > 0
                            ? (this.state.isLogin ? (Number(this.props.pj).toFixed(2) + "  CNY")

                             : <span onClick={this.goLogin}>登录可见</span>)

                             : <span onClick={this.showModal}>请询价</span>)}
                             */}
                        <Img style={{width:'105px',height:'105px',margin:'2px 16px'}} src={data.goodsImage} />
                        <div style={{margin:'18px 15px',textAlign:'left',position:'relative'}}>
                          <p style={{fontSize:'16px',color:'#333',lineHeight:'22px',marginBottom:'16px',position:'absolute',top:'-25px',width:'500px'}}>
                             <Link  style={{fontSize:'16px',color:'#333',lineHeight:'22px'}} to={`/goodsDetail/${data.goodsId}`}> {data.goodsName}</Link>
                          </p>
                          {(data.brandName && data.goodsSerial) ?
                            <p>品牌/原厂货号：{data.brandName}/{data.goodsSerial}</p> :
                            (data.brandName) ? <p>品牌：{data.brandName}</p> :
                             (data.goodsSerial) ? <p>原厂货号：{data.goodsSerial}</p> : null
                           }
                          {(data.goodsErpCode) ? <p>国药编码：{data.goodsErpCode}</p> : null}
                          {(data.specName) ? <p>规格：{data.specName}</p> : null}
                          {(data.goodsSpec) ? <p>包装：{data.goodsSpec}</p> : null}
                          {/*(data.storageCondition && data.shippingCondition) ?
                            <p>储存/运输条件：<span>{data.storageCondition}/{data.shippingCondition}</span></p> :
                            (data.storageCondition) ? <p>储存条件：<span>{data.storageCondition}</span></p> :
                             (data.shippingCondition) ? <p>运输条件：<span>{data.shippingCondition}</span></p> : null
                          */}
                        </div>
                      </div>
                    </td>
                    <td style={{width:'32%',verticalAlign:'top'}} >
                      {data.isReagent=='1'?
                          <div style={{padding: '20px 10px 0px',textAlign:'left'}}>
                            {(data.casNo) ? <p>CAS号：{data.casNo}</p> : null}

                            {(data.dangerousNature) ? <p>危险性质:<span dangerouslySetInnerHTML={{ __html: data.dangerousNature }}></span></p> : null}
                            {(data.controlInfo) ? <p>管制信息： <span style={{color: 'red'}} dangerouslySetInnerHTML={{ __html: data.controlInfo }}></span></p> : null}
                          </div>
                          :
                          data.isReagent == '0' && data.goodsDescription ? <p className='describe' style={{paddingTop:'17px',paddingLeft:'6px'}}><span dangerouslySetInnerHTML={{ __html: data.goodsDescription.length > 100 ? data.goodsDescription.substr(0,100) + "..." : data.goodsDescription }}></span></p> : null
                      }
                    </td>
                    <td style={{width:'15%',verticalAlign:'top',paddingTop:'27px'}}>
                      
                      <p>成交价：<Price  pj={data.goodsStorePrice} bz={data.SCurrency} bj={data.SCurrencyPrice} scj={false}/></p>
                      <p>市场价：<Price  pj={data.goodsStorePrice} bz={data.SCurrency} bj={data.SCurrencyPrice} scj={true}/></p>
                      <p style={{textAlign:'left',paddingLeft:'11px'}}>库存：<span >{data.goodsShowStorage}</span></p>
                    </td>
                    <td style={{width:'13%'}} >
                      <div>
                      <a className="icon-view-detail" title="查看详情" to={`/goodsDetail/${data.goodsId}`}  target="_blank"></a>
                      {(data.goodsStorePrice>0||!!(data.goodsStorePrice)) && data.isControlInfo == 1 ?
                         <Link className="icon-cart" title="加入购物车" onClick={()=>this.addCart(data.goodsId,data.goodsStorePrice)} ><Icon type="shopping-cart" /></Link>: null
                      }
                      <Icon type="delete" className="icon-delete" title="删除" onClick={()=>this.delGoods(data.goodsId)}/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
      </div>
    )
  }
}
export default FavListFloor;
