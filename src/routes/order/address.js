import React , { Component } from 'react';
import { Row, Col,Radio,Button, Form, Modal, Input, Cascader  } from 'antd';
import { address } from './address.less';

import { getAreaData } from '../../utils/getArea';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Address extends Component{
  constructor(props){
    super(props);
    this.label='';
    this.area=getAreaData();
    this.state={
      visible:false
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.handleSubmit({ areaInfo:this.label.join(' '), areaId:values.residence[2], cityId:values.residence[1], provinceId:values.residence[0] , ...values, });
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




  render(){
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    const { addresslist, showALLAddress, del, isDefault, children, updataDefault } = this.props

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

    return(
      <div className={ address }>
        <Row type="flex" justify="space-between" style={{ height:'50px', lineHeight:'50px' }}>
          <Col className='title' span={4}>收货人地址</Col>
          <Col ><Button onClick={()=>{ this.changeAddress({}) }} icon="environment-o" style={{ marginRight:'10px' }} type="primary">新增收货地址</Button></Col>
        </Row>

        <Row>
          <Col span={4}>
            { children }
          </Col>
          <Col span={20}>

            {
              addresslist.map((v,i,a)=>{

                if(showALLAddress==false){
                  if(isDefault==-1&&i==0){
                    return (
                      <Row key={i} type="flex" justify="start" className='address_item'>
                        <Col span={10} >{v.areaInfo}{' ' +v.address}</Col>
                        <Col span={6}>电话：{v.mobPhone}</Col>
                        <Col span={6}>
                          <span className="address_change">{ v.isDefault==0 ? <span onClick={ ()=>{ updataDefault(v.addressId) } }>设为默认收货地址</span> : <span style={{ color:'#fc0000' }}>默认收货地址</span> }</span>
                          <span className="address_change" onClick={()=>{ this.changeAddress(v) }}>编辑</span>
                          <span className="address_change" onClick={ ()=>{ del(v.addressId) } }>删除</span>
                        </Col>
                      </Row>
                    );
                  }else if(isDefault==i){
                    return (
                      <Row key={i} type="flex" justify="start" className='address_item'>
                        <Col span={10}>{v.areaInfo}{' ' +v.address}</Col>
                        <Col span={6}>电话：{v.mobPhone}</Col>
                        <Col span={6}>
                          <span className="address_change">{ v.isDefault==0 ? <span onClick={ ()=>{ updataDefault(v.addressId) } }>设为默认收货地址</span> : <span style={{ color:'#fc0000' }}>默认收货地址</span> }</span>
                          <span className="address_change" onClick={()=>{ this.changeAddress(v) }}>编辑</span>
                          <span className="address_change" onClick={ ()=>{ del(v.addressId) } }>删除</span>
                        </Col>
                      </Row>
                    );
                  }
                }else {
                  return (
                    <Row key={i} type="flex" justify="start" className='address_item'>
                      <Col span={10}>{v.areaInfo}{' ' +v.address}</Col>
                      <Col span={6}>电话：{v.mobPhone}</Col>
                      <Col span={6}>
                        <span className="address_change">{ v.isDefault==0 ? <span onClick={ ()=>{ updataDefault(v.addressId) } }>设为默认收货地址</span> : <span style={{ color:'#fc0000' }}>默认收货地址</span> }</span>
                        <span className="address_change" onClick={()=>{ this.changeAddress(v) }}>编辑</span>
                        <span className="address_change" onClick={ ()=>{ del(v.addressId) } }>删除</span>
                      </Col>
                    </Row>
                  );
                }
              })
            }

          </Col>
        </Row>


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

export default Form.create()(Address);


