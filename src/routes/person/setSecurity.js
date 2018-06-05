/**
 * 个人中心修改密码
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb,Button,Row,Col} from 'antd';
import Img from '../../components/Img/Img';
import { getFullUrl } from '../../utils/common';
import {getMobileCode } from './api';
import { setSecurity_body } from './setSecurity.less';




class  SetSecurity extends Component{
  constructor(props) {
    super(props);
    this.timout=null;
    this.state={
    }
  }

  componentDidMount() {

  }

  render (){

    return (
      <div className={setSecurity_body}>
        <div className="setSecurity_content">
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="">我的商城</Breadcrumb.Item>
              <Breadcrumb.Item>设置</Breadcrumb.Item>
              <Breadcrumb.Item>账户安全</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {/*列表*/}
          <div className="setSecurity_box">

            <div className="security_info">
              <p>安全中心</p>
              <ul>
                <li><span style={{letterSpacing:'-3px'}}>会&nbsp;员&nbsp;名 ：</span><span>yuyu123</span></li>
                <li>绑定邮箱：<span>110@qq.com</span></li>
                <li>
                  <span>安全级别：</span>
                  <div className='tips'>
                    <div className='tipeBg'></div>
                  </div>
                  <span className="tipsText">中级 建议您启动全部安全设置，以保障账户及资金安全。</span>
                </li>
              </ul>
            </div>

            <ul className="setList">
              <li className="list">
                <Row>
                  <Col span={4}>
                    <img src={require('../../assets/safety.png')} alt="这里有一张图片"/>
                  </Col>
                  <Col span={4} style={{fontSize: '16px'}}>登录密码</Col>
                  <Col span={10} style={{textAlign:'left',color:'#fd0303'}}>互联网账号存在被盗风险，建议您定期更改密码以保护账户安全</Col>
                  <Col span={6}><a href="/person/setPassword">修改</a></Col>
                </Row>
              </li>
              <li className="list">
                <Row>
                  <Col span={4}>
                    <img src={require('../../assets/safety.png')} alt="这里有一张图片"/>
                  </Col>
                  <Col span={4} style={{fontSize: '16px'}}>支付密码</Col>
                  <Col span={10} style={{textAlign:'left',color:'#fd0303'}}>互联网账号存在被盗风险，建议您定期更改密码以保护账户安全</Col>
                  <Col span={6}><a href="/person/setPassword">修改</a></Col>
                </Row>
              </li>
              <li className="list">
                <Row>
                  <Col span={4}>
                    <img src={require('../../assets/safety.png')} alt="这里有一张图片"/>
                  </Col>
                  <Col span={4} style={{fontSize: '16px'}}>邮箱验证</Col>
                  <Col span={10} style={{textAlign:'left'}}>您验证的邮箱：<span>8923****@qq.com</span></Col>
                  <Col span={6}><a href="/person/setPassword">修改</a></Col>
                </Row>
              </li>
              <li className="list">
                <Row>
                  <Col span={4}>
                    <img src={require('../../assets/dangerous.png')} alt="这里有一张图片"/>
                  </Col>
                  <Col span={4} style={{fontSize: '16px'}}>手机验证</Col>
                  <Col span={10} style={{textAlign:'left'}}>验证后，可用于快速找回登陆密码，接受账户余额变动提醒。<span style={{color:'#fd0303'}}>避免账户被盗</span></Col>
                  <Col span={6}><a href="/person/setPassword" className="noPass">立即验证</a></Col>
                </Row>
              </li>
            </ul>


          </div>

        </div>

      </div>
    );
  }
}


export default connect(({setSecurity})=>({setSecurity}),(dispatch,own)=>{return {dispatch,own}})((SetSecurity));

