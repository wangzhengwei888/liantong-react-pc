import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Form, Breadcrumb, Input, Button, Row, Col, message } from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { getEmailValidateCodeAPI,getPhoneValidateCodeTwoAPI,unboundPhoneAPI ,unboundEmialAPI,checkAPI} from './api'
import { unbound } from './Unbound.less'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}
const formTailLayout = {
  wrapperCol: { offset: 8 },
}


class Unbound extends Component{
  constructor(props){
    super(props)
    let distinguishInfo = {}
    if(props.security.category == 'email'){
      distinguishInfo = {title:'解绑邮箱',label:'邮箱',type:'email',seccess:{hint:'解绑邮箱完成',bindingurl:'/presonAccount/presonAccount/bindingEmail',bindingTitle:'立即绑定新邮箱'}}
    }else if(props.security.category == 'phone'){
      distinguishInfo = {title:'更换解绑手机',label:'原手机号码',type:'phone',seccess:{hint:'解绑手机完成',bindingurl:'/presonAccount/presonAccount/bindingPhone',bindingTitle:'立即绑定新手机，如未绑定则无法进行购物操作'}}
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
     const form = this.props.form;
     let { distinguishInfo } = this.state
     let code = form.getFieldValue('validateCode')
     console.log(code)
     if(distinguishInfo.type == 'email'){
      this.props.dispatch({ type: 'security/unboundEmailEFF', code})
     }else if(distinguishInfo.type == 'phone'){
      this.props.dispatch({ type: 'security/unboundPhoneEFF', code})
     }
    }
   }
  )
 }
 isRight=()=>{
  this.props.form.validateFields(
   (err) => {
    if (!err) {
     let values={}
     const form = this.props.form;
     let { distinguishInfo } = this.state
     let code = form.getFieldValue('validateCode')
     console.log(code)
     if(distinguishInfo.type == 'email'){
      this.props.dispatch({ type: 'security/unboundEmailEFF', code})
     }else if(distinguishInfo.type == 'phone'){
       values={
        mobileValidateCode :code,
        pattern:0,
      }
      console.log(values)
      this.props.dispatch({ type: 'security/checkMobileCodeEEF', values})
     }
    }
   }
  )
 }

  getValidateCode = () => {
    let receiver = this.state.distinguishInfo.type
    if(receiver){
      let getValidateCodeAPI = ''
      let values=''
      let mobile=''
      if(this.state.distinguishInfo.type == 'email'){
        getValidateCodeAPI = getEmailValidateCodeAPI

        let values=this.props.security.data.data[0].memberEmail

       getValidateCodeAPI(values,0).then(res=>{
        if(res.result==1){
         console.log('发送解绑验证码')
         message.success(res.msg,1.5);
         this.setState({showCountDown:true,isClickable:true},()=>this.countDown())
        }else {
         message.error(res.msg,1.5);
        }
       })
      }else{
        getValidateCodeAPI =  getPhoneValidateCodeTwoAPI
       mobile=this.props.security.data.data[0].memberMobile
       let values={
        mobile:this.props.security.data.data[0].memberMobile,
        type:2
       }
       getValidateCodeAPI(values).then(res=>{
        if(res.result==1){
         console.log('发送解绑验证码')
         message.success(res.msg,1.5);
         this.setState({showCountDown:true,isClickable:true},()=>this.countDown())
        }else {
         message.error(res.msg,1.5);
        }
       })
       }

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
    const { getFieldDecorator } = this.props.form
    let datas = this.props.security.data
    let { distinguishInfo } = this.state


   let spc=datas && datas.data[0] ? datas.data[0] : {}
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={unbound}>
            <div className="my_account_dynamic_Topimg"></div>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="/presonAccount/personalInformation">我的信息</Breadcrumb.Item>
              <Breadcrumb.Item href='/presonAccount/presonAccount'>账户安全性</Breadcrumb.Item>
              <Breadcrumb.Item>{distinguishInfo.title}</Breadcrumb.Item>
            </Breadcrumb>
            {
             spc.memberEmail || spc.memberMobile?
                <Form>
                  <FormItem {...formItemLayout} label={`${distinguishInfo.label}`}>
                    {getFieldDecorator(distinguishInfo.type)(
                      <span>{distinguishInfo.type == 'phone' ? spc.memberMobile : spc.memberEmail}</span>
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
                          <Input placeholder="请输入验证码"  className='validate_code'/>
                        )}
                      </Col>
                      <Col span={8} style={{marginLeft:'6px'}}>
                        {/*<Button onClick={this.getValidateCode}>获取验证码</Button>*/}
                        { this.state.showCountDown==true ? <div>
                          {this.state.countDown}秒后重新获取
                        </div> : <Button onClick={this.getValidateCode}>获取验证码</Button>}
                      </Col>
                    </Row>
                  </FormItem>
                 {distinguishInfo.type == 'phone'?
                  <FormItem {...formTailLayout}>
                    <Button type="primary" onClick={this.isRight}>
                    下一步
                    </Button>
                  </FormItem>:
                  <FormItem {...formTailLayout}>
                   <Button type="primary" onClick={this.isRight}>
                    提交
                   </Button>
                  </FormItem>}
                </Form> :
                <div className='unbound_success'>
                  <span>{distinguishInfo.seccess.hint}</span>
                  <Link to={`${distinguishInfo.seccess.bindingurl}`}>{distinguishInfo.seccess.bindingTitle}</Link>
                </div>
            }
          </div>
        </Navigation>
      </div>
    )
  }
}

export default connect(({security})=>({security}),(dispatch)=>{return {dispatch}})(Form.create()(Unbound))
