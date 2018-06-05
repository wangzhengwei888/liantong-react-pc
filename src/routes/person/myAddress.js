/**
 * 个人中心收货地址
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb,Upload ,Button,Cascader,Form,Input,Icon,Table,Modal} from 'antd';
import Img from '../../components/Img/Img';
import { myAddress_body } from './myAddress.less';

const FormItem = Form.Item;
import { getAreaData } from '../../utils/getArea';


class  Myaddress extends Component{
  constructor(props){
    super(props);
    this.label='';
    this.area=getAreaData();
    this.state={
      visible:false
    }
  }

  columns = [{
  title: '收货人',
  dataIndex: 'trueName',
  key: 'trueName',
}, {
  title: '所在地区',
  dataIndex: 'areaInfo',
  key: 'areaInfo',
}, {
  title: '街道地址',
  dataIndex: 'address',
  key: 'address',
},{
  title: '手机号码',
  dataIndex: 'mobPhone',
  key: 'mobPhone',
}, {
  title: '操作',
  key: 'action',
  render: (text, record ) => (
    <span>
      {record.isDefault==0 ?
        <a href="javascript:void(0);" className='edit_btn' onClick={()=>{
          this.props.dispatch({ type:'address/updateAddressEFF', addressId:record.addressId })
        }}>设置默认收货地址</a>

        :<span style={{ color:'red' }}>默认收货地址</span>
      }

          <a href="javascript:void(0);" className='edit_btn' onClick={()=>{this.changeAddress(record)}}>编辑</a>
          <a href="javascript:void(0);" className='edit_btn' onClick={ ()=>{  this.props.dispatch({ type:'address/deleteAddressEFF', addressId:record.addressId }) } }>删除</a>
        </span>
  ),
}];

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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.dispatch({ type:'address/saveAddressEFF', addressobj:{ areaInfo:this.label.join(' '), areaId:values.residence[2], cityId:values.residence[1], provinceId:values.residence[0] , ...values, }});
        this.setState({
          visible: false,
        });
      }
    });
  }

  changeAddress = (addressItem)=>{
    this.setState({
      visible: true,
    },()=>{
      this.props.form.setFieldsValue({
        trueName: addressItem.trueName||'',
        residence: [addressItem.provinceId||'',addressItem.cityId||'',addressItem.areaId||''],
        address: addressItem.address||'',
        zipCode: addressItem.zipCode||'',
        mobPhone: addressItem.mobPhone||'',
        addressId:addressItem.addressId||''
      });
    });

  }



  render (){
    const { getFieldDecorator } = this.props.form;
    const { addresslist } = this.props.address;
    let { visible } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };


    return (
      <div className={myAddress_body}>
        <div className="myAddress_content">
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <Breadcrumb separator=">">
              <Breadcrumb.Item href="">我的商城</Breadcrumb.Item>
              <Breadcrumb.Item>设置</Breadcrumb.Item>
              <Breadcrumb.Item>收货地址</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {/*列表*/}
          <div className="myAddress_list">
            <p style={{textAlign:'right',margin:'20px'}}>
              您已创建<sapn style={{color:'#3497CE',fontWeight:'600'}}>1</sapn>个收货地址，最多可创建<sapn style={{color:'#3497CE',fontWeight:'600'}}>20</sapn>个
              <Button onClick={()=>{ this.changeAddress({}) }}  type="primary"  style={{marginLeft:'10px'}}><Icon type="environment-o" /><span >使用新地址</span></Button>
            </p>

            <Table columns={ this.columns }
                   dataSource={ addresslist }
                   rowKey={record => record.addressId}
                   pagination={false}
            />
          </div>

        </div>

        {/*弹出层*/}
        <Modal title="新增地址"
               visible={ visible }
               footer={null}
          // onOk={this.handleSubmit}
          //  confirmLoading={this.state.confirmLoading}
               onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="收货人"
              hasFeedback
            >
              {getFieldDecorator('trueName', {
                rules: [{
                  required: true, message: '请输入收货人',
                }],
              })(
                <Input type="text"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所在地区"
            >
              {getFieldDecorator('residence', {
                initialValue: ['10', '1010', '101010'],
                rules: [{ type: 'array', required: true, message: '请选择您所属地区' }],
              })(
                <Cascader options={ this.area } displayRender={(label)=>{ this.label=label; return label.join(' / ')}} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="详细街道"
              hasFeedback
            >
              {getFieldDecorator('address', {
                rules: [{ required: true, message: '请输入详细地址', whitespace: true }],
              })(
                <Input type="text"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="邮编"
              hasFeedback
            >
              {getFieldDecorator('zipCode', {
                rules: [{
                  required: true, message: '请输入邮编',
                }],
              })(
                <Input type="text"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号码"
              hasFeedback
            >
              {getFieldDecorator('mobPhone', {
                rules: [{
                  required: true, message: '请输入手机号码',
                }],
              })(
                <Input type="text"/>
              )}
            </FormItem>

            <FormItem {...formItemLayout}  label="">
              {getFieldDecorator('addressId')(
                <Input type='hidden' placeholder="Please input your name" />
              )}
            </FormItem>

            <FormItem
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
              }}
            >
              <Button type="primary" htmlType="submit" style={{ marginRight:'20px' }}>保存</Button>
              <Button onClick={this.handleCancel}>取消</Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}


export default connect(({address})=>({address}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Myaddress));

