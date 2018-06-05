import React, { Component } from 'react'
import { Form, Breadcrumb, Input, Button, Checkbox } from 'antd'
import { connect } from 'dva'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { setpassword } from './SetPassword.less'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
const formTailLayout = {
  wrapperCol: { offset: 8 },
}

class SetPassword extends Component{
  constructor () {
    super()
    this.state = {
      confirmDirty: false
    }
  }
  check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          const form = this.props.form;
          let password = {
            password: form.getFieldValue('oldPassword'),
            newpassword: form.getFieldValue('newPassword')
          }
          this.props.dispatch({ type: 'security/modifyPasswordEFF', password})
        }
      }
    )
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || value });
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={setpassword}>
            <BodyHeadImg headImg={{url:'/upload/img/lmadv/1508217294561.png',id:'234'}}/>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="/presonAccount/personalInformation">我的信息</Breadcrumb.Item>
              <Breadcrumb.Item href='/presonAccount/presonAccount'>账户安全性</Breadcrumb.Item>
              <Breadcrumb.Item>修改密码</Breadcrumb.Item>
            </Breadcrumb>
            <Form>
              <FormItem {...formItemLayout} label="当前密码">
                {getFieldDecorator('oldPassword', {
                  rules: [{
                    required: true,
                    message: '请输入当前的登录密码密码'
                  }],
                })(
                  <Input type='password' placeholder="请输入当前的登录密码密码"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="新密码">
                {getFieldDecorator('newPassword', {
                  rules: [{
                    required: true,
                    message: '请输入修改的新密码'
                  }, {
                    pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{8,15}$/,
                    message: '请输入8-15位数字+字母的密码'
                  }, {
                    validator: this.checkConfirm,
                  }],
                })(
                  <div>
                    <Input type='password' placeholder="请输入修改的新密码" />
                    <span>字母+数字，8-15位字符之间</span>
                  </div>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="重复新密码">
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true,
                    message: '请再次输入您的密码'
                  }, {
                    validator: this.checkPassword
                  }],
                })(
                  <Input type='password' placeholder="请重新输入一次新密码" onBlur={this.handleConfirmBlur} />
                )}
              </FormItem>
              <FormItem {...formTailLayout}>
                <Button type="primary" onClick={this.check}>
                  提交
                </Button>
              </FormItem>
            </Form>
          </div>
        </Navigation>
      </div>
    )
  }
}
export default connect(({security})=>({security}),(dispatch)=>{return {dispatch}})(Form.create()(SetPassword))
