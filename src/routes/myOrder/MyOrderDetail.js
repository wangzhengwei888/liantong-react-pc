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




class MyorderDetail extends Component {
 constructor(props) {
  super(props);
  this.state = {}
 }

 columns = [{
  title: '订单编号',
  dataIndex: 'order_id',
  key: 'order_id',
 }, {
  title: '订单状态',
  dataIndex: 'order_status',
  key: 'order_status',
  render: (text, record) => {
   let status = record.order_status
   return <span>{status == 1 ? "未处理" : status == 2 ? "预约中"  : status == 3 ? "提速中" : status == 4 ? "完成" : "取消"}</span>
  }
 }, {
  title: '产品名称',
  dataIndex: 'product_name',
  key: 'product_name',
 }, {
  title: '订购日期',
  dataIndex: 'buy_date',
  key: 'buy_date',
  render: (text, record) => {
   return <span>{new Date(record.buy_date).toLocaleString()}</span>
  }
 }, {
  title: '计划总价',
  dataIndex: 'total_price',
  key: 'total_price',
  render: (text, record) => {
   return <span>{record.total_price}元</span>
  }
 }];



 render() {
  const orderEnterList = this.props.myOrder.orderEnterList
  return (
   <div className={home_nav}>
      <Table dataSource={orderEnterList}
             pagination={false}
             columns={this.columns}/>
   </div>
  );
 }
}


export default connect(({myOrder, app}) => ({myOrder, app}), (dispatch, own) => {
 return {dispatch, own}
})(MyorderDetail);
