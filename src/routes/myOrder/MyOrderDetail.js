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
 }];



 handelchange = (pagNo) => {
  console.log(pagNo)
 }



 render() {
  return (
   <div className={home_nav}>
      <Table dataSource={dataSource}
             pagination={{
              total: 50,
              current: 1,
              pageSize: 10,
              showQuickJumper: true,
              onChange: this.handelchange
             }} columns={this.columns}/>
   </div>
  );
 }
}


export default connect(({home, app}) => ({home, app}), (dispatch, own) => {
 return {dispatch, own}
})(MyorderDetail);
