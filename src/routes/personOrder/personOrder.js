import React, {Component} from 'react'
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import {connect} from 'dva';

import Img from '../../components/Img/Img';
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
 InputNumber
} from 'antd'
import {personorder} from './personOrder.less'


import {Link} from 'dva/router';

const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;


const Panel = Collapse.Panel;

const FormItem = Form.Item;
const {TextArea} = Input;


class PersonOrder extends Component {
 constructor(props) {
  super(props);
  this.state = {
   //控制地址弹出框
   visible: false,
   //控制发票弹出框
   visibleInvoice: false,
   //控制新旧发票对比框
   newOldInvoice: false,
   //显示更多地址
   showHide: true,
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
   // 发票信息初始值
   initInvoice: {
    invState: '',
    invTitle: '',
    invCode: '',
    invRegAddr: '',
    invRegBname: '',
    invRegBaccount: "",
    invRecMobphone: '',
    invId: ''
   },
   //准备新增/修改的发票信息
   newInvoiceInfo: {},
   // 控制发票弹出框显示什么字段
   invState: true,
   // 纳税人识别号提示语
   msg: "目前纳税人识别号位数仅为15位或18位，请确认是否输入正确",
   // 预存款使用金额
   predepositAmount: 0.00,
   // 使用的积分
   jifen: 0.00,
   // 是否选定积分
   useConsumePoints: false,
   clickPredeposit: false
  }
 }


