import React , { Component } from 'react';
import { Form,Steps,Button,Input,Select,Cascader,Row,Col,DatePicker} from 'antd';
import Top from './top';
import AuthenInfo from './authenInfo';
import { connect } from 'dva';
import {content} from './authen.less';
import Img from '../../components/Img/Img';
import  { getAreaData } from '../../utils/getArea';
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;

const steps = [{
  title: '填写认证信息',
  button:'提交认证资料'
}, {
  title: '等待管理员审核',
  button:'查看审核结果'
}, {
  title: '查看审核结果',
  button:'完成'
}];
const residences = getAreaData();

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 14 },
  },
};


const awaitresult = (type,info,fileTypeData) =>{
  console.log(type,info,fileTypeData)
  let resi = [info.province,info.city,info.county];
  info.attachmentList.forEach((list,index)=>{
    fileTypeData.forEach((i,k)=>{
      if(i.dictionaryValue == list.fileType){
        info.attachmentList[index].imgTypeStr = i.dictionaryName
      }
    })
  })
  return (
    <Form style={{paddingBottom:'20px'}}>
      <div className="steps-content info1">
        <div className='info_title'>企业基本信息</div>
        <div className='info_content bus_info_content'>
          <div style={{width:'50%'}} className='float_left'>
            <FormItem
              {...formItemLayout}
              label="企业类型"
              hasFeedback
            >
              <Select defaultValue={info.orgType} disabled>
                {type.map((list,index)=>{
                  return (<Option value={list.dictionaryValue} key={index}>{list.dictionaryName}</Option>)
                })}
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="营业执照注册日"
              hasFeedback
            >
              <Input defaultValue={info.licenceDate} disabled={true}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="企业名称"
              hasFeedback
            >
              <Input defaultValue={info.name} disabled={true}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系人"
              hasFeedback
            >
              <Input defaultValue={info.contacts} disabled={true}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号码"
              hasFeedback
            >
              <Input defaultValue={info.tel} disabled={true}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属地区"
            >
              <Cascader options={residences} defaultValue={resi} disabled={true}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="详细街道"
              hasFeedback
            >
              <Input defaultValue={info.address} disabled={true}/>
            </FormItem>
          </div>
          <div className='float_right info_left_bg'>
            <img src={require('../../assets/authenleft.png')} alt=""/>
          </div>
        </div>

      </div>
    <div className="steps-content ">
      <div className='info_title qua_info'>资质信息</div>
      <div className='info_content qua_info_contnet'>
        <div className='clearfix item'>
          {info.attachmentList.map(function(list,index){
            return (
              <div className="list" key={index}>
                <FormItem
                  label={list.imgTypeStr}
                >
                  <div className="clearfix">
                      <div className='imgUpload' style={{margin:"0 auto"}}>
                        <Img src={info.attachmentList[index].filePath} className="avatar" />
                      </div>
                  </div>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="证件号码"
                  hasFeedback
                >
                  <Input type="text" disabled defaultValue={info.attachmentList[index].certificateCode}/>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="证件有效期"
                  hasFeedback
                >
                  <Col span={11}>
                    <FormItem>
                        <DatePicker defaultValue={moment(info.attachmentList[index].effectiveBeginDate, 'YYYY-MM-DD')} disabled/>
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    <p className="ant-form-split">至</p>
                  </Col>
                  <Col span={11}>
                    <FormItem>
                        <DatePicker defaultValue={moment(info.attachmentList[index].effectiveEndDate, 'YYYY-MM-DD')} disabled/>
                    </FormItem>
                  </Col>
                </FormItem>
                {/*<span className='fl' onClick={() =>_this.onClick(index)}>*/}
                    {/*查看范例*/}
                    {/*<div className={_this.state.imageUpload[index].hide ? "tips hide" : "tips"}>*/}
                      {/*<p>注意事项：</p>*/}
                      {/*<div>1.企业名称需要与营业执照名称保持一致。</div>*/}
                      {/*<div style={{textAlign:'left'}}>2.三证合一的企业请在证照号码处填写“全国统一社会信用代码”。</div>*/}
                      {/*<div style={{width:'89%'}}>3.证照起止日期为必填，若为长期终止日期可不填。</div>*/}
                    {/*</div>*/}
                  {/*</span>*/}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </Form>)
}


class authen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.login.status
    };
  }
  next() {
    let current = this.state.current + 1;
    if(current == 2){
      this.props.dispatch({type:'login/getAuthenStatus',memberId:localStorage.getItem('memberId')})
      return
    }
    if(current == 3) {
      if(this.props.login.authenResult){
        current = 0;
        this.setState({ current });
      }else{
        window.location.href = '/home';
      }
      return
    }
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const { data,authenInfoData,fileTypeData }=this.props.login;
    const result = () =>{
      return (<div className='result'>
                {this.props.login.authenResult ?
                  <div className='fail'>{this.props.login.authenResult}</div>
                 :<div className='pass'>审核通过</div>
                }
                {awaitresult(data,authenInfoData,fileTypeData)}
              </div>)
    }
    return (
      <div>
        <Top title="用户认证"/>
        <div className={content}>
          <Steps current={current} className='step'>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
          {current == 0 ? <AuthenInfo data={data} next={() => this.next()}/> : current == 1 ? awaitresult(data,authenInfoData,fileTypeData) : result()}
          <div className="steps-action">
            <Button className='next-btn' htmlType="submit" type="primary" onClick={() => this.next()}>{steps[this.state.current].button}</Button>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(({login})=>({login}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(authen));
