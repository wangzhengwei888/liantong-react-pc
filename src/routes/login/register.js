import React, {Component} from 'react';
import {connect} from 'dva';
import Top from './top';
import {routerRedux} from 'dva/router';
import {
 Form,
 Input,
 Tooltip,
 Icon,
 Cascader,
 Select,
 Row,
 Col,
 Checkbox,
 Button,
 AutoComplete,
 Slider,
 Radio,
 message,
 Modal
} from 'antd'
import {regi_body, textleter, zcsubmit, bg, bg2, goLogin} from './register.less';
import {getFullUrl} from '../../utils/common';
import {getMobileCode,getCheckLoginName,getCheckLoginMobile} from './api';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'

const Option = Select.Option;
const FormItem = Form.Item;


class Register extends Component {
 constructor(props) {
  super(props);
  this.timout = null;
  this.state = {
   confirmDirty: false,
   showCountDown: false,
   countDown: 60,
   value: 1,
   confirmDirty: false,
   url: `/loginApi/genValidateImage`,
   xyChecked: false,
   regType: true,
   protocolModal: false,
   checkBox:true
  }
 }

 onChange = (e) => {
  console.log('radio checked', e.target.value);
  this.setState({
   value: e.target.value,
  });
 }
 handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFieldsAndScroll((err, val) => {
   if (!err) {
    if (!this.state.xyChecked) {
     message.error('请先同意用户平台注册协议');
    } else {
     console.log(val)
     let address = val.area.join("|");
     console.log(address);
     let values = {
      name: val.loginName,
      mobile: val.mobile,
      password: val.password,
      mobileValidateCode: val.mobileValidateCode,
      validateCode: val.validateCode,
      sinoOrgName: val.sinoOrgName,
      groupName:val.groupCompanyName,
      memberClass: val.memberClass,
      area: address
     }
     this.props.dispatch({type: 'login/register', payload: values})
    }

   }
  });
 }
 handleConfirmBlur = (e) => {
  const value = e.target.value;
  this.setState({confirmDirty: this.state.confirmDirty || !!value});
 }
 checkPassword = (rule, value, callback) => {
  const form = this.props.form;
  if (value && value !== form.getFieldValue('password')) {
   callback('两次密码不一样!');
  } else {
   callback();
  }
 }
 checkConfirm = (rule, value, callback) => {
  const form = this.props.form;
  if (value && this.state.confirmDirty) {
   form.validateFields(['confirm'], {force: true});
  }
  callback();
 }
//获取验证码
 handleCIMG = () => {
  let num = Math.floor(Math.random() * 1000);
  this.setState({
   url: `/loginApi/genValidateImage?key=${num}`
  })
 }
