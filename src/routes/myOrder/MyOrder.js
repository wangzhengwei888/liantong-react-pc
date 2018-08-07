import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Table, Icon, Modal, Carousel, message, Tabs, Row, Col, Tooltip,Menu} from 'antd';
import {routerRedux, Link} from 'dva/router';
import Img from '../../components/Img/Img';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {home_nav} from './Myorder.less';




class Myorder extends Component {
 constructor(props) {
  super(props);
  this.state = {}
 }

 // columns = [{
 //  title: '专线号码',
 //  dataIndex: 'product_num',
 //  key: 'product_num',
 // }, {
 //  title: '当前速率',
 //  dataIndex: 'age',
 //  key: 'age',
 // }, {
 //  title: 'A端地址',
 //  dataIndex: 'address',
 //  key: 'address',
 // }, {
 //  title: 'Z端地址',
 //  dataIndex: 'address2',
 //  key: 'address2',
 // }, {
 //  title: '当前状态',
 //  dataIndex: 'status',
 //  key: 'status',
 // }, {
 //  title: '操作',
 //  dataIndex: 'action',
 //  key: 'action',
 //  render: (record) => {
 //   return <Button style={{backgroundColor:"#ff6100",color:"#fff"}} onClick={(record) => this.addSped(record)}>订单详情</Button>
 //  }
 // }];

 columns = [{
  title: '专线号码',
  dataIndex: 'product_num',
  key: 'product_num',
 },{
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: (text,record) => {
   return <Button style={{backgroundColor:"#ff6100",color:"#fff"}} onClick={() => this.goDetail(record)}>订单详情</Button>
  }
 }];

 goDetail = (record) => {
  console.log(record.line_id)
  this.props.dispatch(routerRedux.push(`/myOrder/detail/${record.line_id}`))
 }

 handleClick = (e) => {
  console.log(e)
  let obj ={
   enter_id: "1",
   pageNo:1,
   status:e.key
  }
  this.props.dispatch({type:"myOrder/getOrderlistEFF",obj})
 }




 render() {
  const data = this.props.myOrder.data
  return (
   <div className={home_nav}>
    <div className="clearfix">
     <Menu onClick={this.handleClick} defaultSelectedKeys={["0"]} style={{ width: 100,float:'left' }} mode="vertical">
       <Menu.Item key="0">全部订单</Menu.Item>
       <Menu.Item key="1">执行中</Menu.Item>
       <Menu.Item key="2">待执行</Menu.Item>
       <Menu.Item key="3">已结束</Menu.Item>
     </Menu>
     <div style={{float:'left',width:"1100px"}}>
      <Table dataSource={data}
             pagination={false}
             columns={this.columns}/>
     </div>
    </div>
   </div>
  );
 }
}


export default connect(({myOrder, app}) => ({myOrder, app}), (dispatch, own) => {
 return {dispatch, own}
})(Myorder);
