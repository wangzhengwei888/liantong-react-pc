import React , { Component } from 'react';
import { connect } from 'dva';
import Top from './top';
import { routerRedux } from 'dva/router';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Slider ,Radio,message,Menu,Dropdown,} from 'antd'
import { regi_body,regi_content,textleter ,zcsubmit,bg,bg2} from './register.less';
import { getFullUrl } from '../../utils/common';
import { getMobileCode,getCheckLoginName,getCheckLoginMobile,checkMobileOrEmail,sendForgetPasswordSmsCode } from './api';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';
const Option = Select.Option;
const FormItem = Form.Item;



class  ForgetPassword extends Component{
  constructor(props){
    super(props);
    this.timout=null;
    this.state={
      confirmDirty: false,
      showCountDown: false,
      countDown:60,
      value: 1,
      confirmDirty: false,
      url:`/loginApi/genValidateImage`,
      menu: '手机号',
      menuKey:'1',
      MobileOrEmail: {len:11,pattern:/^1[0-9]{10}$/}
    }
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, val) => {
      if (!err) {
          let values = {
            memberMobile:val.mobile,
            newPassword:val.password,
            verifyCode:val.mobileValidateCode,
          }
          // this.props.dispatch({ type: 'login/register', payload: values })
         this.props.dispatch({ type: 'login/updatePasswordByMobileEEF', val: values })
         window.location.href = "/login"
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
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
//获取验证码
  handleCIMG = ()=> {
    let num=Math.floor(Math.random()*1000);
    this.setState({
      url:`/loginApi/genValidateImage?key=${num}`
    })
  }

  handleMenuClick = (e) => {
    let MobileOrEmail = {}
   if (e.key == 1) {
  //  this.props.dispatch({type: 'cart/getCartList', payload: {orderBy: 0}});
    MobileOrEmail = {len:11,pattern:/^1[0-9]{10}$/}
      this.mobileVerificat;
   } else if (e.key == 2) {
  //  this.props.dispatch({type: 'cart/getCartList', payload: {orderBy: 1}});
    MobileOrEmail = {type: 'email'}
       this.mobileVerificat;
   }
   this.props.form.setFieldsValue({
    mobile: ''
   });
   this.setState({
     menu: e.item.props.children,
     menuKey:e.key,
    MobileOrEmail:MobileOrEmail
   })
  }

//获取手机验证码sendForgetPasswordSmsCode

//判断手机唯一性和邮箱的验证

// checkMobileOrEmail = () => {
//   this.props.form.validateFieldsAndScroll(['mobile'], (err, values) => {

//        let choiceKey= this.state.menuKey
//      //  let values= values.mobile
//       if (!err) {
//         console.log(values)
//         checkMobileOrEmail({name:choiceKey,value:values.mobile}).then(r => {
//          if (r.result == 1) {
//           message.success(r.msg, 1.5);
//           console.log(values)
//          } else {
//           message.error(r.msg, 1.5);
//          }
//         })
//        }
//   })
//  }
  getmbcode=()=>{
    this.props.form.validateFieldsAndScroll(['mobile','validateCode'],(err,values)=>{
      let choiceKey= this.state.menuKey
      let value= values.mobile
      let validateCode= values.validateCode
      if(!err){
        console.log(values)
        sendForgetPasswordSmsCode({name:choiceKey,value:value,validateCode:validateCode}).then(r=>{
          if(r.result == 1){
            message.success(r.msg,1.5);
            this.countDown();
          }else {
            message.error(r.msg,1.5);
          }
        })
      }
    })
  }

 //判断手机唯一性
 mobileVerificat = () => {
  this.props.form.validateFieldsAndScroll(['mobile'], (err, values) => {
   if (!err) {
    console.log(values)
    getCheckLoginMobile(values).then(r => {
     if (r.result == 1) {
      message.success('手机号验证成功', 1.5);
      console.log(values)
     } else {
      message.error(r.msg, 1.5);
     }
    })
   }
  })
 }


//  handleMenuClick = (e) => {
//    let MobileOrEmail = {}
//   if (e.key == 1) {
//  //  this.props.dispatch({type: 'cart/getCartList', payload: {orderBy: 0}});
//    MobileOrEmail = {len:11,pattern:/^1[0-9]{10}$/}
//      this.mobileVerificat;
//   } else if (e.key == 2) {
//  //  this.props.dispatch({type: 'cart/getCartList', payload: {orderBy: 1}});
//    MobileOrEmail = {type: 'email'}
//       this.mobileVerificat;
//   }
//   this.props.form.setFieldsValue({
//    mobile: ''
//   });
//   this.setState({
//     menu: e.item.props.children,
//     menuKey:e.key,
//    MobileOrEmail:MobileOrEmail
//   })
//  }




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
  componentWillUnmount(){
    if(this.timout!=null){
      window.clearTimeout(this.timout);
      this.timout=null;
    }
  }

  render (){
    const {
      form: {getFieldDecorator},
      login
    }=this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 10,
        },
      },
    };
    return (
      <div>
       <Search></Search>
       <Navigation>
        <div className={regi_body} style={{width:'unset'}}>
          <Row>
           <Col span={12} offset={12} style={{fontSize:'18px',fontWeight:'bold',paddingBottom:'30px',paddingTop:'20px'}}>找回密码</Col>
            <Col span={24} >
              <Form onSubmit={this.handleSubmit} className="login-form">
                <div  className={regi_content}>
                  <FormItem
                    {...formItemLayout}
                    label= {
                    <Dropdown overlay={
                      <Menu onClick={this.handleMenuClick}>
                       <Menu.Item key="1">手机号</Menu.Item>
                       <Menu.Item key="2">邮箱</Menu.Item>
                      </Menu>
                     }>
                      <Button style={{marginLeft: '8px', width: '110px'}}>
                       {this.state.menu} <Icon type="down"/>
                      </Button>
                     </Dropdown>}
                  >
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('mobile', {
                          rules: [{ required: true, message: '请输入正确的手机号或者邮箱!',...this.state.MobileOrEmail }],
                        })(
                          <Input  style={{ width: '100%' }}/>
                        )}
                      </Col>
                    {/*  <Col span={6} style={{fontSize: '14px'}}>
                              <Button  type="primary"  size="large" onClick={this.checkMobileOrEmail} style={{width:'140px'}}>验证手机或者邮箱</Button>
                      </Col>*/}
                    </Row>
                  </FormItem>
                  <FormItem
                      {...formItemLayout}
                      label="验证码"

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
                        <Col span={6}>
                          <div style={{display:'inline-block',cursor:'pointer'}}>
                            <img style={{}} src={`${getFullUrl(this.state.url)}`}  onClick={this.handleCIMG}/>
                          </div>
                        </Col>
                      </Row>
                    </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="动态验证码"