//获取手机验证码
 getmbcode = () => {
  this.props.form.validateFieldsAndScroll(['mobile', "validateCode"], (err, values) => {
   if (!err) {
    console.log(values)
    let val={
     mobile:values.mobile,
     validateCode:values.validateCode,
     type:1
    }
    getMobileCode(val).then(r => {
     if (r.result == 1) {
      message.success(r.msg, 1.5);
      this.countDown();
     } else {
      message.error(r.msg, 1.5);
     }
    })
   }
  })
 }


 //判断用户名唯一性
 useNameVerificat = () => {
  this.props.form.validateFieldsAndScroll(['loginName'], (err, values) => {
   if (!err) {
    console.log(values)
    getCheckLoginName(values).then(r => {
     if (r.result == 1) {
      message.success('用户名验证成功', 1.5);
      console.log(values)
     } else {
      message.error(r.msg, 1.5);
     }
    })
   }
  })
 }

 //判断手机唯一性
 mobileVerificat = () => {
  this.props.form.validateFieldsAndScroll(['mobile'], (err, values) => {
   if (!err) {
    console.log(values)
    getCheckLoginMobile(values).then(r => {
     if (r.result == 1) {
      message.success('手机号验证成功', 1.5);
      console.log(values)
     } else {
      message.error(r.msg, 1.5);
     }
    })
   }
  })
 }


 countDown = () => {
  const self = this;
  this.timout = window.setTimeout(function () {
   if (self.state.countDown > 0) {
    self.setState({countDown: self.state.countDown - 1, showCountDown: true});
    self.countDown();
   } else {
    self.setState({
     showCountDown: false,
     countDown: 60
    });
   }
  }, 1000, 0);
 }
 onXyChecked = () => {
  if(this.state.checkBox){
   message.info("请先阅读用户平台协议")
   return
  }
  this.setState({xyChecked: !this.state.xyChecked})
 }

 componentWillUnmount() {
  if (this.timout != null) {
   window.clearTimeout(this.timout);
   this.timout = null;
  }
 }

 onChangeType = () => {
  this.setState({regType: !this.state.regType})
 }
 handleOk = () => {
  window.location.href = "/login"
 }
 protocol = (e) => {
  e.preventDefault();
  this.setState({
   protocolModal: true
  })
 }
 handleProtocolOk = () =>{
  this.setState({
   protocolModal: false,
   checkBox:false
  })
 }


 render() {
  const {
   form: {getFieldDecorator},
  } = this.props;
  const {regResult, classData, areaDataList} = this.props.login;
  const type = this.state.regType ? {
   label: '手机号码',
   rules: [{required: true, message: '请输入正确的手机号!', len: 11, pattern: /^1[0-9]{10}$/}],
   tipe: "邮箱注册",
   label2: "手机验证码",
   rules2: [{required: true, message: '请输入手机验证码!'}],
   label3: "用户名验证",
   rules3: [{required: true, message: '6-20个字母/数字/下划线/减号，以字母开头!',min:6,max:20,pattern:/^[A-Za-z]{1}([A-Za-z0-9]|[-_]){5,19}$/ }, {validator: this.checkConfirm, }],
   label4: "密码",
   rules4: [{required: true, message: '字母+数字,8-15位字符之间!', pattern:/^(?!([a-zA-Z]+|[0-9]+)$)[A-z0-9]{8,15}$/  }],
   label5: "确认密码",
   rules5: [{required: true, message: '字母+数字,8-15位字符之间',pattern:/^(?!([a-zA-Z]+|[0-9]+)$)[A-z0-9]{8,15}$/  },{validator:this.checkPassword}],
  } : {
   label: '邮箱地址',
   rules: [{required: true, message: '请输入正确的邮箱!', type: 'email'},],
   tipe: "手机号注册",
   label2: "邮箱验证码",
   rules2: [{required: true, message: '请输入邮箱验证码!'}]
  };
  const formItemLayout = {
   labelCol: {
    xs: {span: 24},
    sm: {span: 6},
   },
   wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
   },
  };
  const tailFormItemLayout = {
   wrapperCol: {
    xs: {
     span: 24,
     offset: 0,
    },
    sm: {
     span: 14,
     offset: 6,
    },
   },
  };
  return (
   <div>
    <div><Search></Search></div>
    <Navigation isPreson={false} ></Navigation>
     <div className={regi_body}>
      <div  className="regi_content">

      <Row>
       <Col span={14} offset={10}
            style={{fontSize: '18px', fontWeight: 'bold', paddingBottom: '30px', paddingTop: '20px'}}>会员注册</Col>
       <Col span={15}>
        <Form onSubmit={this.handleSubmit} className="login-form">
         <div style={{borderRight: '1px solid rgb(204, 204, 204)'}}>
          <FormItem
           {...formItemLayout}
           label={type.label}
          >
           <Row gutter={6}>
            <Col span={16}>
             {getFieldDecorator('mobile', {
              rules: type.rules,
             })(
              <Input style={{width: '100%'}}/>
             )}
            </Col>
            {/*
            <Col span={6} style={{fontSize: '14px'}}>
                    <Button  type="primary"  size="large" onClick={this.mobileVerificat}>验证手机</Button>
            </Col>
            */}
           </Row>
          </FormItem>
          <FormItem
           {...formItemLayout}
           label="验证码"
          >
           <Row gutter={8}>
            <Col span={16}>
             {getFieldDecorator('validateCode', {
              rules: [{required: true, message: '请输入4位验证码!', len: 4}],
             })(
              <Input size="large"/>
             )}
            </Col>
            <Col span={6}>
             <div style={{float: 'left', display: 'inline-block', cursor: 'pointer'}}>
              <img style={{verticalAlign: 'middle'}} src={`${getFullUrl(this.state.url)}`} onClick={this.handleCIMG}/>
             </div>
            </Col>
           </Row>
          </FormItem>
          <FormItem
           {...formItemLayout}
           label={type.label2}
          >
           <Row gutter={8}>
            <Col span={16}>
             {getFieldDecorator('mobileValidateCode', {
              rules: type.rules2,
             })(
              <Input size="large"/>
             )}
            </Col>
            <Col span={7} style={{fontSize: '14px'}}>
             {this.state.showCountDown == true ? <div className='regist_yzm'>
              {this.state.countDown}秒后重新获取
             </div> : <Button type="primary" size="large" onClick={this.getmbcode}>发送验证码</Button>}
             {/*
               &nbsp;&nbsp;或者&nbsp;&nbsp;<a href="javascript:;" style={{color: '#3497ce'}}
               onClick={this.onChangeType}>{type.tipe}</a>
              */}
            </Col>
           </Row>
          </FormItem>
          <FormItem
           {...formItemLayout}
           label="设置密码"
           hasFeedback
           className="passWord"
          >
           <Row gutter={8}>
            <Col span={16}>
             {getFieldDecorator('password', {
              rules: type.rules4,
             })(
              <Input type="password"/>
             )}
            </Col>
           </Row>

          </FormItem>
          <FormItem
           {...formItemLayout}
           label="确认密码"
           hasFeedback
          >
           <Row gutter={8}>
            <Col span={16}>
             {getFieldDecorator('confirm', {
                rules: type.rules5,
             })(
              <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请再次填写密码"/>
             )}
            </Col>
           </Row>
          </FormItem>
          <FormItem
           {...formItemLayout}
           label="用户名"
          >
           <Row gutter={8}>
            <Col span={16}>
             {getFieldDecorator('loginName', {
              rules: type.rules3,

             })(
              <Input size="large" placeholder="请输入您的用户名"/>
             )}
            </Col>
            <Col span={6} style={{fontSize: '14px'}}>
                  <Button  type="primary"  size="large" onClick={this.useNameVerificat}>验证用户名</Button>
           </Col>
           </Row>
          </FormItem>
          <FormItem
           {...formItemLayout}
           label="公司名称"
          >
           <Row gutter={8}>
            <Col span={16}>
             {getFieldDecorator('sinoOrgName', {
              rules: [{required: false, message: '请输入公司名称'}],
             })(
              <Input size="large" placeholder="请输入公司名称"/>
             )}
            </Col>
           </Row>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属集团公司"
          >
            <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('groupCompanyName', {
              rules: [{required: false, message: '请输入所属集团公司'}],
              })(
              <Input size="large" placeholder="请输入所属集团公司"/>
              )}
            </Col>
            </Row>
          </FormItem>

          <FormItem
           {...formItemLayout}
           label="所属行业"
          >
           <Row gutter={8}>
            <Col span={16}>
             {getFieldDecorator('memberClass', {
              rules: [{required: true, message: '请选择所属分类'}],
             })(
              <Select>
               {classData.length > 0 ? classData.map((list, index) => {
                return (
                 <Option value={list.id} key={index}>{list.className}</Option>
                )
               }) : <Option value='1'>无数据</Option>}

              </Select>
             )}
            </Col>
           </Row>

          </FormItem>
          <FormItem
           {...formItemLayout}
           label="所属地区"
          >
           <Row gutter={8}>
            <Col span={16}>
             {getFieldDecorator('area', {
              rules: [{required: true, message: '请选择所属地区'}],
             })(
              <Cascader options={areaDataList}/>
             )}
            </Col>
           </Row>

          </FormItem>

          <FormItem {...tailFormItemLayout} style={{marginTop: '20px'}}>
           <div style={{position: 'relative', top: '-10px'}}><Checkbox checked={this.state.xyChecked}
                                                                       onClick={this.onXyChecked}>注册前仔细阅读《<a
            onClick={this.protocol}>用户平台协议</a>》</Checkbox>
           </div>
          </FormItem>
         </div>
         <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" disabled={this.props.login.regBtn} className={zcsubmit}>立即注册</Button>
         </FormItem>
        </Form>
       </Col>
       <Col>
       <p style={{margin:'0 0 20px 300px'}}>已经注册? <a href="/login" style={{color:'orange'}}>马上登录</a> </p>
       </Col>


      </Row>
      </div>
      <div className="textleter">
        <div>
          <span className="bg">个人用户</span>
          <p>如果您是个人买家，注册成功后您在平台上仅可购买非危险化学品和玻璃耗材。</p>
        </div>
        <div>
          <span className="bg2">企业用户</span>
          <p>如果您是企业采购或实验室使用者，您需在平台上上传企业相关购买资质，审核通过后方可购买对应品类的具有一定危险属性的商品。</p>
          <p style={{marginTop:'15px'}}>如果您已经和国药试剂有过线下业务往来的，请联系您业务往来的销售员，为您开通平台账号。</p>
        </div>
      </div>



      <Modal
       title="用户平台协议"
       visible={this.state.protocolModal}
       onOk={this.handleProtocolOk}
       closable={false}
       footer={[
        <Button key="确定" type="primary" onClick={this.handleProtocolOk}>确定</Button>
       ]}
      >
       <div className="register_greement">
        <h4 style={{textAlign:'center'}}>中国试剂网服务协议</h4>
        <p style={{textIndent:'2em'}}>《中国试剂网服务协议》（以下简称“本协议”）是由中国试剂网网站（以下简称“中国试剂网”）的运营方，即国药集团化学试剂有限公司（以下简称“国药试剂”），在提供域名为www.reagent.com.cn的网站交易平台服务时与中国试剂网的使用者（以下简称“用户”）达成的关于使用中国试剂网服务的各项条款、条件和规则。</p>
        <b style={{textIndent:'2em',}}>请用户仔细阅读本注册协议，点击"注册"按钮后，或以任何行为实际使用、享受中国试剂网的服务，即表示用户接受了本协议，本协议即构成对双方有约束力的法律文件。如果用户不同意本协议中的任何内容，可以选择不使用本网站服务。 </b>
        <p style={{textIndent:'2em',}}>本协议包括协议正文及所有中国试剂网已经发布的或将来可能发布或更新的各类规则（在该等规则中中国试剂网或被简称为“中国试剂网”），所有规则为本协议不可分割的组成部分，与本协议正文具有同等法律效力。用户应当仔细阅读本协议的正文内容及其所属各类规则，<b>对于本协议中以加粗字体显示的内容，用户应重点阅读。</b></p>
        <p style={{textIndent:'2em',}}>中国试剂网有权根据需要不时地制订、修改本协议及/或各类规则，并以网站公示的方式进行公告，不再单独通知用户。修订后的协议或将来可能发布或更新的各类规则一经在网站公布后，立即自动生效。如用户不同意相关修订，应当立即停止使用中国试剂网服务。用户继续使用中国试剂网服务，即表示用户接受经修订的协议或规则。</p>
        <p>一、中国试剂网账户 </p>
        <p style={{textIndent:'2em',}}><b>1、用户应自行诚信向中国试剂网提供注册资料及在实际业务中提供后续资料以完善账户信息，用户同意其提供的全部资料真实、准确、完整、合法有效，保证中国试剂网可以通过该等信息与用户本人进行联系。用户资料如有变动的，应及时更新其资料。如果用户提供的资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且中国试剂网保留终止用户使用中国试剂网各项服务的权利。</b></p>
        <p style={{textIndent:'2em',}}>2、在成功注册后，中国试剂网会为每位用户开通一个账户，该账户与用户申请账户时提供的手机和设置的用户名绑定，作为其使用中国试剂网服务的身份标识，<b>用户应妥善保管该账户的用户名和密码，并对在其账户项下发生的所有行为负责。用户不得将在中国试剂网注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。</b></p>
        <p style={{textIndent:'2em',}}>3、中国试剂网用户必须是具有完全民事行为能力的自然人，或者是具有合法经营资格的实体组织。无民事行为能力、限制民事行为能力人以及无经营或特定经营资格的组织不得注册为中国试剂网用户或超过其民事权利或行为能力范围在中国试剂网进行交易，如否，中国试剂网有权采取取消订单、冻结或关闭账户、拒绝提供服务等措施，给中国试剂网及相关方造成损失的，用户还应承担赔偿责任。</p>
        <p>二、交易平台服务</p>
        <p style={{textIndent:'2em',}}>1、通过中国试剂网提供的网上交易平台及其相关服务（以下统称“交易平台服务”），用户可在中国试剂网上查询、浏览由中国试剂网发布的商品或服务（以下统称“商品”）信息，订购商品，参加中国试剂网的有关活动以及使用其他服务。</p>
        <p style={{textIndent:'2em',}}>2、中国试剂网上展示的商品信息（如商品名称、价格、商品描述等）仅构成要约邀请，用户通过中国试剂网订购商品，提交订单即为购买商品的要约。用户提交订单后，中国试剂网会视情况不同做出处理：</p>
        <p style={{textIndent:'2em',}}>①只涉及常规库存商品的订单，，确认无误则进入付款发货环节，同时订单状态变更为“订单已确认”；</p>
        <p style={{textIndent:'2em',}}>②涉及专项类非库存商品的订单，中国试剂网通过电话等方式向用户报价，若双方就报价（价格波动规则请见本协议第五条）协商一致的，则双方进入付款订货环节，同时订单状态变更为“订单已确认”；</p>
        <p style={{textIndent:'2em',}}>③用户提交寻源申请（本网站无此商品，用户通过本网站提供方式询问是否可寻到货源供货的部分），中国试剂网在线进行答复，并就可以寻源的商品向用户报价，用户自行登录中国试剂网查询报价情况，若用户认可报价结果，则可在报价有效期内将询价单中该商品加入购物车进行下单购买。</p>
        <p style={{textIndent:'2em',}}><b>无论何种情况，直至用户向中国试剂网提交交易所需的全部资料、文件、资质等材料并通过审核，且全额支付相应款项时，方视为双方订单正式生效。</b></p>
        <p style={{textIndent:'2em',}}><b>3、用户提交订单后，订单有效期为15个日历日。超过该期限，在本协议规则下订单仍未生效的，订单不再继续有效。用户仍需购买有关商品的，应当重新提交订单。</b></p>
        <p style={{textIndent:'2em',}}><b>4、用户同意中国试剂网在发现中国试剂网上显示的商品信息错误或缺货的情况下，有权撤回或修改该等信息，并对商品订购数量有限制权。用户提交订单即表示用户对其订单中所确认的订购商品、收货地址、收货人等信息的准确性负责。</b></p>
        <p style={{textIndent:'2em',}}>5、中国试剂网上显示的每一商品的价格都包含法律规定的税金，配送费用将根据中国试剂网上公布的配送政策和用户选择的送货方式另行计收。中国试剂网有权更改上述有关价格和配送费用的信息，而不做另行通知。 </p>
        <p>三、用户的权利和义务 </p>
        <p style={{textIndent:'2em',}}>1、用户有权根据本协议的约定，以及中国试剂网上发布的相关规则在中国试剂网上查询商品信息、订购具体商品、参加中国试剂网的有关活动，以及使用中国试剂网提供的其他服务。</p>
        <p style={{textIndent:'2em',}}>2、用户应当保证在中国试剂网购买商品过程中遵守诚实信用原则，不扰乱网上交易的正常秩序。</p>
        <p style={{textIndent:'2em',}}><b>3、用户下订单时，应当仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。收货人与用户本人不一致的，收货人的行为和意思表示视为用户的行为和意思表示，用户应对收货人的行为及意思表示的法律后果承担连带责任。</b></p>
        <p style={{textIndent:'2em',}}><b>4、用户应当按照中国试剂网的要求提交购买化学品所需的材料，用户对所提交材料的真实性、准确性、时效性负责。</b></p>
        <p style={{textIndent:'2em',}}><b>5、用户应当按照中国试剂网公布的付款方式，及时足量的履行付款义务。</b></p>
        <p>四、中国试剂网的权利和义务 </p>
        <p style={{textIndent:'2em',}}>1、中国试剂网有义务在现有技术基础上维护整个网站的正常运行，并努力提升和改进技术，使用户网上交易活动得以顺利进行。 </p>
        <p style={{textIndent:'2em',}}>2、对于用户在中国试剂网上做出下列行为的，中国试剂网有权做出相应处理，而无须事先通知用户或取得用户同意：</p>
        <p style={{textIndent:'2em',}}>① 中国试剂网有权对用户的注册信息、购买行为及收货行为进行查阅，如发现其中存在任何问题的，有权向用户发出询问及要求改正或者做出冻结或关闭账户、取消订单等处理；</p>
        <p style={{textIndent:'2em',}}>② 用户违反本协议规定或有违反法律法规和地方规章的行为的，中国试剂网有权采取包括但不限于限制用户订购，注销用户账户、按照相关法律规定向相关主管部门进行披露、诉讼或仲裁的处理方式；</p>
        <p style={{textIndent:'2em',}}>③ 对于用户在中国试剂网进行的下列行为，中国试剂网有权对用户采取限制用户订购，注销用户账户等限制性措施乃至诉讼或仲裁的处理方式：包括（i）发布或以电子邮件或以其他方式传送存在恶意、虚假和侵犯他人人身财产权利内容的信息；（ii）进行与网上购物无关或不是以购物为目的的活动，试图扰乱正常购物秩序；（iii）将有关干扰、破坏或限制任何计算机软件、硬件或通讯设备功能的软件病毒或其他计算机代码、档案和程序之资料，加以上载、发布、发送电子邮件或以其他方式传送；（iv）干扰或破坏中国试剂网和服务或与中国试剂网和服务相连的服务器和网络；或（v）发布其他违反公共利益或可能严重损害中国试剂网和其他用户合法利益的信息；</p>
        <p style={{textIndent:'2em',}}><b>3、用户在此授予中国试剂网无偿、永久的独家使用权，并有权对该使用权进行再授权，以使中国试剂网有权在全球范围内全部或部分地使用、复制、修改、改写、发布、翻译和展示用户登记或发布在中国试剂网上的各类信息，或制作其派生作品，和/或以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入中国试剂网其他作品内。</b></p>
        <p>五、交易平台服务规则  </p>
        <p style={{textIndent:'2em',}}><b>1、价格变动规则 ：中国试剂网上的商品价格、数量、是否有货等商品信息随时都有可能发生变动，变动时不作特别通知。由于商品信息的数量极其庞大，虽然中国试剂网会尽最大努力保证用户所浏览商品信息的准确性，但由于众所周知的互联网技术因素等客观原因存在，实际显示的信息可能会有一定的滞后性或差错，发生此情况时，中国试剂网将与已提交订单但尚未完成支付的用户通过电话方式联系，告知该变动。双方特别确认：当商品价格发生波动时，无论用户是否已经提交订单，双方以用户实际支付款项时的价格为准。</b></p>
        <p style={{textIndent:'2em',}}><b>2、商品缺货规则：由于市场变化及各种以合理商业努力难以控制的因素的影响，中国试剂网无法承诺用户通过提交订单所希望购买的商品都会有货；用户订购的商品或服务如果发生缺货，用户和中国试剂网皆有权取消该订单。</b></p>
        <p style={{textIndent:'2em',}}><b>3、配送规则：中国试剂网负责将订购商品配送至订单约定的地址，并在核对收货人身份后交付。所有在中国试剂网上列出的配送时间皆为参考时间，仅供用户参照使用。该参考时间是根据商品库存状况、订单处理流程和配送地点等情况综合计算得出的。</b></p>
        <p style={{textIndent:'4em',}}><b>因如下情况造成订单延迟或无法配送等，中国试剂网不承担延迟配送的责任：</b></p>
        <p style={{textIndent:'4em',}}><b>（1）无法就订单内容与用户达成一致的；</b></p>
        <p style={{textIndent:'4em',}}><b>（2）用户提供的信息错误、地址不详细等原因导致的；</b></p>
        <p style={{textIndent:'4em',}}><b>（3）货物送达后无人签收，导致无法配送或延迟配送的；</b></p>
        <p style={{textIndent:'4em',}}><b>（4）情势变更因素导致的；</b></p>
        <p style={{textIndent:'4em',}}><b>（5）不可抗力因素导致的，例如：自然灾害、交通戒严、突发战争等。</b></p>
        <p style={{textIndent:'2em',}}><b>4、退换货规则：中国试剂网有权制定、发布商品退换货规则，以规范商品交易行为，并对该等规则享有修改权、解释权。用户在中国试剂网提交订单即表明其接受中国试剂网的退换货规则。 </b></p>
        <p style={{textIndent:'2em',}}><b>5、订单取消规则：</b></p>
        <p style={{textIndent:'2em',}}><b>① 用户有权在下列情况下，取消订单：</b></p>
        <p style={{textIndent:'2em',}}><b>a) 经用户和中国试剂网协商达成一致的；</b></p>
        <p style={{textIndent:'2em',}}><b>b) 中国试剂网对用户订单做出承诺之前；</b></p>
        <p style={{textIndent:'2em',}}><b>c) 中国试剂网上公布的商品价格发生变化或错误，用户在中国试剂网发货之前通知中国试剂网的。</b></p>
        <p style={{textIndent:'2em',}}><b>② 中国试剂网在下列情况下，可以取消用户订单：</b></p>
        <p style={{textIndent:'2em',}}><b>a) 经中国试剂网和用户协商达成一致的；</b></p>
        <p style={{textIndent:'2em',}}><b>b) 中国试剂网上显示的商品信息明显错误或缺货的；</b></p>
        <p style={{textIndent:'2em',}}><b>c) 用户订单信息明显错误或用户订购数量超出中国试剂网备货量的。</b></p>
        <p style={{textIndent:'2em',}}><b>③ 中国试剂网在下列情况下，亦可取消用户订单：</b></p>
        <p style={{textIndent:'2em',}}><b>a) 因不可抗力、中国试剂网系统发生故障或遭受第三方攻击，及其他中国试剂网无法控制的情形，根据中国试剂网判断需要取消用户订单的；</b></p>
        <p style={{textIndent:'2em',}}><b>b) 经中国试剂网判断，用户订购行为不符合公平原则或诚实信用原则的情形（如同一用户多次无理由拒收订购商品）；</b></p>
        <p style={{textIndent:'2em',}}><b>c) 按中国试剂网已经发布的或将来可能发布或更新的各类规则，可取消用户订单的其他情形。</b></p>
        <p>六、责任限制与不可抗力   </p>
        <p style={{textIndent:'2em',}}><b>1、在法律法规所允许的限度内，因使用中国试剂网服务而引起的任何损害或经济损失，中国试剂网承担的全部责任均不超过就用户所购买的与该索赔有关的商品所实际获得的直接收益。这些责任限制条款将在法律所允许的最大限度内适用，并在用户账户被注销后仍继续有效。</b></p>
        <p style={{textIndent:'2em',}}>2、中国试剂网仅限在“按现状”和“按现有”的基础上，向用户提供全部的信息、内容、材料、产品（包括软件）和服务。除非另有明确的书面说明，中国试剂网不对其包含在中国试剂网上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的担保。 </p>
        <p style={{textIndent:'2em',}}>3、不论在任何情况下，中国试剂网均不对由于互联网设备正常维护，互联网络连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，暴乱，骚乱，灾难性天气（如火灾、洪水、风暴等），爆炸，战争，政府行为，司法行政机关的命令或第三方的不作为而造成的不能履行或延迟履行承担责任。</p>
        <p>七、服务的中断和终止： </p>
        <p style={{textIndent:'2em',}}>1、在下列情况下，中国试剂网可以通过注销用户账户的方式单方解除本协议：</p>
        <p style={{textIndent:'2em',}}>① 在用户违反本协议相关规定时，中国试剂网有权暂停或终止向该用户提供服务。如该用户在中国试剂网暂停或终止提供服务后，再一次直接或间接或以他人名义注册为中国试剂网用户的，则中国试剂网有权再次暂停或终止向该用户提供服务；</p>
        <p style={{textIndent:'2em',}}><b>② 如中国试剂网通过用户提供的信息与用户联系时，发现用户在注册时填写的联系方式已无法取得联系的，经中国试剂网以其他联系方式（如有）通知用户或在中国试剂网进行公示公告（无其他联系方式的），而用户在三个工作日内仍未能提供新的有效联系方式的，中国试剂网有权终止向该用户提供服务；</b></p>
        <p style={{textIndent:'2em',}}>③ 一经发现用户注册信息及后续提交的业务必需信息中的内容是虚假的，中国试剂网即有权终止向该用户提供服务；</p>
        <p style={{textIndent:'2em',}}>④ 本协议修改或更新时，如用户表示不愿接受新的服务协议的，中国试剂网有权终止向该用户提供服务；</p>
        <p style={{textIndent:'2em',}}>⑤ 中国试剂网认为需终止提供服务的其他情况。</p>
        <p>八、适用的法律和管辖权  </p>
        <p style={{textIndent:'2em',}}>本协议的订立、执行和解释及争议的解决均应适用中华人民共和国的法律。如发生本协议与法律相抵触的情形，则该条款将按法律规定重新解释，而其他条款继续有效。如就本协议内容或其执行发生任何争议，则双方应首先通过友好协商方式解决；协商不成的，任何一方均应向国药集团化学试剂有限公司所在地有管辖权的法院提起诉讼解决。</p>
        <p>九、知识产权   </p>
        <p style={{textIndent:'2em',}}><b>1、中国试剂网系国药试剂指定的唯一官方认证网站， “中国试剂网”的名称系国药集团化学试剂有限公司所有，任何人不得为商业目的使用该名称、接近的网站名称或其他可能导致误认的名称。</b></p>
        <p style={{textIndent:'2em',}}><b>2、中国试剂网上的图片、图表、标识、网页页眉、按钮图标、文字、服务品名等标示在网站上的信息都是中国试剂网运营方及其关联方的财产，受中国和国际知识产权法的保护。未经中国试剂网许可，任何人不得使用、复制或用作其他用途。在中国试剂网上出现的其他商标是其商标权利人各自的财产，未经中国试剂网运营方或相关商标所有人的书面许可，任何第三方都不得使用。 </b></p>
        <p style={{textIndent:'2em',}}><b>3、中国试剂网及其关联方有权将用户在交流过程中表达的商品使用体验、商品讨论或图片进行使用或者与其他人合作使用，使用范围包括但不限于网站、电子杂志、杂志、刊物等，使用时需为作者署名，以发表文章时注明的署名为准。文章有附带版权声明者除外。</b></p>
        <p style={{textIndent:'2em',}}><b>4、任何转载、引用发表于中国试剂网的版权文章须符合以下规范：</b></p>
        <p style={{textIndent:'2em',}}><b>① 用于非商业、非盈利、非广告性目的时需注明作者及文章及图片的出处为“中国试剂网”；</b></p>
        <p style={{textIndent:'2em',}}><b>② 用于商业、盈利、广告性目的时需征得文章或图片原作者的同意，并注明作者姓名、授权范围及原作出处“中国试剂网”；</b></p>
        <p style={{textIndent:'2em',}}><b>③ 任何文章或图片的修改或删除均应保持作者原意并征求原作者同意，并注明授权范围。</b></p>
        <p>十、信息保护 </p>
        <p style={{textIndent:'2em',}}>1、用户个人隐私：用户在中国试剂网进行浏览、下单购物等活动时，涉及用户真实姓名/名称、资质证明类材料、通信地址、联系电话、电子邮箱等隐私信息的，中国试剂网承诺不将该等信息用于非业务目的，除非得到用户的授权或法律另有规定，中国试剂网不会主动向外界披露用户隐私信息。</p>
        <p style={{textIndent:'2em',}}><b>2、信息安全</b></p>
        <p style={{textIndent:'2em',}}><b>① 请用户妥善保管账户及密码信息；</b></p>
        <p style={{textIndent:'2em',}}><b>② 如果用户发现自己的个人信息泄密，请用户立即联络中国试剂网客服，以便中国试剂网采取相应措施。</b></p>
        <p>十一、其他</p>
        <p style={{textIndent:'2em',}}>1、中国试剂网尊重用户和消费者的合法权利，本协议及中国试剂网上发布的各类规则、声明等其他内容，均是为了更好的、更加便利的为用户和消费者提供服务。中国试剂网欢迎用户和社会各界提出意见和建议，中国试剂网将虚心接受并适时修改本协议及中国试剂网上的各类规则。</p>
        <p style={{textIndent:'2em',}}><b>2、本协议内容中以黑体、加粗、下划线、斜体等方式显著标识的条款，请用户着重阅读。</b></p>
        <p style={{textIndent:'2em',}}>3、请用户仔细阅读本注册协议，点击"注册"按钮后，或以任何行为实际使用、享受中国试剂网的服务，即表示用户接受了本协议，在确认之前请再次确认已知悉并完全理解本协议的全部内容。</p>
       </div>
      </Modal>
     </div>
     <Modal className={goLogin}
            visible={regResult}
            cancelText=""
            width="350px"
            footer={[
             <Button key="submit" type="primary" onClick={this.handleOk}>
              立即登录
             </Button>,
            ]}
            onOk={this.handleOk}
            closable={false}
     >
      <p style={{fontSize: '18px'}}>恭喜您已经注册成功</p>
     </Modal>



   </div>
  );
 }
}

export default connect(({login}) => ({login}), (dispatch, own) => {
 return {dispatch, own}
})(Form.create()(Register));

