import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux,Link} from 'dva/router';
import { Row,Col,Menu, Dropdown,Icon,Breadcrumb,Input,Button,Pagination} from 'antd';
import Img from '../../components/Img/Img';
import Price from '../../components/Price/price';

class OrderListFloor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      goodsData: props.data.orderItemsList,
      // onOff: true
    }
  }

   addCart = (goodsId,goodsPrice) => {
     this.props.addCart(goodsId,goodsPrice);
    }

  render() {
    const data = this.props.data;
    // console.log(data)
    return (
      <div>
              <table className="border_bottom">
                <tbody  className={ data.goods.goodsShow == 0 || ! data.goods.goodsStorePrice ||  data.goods.goodsStorePrice <=0 ? 'overdue' : ''}>
                  <tr style={{borderBottom:'1px solid #e5e5e5'}}>
                    <td style={{width:'40%'}} >
                      <div className="goods_div1">
                        <Img style={{width:'140px',height:'140px',margin:'2px 16px'}} src={data.goods.goodsImage} />
                        <div style={{margin:'18px 15px',textAlign:'left'}}>
                          <p style={{fontSize:'16px',color:'#333',lineHeight:'22px',marginBottom:'16px',position:'relative'}}>
                             <Link  style={{fontSize:'16px',color:'#333',lineHeight:'22px',cursor:'pointer',position:'absolute',top:'-12px',display:'inline-block',width:'500px'}} to={`/goodsDetail/${data.goodsId}`}> {data.goods.goodsName}</Link>    
                          </p>
                          {(data.goods.brandName && data.goods.goodsSerial) ?
                            <p>品牌/原厂货号：{data.goods.brandName}/{data.goods.goodsSerial}</p> :
                            (data.goods.brandName) ? <p>品牌：{data.goods.brandName}</p> :
                             (data.goods.goodsSerial) ? <p>原厂货号：{data.goods.goodsSerial}</p> : null
                           } 
                           {(data.goods.goodsErpCode) ? <p>国药编码：{data.goods.goodsErpCode}</p> : null}
                           {(data.goods.specName) ? <p>规格：{data.goods.specName}</p> : null}
                           {(data.goods.goodsSpec) ? <p>包装：{data.goods.goodsSpec}</p> : null}
                           {(data.goods.storageCondition && data.shippingCondition) ?
                             <p>储存/运输条件：<span>{data.goods.storageCondition}/{data.goods.shippingCondition}</span></p> :
                             (data.goods.storageCondition) ? <p>储存条件：<span>{data.goods.storageCondition}</span></p> :
                              (data.goods.shippingCondition) ? <p>运输条件：<span>{data.goods.shippingCondition}</span></p> : null
                            }
                        </div>
                      </div>
                    </td>
                    <td style={{width:'20%',verticalAlign:'top'}} >
                        {data.goods.isReagent=='1'?
                            <div style={{padding: '30px 10px 0px',textAlign:'left'}}>
                              {(data.goods.casNo) ? <p>CAS号：{data.goods.casNo}</p> : null}

                              {(data.goods.dangerousNature) ? <p>危险性质:<span dangerouslySetInnerHTML={{ __html: data.goods.dangerousNature }}></span></p> : null}
                              {(data.goods.controlInfo) ? <p>管制信息： <span style={{color: 'red'}} dangerouslySetInnerHTML={{ __html: data.goods.controlInfo }}></span></p> : null}
                            </div>
                            :
                            data.goods.isReagent == '0' && data.goods.goodsDescription ? <p className='describe' style={{paddingTop:'17px',paddingLeft:'6px'}}><span dangerouslySetInnerHTML={{ __html: data.goods.goodsDescription.length > 50 ? data.goodsDescription.substr(0,50) + "..." : data.goods.goodsDescription }}></span></p> : null
                        }
                    </td>
                    <td style={{width:'20%'}}>
                         <p>成交价：<Price  pj={data.goods.goodsStorePrice} bz={data.goods.SCurrency} bj={data.goods.SCurrencyPrice} scj={false}/></p>
                    </td>
                    <td style={{width:'20%'}} >
                      {
                        data.goods.goodsShow == 1 && data.goods.goodsStorePrice > 0 ? 
                        <div>
                          <Link className="icon-view-detail" title="查看详情" to={`/goodsDetail/${data.goods.goodsId}`}  target="_blank"></Link>
                          {(data.goods.goodsStorePrice>0||!!(data.goods.goodsStorePrice)) && data.goods.isControlInfo == 1 ?
                            <Link  className="icon-cart" title="加入购物车" onClick={()=>this.addCart(data.goods.goodsId,data.goods.goodsStorePrice)}></Link>: null
                          }
                        </div>
                      :<p>已下架</p>
                      }       
                    </td>
                  </tr>
                </tbody>
              </table>

      </div>
    )
  }
}

export default connect(({order,OrderList})=>({order,OrderList}),(dispatch,own)=>{return {dispatch,own}})(OrderListFloor);
