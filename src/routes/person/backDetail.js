/**
 * 个人中心退货
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form,Select,Input,Row,Col,DatePicker,Button,Table, Icon,Steps } from 'antd';
import Img from '../../components/Img/Img';
import { backDetail_body } from './backDetail.less';

const Step = Steps.Step;

// class Txt extends Component{
//   render () {
//     return (<div>这是</div>)
//   }
// }



class  BackDetail extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render (){
    const Txt = () => {
      return (
        <div>
          <p>2017-04-27 18:03:43</p>
          <p>卖家已收货,等待系统审核退款</p>
          <p>经办：衣品天成</p>
        </div>)
    }


    return (
      <div className={backDetail_body}>
        <div className="backDetail_content">
          <div className="goodsInfo">
            <p className='title'>商品清单</p>
            <div style={{border:'1px solid #ccc'}}>
              <Row className='infoTab'>
                <Col span={20}>商品</Col>
                <Col span={4}>数量</Col>
              </Row>
              <Row className='infoTr'>
                <Col span={4}>
                  <a href="">
                    <img src={require('../../assets/authentication_3.png')} alt="图片"/>
                  </a>
                </Col>
                <Col span={16} style={{textAlign:'left'}}>
                  <p className='goodsName'><a href="">无袖压褶连衣裙-清欢</a></p>
                  <p style={{paddingBottom:'10px'}}>颜色:黄色 衣服尺寸:S </p>
                </Col>
                <Col span={4} style={{paddingTop:'20px'}}>2</Col>
              </Row>
            </div>
          </div>

          <div className='schedule'>
            <p className='title'>售后信息</p>
            <div style={{margin:'35px'}}>
              <Steps current={3}>
                <Step title="提交申请"/>
                <Step title="卖家审核"/>
                <Step title="发货"/>
                <Step title="平台审核"/>
                <Step title="完成"/>
              </Steps>
            </div>
            <div style={{paddingLeft:'300px'}}>
              <Steps progressDot current={4} direction='vertical'>
                <Step title="平台审核" description={<Txt/>} />
                <Step title="发货" description={<Txt/>}/>
                <Step title="卖家审核" description={<Txt/>}/>
                <Step title="提交申请" description={<Txt/>}/>
                <Step/>
              </Steps>
            </div>
          </div>
          <div style={{paddingTop:'10px'}}>
            <p className='title'>退货详情</p>
            <Row className='row'>
              <Col span={8}>商家审核：</Col>
              <Col span={8}>平台退款：</Col>
              <Col span={8}>退货编号：</Col>
            </Row>
            <Row className='row'>
              <Col span={8}>申请时间：</Col>
              <Col span={8}>店铺名称：</Col>
              <Col span={8}>退货原因：</Col>
            </Row>
            <Row className='row'>
              <Col span={8}>卖家备注：</Col>
              <Col span={8}>管理员备注：</Col>
            </Row>
          </div>
          <div style={{paddingTop:'20px'}}>
            <p className='title'>发货信息</p>
            <Row className='row'>
              <Col span={8}>发货人：</Col>
              <Col span={8}>联系电话：</Col>
              <Col span={8}>邮编：</Col>
            </Row>
            <Row className='row'>
              <Col span={8}>发货地址：</Col>
              <Col span={8}>配送公司：</Col>
              <Col span={8}>
                物流单号：{2012983928}
                <a href="" className='express'>查询物流</a>
              </Col>

            </Row>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(({BackDetail})=>({BackDetail}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(BackDetail));
