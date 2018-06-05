import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Form, Breadcrumb, Input, Button, Row, Col } from 'antd'
import { connect } from 'dva'
import { getEmailValidateCodeAPI,getPhoneValidateCodeAPI,getCheckLoginNameAPI,checkMobileAPI} from './api'
import { binding_email } from './Binding.less'
import Search from '../../components/Search/Search';
import {message} from "antd/lib/index";
import Navigation from '../../components/Navigation/Navigation'
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}
const formTailLayout = {
  wrapperCol: { offset: 8 },
}

class BindingEmail extends Component{
  constructor(props){
    super(props)
    let distinguishInfo = {}
    if(props.security.category == 'email'){
      distinguishInfo = {title:'绑定邮箱',nameLabel:'邮箱',placeholder:'请输入需绑定的邮箱',type:'email',message:'请输入正确的邮箱地址',seccess:'绑定邮箱成功'}
    }else if(props.security.category == 'phone'){
      distinguishInfo = {title:'绑定手机',nameLabel:'手机号码',placeholder:'请输入需绑定的手机号',type:'phone',message:'请输入正确的手机号码',seccess:'绑定手机成功'}
    }
    this.state = {
      countDown:60,
      showCountDown: false,
      distinguishInfo,
     value: 1,

    }
  }
 componentWillMount(){
  const username=localStorage.getItem('userName');
  if(username){
   this.setState({username})
  }

 }

 check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          const {form,security} = this.props;
          let forminfo = {}
          if(security.category == 'email'){
            forminfo = {
              memberEmail: form.getFieldValue('email'),
              emailCode: form.getFieldValue('validateCode'),
              username:this.state.username
            }
            console.log(forminfo)
            this.props.dispatch({ type: 'security/bindingEmailEFF', forminfo})
          }else if(security.category == 'phone'){
            forminfo = {
              memberMobile: Number(form.getFieldValue('phone')),
              mobileCode: form.getFieldValue('validateCode'),
              username:this.state.username
            }
           console.log(forminfo)
             this.props.dispatch({ type: 'security/bindingPhoneEFF', forminfo})
          }
        }
      }
    )
  }
  getValidateCode = () => {
    this.props.form.validateFieldsAndScroll([this.state.distinguishInfo.type],(err,values)=>{
     console.log(values)
      if(!err){
        let getValidateCodeAPI = ''
       let spc=''
        if(this.state.distinguishInfo.type == 'email'){
        console.log(values)
         let val ={
          memberEmail:values.email,
          type:1
         }
          this.props.dispatch({type: 'security/getEmailValidateCodeEFF',val:val})
        }else{
         getValidateCodeAPI = getPhoneValidateCodeAPI
         let spc={
          mobile:values.phone,
          type:1
         }
         console.log(spc)
         getValidateCodeAPI(spc).then(res=>{
          if (res.result == 1) {
           message.success(res.msg, 1.5);
           this.countDown();
          } else {
           message.error(res.msg, 1.5);
          }
         })
         // this.props.dispatch({type: 'loginApi/sendSmsValidateCode', spc})


         //console.log('获取手机动态验证码')
        }

      }
    })
  }
 checkUnique=()=>{
   const name=this.distinguishInfo.type;
  var x=document.getElementById("check").value;
  console.log(x)
  document.getElementById("check").value=x.toUpperCase();
  if(name=='phone'){
   this.props.dispatch({type: 'loginApi/getEmailValidateCodeEFF', memberEmail: values.email})

  }
 }
 countDown = () => {
  const self = this;
  this.timout = window.setTimeout(function () {
   if (self.state.countDown > 0) {
    self.setState({countDown: self.state.countDown - 1, showCountDown: true});
    self.countDown();
   } else {
    self.setState({
     showCountDown: false,
     countDown: 60
    });
   }
  }, 1000, 0);
 }
  render () {
    const { getFieldDecorator } = this.props.form;
    let { data } = this.props.security
   const userName=localStorage.getItem('username');
    let { distinguishInfo } = this.state;
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={binding_email}>
            <div className="my_account_dynamic_Topimg"></div>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="/presonAccount/personalInformation">我的信息</Breadcrumb.Item>
              <Breadcrumb.Item href='/presonAccount/presonAccount'>账户安全性</Breadcrumb.Item>
              <Breadcrumb.Item>{distinguishInfo.title}</Breadcrumb.Item>
            </Breadcrumb>
             <Form>
                  <FormItem {...formItemLayout} label={`${distinguishInfo.nameLabel}`}>
                    {getFieldDecorator(distinguishInfo.type, {
                      rules: [{
                        required: true,
                        message: distinguishInfo.placeholder,

                      },{
                        type: distinguishInfo.type == 'email' ? 'email' : null,
                        pattern:distinguishInfo.type == 'email' ? null : /^[0-9]{11}$/  ,
                        message: distinguishInfo.message
                      }]
                    })(
                      <Input placeholder={`${distinguishInfo.placeholder}`} id='check' onBlur={this.state.checkUnique}/>
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="动态验证码">
                    <Row gutter={8}>
                      <Col span={14}>
                        {getFieldDecorator('validateCode', {
                          rules: [{
                            required: true,
                            message: '请输入验证码'
                          }]
                        })(
                          <Input placeholder="请输入验证码" className='email_validate_code'/>
                        )}
                      </Col>
                      <Col span={8} style={{marginLeft:'6px'}}>
                        { this.state.showCountDown==true ? <div  className='regist_yzm' >
                          {this.state.countDown}秒后重新获取
                        </div> : <Button onClick={this.getValidateCode}>获取验证码</Button>}
                        {/*<Button onClick={this.getValidateCode}>获取验证码</Button>*/}
                      </Col>
                    </Row>
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
export default connect(({security})=>({security}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(BindingEmail))
