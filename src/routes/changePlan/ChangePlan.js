import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Table, Icon, Modal, Carousel, message, Tabs, Row, Col, Tooltip} from 'antd';
import {routerRedux, Link} from 'dva/router';
import Img from '../../components/Img/Img';

import {home_nav} from './ChangePlan.less';



class ChangePlan extends Component {
 constructor(props) {
  super(props);
  this.state = {}
 }

 columns = [{
  title: '专线号码',
  dataIndex: 'line_name',
  key: 'line_name',
 }, {
  title: '当前状态',
  dataIndex: 'order_status',
  key: 'order_status',
  render: (text, record) => {
   let status = record.order_status
   return <span>{status == 1 ? "未处理" : status == 2 ? "预约中"  : status == 3 ? "提速中" : status == 4 ? "完成" : "取消"}</span>
  }
 }, {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: (text,record) => {
   return <Button style={{backgroundColor:"#ff6100",color:"#fff"}} onClick={() => this.addSped(record)}>详情</Button>
  }
 }];


 addSped = (record) => {
  console.log(record)
  sessionStorage.setItem("line_id",record.line_id)
  sessionStorage.setItem("curr_speed",record.curr_speed)
  sessionStorage.setItem("order_id",record.order_id)
  this.props.dispatch(routerRedux.push("/changePlan/detail"))
 }




 render() {
  const data = this.props.changePlan.data;
  const userInfo = this.props.app.data
  return (
   <div className={home_nav}>
    <p className="home_info">
     {/*<span>企业名称:3333333333333</span>*/}
     <span>客户联系人:{userInfo.user && userInfo.user.name}</span>
    </p>
    <Table dataSource={data}
           pagination={false}
           columns={this.columns}/>
   </div>
  );
 }
}


export default connect(({changePlan, app}) => ({changePlan, app}), (dispatch, own) => {
 return {dispatch, own}
})(ChangePlan);
