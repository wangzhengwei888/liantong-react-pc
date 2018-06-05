/**
 * Created by 10400 on 2017/8/9.
 * 支付界面页面
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import { Col, Button, Row } from 'antd';


class  PaymentError extends Component{
  constructor(props){
    super(props);
  }



  render (){
    return (
      <div>
       <div><Search></Search></div>
       <Navigation preson={true}>
        <div
          style={{
            textAlign:'center',
            height:'200px',
            lineHeight:'200px',
            fontSize:"18px",
            fontWeight:'blod'
          }}
        >{ this.props.params.msg }</div>
        <div
          style={{
            textAlign:'center',
            height:'80px',
            lineHeight:'80px'
          }}
        >
          <Button type="primary" onClick={()=>{

            this.props.dispatch(routerRedux.replace(`/personOrder
            /orderList`))
          }}>
            { this.props.params.payState==1 ? "重新支付": "查看订单" }
          </Button>
        </div>
       </Navigation>
      </div>
    );
  }
}


export default connect(({payment})=>({payment}),(dispatch,own)=>{return {dispatch,own}})(PaymentError);
