/**
 * 个人中心个人信息
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb,Upload ,Button,Radio,Cascader,Form,Input,message} from 'antd';
import Img from '../../components/Img/Img';
import { personalInformation_body,inforList } from './personalInformation.less';
import {getAreaData} from '../../utils/getArea';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;


const residences = getAreaData();

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


class  PersonalInformation extends Component{
  constructor(props){
    super(props);
    this.state={
      value: 1,
      imgPath:''
    }
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  handleChange = (info) => {
    console.log(info.file)
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      if(info.file.response.result == 1){

        this.setState({imgPath:`${info.file.response.data}/${info.file.name}` })
        getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        message.success(info.file.response.msg);
      }else{
        message.error("上传失败，请重新上传");
      }
    }else if(info.file.status === 'error'){
      message.error("上传失败，请重新上传");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let v = {
          memberBirthday:values.date,
          memberTruename:values.relName,
          memberSex:values.sex,
          memberAreainfo:values.residences.join(","),
          memberAddressInfo:values.address
        }
        if(this.state.imgPath != ""){
          v.imgUrl = this.state.imgPath
        }
        console.log(v);
        this.props.dispatch({type:'personInfo/setMemberInfoEFF',payload:v})
      }
    });
  }

  render (){
    const memberId = localStorage.getItem("memberId");
    const imageUrl = this.state.imageUrl
    let { memberInfo } = this.props.personInfo;
    memberInfo[0] = memberInfo[0] ? memberInfo[0] : {};
    let birthday = memberInfo[0].memberBirthdaystr ? memberInfo[0].memberBirthdaystr.substring(0,10) : "";
    let areainfo = memberInfo[0].memberAreainfo ? memberInfo[0].memberAreainfo.split(",") : "";
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div className={personalInformation_body}>
        <div className="myconsult_content">
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="">个人中心</Breadcrumb.Item>
              <Breadcrumb.Item>个人信息</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {/*列表*/}
          <div className={inforList}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="当前头像"
                className='userImg'
              >
                {getFieldDecorator('name')(
                  <span>
                    {imageUrl ?
                      <img src={imageUrl} style={{width:'120px',height:'120px',verticalAlign:'middle'}}/> :
                      <Img src={memberInfo[0].memberAvatar || ""} style={{width:'120px',height:'120px',verticalAlign:'middle'}}/>}

                    <Upload
                      action="/front/memberApi/memberFilesUpload"
                      data={{fileType:"21",memberId:memberId}}
                      name="images"
                      onChange={this.handleChange}><Button>选择文件</Button></Upload>
                  </span>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="用户名称"
              >
                {getFieldDecorator('name')(
                  <span>{memberInfo[0].memberName || ""}</span>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="电子邮箱"
              >
                {getFieldDecorator('mail')(
                  <span>{memberInfo[0].memberMobile || ""}</span>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="手机号"
              >
                {getFieldDecorator('tel')(
                  <span>{memberInfo[0].memberMobile || ""}</span>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="真实姓名"
              >
                {getFieldDecorator('relName', {
                  initialValue:memberInfo[0].memberTruename || ""
                })(
                  <Input type="text"/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="性别"
              >
                {getFieldDecorator('sex',{initialValue:memberInfo[0].memberSex || "1"})(
                  <RadioGroup onChange={this.onChange}>
                    <Radio value={1}>保密</Radio>
                    <Radio value={2}>男</Radio>
                    <Radio value={3}>女</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="生日"
              >
                {getFieldDecorator('date',{initialValue:birthday})(
                  <Input type="date"/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="所在地区"
              >
                {getFieldDecorator('residences',{initialValue:areainfo})(
                  <Cascader options={residences}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="详细地址"
                hasFeedback
              >
                {getFieldDecorator('address')(
                  <Input type="text"/>
                )}
              </FormItem>
              <FormItem className='subBut'>
                <Button htmlType="submit" type="primary">保存</Button>
              </FormItem>
            </Form>

          </div>

        </div>
      </div>
    );
  }
}


export default connect(({personInfo})=>({personInfo}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(PersonalInformation));

