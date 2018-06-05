import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Form, Breadcrumb, Input, Button, Row, Col, message , Table,Modal,Tree } from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { unbound } from './managerTemplates.less'
import { getEmailValidateCodeTwoAPI,getPhoneValidateCodeTwoAPI,unboundPhoneAPI ,unboundEmialAPI,checkAPI} from './api'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'



const TreeNode = Tree.TreeNode;
const columns = [{
 title: '商品编号',
 dataIndex: 'name',
 key: 'name',
 width: '20%',
}, {
title: '商品名称',
 dataIndex: 'age',
 key: 'age',
 width: '20%',
}, {
 title: '品牌',
 dataIndex: 'a',
 key: '1',
 width: '15%',
}, {
 title: '规格',
 dataIndex: 'b',
 key: '2',
 width: '15%',
}, {
 title: '包装',
 dataIndex: 'c',
 key: '3',
 width: '15%',
}, {
 title: '市场价',
 dataIndex: 's',
 key: '4',
 width: '20%',
}
];

const data = [{
 key: 1,
 name: 'John Brown sr.',
 age: 60,
 address: 'New York No. 1 Lake Park',
 a:11,
 b:'sss',
 c:'dsfadsfds',
 s:111

},
 {
  key: 2,
  name: 'John Brown sr.',
  age: 60,
  address: 'New York No. 1 Lake Park',
  a:11,
  b:'sss',
  c:'dsfadsfds',
  s:111

 },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
 onChange: (selectedRowKeys, selectedRows) => {
  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
 },
 onSelect: (record, selected, selectedRows) => {
  console.log(record, selected, selectedRows);
 },
 onSelectAll: (selected, selectedRows, changeRows) => {
  console.log(selected, selectedRows, changeRows);
 },
};
class managerTemplates extends Component {
 constructor(props) {
  super(props)
  this.state = {
   style:{display:'none'},
   isClick:false,
   visible: false,
   showTable:'+',
  }
 }

