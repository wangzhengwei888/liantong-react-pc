import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Form, Breadcrumb, Input, Button, Row, Col } from 'antd'
import { connect } from 'dva'
import { getEmailValidateCodeAPI,getPhoneValidateCodeAPI,getCheckLoginNameAPI,checkMobileAPI} from './api'
import { binding_email } from './Binding.less'
import Search from '../../components/Search/Search';
import {message} from "antd/lib/index";
import Img from '../../components/Img/Img';
import Navigation from '../../components/Navigation/Navigation'
const FormItem = Form.Item;

const formItemLayout = {
 labelCol: { span: 8 },
 wrapperCol: { span: 8 },
}
const formTailLayout = {
 wrapperCol: { offset: 8 },
}

class BindingSuccess extends Component{
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
 check = () => {
  this.props.form.validateFields(
   (err) => {
    if (!err) {
     const {form,security} = this.props;
     let forminfo = {}
     if(security.category == 'email'){
      forminfo = {
       memberEmail: form.getFieldValue('email'),
       emailCode: form.getFieldValue('validateCode')
      }
      this.props.dispatch({ type: 'security/bindingEmailEFF', forminfo})
     }else if(security.category == 'phone'){
      forminfo = {
       memberMobile: Number(form.getFieldValue('phone')),
       mobileCode: form.getFieldValue('validateCode')
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
    if(this.state.distinguishInfo.type == 'email'){
     this.props.dispatch({type: 'security/getEmailValidateCodeEFF', memberEmail: values.email})
    }else{
     this.props.dispatch({type: 'loginApi/sendSmsValidateCode', memberMobile: values.phone})

     getValidateCodeAPI = getPhoneValidateCodeAPI
     //console.log('获取手机动态验证码')
    }
    getValidateCodeAPI(values).then(res=>{
     if (res.result == 1) {
      message.success(res.msg, 1.5);
      this.countDown();
     } else {
      message.error(res.msg, 1.5);
     }
    })
   }
  })
 }
 checkUnique=()=>{
  const name=this.distinguishInfo.type;
  var x=document.getElementById("check").value;
  console.log(x)
  document.getElementById("check").value=x.toUpperCase();
  if(name=='phone'){
   this.props.dispatch({type: 'loginApi/checkUniqueEFF', memberEmail: values.email})

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
  let { distinguishInfo } = this.state
  console.log(distinguishInfo.type)
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
      <div style={{paddingLeft:'40px',marginTop:'10px',border:'1px solid #000',background:'#EDFED1',textAlign:'left',width:'100%',height:'90px'}}>
      <div style={{width:'200px',display:'flex'}}>
       <img style={{width:'50px',height:'50px',marginTop:'20px '}} src={require('../../assets/success.png')} alt=""/>
       <span style={{fontSize:'20px',margin:'29px 0 0 15px',}}>绑定邮箱成功</span>
      </div>
      </div>
     </div>
    </Navigation>
   </div>
  )
 }
}
export default connect(({security})=>({security}),(dispatch)=>{return {dispatch}})(Form.create()(BindingSuccess))
