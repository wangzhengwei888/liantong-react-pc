import React, {Component} from 'react';
import {routerRedux, Link} from 'dva/router';
import {connect} from 'dva';
import {Row, Col, Menu, Dropdown, Button, Icon, message} from 'antd';
import {top_bar,top_menu} from './topBar.less'




class TopBar extends Component {
 constructor(props) {
  super(props);
 }

 logout = () => {
  this.props.logout()
 }


 render() {
  const userInfo = this.props.data
  return (
   <div>
    <div className={top_bar}>
      <div className="top_logo">
       <img src={require('../../assets/logo.png')} alt=""/>
       <span style={{color:"#ff6100",marginLeft:'20px'}}>北京联通传输专线提速平台</span>
      </div>
      <div className="top_user">
       <span>您好 {userInfo.user && userInfo.user.name}</span>
       <span style={{border:'0',paddingRight:0,cursor:"pointer"}} onClick={this.logout}>退出</span>
      </div>
    </div>
    <div className={top_menu}>
     <div className="menu_line"></div>
     <div className="menu_item clearfix">
      <Link activeClassName='actived' to="/">我的专线</Link>
      <Link activeClassName='actived' to="/plan">预约计划</Link>
      <Link activeClassName='actived' to="/changePlan">变更计划</Link>
      <Link activeClassName='actived' to="/myOrder">我的订单</Link>
      <Link activeClassName='actived' to="/help">帮助中心</Link>
     </div>
    </div>
   </div>

  )
 }
}

export default TopBar;
