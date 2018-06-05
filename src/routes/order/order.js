/**
 * Created by 10400 on 2017/8/9.
 * order支付页面
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import PtInvoice from './ptInvoice';
import ZzInvoice from './zzInvoice';
import Search from '../../components/Search/Search';
import Coupon from './coupon';
import {saveorder } from './orderApi';
import { IMAGE_DOMAIN } from '../../utils/common';
import { Form, Icon, Input, Button, message,Select,Radio,Menu,Dropdown ,Tree ,Checkbox,Modal,Tabs,  Row, Col,Table } from 'antd';
import { order_body,invoice} from './order.less'

import  Img  from '../../components/Img/Img';
//import Address from './address';

import { Link } from 'dva/router';


const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
class  Order extends Component{
  constructor(props){
    super(props);
    this.state={
      formLayout: 'inline',
      visible: false,
      couponNum:0,
      couponMoney:0,
      total:'',
      showALLAddress:false,
      selectDefault:null,
      addressId:"",
      cityId:''
    }
  }

//   onClickInvoice = (invoiceShow) => {
//     console.log(invoiceShow)
//     let invContent = 1
//     if (invoiceShow != '不开发票') {
//       invContent = 2
//     } else {
//       invContent = 1
//     }
// //  this.props.router.push('/invoice/${invoiceShow,invContent}');
//     this.props.router.push(`/invoice/${invoiceShow}/${invContent}`);
//   }
//
//   changeInvoice = (objInvoice)=> {
//     this.props.dispatch({ type: 'order/addInvoiceEFF', objInvoice });
//   }


  columns = [
    {
    title: <div style={{ textAlign:'center', fontSize:'14px' }}>商品信息</div>,
    dataIndex: 'goodsName',
    key: 'goodsName',
    render: (text,record) => (
    <Row type="flex" justify="start">
      <Col><Link to={`/goodsDetail/${record.goodsId}`}><Img src={ record.goodsImages } style={{marginLeft:'5px', width:'90px',height:'90px', verticalAlign:'middle' }}/></Link></Col>
      <Col style={{ height:'90px', lineHeight:'30px' }}>
        <div style={{paddingLeft:'30px',textAlign:'left',fontSize:'16px'}}><Link to={`/goodsDetail/${record.goodsId}`} style={{color:'#2c94cb'}}>{record.goodsName}</Link></div>
        <div style={{paddingLeft:'30px',textAlign:'left' }}>规格：{record.specName}</div>
        <div style={{paddingLeft:'30px',textAlign:'left' }}>厂家：{record.brandName}</div>
      </Col>
    </Row>
    ),
  },
  {
    title: <div style={{ textAlign:'center', fontSize:'14px' }}>单位</div>,
    dataIndex: 'goodsUnitName',
    key: 'goodsUnitName',
  },
  {
    title: <div style={{ textAlign:'center', fontSize:'14px' }}>单价（元）</div>,
    dataIndex: 'goodsPrice',
    key: 'goodsPrice',
    render: (text, record) => (
      <span>
        ￥{ record.goodsPrice }
     </span>
    ),
  },
  {
      title: <div style={{ textAlign:'center', fontSize:'14px' }}>数量</div>,
      dataIndex: 'goodsNum',
      key: 'goodsNum',
  },
  {
    title: <div style={{ textAlign:'center', fontSize:'14px' }}>小计（元）</div>,
    key: 'action',
    render: (text, record) => (
      <span style={{color:'#ff0000',fontWeight:'bold'}}>
        ￥{ (parseInt(record.goodsNum)*parseFloat(record.goodsPrice)).toFixed(2) }
     </span>
    ),
  }];

  handleModel = (visible) => {
    this.setState({
      visible: visible,
    })
  }


  handleButtonClick = (e) => {
    message.info('Click on menu item.');
    // console.log('click', e);
  }
  onChange=(e)=> {
    // console.log(`checked = ${e.target.checked}`);
  }
  couponNumChange = (n,money) =>{
    this.setState({
      couponNum:n,
      couponMoney:money
    })
  }
  //切换选项卡
  onChangeTab = (activeKey) => {
    this.setState({
      activeKey:activeKey
    })
  }
  /*选择支付方式*/
  selectPayType = (type) => {
    // console.log(type)
    // this.props.dispatch({
    //   type: 'order/selectPayType',
    //   payload: type
    // });
  }

  onSubmitOrder = () => {
    // 提交订单
    const { order } =this.props.order;


    this.props.form.validateFields(
      (err, values) => {
        if (!err) {
          //console.log(values);
          const arr = order.map((v,i,a)=>{
            return {
              storeId:v.storeId,
              storeName:v.storeName,
              channelAddressId:this.props.form.getFieldValue(`address${i}`),
              channelAddressName:v.addressList.find((va,vi)=>(va.id==this.props.form.getFieldValue(`address${i}`))).channelAddress,
              channelPayType:this.props.form.getFieldValue(`paytype${i}`),
              channelPayTypeName:v.payTypeList.find((va,vi)=>(va.dictionaryId==this.props.form.getFieldValue(`paytype${i}`))).dictionaryName,
              list:v.list.map((vl,il)=>{
                return {
                  goodsNum:vl.goodsNum,
                  newGoodsPrice:vl.goodsPrice,
                  goodsId:vl.goodsId,
                  goodsName:vl.goodsName,
                  goodsSpec:vl.goodsSpec,
                  brandName:vl.brandName,
                  goodsImage:vl.goodsImage,
                 // brandId:vl.brandId,
                  goodsUnitName:vl.goodsUnitName,
                  dosageFormName:vl.dosageFormName,
                  cartId:vl.cartId
                }
              })
            }
          })

          console.log(arr)
          this.props.dispatch({ type:'order/saveOrderForSinopharmEFF', arr });

        }
      }
    );
   // this.props.dispatch({ type:'order/saveOrderForSinopharmEFF', arr });

   //console.log(this.props.form.getFieldInstance('address0'))
  }

  handleSubmit = (addressobj)=> {
    this.props.dispatch({ type:'order/saveAddressEFF', addressobj });
    this.props.form.resetFields(['addressId']);
  }

  // showItem = ()=> {
  //    this.setState({
  //      showALLAddress:!this.state.showALLAddress
  //    })
  // }
  //
  // handleSelectDefault = (i,v)=>{
  //   this.setState({
  //     selectDefault:v.addressId
  //   });
  //   //this.props.dispatch({ type:'order/addShippingEFF', cartIds:this.props.order.cartIds,cityId:v.cityId });
  // }

  // del=(id)=>{
  //   //console.log(id);
  //   if(this.props.form.getFieldValue('addressId')==id){
  //
  //     let { addresslist } =this.props.order;
  //
  //     addresslist=addresslist.filter((v,i,a)=>(v.addressId!=id));
  //
  //     const isDefault=  addresslist.findIndex((v,i)=>{ return v.isDefault==1 });
  //     this.props.form.setFieldsValue({ addressId:(addresslist.length>0 && isDefault==-1) ?  addresslist[0].addressId : (  addresslist.length>0&&addresslist[isDefault].addressId ) })
  //
  //     this.setState({ selectDefault:null
  //      // (addresslist.length>0 && isDefault==-1) ?  addresslist[0].addressId : (  addresslist.length>0&&addresslist[isDefault].addressId )
  //     });
  //   }
  //   this.props.dispatch({ type:'order/deleteAddressEFF', addressId:id })
  // }
  //
  // updataDefault=(id)=>{
  //   this.props.dispatch({ type:'order/updateAddressEFF', addressId:id })
  // }

  // componentDidUpdate(){
  //   let addressId=this.props.form.getFieldValue('addressId');
  //   let addressItem = this.props.order.addresslist.find((v,i,a)=>{ return v.addressId==addressId });
  //   console.log(addressItem);
  //   if((addressItem&&addressItem.cityId&&addressId&&addressId!=this.state.addressId)||(addressItem&&addressItem.cityId&&addressId&&addressItem.cityId!=this.state.cityId)){
  //     this.props.dispatch({ type:'order/addShippingEFF', cartIds:addressId,cityId:addressItem.cityId });
  //
  //     this.setState({
  //        addressId:addressId,
  //       cityId:addressItem.cityId
  //      });
  //   }
  //   //console.log(this.props.form.getFieldValue('addressId'));
  // }

  render (){
    //console.log(this.props)
    const { order, Total,  invoiceList1 } =this.props.order;
    //const { list=[], addressList=[], payTypeList=[] } =order;
    let goodsTotalPrice=order.reduce(function(prev, cur, index, arr) {
      return parseFloat(prev) + parseFloat(cur.goodsTotalPrice);
    },0);

    let goodsTotalFreight = order.reduce(function(prev, cur, index, arr) {
      return parseFloat(prev) + parseFloat(cur.goodsTotalFreight);
    },0);


   // console.log(orderListContent)
    //const {cartVoList,addressList=[]} = (orderListContent.length>0 && orderListContent[0]);

    //const {totalGoodsPrice,totalPrice,totalFreight} = (Total.length>0 && Total[0]);//价格
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { formLayout, showALLAddress, selectDefault, visible } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 16 },
      },
    };

    // const total = parseFloat(cartVoList[0].goodsTotalPrice-cartVoList[0].goodsTotalFreight).toFixed(2);


   // const isDefault= selectDefault==null ? addresslist.findIndex((v,i)=>{ return v.isDefault==1}) : addresslist.findIndex((v,i)=>{ return v.addressId==selectDefault});
    //console.log(isDefault);
    //console.log( addresslist[isDefault].addressId );


    return (
      <div>
        <div><Search></Search></div>
        <div className={order_body}>
          <div className="order_content">
            {/*<div style={{ paddingLeft:'25px', borderBottom:'1px solid #e5e5e5' }}>*/}
              {/*<Address updataDefault={ this.updataDefault } del={ this.del }  isDefault={ isDefault } showALLAddress={showALLAddress} handleSubmit={this.handleSubmit} addresslist={ addresslist }>*/}
                {/*<FormItem*/}
                  {/*{...formItemLayout}*/}
                  {/*label=""*/}
                  {/*style={{ marginBottom:'0px' }}*/}
                {/*>*/}
                  {/*{getFieldDecorator('addressId', {*/}
                    {/*initialValue: (addresslist.length>0 && isDefault==-1) ?  addresslist[0].addressId : (  addresslist.length>0&&addresslist[isDefault].addressId ),*/}
                    {/*rules: [*/}
                      {/*{*/}
                        {/*required: true, message: '请选择收货地址!',*/}
                      {/*}],*/}
                  {/*})(*/}
                    {/*<RadioGroup*/}
                     {/*// onChange={(e)=>{console.log(e.target.value)}}*/}
                    {/*>*/}
                      {/*{*/}
                        {/*addresslist.map((v,i,a)=>{*/}

                          {/*if(showALLAddress==false){*/}
                            {/*if(isDefault==-1&&i==0){*/}
                              {/*return (*/}
                                {/*<RadioButton key={i} className="preson_name" onClick={()=>{ this.handleSelectDefault(i,v) }} value={ v.addressId }>{ v.trueName }</RadioButton>*/}
                              {/*);*/}
                            {/*}else if(isDefault==i){*/}
                              {/*return (*/}
                                {/*<RadioButton key={i} className="preson_name" onClick={()=>{ this.handleSelectDefault(i,v) }} value={ v.addressId }>{ v.trueName }</RadioButton>*/}
                              {/*);*/}
                            {/*}*/}
                          {/*}else {*/}
                            {/*return (*/}
                              {/*<RadioButton key={i} className="preson_name" onClick={()=>{ this.handleSelectDefault(i,v) }} value={ v.addressId }>{ v.trueName }</RadioButton>*/}
                            {/*);*/}
                          {/*}*/}

                        {/*})*/}
                      {/*}*/}
                    {/*</RadioGroup>*/}
                  {/*)}*/}
                {/*</FormItem>*/}

              {/*</Address>*/}
              {/*{*/}
                {/*addresslist.length> 1 ?  <span style={{ cursor:'pointer' }} onClick={this.showItem}>{ showALLAddress==false ? '展开地址' : '收起地址'   }</span> : ''*/}
              {/*}*/}



            {/*</div>*/}
            <div className="order_content_invoice border-bot-y">
              <p>发票信息</p>
              <div className="invoice_chace">
                <span>不开发票</span>
                <span>
                  <a href="javascript:;" onClick={()=>this.handleModel(true)} style={{color:'#3497ce',textDecoration:'none'}}>发票详细</a>
                </span>
              </div>
            </div>


            {/*<div className="order_content_Payment border-bot-y">*/}
              {/*<p>选择付款方式</p>*/}
              {/*<div className="Payment_bot">*/}

                {/*<FormItem*/}
                  {/*{...formItemLayout}*/}
                  {/*label=""*/}
                {/*>*/}
                  {/*{getFieldDecorator('paytype', {*/}
                    {/*rules: [*/}
                      {/*{*/}
                      {/*required: true, message: '请选择支付方式!',*/}
                    {/*}],*/}
                  {/*})(*/}
                    {/*<Select*/}
                      {/*style={{ width:"30%" }}*/}
                      {/*placeholder="请选择支付方式"*/}
                    {/*>*/}
                      {/*{*/}
                        {/*payTypeList.map((av,ai,aa)=> (<Option key={ai} value={ av.key }>{ av.value }</Option>)*/}
                        {/*)*/}
                      {/*}*/}
                    {/*</Select>*/}
                  {/*)}*/}
                {/*</FormItem>*/}

              {/*</div>*/}
            {/*</div>*/}
            {/*确认订单*/}
            <div className="confirm_shopping_list border-bot-y">
              <p>确认购物清单</p>
              {/*{*/}
                {/*cartVoList && cartVoList.map((cartlist,num)=>{*/}
                  {/*return (*/}
                    {/*<table style={{width:'100%',marginBottom:'10px'}} key={num}>*/}
                      {/*<thead>*/}
                      {/*<tr><th style={{width:'14%'}}>店铺：{cartlist.storeName}</th>*/}
                        {/*<th style={{textAlign:'left',paddingLeft:'15px',width:'40%'}}>商品</th>*/}
                        {/*<th style={{width:'12%'}}>单位</th>*/}
                        {/*<th style={{width:'12%'}}>单价（元）</th>*/}
                        {/*<th style={{width:'10%'}}>数量</th>*/}
                        {/*<th style={{width:'12%'}}>小计（元）</th>*/}
                      {/*</tr>*/}
                      {/*</thead>*/}
                      {/*<tbody>*/}
                      {/*{*/}
                        {/*cartlist.list && cartlist.list.map((listcon,index)=>{*/}
                          {/*const subtotal=parseFloat(listcon.goodsPrice * listcon.goodsNum).toFixed(2);*/}
                          {/*return (*/}
                            {/*<tr key={index}>*/}
                              {/*<td style={{borderRight:'none'}}>*/}
                                {/*<div style={{paddingLeft:'5px',height:'120px'}}>*/}
                                  {/*<img src={`${IMAGE_DOMAIN}${listcon.goodsImages}`} style={{width:'120px',height:'120px'}}/>*/}
                                {/*</div>*/}
                              {/*</td>*/}
                              {/*<td>*/}
                                {/*<div className="shopping_list_product">*/}
                                  {/*<h3>{listcon.goodsName}</h3>*/}
                                  {/*<p>规格：{listcon.specInfo}</p>*/}
                                  {/*<p>厂家：{listcon.storeName}</p>*/}
                                {/*</div>*/}
                              {/*</td>*/}
                              {/*<td>*/}
                                {/*盒*/}
                              {/*</td>*/}
                              {/*<td>*/}
                                {/*<div>￥{listcon.goodsPrice}</div>*/}
                              {/*</td>*/}
                              {/*<td>{listcon.goodsNum}</td>*/}
                              {/*<td><span style={{color:'#ff0000',fontWeight:'bold'}}>￥{subtotal}</span></td>*/}
                            {/*</tr>*/}
                          {/*)*/}
                        {/*})*/}
                      {/*}*/}
                      {/*</tbody>*/}
                    {/*</table>*/}
                  {/*)*/}
                {/*})*/}
              {/*}*/}

              {
                order && order.map((v,i,a)=>{
                  return (
                    <div key={v.storeId}>
                      <Row className='table_top' type="flex" justify="space-between">
                        <Col>店铺：<span style={{color:'red'}}> { v.storeName }</span> </Col>
                        <Col>优惠信息：{'无'}</Col>
                      </Row>
                      <Table pagination={false} columns={this.columns} dataSource={v.list} rowKey={record => record.goodsId} />


                      <Row style={{ paddingTop:'15px' }}>
                        <Col style={{ height:'56.8px',textAlign:'left' }} span={12}>
                          <FormItem
                            {...formItemLayout}
                            label="选择支付方式"
                          >
                            {getFieldDecorator(`paytype${i}`, {
                             // fieldNameProp:,
                              rules: [
                                {
                                  required: true, message: '请选择支付方式!',
                                }],
                            })(
                              <Select
                                style={{ width:"100%" }}
                                placeholder="请选择支付方式"
                              >
                                {
                                  v.payTypeList.map((av,ai,aa)=> (<Option key={av.dictionaryId} value={ av.dictionaryId }>{ av.dictionaryName }</Option>)
                                  )
                                }
                              </Select>
                            )}
                          </FormItem>
                        </Col>

                        <Col style={{ height:'56.8px' }} span={12} >
                          <FormItem
                            {...formItemLayout}
                            label="选择收货地址"
                          >
                            {getFieldDecorator(`address${i}`, {
                              rules: [{ required: true, message: '选择收货地址' }],
                            })(
                              <Select
                                style={{ width:"100%" }}
                                placeholder="选择收货地址"
                              >
                                {
                                  v.addressList.map((av,ai,aa)=> (<Option key={av.id} value={ av.id }>{ av.channelAddress }</Option>)
                                  )
                                }
                              </Select>
                            )}
                          </FormItem>
                        </Col>

                        <Col style={{ height:'56.8px' }} span={12} >
                          <FormItem
                            label='给卖家留言'
                            {...formItemLayout}
                          //  style={{width:'420px',marginRight:'0px'}}
                          >
                            <Input placeholder="选填，可以告诉卖家您对商品的特殊要求" />
                          </FormItem>
                        </Col>

                        <Col style={{ height:'56.8px' }} span={12}>
                          <div style={{ height:'32px', lineHeight:"32px" , textAlign:'right' }}>免运费</div>
                        </Col>

                      </Row>
                    </div>
                  )
                })
              }



            </div>

            {/*流程、余额、积分*/}
            <div className="confirm_shopping_information">
              {/*审批流程*/}
              <div className="approval_process">
                <Form>
                <FormItem
                  className="FormItem2"
                  {...formItemLayout}
                  label={<span style={{fontSize:'14px',color:'#333'}}>选择审批流程</span>}
                  hasFeedback
                  style={{width:'440px',marginRight:'0px'}}
                >
                  {getFieldDecorator('selectcaigou', {
                    rules: [
                      { message: '销售部统一采购' },
                    ],
                  })(
                    <Select placeholder="销售部统一采购">
                      <Option value="china">China</Option>
                      <Option value="use">U.S.A</Option>
                    </Select>
                  )}
                </FormItem>
                </Form>

                <div>
                  <Tree
                    showLine
                    onSelect={this.onSelect}
                  >
                    <TreeNode title="使用优惠券" key="0-0">
                      <TreeNode key="0-0-0">
                        <div className="table_information">
                          <div className="table_information_top">可用优惠券<span>（0）</span></div>

                          <div className="table_information_bottom">
                            <div className="table_bottom_title">
                              <div style={{padding:'22px 0px 40px'}}>此订单暂时无可用的优惠券</div>
                            </div>
                            <Coupon onChange={this.couponNumChange}/>
                            <div className="table_bottom_text">共使用了<span style={{color:'#fe8415'}}>{this.state.couponNum}</span>张优惠券，可以优惠<span style={{color:'#fe8415'}}>{this.state.couponMoney}</span>元</div>
                          </div>

                        </div>

                      </TreeNode>

                    </TreeNode>
                  </Tree>
                </div>

              </div>
              {/*使用余额*/}
              <div className="information_balance">
                {
                 getFieldValue('paytype')==2 ? '' :<Tree
                   showLine
                   onSelect={this.onSelect}
                 >
                   <TreeNode title="使用余额" key="0-0">
                     <TreeNode key="0-0-0">
                       <div className="table_information">
                         <div className="table_information_top"><Checkbox onChange={this.onChange} style={{fontSize:'14px',color:'#333'}}>使用余额<span>（账户当前余额：10.00元）</span></Checkbox></div>
                         <div className="table_information_bottom">
                           <div className="table_bottom_title">
                             <div style={{padding:'22px 0px 20px'}}>
                               <FormItem style={{width:'25%',display:'inline-block',marginBottom:'0px'}}>
                                 {getFieldDecorator('password', {
                                   rules: [{ message: 'Please input your Password!' }],
                                 })(
                                   <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入支付密码" />
                                 )}
                               </FormItem>
                               <span style={{fontSize:'14px',color:'#333',lineHeight:'32px',paddingLeft:'10px'}}>忘记支付密码？</span>
                             </div>
                           </div>
                           {/*<div className="table_bottom_text">*/}
                             {/*<Button type="primary" style={{*/}
                               {/*backgroundColor:'#ff0000',*/}
                               {/*borderColor:'#ff0000',*/}
                               {/*width:'120px',*/}
                               {/*height:'40px',fontSize:'18px'*/}
                             {/*}}>确认支付</Button>*/}
                           {/*</div>*/}
                         </div>

                       </div>

                     </TreeNode>

                   </TreeNode>
                 </Tree>
                }

              </div>
              {/*积分*/}
              <div className="information_integral">
                <Tree
                  showLine
                  onSelect={this.onSelect}
                >
                  <TreeNode title="使用积分" key="0-0">
                    <TreeNode key="0-0-0">
                      <div className="table_information">
                        <div className="table_information_top"><Checkbox onChange={this.onChange} style={{fontSize:'14px',color:'#333'}}>使用积分</Checkbox></div>
                        <div className="table_information_bottom">
                          <div className="table_bottom_title">
                            <div style={{padding:'22px 0px 20px'}}>
                              <FormItem style={{width:'25%',display:'inline-block',marginBottom:'0px'}}>
                                {getFieldDecorator('information', {
                                  rules: [{ message: '请输入积分' }],
                                })(
                                  <Input type="text" placeholder="请输入积分数" />
                                )}
                              </FormItem>
                              <span style={{fontSize:'14px',color:'#333',lineHeight:'32px',paddingLeft:'10px'}}>至少输入1000积分的整数倍</span>
                            </div>
                          </div>
                          <div className="table_bottom_text">
                            <Button type="primary" style={{
                              backgroundColor:'#ff0000',
                              borderColor:'#ff0000',
                              width:'120px',
                              height:'40px',fontSize:'18px'
                            }}>确认使用</Button>
                          </div>
                        </div>

                      </div>

                    </TreeNode>

                  </TreeNode>
                </Tree>
              </div>
            </div>


          </div>
          {/*订单价格信息*/}
          <div className="order_content_price">
            <ul>
              <li>商品总金额：<span>￥{ goodsTotalPrice.toFixed(2) }</span></li>
              <li>运费：<span>￥{goodsTotalFreight.toFixed(2)}</span></li>
              {/*<li>优惠券：<span>￥1198.00</span></li>*/}
              {/*<li>促销金额：<span>￥928.00</span></li>*/}
              <li style={{paddingBottom:'0px'}}>余额：<span>￥0.00</span></li>
              <li>应付金额：<span style={{fontSize:'28px',color:'#f00'}}>￥{(parseFloat(goodsTotalPrice)+parseFloat(goodsTotalFreight)).toFixed(2)}</span></li>
            </ul>
            <div style={{textAlign:'right',paddingTop:'15px'}}>
              <Button type="primary" className="btn1" style={{
                backgroundColor:'#eeeeee',
                borderColor:'#dcdcdc',
                color:'#333',
                width:'120px',
                height:'40px',
                fontSize:'18px',
                fontFamily:'思源黑体'
              }}><Link to="/cart">返回购物车</Link></Button>

              {/*<Button*/}
                {/*type="primary"*/}
                {/*className="btn2"*/}
                {/*style={{*/}
                  {/*backgroundColor:'#ff7719',*/}
                  {/*borderColor:'#ff7719',*/}
                  {/*color:'#fff',*/}
                  {/*width:'120px',*/}
                  {/*height:'40px',fontSize:'18px',*/}
                  {/*marginLeft:'25px'*/}
                {/*}}*/}
                {/*htmlType="submit">*/}
                {/*提交订单*/}
              {/*</Button>*/}

              <Button type="primary" className="btn2" style={{
                backgroundColor:'#ff7719',
                borderColor:'#ff7719',
                color:'#fff',
                width:'120px',
                height:'40px',
                fontSize:'18px',
                fontFamily:'思源黑体',
                marginLeft:'25px'
              }} onClick={this.onSubmitOrder}>提交订单</Button>
            </div>
          </div>
          {/*发票弹窗*/}
          <Modal title="增值税发票信息"
                 visible={visible}
                // onOk={this.handleOk}
                 onCancel={()=>{ this.handleModel(false) }}
                 footer={null}
          >
            <div className={invoice}>
              <div className='invoice_section'>

              </div>
            </div>
          </Modal>

        </div>
      </div>
    );
  }
}

Order.propTypes = {
  form: PropTypes.object,
  Order: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({order})=>({order}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Order));