                  >
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('mobileValidateCode', {
                          rules: [{ required: true, message: '请输入手机验证码!' }],
                        })(
                          <Input size="large" />
                        )}
                      </Col>
                      <Col span={7} style={{fontSize: '14px'}}>
                        {this.state.showCountDown == true ? <div className='regist_yzm'>
                          {this.state.countDown}秒后重新获取
                        </div> : <Button type="primary" size="large" onClick={this.getmbcode}>获取验证码</Button>}
                      </Col>

                    </Row>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="设置密码"
                    hasFeedback
                    //extra="字母+数字，8-15位字符之间"
                  >
                    <Row gutter={8}>
                      <Col span={12}>
                        {getFieldDecorator('password', {
                          rules: [{
                            required: true, message: '字母+数字，8-15位字符之间,以字母开头!',pattern:/^(?!([a-zA-Z]+|[0-9]+)$)[A-z0-9]{8,15}$/
                          }, {
                            validator: this.checkConfirm,
                          }],
                        })(
                          <Input type="password"  placeholder="请输入修改的密码" />
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
                            required: true, message: '请再次输入修改新密码',
                          }, {
                            validator: this.checkPassword,
                          }],
                        })(
                          <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请再次填写密码" />
                        )}
                      </Col>
                    </Row>
                  </FormItem>

                </div>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" disabled={this.props.login.regBtn} className={zcsubmit}>保存</Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
       </Navigation>
      </div>
    );
  }
}

export default connect(({login})=>({login}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(ForgetPassword));

