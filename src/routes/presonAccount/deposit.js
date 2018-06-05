import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {  Link } from 'dva/router';
import {Button, Table, Icon, Modal, Tabs , message,Breadcrumb, Row, Col} from 'antd';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import Img from '../../components/Img/Img';
import LeftNav from '../../components/LeftNav/LeftNav';
import { GoodsRecommed ,bottemDetail} from './api';
import {tableList,changes} from "../presonAccount/deposit.less";
import {depositAPI} from './api'



const TabPane = Tabs.TabPane;

class Deposit extends Component {
 constructor(props) {
  super(props);
  this.state = {
     activeKey:''
  }

  }

 componentWillMount(){
  //this.mounted = true;

 }

 componentDidMount(){
  //this.mounted = false;
  // console.log(data.goodsId)
  /*商品推荐*/
  // GoodsRecommed().then(result => {
  //   if (result.result == 1) {
  //     // console.log(result.data)
  //     this.setState({
  //       goodsRecommed:result.data
  //     })
  //   }
  // });
 }
 // //切换时间段
 // onChangePayMethod = (activeKey) => {
 //  if (activeKey = '') {
 //   let val = '0'
 //   this.props.dispatch({type: 'security/depositEFF', val})
 //   //  console.log(this.props.security.data)
 //  } else {
 //   let val = activeKey;
 //   console.log(activeKey)
 //   this.props.dispatch({type: 'security/depositEFF', val})
 //  }
 // }
 columns = [
  {
   title: '时间',
   dataIndex: 'createTimeStr',
   key: 'createTimeStr',
  },
  {
   title: '备注',
   dataIndex: 'orderSn',
   key: 'orderSn',
  },
  {
   title: '变化原因',
   dataIndex: 'lgType',
   key: 'lgType',
  },
  {
   title: '金额',
   dataIndex: 'lgAddAmount',
   key: 'lgAddAmount',
  },
  {
   title: '结余金额',
   dataIndex: 'lgAvAmount',
   key: 'lgAvAmount',
  }
 ];
 callback=(key)=> {
  this.setState({
   activeKey:key
  })
  let val=key;
  if(val==''){
   let val={
    timeType:0
   }
  this.props.dispatch({type: 'security/depositEFF',val})
  }else{
   let val={
    timeType:key,
    pageNo:1,
    pageSize:10
   }
   this.props.dispatch({type: 'security/depositEFF',val})
  }
 }


 handelchange = (pageNo,pageSize) => {
  console.log(pageNo)
  let val ={
   timeType:this.state.activeKey,
   pageNo:pageNo,
   pageSize:10
  }
  this.props.dispatch({type:'security/depositEFF',val})
 }
 render() {
   let datas= this.props.security.data
  let spc=datas && datas.data[0] ? datas : {}
  let {total,pageNo,pageSize} = this.props.security;

  return <div>
   <div><Search></Search></div>
   <div>
    <Navigation preson={true}>

     <div className={tableList}>
       <div className="my_account_dynamic_Topimg"></div>
      <Breadcrumb separator=">" className='security_nav_bar'>
       <Breadcrumb.Item href="/presonAccunt/myAccount" style={{fontSize:'12px', fontWeight:'normal' }}>我的账户</Breadcrumb.Item>
       <Breadcrumb.Item href="/presonAccount/personalInformation"  style={{fontSize:'12px', fontWeight:'normal' }}>我的信息</Breadcrumb.Item>
       <Breadcrumb.Item href="/presonAccount/deposit" style={{fontSize:'16px', fontWeight:'bold' }}>预存款信息</Breadcrumb.Item>
      </Breadcrumb>
      <div className='mychanges'>我的预存款余额：<span>{datas && datas.availablePredeposit}</span>元</div>
       <Tabs defaultActiveKey="0"  onChange={this.callback}>
        <TabPane tab="最近一周" key="0">
         <Table bordered pagination={{
          total:total,
          current:pageNo,
          pageSize:pageSize,
          showQuickJumper:true,
          onChange:this.handelchange
         }} className="intelligentUp_Detail" dataSource={spc.data} rowKey={record => record.lgId}  columns={this.columns} />
        </TabPane>
        <TabPane tab="最近一月" key="1">
         <Table bordered pagination={{
          total:total,
          current:pageNo,
          pageSize:pageSize,
          showQuickJumper:true,
          onChange:this.handelchange
         }} className="intelligentUp_Detail" dataSource={spc.data} rowKey={record => record.lgId}columns={this.columns} />
        </TabPane>
        <TabPane tab="最近三月" key="2">
         <Table bordered pagination={{
          total:total,
          current:pageNo,
          pageSize:pageSize,
          showQuickJumper:true,
          onChange:this.handelchange
         }} className="intelligentUp_Detail" dataSource={spc.data} rowKey={record => record.lgId} columns={this.columns} />
        </TabPane>
        <TabPane tab="最近一年" key="3">
         <Table bordered pagination={{
          total:total,
          current:pageNo,
          pageSize:pageSize,
          showQuickJumper:true,
          onChange:this.handelchange
         }} className="intelligentUp_Detail" dataSource={spc.data} rowKey={record => record.lgId}columns={this.columns} />
        </TabPane>
       </Tabs>

     </div>


    </Navigation>
   </div>
  </div>;
 }
}
export default connect(({security})=>({security}),(dispatch,own)=>{return {dispatch,own}})(Deposit);
