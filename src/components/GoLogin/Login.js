import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox,Spin } from 'antd';
import { login_form ,login_titlePIC,login_form_forgot,login_bottom} from './Login.less';
import { routerRedux } from 'dva/router';
import { getFullUrl } from '../../utils/common';


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
        <div className={login_form}>
          <div className='from-box clearfix'>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{  required: true,
                  //pattern:/^1[0-9]{10}$/,len:11,
                  message: '请输入正确的手机号码或者用户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入手机号码或者用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ max:20, min:6, required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              <div style={{width:'50%',display:'inline-block',height:'35px'}}>
                {getFieldDecorator('validateCode', {
                rules: [{ len:4, required: true, message: '请输入4位验证码!' }],
              })(
                <Input  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="text" placeholder="验证码" />
              )}
              </div>
              <div style={{float:'right',display:'inline-block'}}>
                <img style={{verticalAlign: 'middle'}} src={`${getFullUrl(this.state.url)}`}  onClick={this.handleCIMG}/>
              </div>
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" className="form_button">
                登录
              </Button>
            </FormItem>
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
