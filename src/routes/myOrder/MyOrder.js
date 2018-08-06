import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Table, Icon, Modal, Carousel, message, Tabs, Row, Col, Tooltip,Menu} from 'antd';
import {routerRedux, Link} from 'dva/router';
import Img from '../../components/Img/Img';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {home_nav} from './Myorder.less';


const dataSource = [{
 key: '1',
 name: '胡彦斌',
 age: 32,
 address: '西湖区湖底公园1号',
 address2: "22222222",
 status: "eeeee"
}, {
 key: '2',
 name: '胡彦祖',
 age: 42,
 address: '西湖区湖底公园1号',
 address2: "22222222",
 status: "eeeee"
}];




class Myorder extends Component {
 constructor(props) {
  super(props);
  this.state = {}
 }

 columns = [{
  title: '专线号码',
  dataIndex: 'name',
  key: 'name',
 }, {
  title: '当前速率',
  dataIndex: 'age',
  key: 'age',
 }, {
  title: 'A端地址',
  dataIndex: 'address',
  key: 'address',
 }, {
  title: 'Z端地址',
  dataIndex: 'address2',
  key: 'address2',
 }, {
  title: '当前状态',
  dataIndex: 'status',
  key: 'status',
 }, {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: (record) => {
   return <Button style={{backgroundColor:"#ff6100",color:"#fff"}} onClick={(record) => this.addSped(record)}>订单详情</Button>
  }
 }];


 addSped = (record) => {
  console.log(record)
  this.props.dispatch(routerRedux.push("/myOrder/detail"))
 }

 handleClick = (e) => {
  console.log(e)
 }

 handelchange = (pagNo) => {
  console.log(pagNo)
 }



 render() {
  return (
   <div className={home_nav}>
    <div className="clearfix">
     <Menu onClick={this.handleClick} style={{ width: 100,float:'left' }} mode="vertical">
       <Menu.Item key="0">全部订单</Menu.Item>
       <Menu.Item key="1">执行中</Menu.Item>
       <Menu.Item key="2">待执行</Menu.Item>
       <Menu.Item key="3">已结束</Menu.Item>
     </Menu>
     <div style={{float:'left',width:"1100px"}}>
      <Table dataSource={dataSource}
             pagination={{
              total: 50,
              current: 1,
              pageSize: 10,
              showQuickJumper: true,
              onChange: this.handelchange
             }} columns={this.columns}/>
     </div>
    </div>
   </div>
  );
 }
}


export default connect(({home, app}) => ({home, app}), (dispatch, own) => {
 return {dispatch, own}
})(Myorder);
