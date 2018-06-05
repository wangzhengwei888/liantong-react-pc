/**
 * Created by 10400 on 2017/8/9.
 * 支付界面页面
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';
import { Col, Icon, Row } from 'antd';
import { paymentSuccess_body } from './paymentSuccess.less'
import PaymentMethod from '../../components/PayMent/PaymentMethod';

class  PaymentSuccess extends Component{
  constructor(props){
    super(props);
    this.state={
      value: '',
      current:1
    }
  }
  componentWillUnmount(){

  }

  onChange = (e) => {
    // console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      current:2
    });
  }

  render (){
    return (
      <div>
       <div><Search></Search></div>
       <Navigation preson={true}>
        <div className={paymentSuccess_body}>
          <div className="payment_s">
            <div style={{ fontSize:'26px', color:'#725AF1', letterSpacing:'3px' }}>订单提交成功</div>
            <div style={{ color:'#ddd' }}>我们会尽快为您发货</div>
          </div>
          <Row style={{ margin:'50px', textAlign:'center' }}>
            <Col span={8}>您的订单号：<span style={{ color:'red' }}>300ttrsafd</span></Col>
            <Col span={8}>订单金额：<span style={{ color:'red' }}>200.00</span>元</Col>
            <Col span={8}>支付方式:货到付款</Col>
          </Row>
        </div>
       </Navigation>
      </div>
    );
  }
}


export default connect(({payment})=>({payment}),(dispatch,own)=>{return {dispatch,own}})(PaymentSuccess);
