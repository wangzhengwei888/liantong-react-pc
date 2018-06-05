import React , { Component } from 'react';
import { Form, Input, Button, message,Select,Checkbox,Modal,Tabs,Cascader,Radio  } from 'antd';
import { invoice } from './order.less';
import  { getAreaData } from '../../utils/getArea';
import { connect } from 'dva';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const  residences = getAreaData();



class ZzInvoice extends Component{
  constructor(props){
    super(props)
    this.state = {
      hasInv:false,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.form)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onCancel()
      }
    });
  }
  onClose = () => {
    console.log("aa")
    this.props.onCancel()
  }
  noInv = () => {
    this.setState({
      hasInv:false
    })
  }
  hasInv = () => {
    this.setState({
      hasInv:true
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return(
      <div className='zz_inv'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="单位名称"
            hasFeedback
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写单位名称',
              }],
            })(
              <Input type='text'/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="注册地址"
            hasFeedback
          >
            {getFieldDecorator('regAddress', {
              rules: [{
                required: true, message: '请输入注册地址',
              }],
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="注册电话"
            hasFeedback
          >
            {getFieldDecorator('regTel', {
              rules: [{ required: true, message: '请输入注册电话', whitespace: true }],
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="开户银行"
            hasFeedback
          >
            {getFieldDecorator('bank', {
              rules: [{ required: true, message: '请填写开户银行'}],
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="银行账户"
            hasFeedback
          >
            {getFieldDecorator('bankNum', {
              rules: [{ required: true, message: '请输入银行账户'}],
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="发票内容"
            hasFeedback
          >
            {getFieldDecorator('invContent',{initialValue:'a'})(
              <RadioGroup size="large">
                <RadioButton value="a" className={this.state.hasInv ? 'no_inv' : 'no_inv actived'} onClick={this.noInv}>不开发票</RadioButton>
                <RadioButton value="b" className={this.state.hasInv ? 'mx_inv actived' : 'mx_inv'} onClick={this.hasInv}>明细</RadioButton>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="收票人姓名"
            hasFeedback
          >
            {getFieldDecorator('receiveName', {
              rules: [{ required: true, message: '请填写收票人姓名'}],
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="收票人手机"
            hasFeedback
          >
            {getFieldDecorator('receivePhone', {
              rules: [{ required: true, message: '请填写收票人手机'}],
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="收票人省份"
          >
            {getFieldDecorator('residence', {
              rules: [{ type: 'array', required: true, message: '请选择收票人省份' }],
            })(
              <Cascader options={residences} placeholder="请选择" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="详细地址"
            hasFeedback
          >
            {getFieldDecorator('addressInfo', {
              rules: [{ required: true, message: '请填写详细地址'}],
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem style={{textAlign:"center"}}>
            <Button htmlType="reset" style={{marginRight:"10px"}} onClick={this.onClose}>取消</Button>
            <Button htmlType="submit">保存发票信息</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default (Form.create()(ZzInvoice));

