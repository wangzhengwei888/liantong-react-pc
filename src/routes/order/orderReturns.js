/**
 * Created by b2b2c on 2017/8/15.
 */
import React , { Component } from 'react';
import { connect } from 'dva';
import { Row,Col,Breadcrumb,Input,Button,Form,Icon,Checkbox,Upload,message} from 'antd';
import { Tooltip, Cascader, Select, AutoComplete} from 'antd'
import { orderReturns_body,} from './orderReturns.less';


//表单
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
//上传图片
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}




class OrderReturns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    }
  }

  //表单
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
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

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  //上传图片
  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 8},
    };
    const formItemLayout1 = {
      labelCol: {span: 2},
      wrapperCol: {span: 14},
    };
    const formItemLayout2 = {
      labelCol: {span: 2},
      wrapperCol: {span: 4},
    };
    const tailFormItemLayout = {
      wrapperCol: {
          span: 12,
          offset: 2,
      },
    };
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    //上传图片
    const imageUrl = this.state.imageUrl;

    return(
      <div className={orderReturns_body}>
        <div className="orderReturns_head">
          <Breadcrumb separator=">">
            <Breadcrumb.Item><a >我的商城</a></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/person/orderList">我的订单</Link></Breadcrumb.Item>
            <Breadcrumb.Item><span style={{fontSize:'14px',fontWeight:'bold'}}>
              <a href="#">退货</a>/<a href="#">换货</a>
            </span></Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="orderReturns_search">
          <div style={{borderRight:'1px solid rgb(228,228,228)'}}><a style={{color:'#3497CE'}} href="#">退货</a></div>
          <div>换货</div>
        </div>
        <div className="orderReturns_content">
          <Row className="orderReturns_content_head">
            <Col style={{width:'48%'}}>商品</Col>
            <Col style={{width:'8%'}}>单位</Col>
            <Col style={{width:'8%'}}>批号</Col>
            <Col style={{width:'8%'}}>有效期</Col>
            <Col style={{width:'8%'}}>单价</Col>
            <Col style={{width:'8%'}}>商品数量</Col>
            <Col style={{width:'12%'}}>本次退货</Col>
          </Row>
          <div className="orderReturns_content_goods">
            <table className="border_bottom">
              <tr>
                <td style={{width:'48%'}}>
                  <div className="goods_div1">
                    <img style={{width:'100px',height:'100px',margin:'2px 32px'}} src={require('../../assets/logo.jpg')} />
                    <div style={{margin:'0px 32px'}}>
                      <p>格列齐特片（达美康）</p>
                      <p>规格：xxxx </p>
                      <p>厂家：xxxxxx</p>
                    </div>
                  </div>
                </td>
                <td className='border_left' >盒</td>
                <td className='border_left' >￥321</td>
                <td className='border_left' >￥321</td>
                <td className='border_left' >1</td>
                <td className='border_left' >
                  <div>
                    <p>88.00</p><span>（免运费）</span>
                  </div>
                </td>
                <td className='border_left2'>
                  <div className="goods_div2">
                    <Input style={{width:'60%',margin:'auto'}} defaultValue="2" />
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="orderReturns_sub">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="退款金额"
              hasFeedback
            >
              {getFieldDecorator('money', {
                rules: [{
                  type: 'money', message: 'The input is not valid money!',
                }, {
                  required: true, message: 'Please input your money!',
                }],
              })(
                <Row>
                  <Col span={8}> <Input type="text"  /></Col>
                  <Col span={8}>
                    <div style={{marginLeft:'16px'}}>元（最多<span>99</span>元）</div></Col>
                </Row>

              )}
            </FormItem>
            <FormItem
              {...formItemLayout1}
              label="退款原因"
              hasFeedback
            >
              {getFieldDecorator('tkyy', {
                rules: [{
                  required: true, message: 'Please enter the reason for the return',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <TextArea autosize={{ minRows: 4, maxRows: 8 }} placeholder="退货信息只能填写提交一次，建议与卖家沟通后认真填写" type="text"  onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout2}
              label="Captcha"
            >
                  {getFieldDecorator('captcha', {
                    rules: [{ required: false, message: 'Please input the captcha you got!' }],
                  })(
                      <Upload
                        className="avatar-uploader"
                        name="avatar"
                        showUploadList={false}
                        action="//jsonplaceholder.typicode.com/posts/"
                        onChange={this.handleChange}
                      >
                        {
                          imageUrl ?
                            <img  src={imageUrl} alt="" className="avatar" /> :
                            <Icon type="plus" className="avatar-uploader-trigger" />
                        }
                      </Upload>
                  )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">申请退货</Button>
              <Checkbox style={{marginLeft:'16px'}}>匿名评价 </Checkbox>
            </FormItem>
          </Form>

        </div>
      </div>
    )
  }
}

export default connect(({orderReturns})=>({orderReturns}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(OrderReturns));
