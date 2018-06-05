import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox,Spin, Row, Col } from 'antd';
import { login_form ,login_titlePIC,login_form_forgot,login_bottom} from './Login.less';
import { Link } from 'dva/router';
import { getFullUrl } from '../../utils/common';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import  Top from './top';


const FormItem = Form.Item;


class  Login extends Component{
      constructor(props){
        super(props);
        this.state={
          url:`/loginApi/genValidateImage`
        }
      }

   handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        this.props.dispatch({ type: 'login/login', payload: values })
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
  render (){
    const {
        login,
        app,
        dispatch,
        form: {
        getFieldDecorator,
     }
    }=this.props;
    return (
      <div>
        <div><Search></Search></div>
       <Navigation isPreson={false}>


        {/*<div className={login_bottom}>*/}
          {/*<div className="link-list">*/}
            {/*{app.linkUrlData.length > 0 && app.linkUrlData.map((list,index)=>{*/}
              {/*if(index < app.linkUrlData.length-1){*/}
                {/*return <span key={index}><a href={list.dictionaryValue} target="_blank">{list.dictionaryName}</a>&nbsp;|&nbsp;</span>*/}
              {/*}else{*/}
                {/*return <span key={index}><a href={list.dictionaryValue} target="_blank">{list.dictionaryName}</a></span>*/}
              {/*}*/}
            {/*})}*/}
          {/*</div>*/}

          {/*<div style={{width:'1125px',margin:'9px auto 10px',textAlign:'center'}} >*/}
            {/*Copying 2011-2015 国药集团版权所有 Inc All rights reserved <span></span>*/}
          {/*</div>*/}

          {/*<div className="guo_img">*/}
            {/*<div className="guo_img1"></div>*/}
            {/*<div className="guo_img2"></div>*/}
            {/*<div className="guo_img3"></div>*/}
          {/*</div>*/}
        {/*</div>*/}
       </Navigation>
       <div className={login_form}>
        <div className='from-box clearfix'>
         <div style={{ height:'32px', lineHeight:'32px', textAlign:'center', fontWeight:'bold', fontSize:'18px', width:'400px', margin:' 30px 0px 30px 0px'}}>会员登陆</div>
         <Form onSubmit={this.handleSubmit} className="login-form">
          <Row gutter={16}>
           <Col span={6} style={{ height:'32px', lineHeight:'32px', textAlign:'right', fontWeight:'bold' }}>账号名称：</Col>
           <Col span={18}>
            <FormItem>
             {getFieldDecorator('username', {
              rules: [{  required: true,
               //pattern:/^1[0-9]{10}$/,len:11,
               message: '请输入正确的手机号码或者用户名!' }],
             })(
              <Input  placeholder="用户名/手机号/邮箱" />
             )}
            </FormItem>
           </Col>
          </Row>

          <Row gutter={16}>
           <Col span={6} style={{ height:'32px', lineHeight:'32px', textAlign:'right', fontWeight:'bold' }}>账号密码：</Col>
           <Col span={18}>
            <FormItem>
             {getFieldDecorator('password', {
              rules: [{ max:20, min:6, required: true, message: '请输入6-20位密码!' }],
             })(
              <Input  type="password" placeholder="" />
             )}
            </FormItem>
           </Col>
          </Row>


          <Row gutter={16}>
           <Col span={6} style={{ height:'32px', lineHeight:'32px', textAlign:'right', fontWeight:'bold' }}>验证码：</Col>
           <Col span={9}>
            <FormItem>
             {getFieldDecorator('validateCode', {
              rules: [{ len:4, required: true, message: '请输入4位验证码!' }],
             })(
              <Input  type="text" placeholder="" />
             )}
            </FormItem>
           </Col>
           <Col span={5}>
            <div style={{display:'inline-block'}}>
             <img style={{verticalAlign: 'middle'}} src={`${getFullUrl(this.state.url)}`} />
            </div>
           </Col>
           <Col span={4}  onClick={this.handleCIMG} className="login_yanz_click">
            换一张
           </Col>
          </Row>

          <FormItem style={{ paddingLeft:'30px',textAlign:'center' }}>
           <Button type="primary" htmlType="submit" className="form_button">
            登录
           </Button>
          </FormItem>



          <Row  style={{ paddingLeft:'30px' }}>
           <Col span={12}>
            <FormItem>
             {getFieldDecorator('remember_me', {
              valuePropName: 'checked',
              initialValue: true,
             })(
              <Checkbox>10天自动登陆</Checkbox>
             )}
            </FormItem>
           </Col>
           <Col span={12}  style={{ height:'32px', lineHeight:'32px', textAlign:'right' }}>
            <Link style={{ color:'#c7a774' }} to="/loginRegister">免费注册</Link>
            <span style={{ margin:'0px 10px' }}>|</span>
            <Link to="/loginForgetPassword">忘记密码</Link>
           </Col>
          </Row>

          {/*<FormItem>*/}
          {/*<Button*/}
          {/*className="form_button"*/}
          {/*onClick={()=>{*/}
          {/*dispatch(routerRedux.push('/loginRegister'))*/}
          {/*}*/}
          {/*}*/}
          {/*>没有账号？10秒完成注册</Button>*/}
          {/*</FormItem>*/}
         </Form>
        </div>
       </div>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}


export default connect(({login,app})=>({login,app}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Login));
