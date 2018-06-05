/**
 * Created by leimingtech-lhm on 2017/8/10.
 */
import React , { Component } from 'react';
import { connect } from 'dva';
import {Button,Modal,Form,Row,Col,Tag,Radio,message, Input } from 'antd';
import {loginBtn} from './loginBtn.less'
import {isLogin} from '../../utils/request'
const FormItem = Form.Item;
/***
 * isLogin 是否登录
 * useClass 传入的样式名称 只能传loginBtn.less中的样式 且只传'-'之前部分
 * title 登录成功展示的信息
 * 示例 <LoginBtn useClass='priceBtn' title={'￥100.00'} clickHandle={function()}/>
 */
class LoginBtn extends Component{
  constructor(props){
    super(props);
    this.state={
      isLogin:isLogin(),
      useClass:this.props.useClass,
      visible:false,
    }
  }

  //需要执行的函数
  clickHandle=()=> {
    if (this.props.isChannelPrice != 0) {
      if (this.props.clickHandle) {
        this.props.clickHandle();
      }
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  goLogin = () => {
    window.location.href = "/login"
  }


 handleOk = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values.remark);
        if (!values.remark || values.remark.trim() == '') {
          message.info('备注信息不能为空');
          return;
        }
        if (!values.applyUser || values.applyUser.trim() == '') {
          message.info('联系人姓名不能为空');
          return;
        }
        if (!values.tel || values.tel.trim() == '') {
          message.info('联系人手机号不能为空');
          return;
        }
        if (!/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(values.tel.replace(/\s/g,''))) {
          message.info('手机号格式不正确');
          return;
        }
        this.props.dispatch({ type:'app/applyChannelEFF' , goodsId:this.props.goodsId, ...values });
        this.setState({
          visible: false,
        });
      }
    });
  }


  render(){
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator } = this.props.form;
    let { visible } = this.state;
    return(
      <div className={loginBtn}>
        <div className={this.state.useClass+'-'+this.state.isLogin.toString()} onClick={this.clickHandle}>
          {this.state.isLogin ? (this.props.title) :<div onClick={this.goLogin}>登录可见</div>}
        </div>
        {/*<Modal*/}
          {/*title="没有采购权限"*/}
          {/*visible={visible}*/}
          {/*onOk={this.handleOk}*/}
          {/*onCancel={this.handleCancel}*/}
          {/*footer={*/}
            {/*<Row type="flex" justify="space-around">*/}
              {/*<Col> <Button type="primary" onClick={this.handleOk}>立即申请</Button></Col>*/}
              {/*<Col> <Button  onClick={this.handleCancel}>以后再说</Button></Col>*/}
            {/*</Row>*/}
          {/*}*/}
        {/*>*/}
          {/*<div style={{ height:'50px', lineHeight:'50px', textAlign:'center', fontSize:'16px', color:'#000' }}>您好，如需采购，请向卖家申请开通采购权限。</div>*/}
          {/*<FormItem*/}
            {/*{ ...formItemLayout }*/}
            {/*label={ <span style={{ fontSize:'16px', fontWeight:'bold' }}>备注信息</span>}*/}
          {/*>*/}
            {/*{getFieldDecorator('remark', {*/}
            {/*})(*/}
              {/*<Input />*/}
            {/*)}*/}
          {/*</FormItem>*/}
          {/*<FormItem*/}
            {/*{ ...formItemLayout }*/}
            {/*label={ <span style={{ fontSize:'16px', fontWeight:'bold' }}>联系人姓名</span>}*/}
          {/*>*/}
            {/*{getFieldDecorator('applyUser', {*/}
            {/*})(*/}
              {/*<Input />*/}
            {/*)}*/}
          {/*</FormItem>*/}
          {/*<FormItem*/}
            {/*{ ...formItemLayout }*/}
            {/*label={ <span style={{ fontSize:'16px', fontWeight:'bold' }}>联系人电话</span>}*/}
          {/*>*/}
            {/*{getFieldDecorator('tel', {*/}
            {/*})(*/}
              {/*<Input />*/}
            {/*)}*/}
          {/*</FormItem>*/}
        {/*</Modal>*/}
      </div>
    )
  }
}

export default connect(({app})=>({app}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(LoginBtn));