 handleChange = (value) => {
  console.log(`selected ${value}`);
 }
 onSubmitOrder = () => {
  if (this.props.personOrder.addressList.length <= 0) {
   message.info("请先新增收货地址");
   return
  }
  if (this.props.personOrder.deliveryMethodData.length <= 0) {
   message.info("没有配送方式");
   return
  }
  if (this.props.personOrder.paymentList.length <= 0) {
   message.info("没有支付方式");
   return
  }
  if (!this.props.personOrder.sendValue.invoiceId) {
   message.info("没有发票信息");
   return
  }
  if (!this.state.useConsumePoints && this.props.form.getFieldValue('jifen')) {
   message.info("请确认使用积分");
   return
  }
  if (!this.state.clickPredeposit && this.props.form.getFieldValue('predepositAmount')) {
   message.info("请确认使用预存款");
   return
  }
  let msg = this.refs.msg.value
  this.props.dispatch({type: 'personOrder/saveOrderForSinopharmEFF', msg})
 }

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
  this.props.dispatch({type: 'personOrder/setDefaultAddressEFF', orderAddressId: info.addressId});
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
    this.props.dispatch({type: 'personOrder/saveAddressEFF', payload: value})
    this.setState({
     visible: false
    });
    this.props.form.resetFields()
    if (this.state.initAddress.orderAddressId == "") {
     this.setState({
      showHide: false
     });
    }
   }
  });

 }
 deleteAddress = (v) => {
  Modal.confirm({
   title: '您确定要删除吗?',
   content: '',
   onOk: () => {
    this.props.dispatch({type: 'personOrder/deleteAddressEFF', v,});
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

 showMoreAddress = () => {
  this.setState({
   showHide: !this.state.showHide,
  });
 }

 showModalInvoice = (type, isUpdate) => {
  let invoice = this.props.personOrder.orderInvoiceList[type]
  let info = isUpdate ? invoice : {};
  this.setState({
   initInvoice: {
    invState: type,
    invTitle: info.invTitle || "",
    invCode: info.invCode || "",
    invRegAddr: info.invRegAddr || "",
    invRegBname: info.invRegBname || "",
    invRegBaccount: info.invRegBaccount || "",
    invRecMobphone: info.invRecMobphone || "",
    invId: info.invId || "",
    invStatus: info.invStatus
   },
   visibleInvoice: true,
   invState: type == 1 ? true : false,
   msg: type == 1 ? '目前纳税人识别号/统一社会信用代码位数仅为15位或18位，请确认是否输入正确，如您的企业没有纳税人识别号或统一社会信用代码，请在该栏目填写数字“0”' : '目前纳税人识别号/统一社会信用代码位数仅为15位或18位，请确认是否输入正确。'
  })
 }

 saveInvoice = (e) => {
  this.props.form.validateFields(["invTitle", "invCode", "invRegAddr", "invRegBname", "invRegBaccount", "invRecMobphone"], (err, values) => {
   if (!err) {
    let value = {
     invState: this.state.initInvoice.invState,
     invTitle: values.invTitle,
     invCode: values.invCode,
     invRegAddr: values.invRegAddr,
     invRegBname: values.invRegBname,
     invRegBaccount: values.invRegBaccount,
     invRecMobphone: values.invRecMobphone,
     invId: this.state.initInvoice.invId
    }
    //如果发票正在审核或者是新增,直接提交新数据,否则弹出对比框
    if (this.state.initInvoice.invStatus == undefined) {
     this.props.dispatch({type: 'personOrder/saveOrderInvoiceEFF', payload: value})
     this.setState({
      visibleInvoice: false
     });
    } else {
     this.setState({
      visibleInvoice: false,
      newInvoiceInfo: value,
      newOldInvoice: true
     });
    }
   }
   this.props.form.resetFields()
  });
 }
 //关闭所有的发票弹窗
 closeInvoice = (e) => {
  this.setState({
   visibleInvoice: false,
   newOldInvoice: false,
  });
  this.props.form.resetFields()
 }
 //确认更新发票信息
 updateInvoice = () => {
  // console.log(this.state)
  this.props.dispatch({type: 'personOrder/saveOrderInvoiceEFF', payload: this.state.newInvoiceInfo})
  this.setState({
   newOldInvoice: false
  });
  this.props.form.resetFields()
 }

 //切换配送方式
 onChangeDeliveryMethod = (activeKey) => {
  let checkedDeliveryMethod = this.props.personOrder.deliveryMethodData[activeKey];
  this.props.dispatch({type: 'personOrder/changeDeliveryMethod', preload: checkedDeliveryMethod})
  this.props.dispatch({type: 'personOrder/getPaymentListEFF', val: checkedDeliveryMethod.dictionaryName})
  if(this.state.predepositAmount > 0 || this.state.jifen > 0){
   message.warning("请重新填写要使用的积分和预存款金额")
  }
  this.setState({
   predepositAmount: 0.00,
   jifen: 0.00,
   useConsumePoints: false,
   clickPredeposit: false
  })
 }
//切换支付方方式
 onChangePayMethod = (activeKey) => {
  let checkedPaymentList = this.props.personOrder.paymentList.filter(list => {
   return list.dictionaryValue == activeKey
  });
  this.props.dispatch({type: 'personOrder/changePayMethod', preload: checkedPaymentList})
 }
 //切换发票
 onChangeInvoice = (activeKey) => {
  // this.props.form.setFieldsValue()
  this.props.form.resetFields()
  let checkedInvoice = this.props.personOrder.orderInvoiceList[activeKey];
  this.props.dispatch({type: 'personOrder/changeInvoice', preload: checkedInvoice})
 }
 //选中地址
 checkAddress = (list) => {
  this.props.loading.global = true;
  if (!list.isChecked) {
   this.props.dispatch({type: 'personOrder/changeAddressEFF', address: list})
   if(this.state.predepositAmount > 0 || this.state.jifen > 0){
    message.warning("请重新填写要使用的积分和预存款金额")
   }
   this.setState({
    predepositAmount: 0.00,
    jifen: 0.00,
    useConsumePoints: false,
    clickPredeposit: false
   })

  }

 }

 //确定使用预存款使用金额
 clickPredeposit = (amount) => {
  const {subCartToOrderDate, shippingTotalFree} = this.props.personOrder
  let cun = parseFloat(subCartToOrderDate[0].memberApiBean.availablePredeposit);
  let zong = Number((Number(subCartToOrderDate[0].orderTotalAmount) + Number(shippingTotalFree) - parseFloat(this.state.jifen / 100)).toFixed(2));
  var Amount = /^([0-9]+)(.[0-9]+)?$/.test(this.props.form.getFieldValue('predepositAmount')) ? this.props.form.getFieldValue('predepositAmount') : '0.00'
  let predepositAmount = Number(parseFloat(Amount).toFixed(2));
  console.log(predepositAmount)
  console.log(predepositAmount > zong)
  if (predepositAmount > cun) {
   message.info('超出预存金额', 1.5)
   return false
  } else if (predepositAmount > zong) {
   message.info('超出商品总金额', 1.5)
   return false
  }
  this.setState({
   predepositAmount,
   clickPredeposit: true
  })
  this.props.dispatch({type: 'personOrder/clickPredeposit', preload: predepositAmount})
 }

 //使用积分
 useConsumePoints = () => {
  let oldJifen = this.state.jifen;
  const {subCartToOrderDate, shippingTotalFree} = this.props.personOrder
  //使用的积分
  let jifen = this.props.form.getFieldValue('jifen') || '0';
//  总积分
  let sum = subCartToOrderDate[0].memberApiBean.memberConsumePoints;
  let zong = Number(subCartToOrderDate[0].orderTotalAmount) + shippingTotalFree
  this.setState({
   jifen: parseInt(jifen),
   useConsumePoints: true
  })
  if (parseInt(jifen) / 100 + this.state.predepositAmount > zong) {
   let newPred = zong - (parseInt(jifen) / 100);
   this.setState({
    predepositAmount: newPred
   })
  }
  // if (jifen / 100 < this.state.predepositAmount) {
  //  let newPred = this.state.predepositAmount - ((jifen - oldJifen) / 100);
  //  this.setState({
  //   predepositAmount: newPred
  //  })
  //  this.props.dispatch({type: 'personOrder/clickPredeposit', preload: newPred})
  // }else if(jifen / 100 == this.state.predepositAmount){
  //  this.setState({
  //   predepositAmount: 0
  //  })
  //  this.props.dispatch({type: 'personOrder/clickPredeposit', preload: 0})
  // }
  let v = {
   memberConsumePoints: sum.toString(),
   pointAllpoint: parseInt(jifen).toString()
  }
  this.props.dispatch({type: 'personOrder/useConsumePoints', v})


 }

 // componentWillReceiveProps(nextState){
 //  console.log(nextState)
 // }


 render() {
  const formItemLayout = {
   labelCol: {span: 6},
   wrapperCol: {span: 14},
  };
  const {getFieldDecorator} = this.props.form;
  const {subCartToOrderDate, areaDataList, addressList, orderInvoiceList, deliveryMethodData, paymentList, shippingTotalFree, dictionaryId, init} = this.props.personOrder
  let newAddressList = this.state.showHide == true ? addressList.slice(0, 1) : addressList;
  let {visible, visibleInvoice, showHide, newOldInvoice, invState, initInvoice, newInvoiceInfo, msg} = this.state;
  let yunfei = dictionaryId == "10300003" ? (Number(shippingTotalFree) - 120).toFixed(2) : Number(shippingTotalFree).toFixed(2);
  let invDefaultActiveKey = !!orderInvoiceList["0"] && !!orderInvoiceList["0"].invId ? "0" : (!!orderInvoiceList["1"] && !!orderInvoiceList["1"].invId ? "1" : !!orderInvoiceList["2"] && !!orderInvoiceList["2"].invId ? "2" : (!!orderInvoiceList["0"] ? "0" : !!orderInvoiceList["1"] ? "1" : "2"));
  console.log(init)
  return (
   <div>
    <Search></Search>
    <Navigation preson={true}>
     <div className={personorder}>
      <div className="my_account_dynamic_Topimg"></div>
      <Breadcrumb separator=">" className='security_nav_bar'>
       <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
       <Breadcrumb.Item>订单结算</Breadcrumb.Item>
      </Breadcrumb>

      <div className="order_content">
       <div className='orderer'>
        <div className="order_title">订货人信息：</div>
        <div className="orderer_info">
         <div>登录名称： {subCartToOrderDate.length > 0 && subCartToOrderDate[0].memberApiBean.memberName}</div>
         <div>订货人姓名： {subCartToOrderDate.length > 0 && subCartToOrderDate[0].memberApiBean.memberTruename}</div>
         <div>绑定手机： {subCartToOrderDate.length > 0 && subCartToOrderDate[0].memberApiBean.memberMobile}</div>
        </div>
        <p style={{paddingTop: '10px', color: 'red'}}>订货人信息（如信息不正确，请至“我的账户”进行修改）</p>
       </div>
       <div className='consignee information-sty'>
        <div className="order_title">
         <span style={{float: 'left'}}>收货人信息：</span>
         <Button style={{float: 'right', color: '#fff'}} type="primary" onClick={this.showAddressModal}>新增收货地址</Button>
        </div>
        <div className="consignee_info">
         <div>
          {/*<Table  pagination={false} dataSource={dataSource} columns={columns} />*/}
          {newAddressList.length > 0 ? newAddressList.map((list, index) => {
           let addressprovince = areaDataList.filter(address => {
            return list.provinceId == address.value
           });
           let addresscity = addressprovince[0].children.filter(address => {
            return list.cityId == address.value
           });
           let addressarea = addresscity[0].children.filter(address => {
            return list.areaId == address.value
           });
           let addressfouthArea = addressarea[0].children.length > 0 && addressarea[0].children.filter(address => {
            return list.fouthAreaId == address.value
           });
           let addressfouthAreaInfo = addressfouthArea[0] ? addressfouthArea[0].label : ""
           return (<Row style={{padding: '10px 0', lineHeight: '30px'}} key={index}>
            <Col span={3} className={list.isChecked ? "selected" : ""} style={{textAlign: 'center', cursor: 'pointer'}}
                 onClick={() => this.checkAddress(list)}>
             <span>{list.trueName}</span>
            </Col>
            <Col span={7} style={{textAlign: 'left'}}>
             <span>{addressprovince[0].label}&nbsp;&nbsp;&nbsp;{addresscity[0].label}&nbsp;&nbsp;&nbsp;{addressarea[0].label}&nbsp;&nbsp;&nbsp;{addressfouthAreaInfo}&nbsp;&nbsp;&nbsp;{list.address}</span>
            </Col>
            <Col span={4}>
             <span>{list.mobPhone}</span>
            </Col>
            <Col span={2}>
             <span>{list.telPhone}</span>
            </Col>
            <Col span={2}>
             <span>{list.zipCode}</span>
            </Col>
            <Col span={6}>
            <span>
             {list.isDefault == 1 ? <Button type="primary">默认地址</Button> : <Button onClick={() => {
              this.setDefaultAdderss(list)
             }}>设为默认</Button>}
             <Button style={{margin: "0 10px"}} onClick={() => this.showAddressModal(list)}>编辑</Button>
                <Button onClick={() => this.deleteAddress(list)}>删除</Button>
            </span>
            </Col>
           </Row>)
          }) : <p style={{fontSize: '14px', textAlign: 'center'}}>请先新增收货地址</p>}
          {addressList.length > 1 ?
           <p style={{cursor: 'pointer', marginTop: '10px', fontSize: '14px', display: 'inline-block'}}
              onClick={this.showMoreAddress}>{showHide == true ? '更多地址 >>' : '收起地址 >>'}</p> : ""}
          <p style={{paddingTop: '10px', color: 'red'}}>
           *若您的“发票邮寄信息”与上述“收货信息”不相符，请在订单末尾备注中写明相关发票邮寄信息（发票收件人、发票邮寄地址、发票邮寄邮编）</p>
         </div>

        </div>
       </div>
       <div className='distribution information-sty'>
        <div className="order_title">配送信息：<Link target="_blank"
                                                to="/customservice?parentId=6&articleId=71462740868b4f078a01fcd562000f4a">点击查看运费的收费标准</Link>
        </div>
        {deliveryMethodData.length > 0 ?
         <Tabs defaultActiveKey="0" className={deliveryMethodData.length == 1 ? "onlyOne" : ""}
               onChange={(activeKey) => this.onChangeDeliveryMethod(activeKey)}>
          {deliveryMethodData.map((list, index) => {
           return (
            <TabPane tab={list.dictionaryName} key={index}>
             {list.dictionaryValue == 1 ?
              <div>
               <p>根据国家规定，市中心地段危险品车辆不允许停留，请保持手机畅通，接到送货师傅电话通知后及时取货</p>
               <img src={require("../../assets/img/area.jpg")} style={{width: '410px'}}/>
              </div>
              : list.dictionaryValue == 2 ?
               "本配送方式只支持购买非危险品和非玻璃制品耗材"
               : list.dictionaryValue == 3 ?
                "本配送方式需要您自行到货运公司指定提货点进行提货"
                : "本配送方式需要在公路托运自提运费的基础上加收送货上门费（120元），部分地区送货上门费以客服线下通知的实际费用为准"
             }

            </TabPane>
           )
          })}

         </Tabs> : <p>没有获取到配送方式</p>}

       </div>
       <div className='pay information-sty'>
        <div className="order_title">支付信息：</div>
        {paymentList.length > 0 ?
         <Tabs defaultActiveKey="1" key={init} onChange={(activeKey) => {
          this.onChangePayMethod(activeKey)
         }} className={deliveryMethodData.length == 1 ? "onlyOne" : ""}>
          {paymentList.map((list, index) => {
           if (list.dictionaryName == "在线支付") {
            return (
             <TabPane tab="在线支付" key="1">
              <p> 请在订单提交后点击“付款”按钮进行在线支付</p>
              <p style={{color: 'red'}}>订单15天内未完成支付将自动关闭</p>
             </TabPane>
            )
           } else if (list.dictionaryName == "银行汇款") {
            return (
             <TabPane tab="银行汇款" key="2">
              <p>中国试剂网汇款账户：</p>
              <Row>
               <Col span={12}>开户名：国药集团化学试剂有限公司</Col>
               <Col span={12}>开户名：国药集团化学试剂有限公司</Col>
              </Row>
              <Row>
               <Col span={12}>开户银行：农行上海市虹口支行营业部</Col>
               <Col span={12}>开户银行：交通银行上海分行虹口支行</Col>
              </Row>
              <Row>
               <Col span={12}>账号：03346100040031317</Col>
               <Col span={12}>账号：03346100040031317</Col>
              </Row>
              <p style={{color: 'red'}}>注：请在备注栏中写明订单号或中国试剂网，并在汇款之后将汇款凭证传真给客服人员，以便我们查收。</p>
              <p style={{color: 'red'}}>请在下单后按订单总金额汇款，7天后仍未收到货款，客服人员将电话予以确认，15天仍未收到货款，订单将自动关闭</p>

             </TabPane>
            )
           } else {
            return (
             <TabPane tab="货到付款" key="3">
              <p style={{color: 'red'}}>请提前准备好货款，并非所有地区均配置POS机，如无法刷卡请准备好现金</p>
             </TabPane>
            )
           }
          })}
         </Tabs> : <p>没有获取到支付方式</p>}

       </div>
       <div className='invoice information-sty' key={invDefaultActiveKey}>
        <div className="order_title">发票信息：</div>
        <Tabs onChange={(activeKey) => {
         this.onChangeInvoice(activeKey)
        }}
              defaultActiveKey={invDefaultActiveKey}>
         {orderInvoiceList["0"] ?
          <TabPane tab="个人发票" key="0" className={deliveryMethodData.length == 1 ? "onlyOne" : ""}>
           <p>开具的发票类型默认为增值税普通发票，机构名称默认为“个人”</p>
          </TabPane> : ""
         }
         {
          orderInvoiceList["1"] && orderInvoiceList["1"].invId ?
           <TabPane tab="增值税普通发票" key="1">
            <p
             className='waitCheck'>{orderInvoiceList["1"].invStatus}</p>
            <div style={{margin: '10px 0'}}>
             <p style={{margin: '10px 0'}}>机构名称:{orderInvoiceList["1"].invTitle}</p>
             <p style={{margin: '10px 0'}}>纳税人识别号/统一社会信用代码:{orderInvoiceList["1"].invCode}</p>
             <p style={{color: 'red', margin: '10px 0'}}>该普票信息需要审核，请确认是否已上传相关资质</p>
            </div>
            <p className='updateInvo' onClick={() => this.showModalInvoice(1, true)}>更新发票信息</p>
           </TabPane> :
           <TabPane tab="增值税普通发票" key="1">
            <p style={{color: 'red', cursor: 'pointer', marginBottom: '10px'}}
               onClick={() => this.showModalInvoice(1, false)}>
             新增增值税普通发票信息</p>
           </TabPane>
         }
         {
          orderInvoiceList["2"] && orderInvoiceList["2"].invId ?
           <TabPane tab="增值税专用发票" key="2">
            <p
             className='waitCheck'>{orderInvoiceList["2"].invStatus}</p>
            <div style={{margin: '10px 0'}}>
             <Row>
              <Col span={2}>机构名称:</Col>
              <Col span={6}>{orderInvoiceList["2"].invTitle}</Col>
              <Col span={5}>开户银行:</Col>
              <Col span={8}>{orderInvoiceList["2"].invRegBname}</Col>
             </Row>
             <Row>
              <Col span={2}>开票地址:</Col>
              <Col span={6}>{orderInvoiceList["2"].invRegAddr}</Col>
              <Col span={5}>银行账号:</Col>
              <Col span={8}>{orderInvoiceList["2"].invRegBaccount}</Col>
             </Row>
             <Row>
              <Col span={2}>开票电话:</Col>
              <Col span={6}>{orderInvoiceList["2"].invRecMobphone}</Col>
              <Col span={5}>纳税人识别号/统一社会信用代码:</Col>
              <Col span={8}>{orderInvoiceList["2"].invCode}</Col>
             </Row>
             <p style={{color: 'red', margin: '10px 0'}}>该普票信息需要审核，请确认是否已上传相关资质</p>
            </div>
            <p className='updateInvo' onClick={() => this.showModalInvoice(2, true)}>更新发票信息</p>
           </TabPane> :
           <TabPane tab="增值税专用发票" key="2">
            <p style={{color: 'red', cursor: 'pointer', marginBottom: '10px'}}
               onClick={() => this.showModalInvoice(2, false)}>
             新增增值税专用发票信息</p>
           </TabPane>
         }
        </Tabs>
       </div>
       <div className='detailed_list'>
        <div className="order_title">购物清单：</div>
        <Row className="orderList_content_head">
         <Col span={10}>基本信息</Col>
         <Col span={5} style={{textAlign: 'left'}}>商品属性</Col>
         <Col span={3}>成交单价</Col>
         <Col span={3}>数量</Col>
         <Col span={3}>小计</Col>
        </Row>
        {subCartToOrderDate.length > 0 && subCartToOrderDate[0].cartGroupVoList && subCartToOrderDate[0].cartGroupVoList.map((shop, index) => {
         return shop.cartVoList.map((act, ind) => {
          if (act.groupType == '10') {
           return (
            <div key={ind}>
             {/*<div className='act_head'>普通商品</div>*/}
             {
              act.cartList.map((item, index) => {
               return (
                <div key={index}>
                 {item.isReagent == 1 ?
                  <table className="border_bottom" style={{width: '100%'}}>
                   <tbody>
                   <tr>
                    <td style={{width: '40%'}}>
                     <div className="goods_div1">
                      <Img style={{width: '105px', height: '105px', margin: '2px 16px'}} src={item.goodsImages}/>
                      <div style={{margin: '18px 15px', textAlign: 'left'}}>
                       <p style={{
                        fontSize: '16px',
                        color: '#333',
                        lineHeight: '22px',
                        marginBottom: '16px'
                       }}>{item.goodsName}</p>
                       {(item.brandName && item.goodsSerial) ?
                        <p>品牌/原厂货号：<span>{item.brandName}/{item.goodsSerial}</span></p> :
                        (item.brandName) ? <p>品牌：<span>{item.brandName}</span></p> :
                         (item.goodsSerial) ? <p>原厂货号：<span>{item.goodsSerial}</span></p> : null
                       }
                       {(item.goodsErpCode) ? <p>国药编码：{item.goodsErpCode}</p> : null}
                       {item.specName ? <p>规格：{item.specName}</p> : null}
                       {item.goodsSpec ? <p>包装：{item.goodsSpec}</p> : null}
                       {(item.storageCondition && item.shippingCondition) ?
                        <p>储存/运输条件：<span>{item.storageCondition}/{item.shippingCondition}</span></p> :
                        (item.storageCondition) ? <p>储存条件：<span>{item.storageCondition}</span></p> :
                         (item.shippingCondition) ? <p>运输条件：<span>{item.shippingCondition}</span></p> : null
                       }
                      </div>
                     </div>
                    </td>
                    <td style={{width: '20%'}}>
                     <div style={{padding: '0 10px', textAlign: 'left'}}>
                      {item.casNo ? <p>CAS号：{item.casNo}</p> : null}
                      {item.dangerousNature ? <p>危险性质：{item.dangerousNature}</p> : null}
                      {item.controlInfo ? <p>管制信息：<span style={{color: 'red'}}>{item.controlInfo}</span></p> : null}
                     </div>
                    </td>
                    <td style={{width: '17%', textAlign: 'center'}}>
                     <p>{Number(item.newGoodsPrice).toFixed(2)}</p>
                    </td>
                    <td style={{width: '10%', textAlign: 'center'}}>
                     <p>{item.goodsNum}</p>
                    </td>
                    <td style={{width: '13%', textAlign: 'center', color: 'red'}}>
                     <p>{Number(item.goodsNum * item.newGoodsPrice).toFixed(2)}</p>
                    </td>
                   </tr>
                   </tbody>
                  </table>
                  :
                  <table className="border_bottom" style={{width: '100%'}}>
                   <tbody>
                   <tr>
                    <td style={{width: '40%'}}>
                     <div className="goods_div1">
                      <Img style={{width: '105px', height: '105px', margin: '2px 16px'}} src={item.goodsImages}/>
                      <div style={{margin: '18px 15px', textAlign: 'left'}}>
                       <p style={{
                        fontSize: '16px',
                        color: '#333',
                        lineHeight: '22px',
                        marginBottom: '16px'
                       }}>{item.goodsName}</p>
                       {(item.brandName && item.goodsSerial) ?
                        <p>品牌/原厂货号：<span>{item.brandName}/{item.goodsSerial}</span></p> :
                        (item.brandName) ? <p>品牌：<span>{item.brandName}</span></p> :
                         (item.goodsSerial) ? <p>原厂货号：<span>{item.goodsSerial}</span></p> : null
                       }
                       {item.goodsErpCode == 'null' || item.goodsErpCode == undefined || item.goodsErpCode == '' ? '' :
                        <p>国药编码：{item.goodsErpCode}</p>}
                       {item.specName == '' || item.specName == 'null' || item.specName == undefined ? '' :
                        <p>规格：{item.specName}</p>}
                       {item.goodsSpec == 'null' || item.goodsSpec == '' || item.goodsSpec == undefined ? '' :
                        <p>包装：{item.goodsSpec}</p>}
                       {item.storageCondition == 'null' || item.storageCondition == '' || item.storageCondition == undefined || item.shippingCondition == 'null' || item.shippingCondition == '' || item.shippingCondition == undefined ? '' :
                        <p>储存/运输条件：{item.storageCondition}/{item.shippingCondition}</p>}
                      </div>
                     </div>
                    </td>
                    <td style={{width: '20%'}}>
                     <div style={{padding: '0 10px', textAlign: 'left'}}>
                      {item.goodsDescription == 'null' || item.goodsDescription == '' || item.goodsDescription == undefined ? '' :
                       <span>描述:<p style={{
                        width: '190px', height: '103px', overflow: 'hidden', textOverflow: 'ellipsis',
                        whiteSpace: 'wrap'
                       }}
                                   dangerouslySetInnerHTML={{__html: item.goodsDescription.length > 80 ? item.goodsDescription.substr(0, 80) + "..." : item.goodsDescription}}></p></span>}
                     </div>
                    </td>
                    <td style={{width: '17%', textAlign: 'center'}}>
                     {item.goodsPrice == '' || item.goodsPrice == 'null' || item.newGoodsPrice == undefined ? '' :
                      <p>{Number(item.newGoodsPrice).toFixed(2)}</p>}
                    </td>
                    <td style={{width: '10%', textAlign: 'center'}}>
                     {item.goodsNum == '' || item.goodsNum == 'null' || item.goodsNum == undefined ? '' :
                      <p>{item.goodsNum}</p>}
                    </td>
                    <td style={{width: '13%', textAlign: 'center', color: 'red'}}>
                     {item.goodsNum == '' || item.goodsNum == 'null' || item.goodsNum == undefined || item.newGoodsPrice == '' || item.newGoodsPrice == 'null' || item.newGoodsPrice == undefined ? '' :
                      <p>{Number(item.goodsNum * item.newGoodsPrice).toFixed(2)}</p>}
                    </td>
                   </tr>
                   </tbody>
                  </table>
                 }
                </div>
               )
              })
             }
            </div>
           )
          } else if (act.groupType == '20' && act.activity.activityType == '30') {
           return (
            <div key={ind}>
             {/*<div className='act_head'>已满足满额赠礼品活动：<span>{act.activityRuleList[0].description}</span></div>*/}
             {/*{*/}
             {/*act.cartList.map((item,index)=>{*/}
             {/*return (*/}
             {/*<div key={index}>*/}
             {/*{item.isReagent == 1 ?*/}
             {/*<table className="border_bottom" style={{width: '100%'}}>*/}
             {/*<tbody>*/}
             {/*<tr>*/}
             {/*<td style={{width: '40%'}}>*/}
             {/*<div className="goods_div1">*/}
             {/*<Img style={{width: '105px', height: '105px', margin: '2px 16px'}} src={item.goodsImages}/>*/}
             {/*<div style={{margin: '18px 15px', textAlign: 'left'}}>*/}
             {/*<p style={{*/}
             {/*fontSize: '16px',*/}
             {/*color: '#333',*/}
             {/*lineHeight: '22px',*/}
             {/*marginBottom: '16px'*/}
             {/*}}>{item.goodsName}</p>*/}
             {/*<p>品牌/原厂货号：{item.brandName}/{item.goodsSerial}</p>*/}
             {/*<p>国药编码：{item.goodsErpCode}</p>*/}
             {/*<p>规格：{item.specName}</p>*/}
             {/*<p>包装：{item.goodsSpec}</p>*/}
             {/*<p>储存/运输条件：{item.storageCondition}/{item.shippingCondition}</p>*/}
             {/*</div>*/}
             {/*</div>*/}
             {/*</td>*/}
             {/*<td style={{width: '20%'}}>*/}
             {/*<div style={{padding: '0 10px', textAlign: 'left'}}>*/}
             {/*<p>CAS号：{item.casNo}</p>*/}
             {/*<p>危险性质：{item.dangerousNature}</p>*/}
             {/*<p>管制信息：<span style={{color: 'red'}}>{item.controlInfo}</span></p>*/}
             {/*</div>*/}
             {/*</td>*/}
             {/*<td style={{width: '17%', textAlign: 'center'}}>*/}
             {/*<p>{item.newGoodsPrice.toFixed(2)}</p>*/}
             {/*</td>*/}
             {/*<td style={{width: '10%', textAlign: 'center'}}>*/}
             {/*<p>{item.goodsNum}</p>*/}
             {/*</td>*/}
             {/*<td style={{width: '13%', textAlign: 'center', color: 'red'}}>*/}
             {/*<p>{Number(item.goodsNum * item.newGoodsPrice).toFixed(2)}</p>*/}
             {/*</td>*/}
             {/*</tr>*/}
             {/*</tbody>*/}
             {/*</table>*/}
             {/*:*/}
             {/*<table className="border_bottom" style={{width: '100%'}}>*/}
             {/*<tbody>*/}
             {/*<tr>*/}
             {/*<td style={{width: '40%'}}>*/}
             {/*<div className="goods_div1">*/}
             {/*<Img style={{width: '105px', height: '105px', margin: '2px 16px'}} src={item.goodsImages}/>*/}
             {/*<div style={{margin: '18px 15px', textAlign: 'left'}}>*/}
             {/*<p style={{*/}
             {/*fontSize: '16px',*/}
             {/*color: '#333',*/}
             {/*lineHeight: '22px',*/}
             {/*marginBottom: '16px'*/}
             {/*}}>{item.goodsName}</p>*/}
             {/*<p>品牌/原厂货号：{item.brandName}/{item.goodsSerial}</p>*/}
             {/*{item.goodsErpCode == 'null' || item.goodsErpCode == undefined || item.goodsErpCode == '' ? '' :*/}
             {/*<p>国药编码：{item.goodsErpCode}</p>}*/}
             {/*{item.specName == '' || item.specName == 'null' || item.specName == undefined ? '' :*/}
             {/*<p>规格：{item.specName}</p>}*/}
             {/*{item.goodsSpec == 'null' || item.goodsSpec == '' || item.goodsSpec == undefined ? '' :*/}
             {/*<p>包装：{item.goodsSpec}</p>}*/}
             {/*{item.storageCondition == 'null' || item.storageCondition == '' || item.storageCondition == undefined || item.shippingCondition == 'null' || item.shippingCondition == '' || item.shippingCondition == undefined ? '' :*/}
             {/*<p>储存/运输条件：{item.storageCondition}/{item.shippingCondition}</p>}*/}
             {/*</div>*/}
             {/*</div>*/}
             {/*</td>*/}
             {/*<td style={{width: '20%'}}>*/}
             {/*<div style={{padding: '0 10px', textAlign: 'left'}}>*/}
             {/*{item.goodsDescription == 'null' || item.goodsDescription == '' || item.goodsDescription == undefined ? '' :*/}
             {/*<p>描述:{item.goodsDescription}</p>}*/}
             {/*</div>*/}
             {/*</td>*/}
             {/*<td style={{width: '17%', textAlign: 'center'}}>*/}
             {/*{item.newGoodsPrice == '' || item.newGoodsPrice == 'null' || item.newGoodsPrice == undefined ? '' :*/}
             {/*<p>{item.newGoodsPrice.toFixes(2)}</p>}*/}
             {/*</td>*/}
             {/*<td style={{width: '10%', textAlign: 'center'}}>*/}
             {/*{item.goodsNum == '' || item.goodsNum == 'null' || item.goodsNum == undefined ? '' :*/}
             {/*<p>{item.goodsNum}</p>}*/}
             {/*</td>*/}
             {/*<td style={{width: '13%', textAlign: 'center', color: 'red'}}>*/}
             {/*{item.goodsNum == '' || item.goodsNum == 'null' || item.goodsNum == undefined || item.newGoodsPrice == '' || item.newGoodsPrice == 'null' || item.newGoodsPrice == undefined ? '' :*/}
             {/*<p>{Number(item.goodsNum * item.newGoodsPrice).toFixed(2)}</p>}*/}
             {/*</td>*/}
             {/*</tr>*/}
             {/*</tbody>*/}
             {/*</table>*/}
             {/*}*/}
             {/*</div>*/}
             {/*)*/}
             {/*})*/}
             {/*}*/}
            </div>
           )
          } else if (act.groupType == '30') {
           return (
            <div key={ind}>
             <div className='act_head'>普通商品</div>
             {
              act.cartList.map((item, index) => {
               return (
                <div key={index}>
                 {item.isReagent == 1 ?
                  <table className="border_bottom" style={{width: '100%'}}>
                   <tbody>
                   <tr>
                    <td style={{width: '40%'}}>
                     <div className="goods_div1">
                      <Img style={{width: '105px', height: '105px', margin: '2px 16px'}} src={item.goodsImages}/>
                      <div style={{margin: '18px 15px', textAlign: 'left'}}>
                       <p style={{
                        fontSize: '16px',
                        color: '#333',
                        lineHeight: '22px',
                        marginBottom: '16px'
                       }}>{item.goodsName}</p>
                       {(item.brandName && item.goodsSerial) ?
                        <p>品牌/原厂货号：<span>{item.brandName}/{item.goodsSerial}</span></p> :
                        (item.brandName) ? <p>品牌：<span>{item.brandName}</span></p> :
                         (item.goodsSerial) ? <p>原厂货号：<span>{item.goodsSerial}</span></p> : null
                       }
                       {item.goodsErpCode ? <p>国药编码：{item.goodsErpCode}</p> : ""}
                       {item.goodsErpCode ? <p>国药编码：{item.goodsErpCode}</p> : ""}
                       {item.specName ? <p>规格：{item.specName}</p> : ""}
                       {item.goodsSpec ? <p>包装：{item.goodsSpec}</p> : ""}
                       {item.storageCondition || item.shippingCondition ?
                        <p>储存/运输条件：{item.storageCondition}/{item.shippingCondition}</p> : ""}
                      </div>
                     </div>
                    </td>
                    <td style={{width: '20%'}}>
                     <div style={{padding: '0 10px', textAlign: 'left'}}>
                      {item.casNo ? <p>CAS号：{item.casNo}</p> : ""}
                      {item.dangerousNature ? <p>危险性质：{item.dangerousNature}</p> : ""}
                      {item.controlInfo ? <p>管制信息：<span style={{color: 'red'}}>{item.controlInfo}</span></p> : ""}
                     </div>
                    </td>
                    <td style={{width: '17%', textAlign: 'center'}}>
                     <p>{Number(item.newGoodsPrice).toFixed(2)}</p>
                    </td>
                    <td style={{width: '10%', textAlign: 'center'}}>
                     <p>{item.goodsNum}</p>
                    </td>
                    <td style={{width: '13%', textAlign: 'center', color: 'red'}}>
                     <p>{Number(item.goodsNum * item.newGoodsPrice).toFixed(2)}</p>
                    </td>
                   </tr>
                   </tbody>
                  </table>
                  :
                  <table className="border_bottom" style={{width: '100%'}}>
                   <tbody>
                   <tr>
                    <td style={{width: '40%'}}>
                     <div className="goods_div1">
                      <Img style={{width: '105px', height: '105px', margin: '2px 16px'}} src={item.goodsImages}/>
                      <div style={{margin: '18px 15px', textAlign: 'left'}}>
                       <p style={{
                        fontSize: '16px',
                        color: '#333',
                        lineHeight: '22px',
                        marginBottom: '16px'
                       }}>{item.goodsName}</p>
                       <p>品牌/原厂货号：{item.brandName}/{item.goodsSerial}</p>
                       {item.goodsErpCode == 'null' || item.goodsErpCode == undefined || item.goodsErpCode == '' ? '' :
                        <p>国药编码：{item.goodsErpCode}</p>}
                       {item.specName == '' || item.specName == 'null' || item.specName == undefined ? '' :
                        <p>规格：{item.specName}</p>}
                       {item.goodsSpec == 'null' || item.goodsSpec == '' || item.goodsSpec == undefined ? '' :
                        <p>包装：{item.goodsSpec}</p>}
                       {item.storageCondition == 'null' || item.storageCondition == '' || item.storageCondition == undefined || item.shippingCondition == 'null' || item.shippingCondition == '' || item.shippingCondition == undefined ? '' :
                        <p>储存/运输条件：{item.storageCondition}/{item.shippingCondition}</p>}
                      </div>
                     </div>
                    </td>
                    <td style={{width: '20%'}}>
                     <div style={{padding: '0 10px', textAlign: 'left'}}>
                      {item.goodsDescription == 'null' || item.goodsDescription == '' || item.goodsDescription == undefined ? '' :
                       <span>描述:<p style={{
                        width: '190px', height: '103px', overflow: 'hidden', textOverflow: 'ellipsis',
                        whiteSpace: 'wrap'
                       }}
                                   dangerouslySetInnerHTML={{__html: item.goodsDescription.length > 80 ? item.goodsDescription.substr(0, 80) + "..." : item.goodsDescription}}></p></span>}
                     </div>
                    </td>
                    <td style={{width: '17%', textAlign: 'center'}}>
                     {item.newGoodsPrice == '' || item.newGoodsPrice == 'null' || item.newGoodsPrice == undefined ? '' :
                      <p>{Number(item.newGoodsPrice).toFixed(2)}</p>}
                    </td>
                    <td style={{width: '10%', textAlign: 'center'}}>
                     {item.goodsNum == '' || item.goodsNum == 'null' || item.goodsNum == undefined ? '' :
                      <p>{item.goodsNum}</p>}
                    </td>
                    <td style={{width: '13%', textAlign: 'center', color: 'red'}}>
                     {item.goodsNum == '' || item.goodsNum == 'null' || item.goodsNum == undefined || item.newGoodsPrice == '' || item.newGoodsPrice == 'null' || item.newGoodsPrice == undefined ? '' :
                      <p>{Number(item.goodsNum * item.newGoodsPrice).toFixed(2)}</p>}
                    </td>
                   </tr>
                   </tbody>
                  </table>
                 }
                </div>
               )
              })
             }
            </div>
           )
          }
         })
        })
        }
        <div className="leave-message">备注：
         <input type="text" maxLength={60} ref="msg" placeholder='若您对订单、发票、商品有个性化需求，请在此写明(60字以内)'/></div>
       </div>
       <Form>
        <div className='promotion information-sty' style={{display: 'none'}}>
         <div className="order_title">促销信息：</div>
         <div className="info">
          <span>整单满包邮免运费/赠礼品</span>
         </div>
        </div>
        {/*<div className='quota-gift'>*/}
        {/*<div className="order_title">满额赠礼：</div>*/}
        {/*<div className="gift-sel">*/}
        {/*<Select defaultValue="请选择" style={{width: 256}} onChange={this.handleChange}>*/}
        {/*<Option value="1">1</Option>*/}
        {/*<Option value="2">2</Option>*/}
        {/*<Option value="3">3</Option>*/}
        {/*</Select>*/}
        {/*<Button type="primary">提交</Button>*/}
        {/*</div>*/}
        {/*</div>*/}
        <div className='employ_list'>
         <Tree showLine>
          <TreeNode title="使用积分" key="0-1">
           <TreeNode key="0-1-0">
            <div className="table_information">
             <div className="table_top">
              使用积分 （账户当前总积分：{subCartToOrderDate.length > 0 && subCartToOrderDate[0].memberApiBean.memberConsumePoints}分，本次最高可抵扣积分： {subCartToOrderDate.length > 0 && shippingTotalFree * 100 > subCartToOrderDate[0].memberApiBean.memberConsumePoints ? subCartToOrderDate[0].memberApiBean.memberConsumePoints : shippingTotalFree * 100}分）
             </div>
             <div className="table_down">
              <div>
               {/*<FormItem*/}
               {/*{...formItemLayout}*/}
               {/*label="InputNumber"*/}
               {/*>*/}
               {/*{getFieldDecorator('input-number', { initialValue: 3 })(*/}
               {/*<InputNumber min={1} max={10} />*/}
               {/*)}*/}
               {/*<span className="ant-form-text"> machines</span>*/}
               {/*</FormItem>*/}

               {
                this.state.useConsumePoints ?
                 <div>
                  <p>本次订单使用{this.state.jifen}积分，合计{this.state.jifen / 100}元人民币</p>
                 </div> :
                 <FormItem
                  {...formItemLayout}
                  label="请输入需要使用的积分的数额">
                  {getFieldDecorator('jifen', {
                   rules: [{type: "number", message: "请输入整数"}],
                   initialValue: this.state.jifen ? this.state.jifen : ''
                  })(
                   <InputNumber min={0}
                                max={subCartToOrderDate.length > 0 && shippingTotalFree * 100 > subCartToOrderDate[0].memberApiBean.memberConsumePoints ? Number(subCartToOrderDate[0].memberApiBean.memberConsumePoints) : shippingTotalFree * 100}/>
                  )}
                 </FormItem>
               }
              </div>
              {
               this.state.useConsumePoints ?
                <div className='btn' onClick={() => this.setState({useConsumePoints: false})}>修改使用积分</div> :
                <div className='btn' onClick={this.useConsumePoints}>确认使用</div>
              }
             </div>
            </div>
           </TreeNode>
          </TreeNode>
          <TreeNode title="使用预存款" key="0-0">
           <TreeNode key="0-0-0">
            <div className="table_information">
             <div className="table_top">
              使用预存款
              （账户当前余额：{subCartToOrderDate.length > 0 && Number(subCartToOrderDate[0].memberApiBean.availablePredeposit).toFixed(2)}元）
             </div>
             <div className="table_down">
              <div>
               {
                this.state.clickPredeposit ?
                 <div>本次订单使用预存款人民币{this.state.predepositAmount}元</div> :
                 <FormItem
                  {...formItemLayout}
                  label="请输入需要使用的预存款的金额">
                  {getFieldDecorator('predepositAmount', {
                   rules: [{pattern: /^([0-9]+)(.[0-9]+)?$/, message: "请输入数字"}],
                   initialValue: this.state.predepositAmount ? this.state.predepositAmount : ''
                  })(
                   <Input min={0} style={{width: '80px'}}/>
                  )}
                 </FormItem>
               }
              </div>
              {
               this.state.clickPredeposit ?
                <div onClick={() => this.setState({clickPredeposit: false})} className='btn'>修改使用预存款</div> :
                <div onClick={this.clickPredeposit} className='btn'>确认使用</div>
              }
             </div>
            </div>
           </TreeNode>
          </TreeNode>

         </Tree>
        </div>
       </Form>
      </div>
      <div className="order_content_price">
       <ul>
        <li>
         商品总金额：<span>￥{subCartToOrderDate.length > 0 && Number(subCartToOrderDate[0].orderTotalAmount).toFixed(2)}</span>
        </li>
        <li>运费：<span>￥{yunfei}</span></li>
        {dictionaryId == '10300003' ? <li>送货上门费：<span>￥120.00</span></li> : null}
        <li>积分抵扣：<span>￥{(this.state.jifen / 100).toFixed(2)}</span></li>
        <li>预存款抵扣：<span>￥{Number(this.state.predepositAmount).toFixed(2)}</span></li>
        <li>应付金额：<span style={{
         fontSize: '28px',
         color: '#f00'
        }}>￥{subCartToOrderDate.length > 0 && Math.abs((Number(subCartToOrderDate[0].orderTotalAmount) + shippingTotalFree - parseFloat(this.state.predepositAmount) - (this.state.jifen / 100))).toFixed(2)}</span>
        </li>
       </ul>
       <div style={{textAlign: 'right', paddingTop: '15px'}}>
        <Button type="primary" className="btn1" style={{
         backgroundColor: '#eeeeee',
         borderColor: '#dcdcdc',
         color: '#333',
         width: '120px',
         height: '40px',
         fontSize: '18px',
        }}><Link to="/personOrder/cart">返回购物车</Link></Button>

        <Button type="primary" className="btn2" style={{
         backgroundColor: '#ff7719',
         borderColor: '#ff7719',
         color: '#fff',
         width: '120px',
         height: '40px',
         fontSize: '18px',
         marginLeft: '25px'
        }} onClick={this.onSubmitOrder}>提交订单</Button>
       </div>
      </div>
     </div>
    </Navigation>
    {/*更新发票弹窗*/}
    <Modal
     title="更新发票信息"
     visible={visibleInvoice}
     onOk={this.saveInvoice}
     onCancel={this.closeInvoice}
     maskClosable={false}
     footer={
      <Row type="flex" justify="space-around">
       <Col> <Button onClick={this.saveInvoice}
                     style={{color: '#108ee9', border: '1px solid #108ee9'}}>提交</Button></Col>
       <Col> <Button onClick={this.closeInvoice}>取消</Button></Col>
      </Row>
     }
    >
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '14px'}}>机构名称</span>}
     >
      {getFieldDecorator('invTitle', {
       rules: [{required: true, message: '请填写机构名称'}],
       initialValue: initInvoice.invTitle
      })(
       <Input/>
      )}
     </FormItem>
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '14px'}}>开户银行</span>}
      className={invState ? "hide" : "show"}
     >
      {getFieldDecorator('invRegBname', {
       rules: [{required: !invState, message: '请填写开户银行'}],
       initialValue: initInvoice.invRegBname
      })(
       <Input/>
      )}
     </FormItem>
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '14px'}}>开票地址</span>}
      className={invState ? "hide" : "show"}
     >
      {getFieldDecorator('invRegAddr', {
       rules: [{required: !invState, message: '请填写开票地址'}],
       initialValue: initInvoice.invRegAddr
      })(
       <Input/>
      )}
     </FormItem>
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '14px'}}>银行账号</span>}
      className={invState ? "hide" : "show"}
     >
      {getFieldDecorator('invRegBaccount', {
       rules: [{required: !invState, message: '请填写银行账号', pattern: /^[0-9][\d-]{0,49}$/}],
       initialValue: initInvoice.invRegBaccount
      })(
       <Input/>
      )}
     </FormItem>
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '14px'}}>开票电话</span>}
      className={invState ? "hide" : "show"}
     >
      {getFieldDecorator('invRecMobphone', {
       rules: [{required: !invState, message: '请填写开票电话', pattern: /^[0-9][\d-]*$/}],
       initialValue: initInvoice.invRecMobphone
      })(
       <Input/>
      )}
     </FormItem>
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '14px'}}>纳税人识别号/统一社会信用代码</span>}
      className="lenLabel"
     >
      {getFieldDecorator('invCode', {
       rules: [{
        required: true,
        message: msg,
        pattern: invState ? /^([\d | a-z \A-Z]{15}|[\d | a-z \A-Z]{18}|[0])$/ : /^([\d | a-z \A-Z]{15}|[\d | a-z \A-Z]{18})$/
       }],
       initialValue: initInvoice.invCode
      })(
       <Input/>
      )}
     </FormItem>
     <p>请务必在<span style={{color: 'red'}}>“我的账户”-“资质上传”</span>版块上传企业相关资质，客服将根据上传的资质审核您的开票信息</p>
    </Modal>
    {/*新旧发票对比弹窗*/}
    <Modal
     title="新旧发票信息对比"
     visible={newOldInvoice}
     onOk={this.updateInvoice}
     onCancel={this.closeInvoice}
     maskClosable={false}
     width={690}
     footer={
      <Row type="flex" justify="space-around">
       <Col> <Button onClick={this.updateInvoice}
                     style={{color: '#108ee9', border: '1px solid #108ee9'}}>确认更新发票信息</Button></Col>
       <Col> <Button onClick={this.closeInvoice}>放弃更新发票信息</Button></Col>
      </Row>
     }
    >
     <div>
      <p style={{padding: '5px 8px', border: '1px solid #aaa', display: 'inline-block', color: '#aaa'}}>历史发票信息</p>
      <div style={{margin: '10px 0'}}>
       <Row>
        <Col span={3}>机构名称:</Col>
        <Col span={7}>{initInvoice.invTitle}</Col>
        <Col span={7}>纳税人识别号/统一社会信用代码</Col>
        <Col span={7}>{initInvoice.invCode}</Col>
       </Row>
       <Row className={invState ? "hide" : "show"}>
        <Col span={3}>开票地址:</Col>
        <Col span={7}>{initInvoice.invRegAddr}</Col>
        <Col span={7}>银行账号:</Col>
        <Col span={7}>{initInvoice.invRegBaccount}</Col>
       </Row>
       <Row className={invState ? "hide" : "show"}>
        <Col span={3}>开票电话:</Col>
        <Col span={7}>{initInvoice.invRecMobphone}</Col>
        <Col span={7}>开户银行:</Col>
        <Col span={7}>{initInvoice.invRegBname}</Col>
       </Row>
      </div>
     </div>
     <div>
      <p style={{
       padding: '5px 8px',
       border: '1px solid #199ED8',
       display: 'inline-block',
       color: '#199ED8'
      }}>新增发票信息</p>
      <div style={{margin: '10px 0'}}>
       <Row>
        <Col span={3}>机构名称:</Col>
        <Col span={7}>{newInvoiceInfo.invTitle}</Col>
        <Col span={7}>纳税人识别号/统一社会信用代码</Col>
        <Col span={7}>{newInvoiceInfo.invCode}</Col>
       </Row>
       <Row className={invState ? "hide" : "show"}>
        <Col span={3}>开票地址:</Col>
        <Col span={7}>{newInvoiceInfo.invRegAddr}</Col>
        <Col span={7}>银行账号:</Col>
        <Col span={7}>{newInvoiceInfo.invRegBaccount}</Col>
       </Row>
       <Row className={invState ? "hide" : "show"}>
        <Col span={3}>开票电话:</Col>
        <Col span={7}>{newInvoiceInfo.invRecMobphone}</Col>
        <Col span={7}>开户银行:</Col>
        <Col span={7}>{newInvoiceInfo.invRegBname}</Col>
       </Row>
       <p style={{color: 'red', margin: '10px 0'}}>更新的普通发票信息需要审核,请确认是否已上传相关资质</p>
       <p style={{color: 'red', margin: '10px 0'}}>如更新发票信息，一旦更新发票信息审核通过，更新后的发票信息将作为唯一开票信息进行使用，历史发票信息将被清空</p>
       <p style={{color: 'red', margin: '10px 0'}}>如放弃更新发票信息，则您提交的更新发票信息将被清空</p>
      </div>
     </div>
    </Modal>
    {/*新增/编辑收货地址弹窗*/}
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
       initialValue: [this.state.initAddress.provinceId, this.state.initAddress.cityId, this.state.initAddress.areaId, this.state.initAddress.fouthAreaId]
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
       initialValue: this.state.initAddress.mobPhone
      })(
       <Input/>
      )}
     </FormItem>
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '14px'}}>固定电话</span>}
     >
      {getFieldDecorator('tel', {
       rules: [{min: 0, max: 20, message: '请填写最多20位固定电话'}],
       initialValue: this.state.initAddress.telPhone
      })(
       <Input/>
      )}
     </FormItem>
     <FormItem
      {...formItemLayout}
      label={<span style={{fontSize: '14px'}}>邮政编码</span>}
     >
      {getFieldDecorator('zipCode', {
       rules: [{len: 6, message: '请填写6位邮政编码'}],
       initialValue: this.state.initAddress.zipCode
      })(
       <Input/>
      )}
     </FormItem>
    </Modal>
   </div>
  )
 }
}


export default connect(({personOrder, loading}) => ({personOrder, loading}), (dispatch, own) => {
 return {dispatch, own}
})(Form.create()(PersonOrder))
