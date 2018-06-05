/**
 * Created by 10400 on 2018.3.22
 * 资质上传页面
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {IMAGE_DOMAIN} from "../../utils/common"
import {
 Breadcrumb,
 Upload,
 Table,
 Checkbox,
 Row,
 Col,
 Select,
 Pagination,
 Input,
 Button,
 Form,
 Menu,
 Dropdown,
 Icon,
 message,
 Modal,
 DatePicker,
 Spin
} from 'antd'
import moment from 'moment';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';
import Img from '../../components/Img/Img';
import {upShow, notes, fileUp} from "../presonAccount/intelligentUp.less";
import {Link} from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';


class Intelligent extends Component {
 constructor(props) {
  super(props);
  this.state = {
   //资质属性改变
   attrChange: 0,
   //资质类型
   fileType:"",
   value: '',
   current: 1,
   fileList: {},
   loading:false,
   //排序方式
   filetype: 'createDate'
  }
 }

 columns = [
  {
   title: '资质类型',
   dataIndex: 'fileType',
   key: 'fileType',
   render: (text, record) => (
    <span>
     {record.isEnd == 1  ? <span style={{color:'red'}}>{record.fileType}</span> : record.fileType}
    </span>
   ),
  },
  {
   title: '资质属性',
   dataIndex: 'attachmentType',
   key: 'attachmentType',
   render: (text, record) => (
    <span>
     {record.isEnd == 1 ? <span style={{color:'red'}}>{record.attachmentType}</span> : record.attachmentType}
    </span>
   ),
  },
  {
   title: '最后有效期或订单未完成的关联订单',
   dataIndex: 'orderSn',
   key: 'attachmentId',
   render: (text, record) => (
    <span>
      {record.isEnd == 1 ? <span style={{color:'red'}}>{record.orderSn ? <Link target="_blank" to={`/personOrder/orderDetail/${record.orderId}`}>{record.orderSn}</Link> : (record.attachmentType == "单次有效" ? "" : record.endDate)}</span> : record.orderSn ? <Link target="_blank" to={`/personOrder/orderDetail/${record.orderId}`}>{record.orderSn}</Link> : (record.attachmentType == "单次有效" ? "" : record.endDate)}
    </span>
   ),
  },
  {

   title: '操作',
   dataIndex: 'name4',
   render: (text, record) => {
    return (
     <Row type="flex" justify="space-around">
      <a style={{color: '#2EB6AA',lineHeight:'28px'}} target="_black" href={`${IMAGE_DOMAIN}${record.filePath}`}>点击查看</a>
      <Button style={{color: '#2EB6AA', border: 'none', background: 'none'}} onClick={()=>{this.updateAtt(record)}}>{record.isWork == 1 ? "禁用" : "启用"}</Button>
     </Row>
    )
   }
  }
 ];
 updateAtt = (record) => {
  console.log(record)
  let isWork = record.isWork == "1" ? "0" : "1";
  let val ={
   attachmentId:record.attachmentId,
   isWork
  }
  this.props.dispatch({type:"authen/setUpdateAttachmentEFF",val})
 }

 attachmentTypeChange = (v) => {
  this.setState({
   attrChange: v
  })
 }
 //表单提交
 handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFieldsAndScroll((err, values) => {
   if (!err) {
    if(!this.state.fileList.originalfilename){
     message.error("请上传文件")
     return
    }
    let val={
     filePath: this.state.fileList.filePath,
     fileNewName: this.state.fileList.fileNewName,
     originalfilename: this.state.fileList.originalfilename,
     attachmentType:values.attachmentType,
     endDate:values.endDate ? values.endDate.format('YYYY-MM-DD') : "",
     orderSn:values.orderSn ? values.orderSn : "",
     fileType:values.fileType,
     attachmentDesc:values.attachmentDesc ? values.attachmentDesc : ""
    }
    this.props.dispatch({type:'authen/saveAttachmentFileEFF',val})
    this.props.form.resetFields()
    this.setState({
     attrChange: 0,
     fileType:'',
     fileList:{}
    })
   }
  });
 }

 handleChange = (info) => {
  this.setState({
   loading:true,
   fileList:{}
  })
  if (info.file.status === 'done') {
   this.setState({
    loading:false
   })
   if (info.file.response.result == 0) {
    message.error(info.file.response.msg)
    return
   } else {
    message.success(info.file.response.msg)
   }
   // console.log(info.file.response.data[0]);
   this.setState({
    fileList: {
     filePath: info.file.response.data[0].filePath,
     fileNewName: info.file.response.data[0].fileNewName,
     originalfilename: info.file.response.data[0].originalfilename
    }
   })
   // console.log(this.state.fileList);
  }else if(info.file.status === "error"){
   this.setState({
    loading:false
   })
   message.error("上传失败")
  }
 }
 //资质类型改变
 fileTypeChange = (v) =>{
   this.setState({
    fileType: v
   })

 }

 // 排序
 sort = (fileType) => {
  this.setState({
   filetype: fileType
  },()=>this.props.dispatch({type: 'authen/getAttachmentListEFF', val: {type: 2,pageNo:1, fileType: this.state.filetype}}))
 }

 onChange = (pagination) => {
  console.log(pagination.current)
  this.props.dispatch({type: 'authen/getAttachmentListEFF', val: {type: 2,pageNo: pagination.current,fileType:this.state.filetype}})
  window.scrollTo(0,0)
 };


 render() {
  const _this = this;
  const {getFieldDecorator} = this.props.form;
  const {AttachmentListData,pageNo, pageSize, count} = this.props.authen
  const attrType = this.state.attrChange;
  const fileType = this.state.fileType;
  return <div>
   <div><Search></Search></div>
   <Navigation preson={true}>
    <div className={upShow}>
     <div className="my_account_dynamic_Topimg"></div>
     <Breadcrumb separator=">" className='security_nav_bar'>
      <Breadcrumb.Item href="/presonAccunt/myAccount" style={{fontSize:'12px', fontWeight:'normal' }}>我的账户</Breadcrumb.Item>
      <Breadcrumb.Item href="/presonAccount/personalInformation"  style={{fontSize:'12px', fontWeight:'normal' }}>我的信息</Breadcrumb.Item>
      <Breadcrumb.Item href="/presonAccount/intelligentUp" style={{fontSize:'16px', fontWeight:'bold' }}>资质上传</Breadcrumb.Item>
     </Breadcrumb>
     <div className="sort">
      <div className='div1'>排序方式：</div>
      <div className={this.state.filetype == 'createDate' ? 'div1 active' : 'div1'} onClick={() => this.sort('createDate')}>默认</div>
      <div className={this.state.filetype == 'fileType' ? 'div1 active' : 'div1'} onClick={() => this.sort('fileType')}>类型</div>
      <div className={this.state.filetype == 'attachmentType' ? 'div1 active' : 'div1'} onClick={() => this.sort('attachmentType')}>属性</div>
     </div>
     <Table bordered
            pagination={{current: pageNo, pageSize: pageSize, total: count}}
            onChange={(pagination) => {this.onChange(pagination)}}
            className="intelligentUp_Detail" dataSource={AttachmentListData}
            rowKey={record => record.attachmentId} columns={this.columns}/>
     <div style={{textAlign: 'right', padding: '15px 0 25px', fontSize: '18px'}}><Link
      target="_blank" to="/presonAccount/intelligentUp/intelligentHistory">查看资质上传历史记录</Link></div>
     <div className='notes'>
      <p>请在以下部分上传您的资质，上传文档必须以jpg,jpeg,doc,docx,pdf,tif,png,bpm格式进行！</p>
      <p>如无法成功上传资质，您也可以将相关文档发送至邮箱xxxxxxxx.com,或发传真至010-12345678，提交资质中如有疑问，请联系客服人员</p>
      <p>021-63210123</p>
     </div>
     <Form onSubmit={this.handleSubmit} style={{position:'relative'}}>
      <FormItem
       label="资质类型"
       labelCol={{span: 4}}
       wrapperCol={{span: 8}}
      >
       {getFieldDecorator('fileType', {
        rules: [{required: true, message: ''}],
        initialValue: "1",
        onChange:this.fileTypeChange
       })(
        <Select placeholder="请选择">
         <Option value="1">营业执照</Option>
         <Option value="2">营业执照（三证合一）</Option>
         <Option value="3">营业执照（五证合一）</Option>
         <Option value="4">组织机构代码证</Option>
         <Option value="5">税务登记证</Option>
         <Option value="6">身份证（需提供正反面）</Option>
         <Option value="7">危险化学品经营许可证</Option>
         <Option value="8">易制爆化学品用途证明</Option>
         <Option value="9">易制爆商品信息提供清单</Option>
         <Option value="10">易制毒化学品购买凭证</Option>
         <Option value="11">剧毒化学品购买凭证</Option>
         <Option value="12">其他</Option>
        </Select>
       )}
      </FormItem>
      {fileType == 12 ?
       <FormItem
       labelCol={{span: 4}}
       wrapperCol={{span: 8}}
       style={{
        position: "absolute",
        left: "503px",
        top: "49px"}}
       >
       {getFieldDecorator('attachmentDesc', {
        rules: [{required: true, message: '填写资质类型'}]
       })(
        <Input/>
       )}
       </FormItem>
       : null}
      <FormItem
       label="资质属性"
       labelCol={{span: 4}}
       wrapperCol={{span: 8}}
      >
       {getFieldDecorator('attachmentType', {
        rules: [{required: true, message: ''}],
        initialValue: "0",
        onChange: this.attachmentTypeChange
       })(
        <Select placeholder="请选择">
         <Option value="0">长期有效</Option>
         <Option value="1">多次有效</Option>
         <Option value="2">单次有效</Option>

        </Select>
       )}
      </FormItem>
      {attrType == 1 ?
       <FormItem
        label="有效期"
        labelCol={{span: 4}}
        wrapperCol={{span: 8}}
       >
        {getFieldDecorator('endDate', {
         rules: [{required: true, message: '填写有效期'}]
        })(
         <DatePicker format={dateFormat}/>
        )}
       </FormItem>
       :
       attrType == 2 ?
        <FormItem
         label="关联订单"
         labelCol={{span: 4}}
         wrapperCol={{span: 8}}
        >
         {getFieldDecorator('orderSn', {
          rules: [{required: true, message: '填写关联订单号'}]
         })(
          <Input/>
         )}
        </FormItem> : ""
      }
      <FormItem label="上传" labelCol={{span: 4}}
                wrapperCol={{span: 8}}>
       {getFieldDecorator('fileNewName', {
        rules: [{required: true, message: '选择文件'}]
       })(
        <div>
         <Upload
          className="avatar-uploader"
          // accept={".png,jpg,.doc"}
          name={"images"}
          showUploadList={false}
          action="/reagent-front/memberApi/memberFilesUpload"
          onChange={(info) => _this.handleChange(info)}>
          <Button>选择文件</Button>
         </Upload>
         <span className="fileName">{this.state.loading ? <Spin /> : this.state.fileList.originalfilename}</span>
        </div>
       )}

      </FormItem>

      <FormItem
       wrapperCol={{span: 8, offset: 4}}
      >
       <Button type="primary" htmlType="submit" style={{width: '80px', height: '30px'}}>
        提交
       </Button>
      </FormItem>
     </Form>
    </div>
   </Navigation>
  </div>

 }
}
export default connect(({authen})=>({authen}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Intelligent));
