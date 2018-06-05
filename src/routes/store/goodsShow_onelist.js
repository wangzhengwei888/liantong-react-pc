/**
 * Created by b2b2c on 2017/9/8.
 */
import React , { Component } from 'react';
import { connect } from 'dva';
import { Row, Col,Button,Icon,Breadcrumb,Menu, Dropdown } from 'antd';
import Stepper from '../../components/Stepper/Stepper';
import Img from '../../components/Img/Img';
import LoginBtn from '../../components/loginBtn/loginBtn';
// import {goodsShow} from './goodsShow_one.less';
import {storeResult_body} from './storeResult.less';
import PropTypes from 'prop-types';


const DemoBox = props => <div className="demoBox">{props.children}</div>

class GoodsShowOneList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: props.img.isSellpiece == 0 ? props.img.packTotal : 1
    }
  }
  /*改变购买数量*/
  onChangeNum=(val)=>{
    this.setState({
      count: val
    })
  }
  addCarshop = (goodsId,channelPrice,count) => {
    console.log(goodsId,channelPrice,count);
    this.props.addCartshop(goodsId,channelPrice,count);
  }



  render() {
    const {img} = this.props;
    return (
            <div className="content_goods">
              <Row type="flex" justify="space-between" style={{width:'100%',fontSize:".9rem"}}>
                <Col span={8}>
                  <Row type="flex" justify="space-around" align="middle">
                    <Col span={8}>
                      <DemoBox>
                        <div className="goods_img" ><a href={`/goodsDetail/${img.goodsId}`}><Img src={img.goodsImage} /></a></div>
                      </DemoBox>
                    </Col>
                    <Col span={16}>
                      <DemoBox >
                        <a href={`/goodsDetail/${img.goodsId}`}><p style={{fontWeight:'600',cursor:'pointer',fontSize:'1rem'}}>{img.goodsName}</p></a>
                        <p>供应商：<span>{img.storeName}</span></p>
                        <p>生产厂家：<span>{img.brandName}</span></p>
                      </DemoBox>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row type="flex" justify="space-around" align="middle">
                    <Col span={4}><DemoBox ></DemoBox></Col>
                    <Col span={10}>
                      <DemoBox>
                        <div className="clearfix">
                          <div style={{float:'left',}}>采购价：</div>
                          <span className="clearfix"><LoginBtn isChannelPrice={img.isChannelPrice} useClass='smallBtn' title={img.channelPrice}/></span>
                        </div>
                        <p>零售价：<span style={{color:'red'}}>{img.goodsMarketPrice}</span> 元</p>
                        <p>是否拆零：<span>{img.isSellpiece == 1?'是':'否'}</span></p>
                      </DemoBox>
                    </Col>
                    <Col span={10}>
                      <DemoBox >
                        <p>规格：<span>{img.specName}</span></p>
                        <p>件包装：<span>{img.packTotal}</span></p>
                        <p>&nbsp;<span></span></p>
                      </DemoBox></Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row type="flex" justify="space-around" align="middle">
                    <Col span={6}><DemoBox ></DemoBox></Col>
                    <Col span={12}><DemoBox value={100} style={{zIndex:'1000'}}>
                      <div style={{marginBottom:'10px'}}><span style={{marginRight:'1rem',float:'left'}}>购买数量</span>
                        <Stepper nowNum={img.goodsNowStorage}
                                 btnClassName='btnClass'
                                 inputClassName='inputClass'
                                 num={img.isSellpiece == 0 ? img.packTotal : 1} min={img.isSellpiece == 0 ? img.packTotal : 1}
                                 max={img.maxBuyNum == 0 ? img.goodsNowStorage : img.maxBuyNum}
                                 step={img.isSellpiece == 0 ? img.packTotal : 1}
                                 onUpdate={(val) => {this.onChangeNum(val)}}
                                 disabled={false}/>
                      </div>
                      <div style={{marginLeft:'20px'}} ><LoginBtn goodsId={img.goodsId} isChannelPrice={img.isChannelPrice} clickHandle={()=>this.addCarshop(img.goodsId,img.channelPrice,this.state.count)}  useClass='priceBtn' title={<Button type="primary">加入购物车</Button>}/></div>
                    </DemoBox></Col>
                    <Col span={6}><DemoBox value={100}><div style={{alignContent:'center'}}>库存：<span>{img.goodsShowStorage}</span></div></DemoBox></Col>
                  </Row>
                </Col>
              </Row>
            </div>


    );
  }
}

export default GoodsShowOneList;
