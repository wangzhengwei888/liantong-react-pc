import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Table, Icon, Modal, Carousel, message, Tabs, Row, Col, Tooltip} from 'antd';
import {routerRedux, Link} from 'dva/router';
import Img from '../../components/Img/Img';

import {home_nav} from './ChangePlan.less';


const dataSource = [{
 key: '1',
 name: '胡彦斌',
 age:'32'
}, {
 key: '2',
 name: '胡彦祖',
 age:'44'
}];




class ChangePlan extends Component {
 constructor(props) {
  super(props);
  this.state = {}
 }

 columns = [{
  title: '专线号码',
  dataIndex: 'name',
  key: 'name',
 }, {
  title: '当前状态',
  dataIndex: 'age',
  key: 'age',
 }, {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: (record) => {
   return <Button style={{backgroundColor:"#ff6100",color:"#fff"}} onClick={(record) => this.addSped(record)}>详情</Button>
  }
 }];


 addSped = (record) => {
  console.log(record)
  this.props.dispatch(routerRedux.push("/changePlan/detail"))
 }

 handelchange = (pagNo) => {
  console.log(pagNo)
 }



 render() {
  return (
   <div className={home_nav}>
    <p className="home_info">
     <span>企业名称:3333333333333</span>
     <span>客户联系人:3333</span>
    </p>
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
})(ChangePlan);
