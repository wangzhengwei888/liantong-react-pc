import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Button, Form, Table, Modal, Input } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { fund_list } from './Fund.less'
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'

const FormItem = Form.Item;
const { TextArea } = Input;

class Fund extends Component {
 constructor (props) {
  super();
  this.state = {
   searchProject: '',
   loading: false,
   visible: false
  }
 }
 columns = [{
  title: '经费名称',
  dataIndex: 'name',
 }, {
  title: '经费代码',
  dataIndex: 'code',
 }, {
  title: '经费说明',
  dataIndex: 'instructions',
 }, {
  title: '创建时间',
  dataIndex: 'createTime',
 }, {
  title: '操作',
  render: (list) => {
   return <p><span className='edit'>编辑</span><span className='depr'>弃用</span></p>
  }
 }];
 data = [{
  key: '1',
  name: 'John Brown',
  code: 343252,
  instructions: '说明',
  createTime: '2018-03-01'
 }, {
  key: '2',
  name: 'Jim Green',
  code: 4234,
  instructions: '说明',
  createTime: '2018-03-01'
 }, {
  key: '3',
  name: 'Joe Black',
  code: 345343,
  instructions: '说明',
  createTime: '2018-03-01'
 }];

 onChange = (e) => {
  this.setState({
   [e.target.name] : e.target.value
  })
 }
 showModal = () => {
  this.setState({
   visible: true,
  });
 }
 handleOk = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
   console.log(err,values)
   if (!err) {
    this.setState({ loading: true });
    setTimeout(() => {
     this.setState({ loading: false, visible: false });
    }, 3000);
   }
  });
 }
 handleCancel = () => {
  this.setState({ visible: false });
 }

 render() {
  const { getFieldDecorator } = this.props.form;
  const formItemLayout = {
   labelCol: {
    sm: { span: 8 },
   },
   wrapperCol: {
    sm: { span: 12 },
   },
  }
  return (
   <div>
    <Search></Search>
    <Navigation preson={true}>
     <div className={fund_list}>
      <div className="my_account_dynamic_Topimg"></div>
      <Breadcrumb separator=">" className='security_nav_bar'>
       <Breadcrumb.Item href="/presonAccunt/myAccount" style={{fontSize:'12px', fontWeight:'normal' }}>我的账户</Breadcrumb.Item>
       <Breadcrumb.Item href="/group/fund" style={{fontSize:'12px', fontWeight:'normal' }}>我的群组</Breadcrumb.Item>
       <Breadcrumb.Item href="/group/fund" >群组经费管理</Breadcrumb.Item>
      </Breadcrumb>
      <div className="filter_bar">
       <Button type="primary" className='new_fund' onClick={this.showModal}>新建经费代码</Button>
       <div>
        <input placeholder='项目名称' name='searchProject' value={this.state.searchProject} onChange={(e) => this.onChange(e)}/>
        <Button type="primary">操作</Button>
       </div>
      </div>
      <Table columns={this.columns} dataSource={this.data} size="middle" />
      <Modal
       visible={this.state.visible}
       title="新建经费代码"
       closable={false}
       footer={null}
       className='fund_modal'
      >
       <Form onSubmit={this.handleOk}>
        <FormItem
         {...formItemLayout}
         label="经费名称："
        >
         {getFieldDecorator('fundName', {
          rules: [{
           required: true, message: '该项为必填项',
          }],
         })(
          <Input />
         )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label="审批流程名称"
        >
         {getFieldDecorator('processName', {
          rules: [{
           required: true, message: '该项为必填项',
          }],
         })(
          <Input />
         )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label="经费说明"
        >
         {getFieldDecorator('fundInstructions')(
          <TextArea rows={4} />
         )}
        </FormItem>
        <FormItem className='btns'>
         <Button key="submit" htmlType="submit" type="primary" loading={this.state.loading} className='next_step'>下一步</Button>
         <Button key="back" onClick={this.handleCancel} className='cancel'>关闭</Button>
        </FormItem>
       </Form>
      </Modal>
     </div>
    </Navigation>
   </div>
  )
 }
}

export default connect(({}) => ({}), (dispatch) => { return { dispatch } })(Form.create()(Fund))