 show=()=>{
  console.log(1111)
  if (this.state.showTable=== "+") {
   this.setState({showTable:"-"} )
  } else {
   this.setState({showTable:"+"} )
  }
  if (this.state.style.display === "block") {
   this.setState({ style: { display: "none", } })
  } else {
   this.setState({ style: { display: "block", } })
  }

 }
 showModal=()=>{console.log('弹出框')
  this.setState({
   visible: true,
  });
 }
 handleOk = () => {
  this.setState({ loading: true });
  setTimeout(() => {
   this.setState({ loading: false, visible: false });
  }, 3000);
 }
 handleCancel = () => {
  this.setState({ visible: false });
 }
 render() {
  return (
   <div>
    <Search></Search>
    <Navigation preson={true}>
     <div className={unbound}>
      <div className="my_account_dynamic_Topimg"></div>
      <Breadcrumb separator=">" className='security_nav_bar'>
       <Breadcrumb.Item href="/presonAccunt/myAccount" style={{fontSize:'12px', fontWeight:'normal' }}>我的账户</Breadcrumb.Item>
       <Breadcrumb.Item href="/presonAccount/personalInformation"  style={{fontSize:'12px', fontWeight:'normal' }}>我的信息</Breadcrumb.Item>
       <Breadcrumb.Item href="/presonAccount/managerTemplates" style={{fontSize:'16px', fontWeight:'bold' }}>采购模板管理</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{width:'100%',paddingTop:'15px'}}>
       <div style={{width:'100%'}}>
        {/*//模板1*/}
        <div className="orderList_content" style={{border:'1px solid #E4E4E4',padding:'8px 5px'}}>
         <Row className="orderList_content_head">
          <Col span={1}>
           <span style={{display:'inline-block',border:'1px solid #000',width:'20px',height:'20px',fontSize:'20px',textAlign:'center',lineHeight:'15px'}}
            onChange={this.onCheckAllChange}
                 onClick={this.show}
           >{this.state.showTable}
           </span></Col>
          <Col span={3} style={{fontSize:'13px',fontWeight:'blod'}}>采购模板1</Col>
          <Modal
           visible={this.state.visible}
           title="修改采购模板名称"
           onOk={this.handleOk}
           onCancel={this.handleCancel}
           footer={[
            <Button key="submit"  size="large" loading={this.state.loading} onClick={this.handleOk}>
             修改
            </Button>,
           ]}
          >
           <p>sssssssssssssssssssss</p>
           <p>ssssssssssssssssssss</p>

          </Modal>
          <Col span={6} ><Button onClick={this.showModal} style={{color:'#108EE9',border:'none'}}>修改</Button></Col>
          <Col span={4}>2018-04-26 16:02</Col>
          <Col span={3}><Button style={{background:'#199ED8',color:'#fff'}}>加入购物车</Button></Col>
          <Col span={3}><Button>删除商品</Button></Col>
          <Col span={3}><Button>删除模板</Button></Col>
         </Row>
         <Table  style={this.state.style}
          className="components-table-demo-nested"
          columns={columns}
          rowSelection={rowSelection}
          //expandedRowRender={expandedRowRender}
          dataSource={data}
         />
         </div>
        {/*-------------------------------------------------------------------------------------------*/}
        {/*<div className='employ_list'>*/}
         {/*<Tree showLine>*/}
          {/*<TreeNode title="使用积分" key="0-1">*/}
           {/*<TreeNode key="0-1-0">*/}
            {/*<div className="table_information">*/}
             {/*<div className="table_top">*/}
              {/*使用积分 （账户当前余额：432432432423分，本次最高可抵扣积分： 200分）*/}
             {/*</div>*/}
             {/*<div className="table_down">*/}
              {/*<div><input type="text"/> 请输入需要使用的积分的数额</div>*/}
              {/*<div className='btn'>确认使用</div>*/}
             {/*</div>*/}
            {/*</div>*/}
           {/*</TreeNode>*/}
          {/*</TreeNode>*/}
          {/*<TreeNode title="使用预存款" key="0-0">*/}
           {/*<TreeNode key="0-0-0">*/}
            {/*<div className="table_information">*/}
             {/*<div className="table_top">*/}
              {/*使用预存款 （账户当前余额：10.00元）*/}
             {/*</div>*/}
             {/*<div className="table_down">*/}
              {/*<div><input type="text"/> 请输入需要使用的预存款的金额</div>*/}
              {/*<div className='btn'>确认使用</div>*/}
             {/*</div>*/}
            {/*</div>*/}
           {/*</TreeNode>*/}
          {/*</TreeNode>*/}

         {/*</Tree>*/}
        {/*</div>*/}
        {/*-----------------------------------------------------------------------------------------*/}
        {/*<Table columns={columns} rowSelection={rowSelection} dataSource={data} />*/}
       </div>
       <div style={{width:'100%'}}>
        {/*//模板1*/}
        <div className="orderList_content" style={{border:'1px solid #E4E4E4',padding:'8px 5px'}}>
         <Row className="orderList_content_head">
          <Col span={1}>
           <span style={{display:'inline-block',border:'1px solid #000',width:'20px',height:'20px',fontSize:'20px',textAlign:'center',lineHeight:'15px'}}
                 onChange={this.onCheckAllChange}
                 onClick={this.show}
           >{this.state.showTable}
           </span></Col>
          <Col span={3} style={{fontSize:'13px',fontWeight:'blod'}}>采购模板2</Col>
          <Col span={6} ><Button onClick={this.showModal} style={{color:'#108EE9',border:'none'}}>修改</Button></Col>
          <Col span={4}>2018-04-26 16:02</Col>
          <Col span={3}><Button style={{background:'#199ED8',color:'#fff'}}>加入购物车</Button></Col>
          <Col span={3}><Button>删除商品</Button></Col>
          <Col span={3}><Button>删除模板</Button></Col>
         </Row>
         <Table   style={this.state.style}
                 className="components-table-demo-nested"
                 columns={columns}
                 rowSelection={rowSelection}
          //expandedRowRender={expandedRowRender}
                 dataSource={data}
         />

        </div>
        {/*-------------------------------------------------------------------------------------------*/}
        {/*<div className='employ_list'>*/}
        {/*<Tree showLine>*/}
        {/*<TreeNode title="使用积分" key="0-1">*/}
        {/*<TreeNode key="0-1-0">*/}
        {/*<div className="table_information">*/}
        {/*<div className="table_top">*/}
        {/*使用积分 （账户当前余额：432432432423分，本次最高可抵扣积分： 200分）*/}
        {/*</div>*/}
        {/*<div className="table_down">*/}
        {/*<div><input type="text"/> 请输入需要使用的积分的数额</div>*/}
        {/*<div className='btn'>确认使用</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</TreeNode>*/}
        {/*</TreeNode>*/}
        {/*<TreeNode title="使用预存款" key="0-0">*/}
        {/*<TreeNode key="0-0-0">*/}
        {/*<div className="table_information">*/}
        {/*<div className="table_top">*/}
        {/*使用预存款 （账户当前余额：10.00元）*/}
        {/*</div>*/}
        {/*<div className="table_down">*/}
        {/*<div><input type="text"/> 请输入需要使用的预存款的金额</div>*/}
        {/*<div className='btn'>确认使用</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</TreeNode>*/}
        {/*</TreeNode>*/}

        {/*</Tree>*/}
        {/*</div>*/}
        {/*-----------------------------------------------------------------------------------------*/}
        {/*<Table columns={columns} rowSelection={rowSelection} dataSource={data} />*/}
       </div>
      </div>
     </div>
    </Navigation>
   </div>
  )
 }
}
export default connect(({security})=>({security}),(dispatch)=>{return {dispatch}})(managerTemplates )
