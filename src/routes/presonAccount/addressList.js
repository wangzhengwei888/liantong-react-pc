/**
 * 个人中心个人信息
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import Img from '../../components/Img/Img';
import {address,my_account_dynamic_Topimg} from './addressList.less';
import {getAreaData} from '../../utils/getArea';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';
// import {Breadcrumb, Row, Col, Button, Form, Modal, message, Input, Cascader,Table} from 'antd';
import {
 Form,
 Breadcrumb,
 Row,
 Col,
 Button,
 Tree,
 Checkbox,
 Tabs,
 Modal,
 message,
 Table,
 Input,
 Icon,
 Popconfirm,
 Collapse,
 Select,
 Cascader,
} from 'antd'


const FormItem = Form.Item;



class AddressList extends Component {
 constructor(props) {
  super(props);
  this.label = '';
  this.area = getAreaData();
  this.state = {
   visible: false,
   //收货地址初始值
   initAddress: {
    reciveName: "",
    provinceId: "",
    cityId: "",
    areaId: "",
    address: "",
    mobPhone: "",
    telPhone: "",
    zipCode: "",
    orderAddressId: ""
   },

  }
 }

 showModal = () => {
  this.setState({
   visible: true,
  });
 }
 handleCancel = () => {
  this.setState({
   visible: false,
  });
 }
 // handleSubmit = (e) => {
 //  e.preventDefault();
 //  this.props.form.validateFields((err, values) => {
 //   if (!err) {
 //    console.log(values);
 //    this.props.handleSubmit({
 //     areaInfo: this.label.join(' '),
 //     areaId: values.residences[2],
 //     cityId: values.residences[1],
 //     provinceId: values.residences[0], ...values,
 //    });
 //    this.setState({
 //     visible: false,
 //    });
 //   }
 //  });
 // }

 showAddressModal = (msg) => {
  let info = msg || {};
  this.setState({
   visible: true,
   initAddress: {
    reciveName: info.trueName || "",
    provinceId: info.provinceId || "",
    cityId: info.cityId || "",
    areaId: info.areaId || "",
    fouthAreaId: info.fouthAreaId || "",
    address: info.address || "",
    mobPhone: info.mobPhone || "",
    telPhone: info.telPhone || "",
    zipCode: info.zipCode || "",
    orderAddressId: info.addressId || "",
   }
  });
 }

//默认地址
 setDefaultAdderss = (info) => {
  console.log(info)
  this.props.dispatch({type: 'address/setDefaultAddressEFF',orderAddressId:info.addressId});
 }

 saveAddress = (e) => {
  this.props.form.validateFields(["receiverName", "receiverRegion", "address", "mobile", "tel", "zipCode"], (err, values) => {
   if (!err) {
    let value = {
     reciveName: values.receiverName,
     provinceId: values.receiverRegion[0],
     cityId: values.receiverRegion[1],
     areaId: values.receiverRegion[2],
     fouthAreaId: values.receiverRegion[3],
     address: values.address,
     mobile: values.mobile,
     tel: values.tel,
     zipCode: values.zipCode,
     orderAddressId: this.state.initAddress.orderAddressId
    }
    this.props.dispatch({type: 'address/saveAddressEFF', payload: value})
    this.setState({
     visible: false
    });
    this.props.form.resetFields()
   }
  });

 }
 deleteAddress = (v) => {
  Modal.confirm({
   title: '您确定要删除吗?',
   content: '',
   onOk: () => {
    this.props.dispatch({type: 'address/deleteAddressEFF', addressId: v});
   },
   onCancel() {
    console.log('取消');
   },
  });
 }
 closeAddress = (e) => {
  this.setState({
   visible: false,
  });
  this.props.form.resetFields()
 }



 render() {
  const {getFieldDecorator} = this.props.form;
  const {visible} = this.state;
  const {areaDataList}=this.props.address;
  const {addressList} = this.props.address;
  console.log(addressList)
  const formItemLayout = {
   labelCol: {
    xs: {span: 24},
    sm: {span: 6},
   },
   wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
   },
  };


  const columns = [{
   title: '收货人',
   dataIndex: 'trueName',
   key: 'name'
  }, {
   title: '收货地区',
   dataIndex: 'areaInfo',
   key: 'areaInfo',
   render:(list,record)=>{
    let addressprovince = areaDataList.filter(address => {
     return record.provinceId == address.value
    });
    let addresscity = addressprovince[0].children.filter(address => {
     return record.cityId == address.value
    });
    let addressarea = addresscity[0].children.filter(address => {
     return record.areaId == address.value
    });
    let addressfouthArea = addressarea[0].children.length > 0 && addressarea[0].children.filter(address => {
     return record.fouthAreaId == address.value
    });
    let addressfouthAreaInfo = addressfouthArea[0] ? addressfouthArea[0].label : ""
    return (
     <span>{addressprovince[0].label}&nbsp;&nbsp;&nbsp;{addresscity[0].label}&nbsp;&nbsp;&nbsp;{addressarea[0].label}&nbsp;&nbsp;&nbsp;{addressfouthAreaInfo}</span>
    )
   }
  }, {
   title: '详细地址',
   dataIndex: 'address',
   key: 'address'
  },{
   title: '手机号码',
   dataIndex: 'mobPhone',
   key: 'mobPhone',
  },{
   title: '固定电话',
   dataIndex: 'telPhone',
   key: 'telPhone',
  }, {
   title: '邮编',
   dataIndex: 'zipCode',
   key: 'zipCode',
  },{
   title: '操作',
   key: 'action',
   render: (list, record) => (
    <span>
      {record.isDefault==0 ?
       <Button href="javascript:void(0);" className='edit_btn' onClick={()=>{this.setDefaultAdderss(record)}} style={{ marginRight:'5px'}}>设置默认收货地址</Button>

       :<Button style={{ marginRight:'5px'}} type="primary">默认收货地址</Button>
      }
     <Button href="javascript:void(0);" className='edit_btn' style={{ marginRight:'5px'}} onClick={() => this.showAddressModal(list)}>编辑</Button>
       <Button href="javascript:void(0);" className='edit_btn' style={{ marginRight:'5px'}} onClick={() => this.deleteAddress(list.addressId)}>删除</Button>
    </span>

   ),
  }];
  return (
   <div>
    <Search></Search>
    <Navigation preson={true}>
     <div className="myconsult_content">
      <div className={my_account_dynamic_Topimg}></div>
      {/*头部单行条*/}
      <div className="used_nva_bar">
       <Breadcrumb separator=">">
        <Breadcrumb.Item  href="/presonAccunt/myAccount" style={{fontSize:'12px', fontWeight:'normal' }}>我的账户</Breadcrumb.Item>
        <Breadcrumb.Item href="/presonAccount/personalInformation" style={{fontSize:'12px', fontWeight:'normal' }}>我的信息</Breadcrumb.Item>
        <Breadcrumb.Item href="/presonAccount/addressList" style={{fontSize:'16px', fontWeight:'bold' }}>收货信息</Breadcrumb.Item>
       </Breadcrumb>
      </div>
      {/*列表*/}
      <div className={address}>
       <Row type="flex" justify="space-between" style={{height: '50px', lineHeight: '50px'}}>
        <Col className='title' span={4}></Col>
        <Col><Button onClick={this.showAddressModal} icon="environment-o" style={{marginRight: '10px'}} type="primary">新增收货地址</Button></Col>
       </Row>
       <Table columns={columns}
              dataSource={addressList}
              rowKey={record => record.addressId}
              pagination={false}

       />

       <Modal
        title="新建收货人信息"
        visible={visible}
        onOk={this.saveAddress}
        onCancel={this.closeAddress}
        maskClosable={false}
        footer={
         <Row type="flex" justify="space-around">
          <Col> <Button onClick={this.closeAddress}>取消</Button></Col>
          <Col> <Button onClick={this.saveAddress}
                        style={{color: '#108ee9', border: '1px solid #108ee9'}}>保存</Button></Col>
         </Row>
        }
       >
        <FormItem
         {...formItemLayout}
         label={<span style={{fontSize: '14px'}}>收货人姓名</span>}
        >
         {getFieldDecorator('receiverName', {
          rules: [{required: true, message: '请填写收货人姓名'}],
          initialValue: this.state.initAddress.reciveName
         })(
          <Input/>
         )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label={<span style={{fontSize: '14px'}}>收货地区</span>}
        >
         {getFieldDecorator('receiverRegion', {
          rules: [{required: true, message: '请选择所属地区'}],
          initialValue: [this.state.initAddress.provinceId, this.state.initAddress.cityId, this.state.initAddress.areaId,this.state.initAddress.fouthAreaId]
         })(
          <Cascader options={areaDataList} style={{width: '100%'}}/>
         )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label={<span style={{fontSize: '14px'}}>收货地址</span>}
        >
         {getFieldDecorator('address', {
          rules: [{required: true, message: '请填写收货地址'}],
          initialValue: this.state.initAddress.address
         })(
          <Input/>
         )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label={<span style={{fontSize: '14px'}}>手机号码</span>}
        >
         {getFieldDecorator('mobile', {
          rules: [{required: true, message: '请填写正确手机号码', len: 11, pattern: /^1[0-9]{10}$/}],
          initialValue: this.state.initAddress.mobPhone})(
          <Input/>
         )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label={<span style={{fontSize: '14px'}}>固定电话</span>}
        >
         {getFieldDecorator('tel', {
          rules: [{min: 0, max: 20, message: '请填写最多20位固定电话'}],
          initialValue: this.state.initAddress.telPhone})(
          <Input/>
         )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label={<span style={{fontSize: '14px'}}>邮政编码</span>}
        >
         {getFieldDecorator('zipCode', {
          rules: [{len: 6, message: '请填写6位邮政编码'}],
          initialValue: this.state.initAddress.zipCode})(
          <Input/>
         )}
        </FormItem>
       </Modal>
      </div>

     </div>
    </Navigation>

   </div>
  );
 }
}


export default connect(({address}) => ({address}), (dispatch, own) => {return {dispatch, own}})(Form.create()(AddressList));

