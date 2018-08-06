import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Table, Icon, Modal, Carousel, message, Tabs, Row, Col, Tooltip} from 'antd';
import {routerRedux, Link} from 'dva/router';
import Img from '../../components/Img/Img';

import {home_nav} from './Home.less';





class Home extends Component {
 constructor(props) {
  super(props);
  this.state = {}
 }

 columns = [{
  title: '专线号码',
  dataIndex: 'hlwLineNo',
  key: 'hlwLineNo',
 },{
  title: '企业名称',
  dataIndex: 'enterName',
  key: 'enterName',
 }, {
  title: '当前速率',
  dataIndex: 'curr_speed',
  key: 'curr_speed',
 }, {
  title: 'A端地址',
  dataIndex: 'a_addr_desc',
  key: 'a_addr_desc',
 }, {
  title: 'Z端地址',
  dataIndex: 'z_addr_desc',
  key: 'z_addr_desc',
 }, {
  title: '当前状态',
  dataIndex: 'curr_status',
  key: 'curr_status',
  render: (text, record) => {
   return <span>{record.curr_status == "1" ? "未提速" : "已提速"}</span>
  }
 }, {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: (text, record) => {
   return <Button style={{backgroundColor:"#ff6100",color:"#fff"}} onClick={() => this.addSped(record)}>预约提速</Button>
  }
 }];


 addSped = (record) => {
  console.log(record)
  sessionStorage.setItem("line_id",record.line_id)
  sessionStorage.setItem("curr_speed",record.curr_speed)
  sessionStorage.setItem("hlwLineNo",record.hlwLineNo)
  this.props.dispatch(routerRedux.push(`/plan`));
 }





 render() {
  const {data} = this.props.home
  const userInfo = this.props.app.data
  return (
   <div className={home_nav}>
    <p className="home_info">
     <span>客户联系人:{userInfo && userInfo.name}</span>
    </p>
    <Table dataSource={data}
           pagination={false}
           columns={this.columns}/>
   </div>
  );
 }
}


export default connect(({home, app}) => ({home, app}), (dispatch, own) => {
 return {dispatch, own}
})(Home);
