/**
 * 个人中心个人信息
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb,Upload ,Button,Radio,Cascader,Form,Input,message,Select,Icon} from 'antd';
import Img from '../../components/Img/Img';
import { personalInformation_body,inforList } from './personalInformation.less';
import {getAreaData} from '../../utils/getArea';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';
import { Link } from 'dva/router'
const Option = Select.Option;
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
      imgPath:'',
      edit: false
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
 Edit = () => {
   this.setState({
    edit: true
   })
 }
 cancel = () => {
   this.setState({
    edit: false
   })
 }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
     console.log(values)
      if (!err) {
        let v = {
          memberTrueName:values.memberTruename,
          memberTel:values.memberTel,
          sinoOrgName:values.sinoOrgName,
          groupAddr:values.groupAddr,
          groupName: values.groupName,
          memberProvinceid:values.area[0],
          memberCityid:values.area[1],
          memberAreaid:values.area[2],
          groupAddr:values.groupAddr,
          memberClass:values.memberClass
        }
        if (!(/^[0-9]*$/.test(values.memberClass))){
         v.memberClass = this.props.personInfo.memberInfo[0].memberClass
        }
        if(this.state.imgPath != ""){
          v.imgUrl = this.state.imgPath
        }
        this.props.dispatch({type:'personInfo/setMemberInfoEFF',payload:v})
        this.cancel()
      }
    });
  }

  render (){
    const memberId = localStorage.getItem("memberId");
    const imageUrl = this.state.imageUrl
    let { memberInfo,memberClassList,areaDataList } = this.props.personInfo;
    memberInfo[0] = memberInfo[0] ? memberInfo[0] : {};
    const { getFieldDecorator } = this.props.form;
    let starO = memberInfo[0].memberGradeId == '4a580e21232b4095acb5e6ea72dcb278' ? [1] : memberInfo[0].memberGradeId == 'cbaa2a6d5a134bb6b053148ecd01bbbf' ? [1,1] :memberInfo[0].memberGradeId == '3f7961618e1645148af600ebba6b075c' ? [1,1,1] :memberInfo[0].memberGradeId == 'b4930da8fc6745d8b0810f6303937119' ? [1,1,1,1] : []
   let memberClass = ''
   memberClassList && memberClassList.forEach(item => {
    if (memberInfo[0].memberClass == item.id) {
     memberClass = memberInfo[0].memberClass
    }
   })
   memberClass = memberClass ? memberClass : memberInfo[0].memberClassName
   const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
   const formItemLayout1 = {
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
       <Search></Search>
       <Navigation preson={true}>
        <div className="myconsult_content">
          <div className="my_account_dynamic_Topimg"></div>
         {/*头部单行条*/}
         <div className="used_nva_bar">

          <Breadcrumb separator=">">
           <Breadcrumb.Item href="/presonAccunt/myAccount" style={{fontSize:'12px', fontWeight:'normal' }}>我的账户</Breadcrumb.Item>
           <Breadcrumb.Item href="/presonAccount/personalInformation" style={{fontSize:'12px', fontWeight:'normal' }}>我的信息</Breadcrumb.Item>
           <Breadcrumb.Item href="/presonAccount/personalInformation" style={{fontSize:'16px', fontWeight:'bold' }}>基本信息</Breadcrumb.Item>
          </Breadcrumb>
         </div>
         {/*列表*/}
         <div className={inforList}>
          {
           !this.state.edit ?
            <div>
             <FormItem
              {...formItemLayout1}
              label="用户名称"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].memberName || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout1}
              label="注册时间"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].createTimeStr || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout1}
              label="会员等级"
             >
              {getFieldDecorator('aaa')(
               <div>
                {
                 starO.map((item,index) => {
                  return <Icon type="star-o" key={index}/>
                 })
                }
               </div>
               // <span>{memberInfo[0].memberGradeName || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout1}
              label="联系人姓名"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].memberTruename || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout1}
              label="手机"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].memberMobile || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout1}
              label="电话"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].memberTel || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout1}
              label="邮箱"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].memberEmail || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout1}
              label="公司名称"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].sinoOrgName || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout1}
              label="公司地址"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].groupAddr || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="所属集团公司"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].groupName || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout1}
              label="所属行业"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].memberClassName || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout1}
              label="所在地区"
             >
              {getFieldDecorator('aaa')(
               <span>{memberInfo[0].area || ""}</span>
              )}
             </FormItem>
             <FormItem className='subBut'>
              <Button type="primary" style={{marginRight: '200px'}} onClick={this.Edit}>编辑</Button>
             </FormItem>
            </div> :
            <Form onSubmit={this.handleSubmit}>
             <FormItem
              {...formItemLayout}
              label="用户名称"
             >
              {getFieldDecorator('memberName')(
               <span>{memberInfo[0].memberName || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="注册时间"
             >
              {getFieldDecorator('createTime')(
               <span>{memberInfo[0].createTimeStr || ""}</span>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="会员等级"
             >
              {getFieldDecorator('gradeName')(
               <div>
                {
                 starO.map((item,index) => {
                  return <Icon type="star-o" key={index}/>
                 })
                }
               </div>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="联系人姓名"
             >
              {getFieldDecorator('memberTruename', {
               initialValue:memberInfo[0].memberTruename || ""
              })(
               <Input type="text"/>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="手机"
             >
              {getFieldDecorator('memberMobile')(
               <div>
                <span>{memberInfo[0].memberMobile || ""}</span>
                {memberInfo[0].memberMobile ?
                 <Link to='/presonAccount/presonAccount/removePhone' style={{marginLeft: '10px'}}>解绑</Link>
                 : <Link to='/presonAccount/presonAccount/bindingPhone' style={{marginLeft: '10px'}}>去绑定</Link>
                }
               </div>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="电话"
             >
              {getFieldDecorator('memberTel', {
               initialValue:memberInfo[0].memberTel || ""
              })(
               <Input type="text"/>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="邮箱"
             >
              {getFieldDecorator('memberEmail')(
               <div>
                <span>{memberInfo[0].memberEmail || ""}</span>
                {memberInfo[0].memberEmail ?
                 <Link to='/presonAccount/presonAccount/removeEmail' style={{marginLeft: '10px'}}>解绑</Link>
                 : <Link to='/presonAccount/presonAccount/bindingEmail' style={{marginLeft: '10px'}}>去绑定</Link>
                }
               </div>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="公司名称"
             >
              {getFieldDecorator('sinoOrgName', {
               initialValue:memberInfo[0].sinoOrgName || ""
              })(
               <Input type="text"/>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="公司地址"
             >
              {getFieldDecorator('groupAddr', {
               initialValue:memberInfo[0].groupAddr || ""
              })(
               <Input type="text"/>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="所属集团公司"
             >
              {getFieldDecorator('groupName', {
               initialValue:memberInfo[0].groupName || ""
              })(
               <Input type="text"/>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="所属行业"
             >
              {getFieldDecorator('memberClass', {
               rules: [{ required: true, message: '请选择所属行业!' }],
               initialValue:memberClass || ""
              })(
               <Select>
                {
                 memberClassList && memberClassList.map((item,index)=>{
                  return <Option value={item.id} key={index}>{item.className}</Option>
                 })
                }
               </Select>
              )}
             </FormItem>
             <FormItem
              {...formItemLayout}
              label="所在地区"
             >
              {getFieldDecorator('area',{
               rules: [{ required: true, message: '请选择所在地区!' }],
               initialValue:[memberInfo[0].memberProvinceid,memberInfo[0].memberCityid,memberInfo[0].memberAreaid]
              })(
               <Cascader options={areaDataList} className="areainfo"/>
              )}
             </FormItem>
             <FormItem className='subBut'>
              <Button htmlType="submit" type="primary" style={{marginRight: '200px'}}>保存</Button>
              <Button type="primary" style={{marginRight: '200px'}} onClick={this.cancel}>取消</Button>
             </FormItem>
            </Form>
          }
         </div>

        </div>
       </Navigation>

      </div>
    );
  }
}


export default connect(({personInfo})=>({personInfo}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(PersonalInformation));

