import React, { Component } from 'react'
import { connect } from 'dva'
import Img from "../../components/Img/Img";
import { advanced_search_form_row } from './Product.less'
import { Form, Row, Col, Button, Icon, Radio, Input,DatePicker,Checkbox} from 'antd';
import {activity_details_explain } from './ActivityDetailsForm.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;


const formItemLayout = {
  labelCol: {
    xs: { span:1 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span:6 },
    sm: { span: 14},
  },
};
const tailFormItemLayout = {
  labelCol: {
    xs: { span:1 ,offset:0,},
    sm: { span:5,offset:0, },
  },
  wrapperCol: {
    xs: { span:12 ,offset:0,},
    sm: { span: 19,offset:0,},
  },
};


function displayRender(label) {
  return label[label.length - 1];
}


class ActivityDetailsForm extends React.Component {
    constructor(props){
      super(props);
      this.state= {
        value:1,
        checked:false,
        chioce1:false,
        chioce2:false,
      }
    }

  // onChangeRadio = (e) => {
  //    console.log('radio checked', e.target.checked);
    //}
    onChoice1=(e)=>{
      console.log('radio checked', e.target.checked);
      if(e.target.checked=='ture'){
        this.setState({ chioce2:true,});        
      }
      if(this.state.choice1){
        this.setState({   checked: true, });
      } 
    }
    onChangeRadioContent=(e)=>{
      console.log('content checked ccccccc',e.target.checked);
      if(e.target.checked){
        this.setState({ chioce1:true, })     
      }  
    }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log( values);
      // this.props.dispatch({ type: 'product/accurateSearchEFF', payload:values })
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    console.log('radio checked   aaaaa', this.state.chioce2);
    return (
      <Form
        onSubmit={this.handleSearch}
      >
          <Row>
            <Col span={12}>
            <FormItem
                label="报名日期Date"
                {...formItemLayout}>
                {getFieldDecorator('startDate',
                   {
                    rules: [{
                      required: true,
                      message: '报名日期Date！',
                    }],
                   })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD"
                      placeholder="报名日期Date"     
                    />
                )}
              </FormItem>
            </Col>
          </Row> 
           <p style={{margin: '10px auto',textAlign:'center'}}>报名人信息</p>
           <p style={{margin: '10px auto 20px'}}>Applicants Information</p>
          <Row>
           <Col span={12}>    
              <FormItem
                { ...formItemLayout }
                label="客户姓名 Name of Contac">
                {getFieldDecorator('customerName', {
                  rules: [{
                    required: true,
                    message: '请输入客户姓名！',
                  }],
                })(
                  <Input  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>    
              <FormItem
                { ...formItemLayout }
                label="部门/职务Dept./Position">
                {getFieldDecorator('deptPositio', {
                  rules: [{
                    required: true,
                    message: '请输入职务！',
                  }],
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
           </Row>  
            
           <Row>
             <Col span={12}>
               <FormItem
                { ...formItemLayout }
                label="公司电话Company Telephone">
                {getFieldDecorator('telephone', {
                  rules: [{
                    required: true,
                    message: '请输入电话！',
                  }],
                })(
                  <Input  type="number"/>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                { ...formItemLayout }
                label="手机Mobile phone">
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true,
                    message: '请输入手机！',
                  }],
                })(
                  <Input  />
                )}
              </FormItem>
              
            </Col>
           </Row> 
           <Row>
              <Col span={12}>
                <FormItem
                  { ...formItemLayout }
                  label="传真Fax">
                  {getFieldDecorator('fax', {
                    rules: [{
                      required: true,
                      message: '请输入传真！',
                    }],
                  })(
                    <Input  />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  { ...formItemLayout }
                  label="电子邮箱">
                  {getFieldDecorator('email', {
                    rules: [{
                      type:'email',
                      required: true,
                      message: '请输入电子邮箱！',
                    }],
                  })(
                    <Input  />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
             <Col span={12}>   
                <FormItem
                  { ...formItemLayout }
                  label="公司名称Company Name">
                  {getFieldDecorator('companyName', {
                    rules: [{
                      required: true,
                      message: '请输入公司名称！',
                    }],
                  })(
                    <Input  />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
           
                <FormItem
                { ...formItemLayout }
                  label="公司网址Web">
                  {getFieldDecorator('companyWeb', {
                    rules: [{
                      // required: true,
                      message: '请输入公司网址！',
                    }],
                  })(
                    <Input  />
                  )}
                </FormItem>
              </Col>
           </Row>
           <FormItem
              { ...tailFormItemLayout }
                label="公司地址Company Address">
                {getFieldDecorator('companyAddress', {
                  rules: [{
                    required: true,
                    message: '请输入公司地址！',
                  }],
                })(
                  <Input  />
                )}
            </FormItem>
            <FormItem
            { ...tailFormItemLayout }
              label="公司性质Company Category">
              {getFieldDecorator('companyCategory',{initialValue:"1"}, {
                rules: [{
                  required: true,
                  message: '请选择公司性质！',
                }],
              })(
              
                <RadioGroup onChange={this.onChangeRadio}>  
                  <Radio value={1}  onClick={this.onChoice1} style={{width:'100%'}} >上产类企业Manufacturer
                   
                      (
                        <RadioGroup onChange={this.onChangeRadioContent}>
                          <Radio value={1}>原材料</Radio>
                          <Radio value={2}>制剂</Radio>
                          <Radio value={3}>其他</Radio>
                        </RadioGroup>
                      )  
                                          
                  </Radio>     
                  <Radio  value={2}>贸易类企Ttader</Radio>
                  <Radio  value={3}>咨询类企业Consultlting Company</Radio>
                  <Radio  value={4}>政府机构Government labs</Radio>
                  <Radio  value={5}>研发类企业R&D Company</Radio>               
                  <Radio  value={6}>
                    其他，请注明：Others,please specify:
                    {this.state.value === 6 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                  </Radio>
                </RadioGroup>    
              )}
            </FormItem>
        <FormItem
          { ...tailFormItemLayout }
            label="公司产品Company product">
            {getFieldDecorator('companyproduct',{initialValue:"1"}, {
              rules: [{
                required: true,
                message: '请选择公司产品！',
              }],
            })(
              <RadioGroup onChange={this.onChonChangeRadioange}>
                <Radio style={radioStyle} value={1}>化药</Radio>
                <Radio style={radioStyle} value={2}>生化药
                    (                    
                      <RadioGroup onChange={this.onChangeRadio}>
                        <Radio value={1}>多肽</Radio>
                        <Radio value={2}>蛋白</Radio>
                        <Radio value={3}>单抗</Radio>
                        <Radio value={4}>多糖</Radio>
                        <Radio value={5}>血液制品</Radio>
                        <Radio value={6}>其他</Radio>
                      </RadioGroup>
                    ) 
                </Radio>
              </RadioGroup>    
            )}
          </FormItem>
            <FormItem
              { ...tailFormItemLayout }
                label="USP标准的用途 Usf of USP Standards">
                {getFieldDecorator('USPstandards',{initialValue:"1"}, {
                  rules: [{
                    required: true,
                  }],
                })(
                    <RadioGroup onChange={this.onChange}>
                      <Radio style={radioStyle} value={1}>用于出口产品Export Products</Radio>
                      <Radio style={radioStyle} value={2}>用于国内销售产品Domestic Products</Radio>      
                      <Radio style={radioStyle} value={3}>
                        其他，请注明：Others,please specify:
                        {this.state.value === 3 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                      </Radio>
                    </RadioGroup>      
                )}
              </FormItem>
              <FormItem
                // {...tailFormItemLayout}
                label="请简要说明您参加此次活动的目的或者期望"
                >
                {getFieldDecorator('objective', {
                })(
                  <Input type="text" style={{width:'80%',height:'5rem'}}/>
                )}
              </FormItem>
              <div className={ activity_details_explain  }>
                 <p>备注:</p>
                 <p>
                    <span>1、一人一表，请勿混合填写</span>
                    <i>Remarks:One from for one applocant only.</i>
                 </p>
                 <p>
                    <span>2、请将信息填写完整，不完整得报名表可能被视做无效而导致收不到确认函。</span>
                    <i>Remarks:Please fill in the form completely,incomplete from may be considered invalid.</i>
                 </p>
                 <p>
                    <span>3、本次活动日程表中提及的活动与用餐均为免费，其余费用自理。</span>
                    <i>Remarks:The participation to the activities and lunch mentioned in the agenda is free of charge.</i>
                 </p>
                 <p style={{marginTop:'24px'}}>若您希望报名参加此次活动，请于2010年11月7日去登录:http://vip.reagent.com.cn/yhlt/yhltsh.jsp进行网上报名或者填写所附报名表发至以下邮箱。因名额所限，同一公司参会名额上限位3人，超过截至日期或者满员将不再接受报名，请予谅解。</p>
                 <p>请点击此处<a style={{color:'red'}}>下载</a>报名表，用于传真或EMAIL报名</p>
                 <p>For registration,please go to above link or fill out REGISTRATION FROM and RSVP before Oct.11,2017 to:wuchenwen@sinopharm.com or</p>
                 <p>TEL:(86)21-33130291</p>
                 <p>报名联系人Contact：吴晨雯Wu Chenwen</p>
                 <p style={{marginTop:'24px'}}>本次活动由USP标准品授权代理商国药集团化学试剂有限公司协办</p>
                 <p>Remarks:This event is sponsored by SCRC,Usp Authorized Distributor for Reference Standards.</p>
          </div>
      
        <Row style={{margin:'24px 0'}}>
        <Col span={13} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" style={{width:'110px',borderRadius:0}}>确定</Button>
        </Col>
      </Row>
      </Form>
    );
  }
}

const AllActivityDetailsForm = Form.create()(ActivityDetailsForm)

export default connect(({product})=>(product),(dispatch)=>{return {dispatch}})(AllActivityDetailsForm)
