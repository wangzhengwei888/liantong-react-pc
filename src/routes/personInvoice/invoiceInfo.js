import React, {Component} from 'react'
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import {Breadcrumb , Radio ,Button , Form , Modal , Input , Tabs,Row,Col} from 'antd'
import {connect} from 'dva'
import {Link} from 'dva/router'
import {invoiceInfo_home} from './invoiceInfo.less'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


// var Obj = function (p) {
//  this.p = p;
// };
// var f = new Obj('Hello World!');
// var d =  Obj('Hello World!');
// console.log(f);
// console.log(c);

class InvoiceInfo extends Component {
 constructor(props) {
  super(props);
  this.state = {
   visible: false,
   newOldInvoice: false,
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
   msg: "目前纳税人识别号位数仅为15位或18位，请确认是否输入正确"
  }
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
     this.props.dispatch({type: 'invoiceInfo/saveOrderInvoiceEFF', payload: value})
     this.setState({
      visible: false
     });
    } else {
     this.setState({
      visible: false,
      newInvoiceInfo: value,
      newOldInvoice: true
     });
    }
   }
   this.props.form.resetFields()
  });
 }
 showModalInvoice = (type, isUpdate) => {
  let invoice = this.props.invoiceInfo.orderInvoiceList[type]
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
   visible: true,
   invState: type == 1 ? true : false,
   msg: type == 1 ? '目前纳税人识别号/统一社会信用代码位数仅为15位或18位，请确认是否输入正确，如您的企业没有纳税人识别号或统一社会信用代码，请在该栏目填写数字“0”' : '目前纳税人识别号/统一社会信用代码位数仅为15位或18位，请确认是否输入正确。'
  })
 }
 //关闭所有的发票弹窗
 closeInvoice = (e) => {
  this.setState({
   visible: false,
   newOldInvoice: false,
  });
  this.props.form.resetFields()
 }
 //确认更新发票信息
 updateInvoice = () => {
  // console.log(this.state)
  this.props.dispatch({type: 'invoiceInfo/saveOrderInvoiceEFF', payload: this.state.newInvoiceInfo})
  this.setState({
   newOldInvoice: false
  });
  this.props.form.resetFields()
 }

 render() {
  const {getFieldDecorator} = this.props.form;
  const {orderInvoiceList} = this.props.invoiceInfo;
  let {visible, newOldInvoice, invState, initInvoice, newInvoiceInfo, msg} = this.state;
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

  return (
   <div>
    <Search></Search>
    <Navigation preson={true}>
     <div className={invoiceInfo_home}>
       <div className="my_account_dynamic_Topimg"></div>
      <Breadcrumb separator=">" className='invoiceInfo_nav_bar'>
       <Breadcrumb.Item href="/presonAccunt/myAccount" style={{fontSize:'12px', fontWeight:'normal' }}>我的账户</Breadcrumb.Item>
       <Breadcrumb.Item href="/presonAccount/personalInformation"  style={{fontSize:'12px', fontWeight:'normal' }}>我的信息</Breadcrumb.Item>
       <Breadcrumb.Item href="/presonInvoice/invoiceInfo" style={{fontSize:'16px', fontWeight:'bold' }}>发票信息</Breadcrumb.Item>
      </Breadcrumb>
      <div className='invoiceInfo_box'>
       <div className='invoice information-sty'>
        <Tabs defaultActiveKey={orderInvoiceList["1"] && orderInvoiceList["1"].invState || orderInvoiceList["2"] && orderInvoiceList["2"].invState}>
         {/*{orderInvoiceList["0"] ?*/}
          {/*<TabPane tab="个人发票" key="0">*/}
           {/*<p>开具的发票类型默认为增值税普通发票，机构名称默认为“个人”</p>*/}
          {/*</TabPane> : ""*/}
         {/*}*/}
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
       {/*<div className='invoiceInfo_content'>*/}
        {/*<Button type="primary"*/}
                {/*style={{margin: '36px 0 36px 4px'}}*/}
                {/*size='large'*/}
                {/*onClick={this.showModal}*/}
                {/*className='content_anniu'>新增增值税发票信息</Button>*/}
       {/*</div>*/}
      </div>

      {/*更新发票弹窗*/}
      <Modal
       title="更新发票信息"
       visible={visible}
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
         rules: [{required: !invState, message: '请填写银行账号'}],
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
         rules: [{required: !invState, message: '请填写开票电话'}],
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
         rules: [{required: true, message: msg, pattern: invState ? /^(\d{15}|\d{18}|[0])$/ : /^(\d{15}|\d{18})$/}],
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
          <Col span={7}>纳税人识别号/统一社会信用代码:</Col>
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
          <Col span={7}>纳税人识别号/统一社会信用代码:</Col>
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
     </div>
    </Navigation>
   </div>
  )
 }
}

export default connect(({invoiceInfo}) => ({invoiceInfo}))(Form.create()(InvoiceInfo))
