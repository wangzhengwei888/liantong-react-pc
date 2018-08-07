import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Table, Icon, Modal, Carousel, message, Tabs, Row, Col, Tooltip} from 'antd';
import {routerRedux, Link} from 'dva/router';
import Img from '../../components/Img/Img';

import {home_nav} from './Help.less';





class Help extends Component {
 constructor(props) {
  super(props);
  this.state = {}
 }



 render() {
  const {data} = this.props.home
  const userInfo = this.props.app.data
  return (
   <div className={home_nav}>
    <p className="home_info">
     <img src={require('../../assets/list1.png')} alt=""/>
     <span>业务介绍</span>
     <Icon type="down"/></p>

    <p className="home_info"><img src={require('../../assets/list2.png')} alt=""/><span>加速规则</span><Icon type="down"/></p>
    <p className="home_info"><img src={require('../../assets/list3.png')} alt=""/><span>疑难解答</span><Icon type="down"/></p>
   </div>
  );
 }
}


export default connect(({home, app}) => ({home, app}), (dispatch, own) => {
 return {dispatch, own}
})(Help);
