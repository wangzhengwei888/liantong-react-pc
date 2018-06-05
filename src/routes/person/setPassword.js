/**
 * 个人中心修改密码
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb,Upload ,Button,Cascader,Form,Input,Icon,Steps,message,Row, Col} from 'antd';
import Img from '../../components/Img/Img';
import { getFullUrl } from '../../utils/common';
import {getMobileCode } from './api';
import { setPassword_body } from './setPassword.less';
const Step = Steps.Step;
const FormItem = Form.Item;

const steps = [{
  title: '1',
  info: '验证身份',
}, {
  title: '2',
  info: '修改登录密码',
}, {
  title: '3',
  info: '完成',
}];



class  SetPassword extends Component{
  constructor(props) {
    super(props);
    this.timout=null;
    this.state={
      current: 0,
      confirmDirty: false,
      showCountDown: false,
      countDown:60,
      value: 1,
      confirmDirty: false,
      url:`/loginApi/genValidateImage`,
      xyChecked:true
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        const current = this.state.current + 1;
        this.setState({ current });
      }
    });
  }
  //获取验证码
  handleCIMG = ()=> {
    let num=Math.floor(Math.random()*1000);
    this.setState({
      url:`/loginApi/genValidateImage?key=${num}`
    })
  }
//获取手机验证码
  getmbcode=()=>{
    this.props.form.validateFieldsAndScroll(['mobile'],(err,values)=>{
      if(!err){
        console.log(values)
        // getMobileCode(values).then(r=>{
        //   if(r.code==200){
        //     message.success(r.msg,1.5);
        //     this.countDown();
        //   }else {
        //     message.error(r.msg,1.5);
        //   }
        // })
      }
    })
  }

  countDown = () => {
    const self = this;
    this.timout = window.setTimeout(function() {
      if (self.state.countDown > 0) {
        self.setState({ countDown: self.state.countDown - 1,showCountDown:true });
        self.countDown();
      } else {
        self.setState({
          showCountDown: false,
          countDown:60
        });
      }
    }, 1000, 0);
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次密码不一样!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  componentDidMount() {

  }

  render (){
    const { current } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const steperOne = ()=>{
      return (
        <div>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.info} />)}
          </Steps>
          <div className="steps-content">
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="已绑定手机号"
                hasFeedback
              >
                <Row gutter={8}>
                  <Col span={6}>
                    {getFieldDecorator('phone')(
                      <span className="phone">1322222222</span>
                    )}
                  </Col>
                  <Col span={12}>
                    { this.state.showCountDown==true ? <div  className='regist_yzm' >
                      {this.state.countDown}秒后重新获取
                    </div> : <Button type="primary" size="large" onClick={this.getmbcode}>获取验证码</Button>}
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="手机验证码"
                hasFeedback
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('mobileValidateCode', {
                      rules: [{ required: true, message: '请输入手机验证码!' }],
                    })(
                      <Input size="large" />
                    )}
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="验证码"
                hasFeedback
                style={{marginBottom:'10px'}}
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('validateCode', {
                      rules: [{ required: true, message: '请输入4位验证码!',len:4 }],
                    })(
                      <Input size="large" />
                    )}
                  </Col>
                  <Col span={4}>
                    <div style={{float:'right',display:'inline-block',cursor:'pointer'}}>
                      <img style={{verticalAlign: 'middle'}} src={`${getFullUrl(this.state.url)}`}  onClick={this.handleCIMG}/>
                    </div>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </div>
        </div>
      )
    }
    const steperTwo = ()=>{
      return (
        <div>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.info} />)}
          </Steps>
          <div className="steps-content">
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="旧密码"
                hasFeedback
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('oldPassword', {
                      rules: [{
                        required: true, message: '请输入旧密码'
                      }],
                    })(
                      <Input type="password" />
                    )}
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="新密码"
                hasFeedback
                extra="请设置6-20位不连续相同的字母、数字或符号，勿使用联系方式"
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('newPassword', {
                      rules: [{
                        required: true, message: '请输入至少6位的密码',min:6,
                      }, {
                        validator: this.checkConfirm,
                      }],
                    })(
                      <Input type="password" />
                    )}
                  </Col>
                </Row>

              </FormItem>
              <FormItem
                {...formItemLayout}
                label="确认密码"
                hasFeedback
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('confirm', {
                      rules: [{
                        required: true, message: '请再次输入您的密码',
                      }, {
                        validator: this.checkPassword,
                      }],
                    })(
                      <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请再次填写密码" />
                    )}
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </div>
        </div>
      )
    }

    const steperThree = ()=>{
      return (<div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.info} />)}
        </Steps>
        <div className="steps-content">
          <div>修改成功</div>
        </div>
      </div>)
    }

    return (
      <div className={setPassword_body}>
        <div className="setPassword_content">
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="">我的商城</Breadcrumb.Item>
              <Breadcrumb.Item>设置</Breadcrumb.Item>
              <Breadcrumb.Item>修改密码</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {/*列表*/}
          <div className="setPassword_form">

            {this.state.current == 0 ? steperOne() : this.state.current == 1 ? steperTwo() : steperThree()}

            { steperTwo() }
            { steperThree() }
            <div className="steps-action">
              {
                this.state.current < steps.length - 1
                &&
                <Button type="primary" onClick={this.handleSubmit}>提交</Button>
              }
              {
                this.state.current === steps.length - 1
                &&
                <Button type="primary" onClick={() => message.success('已经修改成功')}>完成</Button>
              }
            </div>
          </div>

        </div>

      </div>
    );
  }
}


export default connect(({setPassword})=>({setPassword}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(SetPassword));

