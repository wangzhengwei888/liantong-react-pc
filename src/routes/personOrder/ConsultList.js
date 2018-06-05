import React, {Component} from 'react'
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import {Form, Breadcrumb, Button, Table, Row, Col, Input, Select,message} from 'antd'
import {Link} from 'dva/router'
import {connect} from 'dva'
import {consult_list} from './ConsultList.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import ConsultListFloor from './ConsultListFloor'

const FormItem = Form.Item;
let require = true;

class ConsultList extends Component {
 constructor(props) {
  super(props)
  this.state = {
   data: [],
   num: [0],
   addBtn: true,
   changeRiquire:false,
   changeRiquire1:false,
   changeRiquire2:false,
  }
 }

 onChange = (e) => {
  if (e.target.value.trim() != "") {
   this.setState({
    changeRiquire:true
   })
  }else{
   // if(!this.state.changeRiquire1 && !this.state.changeRiquire2){
   //  this.props.form.resetFields()
   // }
   this.setState({
    changeRiquire:false
   })
  }
 }
 onChange1 = (e) => {
  if (e.target.value.trim() != "") {
   this.setState({
    changeRiquire1:true
   })
  }else{
   // if(!this.state.changeRiquire && !this.state.changeRiquire2){
   //  this.props.form.resetFields()
   // }
   this.setState({
    changeRiquire1:false
   })
  }
 }
 onChange2 = (e) => {
  if (e.target.value.trim() != "") {
   this.setState({
    changeRiquire2:true
   })
  }else{
   // if(!this.state.changeRiquire1 && !this.state.changeRiquire){
   //  this.props.form.resetFields()
   // }
   this.setState({
    changeRiquire2:false
   })
  }
 }

 rendRow = (getFieldDecorator, list, require,i) => {
  console.log(require)
  return (
   <Row key={list}>
    <Col span={3}>{i + 1}</Col>
    <Col span={3}>
     <FormItem>
      {getFieldDecorator(`goodsName${list}`, {
       rules: [{required: require, message: "请输入商品名称"}],
       // validateTrigger:'onSubmit'
      })(
       <Input size="large" placeholder="请输入商品名称" onChange={(v) => {
        this.onChange(v)
       }}/>
      )}
     </FormItem>
    </Col>
    <Col span={3}>
     <FormItem>
      {getFieldDecorator(`cas${list}`, {})(
       <Input size="large" placeholder="请输入CAS号"/>
      )}
     </FormItem>
    </Col>
    <Col span={3}>
     <FormItem>
      {getFieldDecorator(`spec${list}`, {})(
       <Input size="large" placeholder="请输入规格纯度"/>
      )}
     </FormItem>
    </Col>
    <Col span={3}>
     <FormItem>
      {getFieldDecorator(`pack${list}`, {
       rules: [{required: require, message: "请输入包装"}],
       // validateTrigger:'onSubmit'
      })(
       <Input size="large" placeholder="请输入包装" onChange={(v) => {
        this.onChange1(v)
       }}/>
      )}
     </FormItem>
    </Col>
    <Col span={3}>
     <FormItem>
      {getFieldDecorator(`num${list}`, {
       rules: [{required: require, message: "请输入购买数量"}],
       // validateTrigger:'onSubmit'
      })(
       <Input size="large" placeholder="请输入购买数量" onChange={(v) => {
        this.onChange2(v)
       }}/>
      )}
     </FormItem>
    </Col>
    <Col span={3}>
     <FormItem>
      {getFieldDecorator(`msg${list}`)(
       <Input placeholder="请输入备注"/>
      )}
     </FormItem>
    </Col>
    <Col span={1}>
     <Button onClick={()=> {this.deleteRow(i,list)}}>删除当前行</Button>
    </Col>

   </Row>
  )
 }


 handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
   console.log(err)
   if (!err) {
    let arr = [];

    for (let i = 0; i < this.state.num.length; i++) {
     let cas = 'cas' + (`${this.state.num[i]}`)
     let casValue = values[cas];
     let goodsName = 'goodsName' + (`${this.state.num[i]}`)
     let goodsNameValue = values[goodsName];
     let msg = 'msg' + (`${this.state.num[i]}`)
     let msgValue = values[msg];
     let num = 'num' + (`${this.state.num[i]}`)
     let numValue = values[num];
     let pack = 'pack' + (`${this.state.num[i]}`)
     let packValue = values[pack];
     let spec = 'spec' + (`${this.state.num[i]}`)
     let specValue = values[spec];
     let val = 'val' + (`${this.state.num[i]}`)
     val = {
      "casNo": casValue,  // CAS号
      "goodsName": goodsNameValue, //商品名称
      "remark": msgValue,  //备注
      "buyNum": numValue,// 购买量
      "goodsSpec": packValue,//包装
      "specName": specValue,//规格纯度
     }
     arr.push(val);
    }
    let data = JSON.stringify(arr)
    console.log(data)
    this.props.dispatch({type: 'consultList/subimtConsultListEEF', data});
   }
  });
 }
 addRow = () => {
   let len = this.state.num.length;
  let n = 0;
   if(len != 0){
    n = this.state.num[len - 1] + 1;
   }

   console.log(n)
   if (len >= 4) {
    this.setState({
     addBtn: false
    })
   }
   let newNum = this.state.num.concat(n)
   this.setState({
    num: newNum
   })

 }
 deleteRow =(i,list)=>{
  console.log(i,list)
  let newNum = this.state.num.concat();
  newNum.splice(i,1);
  console.log(newNum)
  this.setState({
   num: newNum,
   addBtn: true,
  })
 }

 render() {
  console.log(this.state)
  const {getFieldDecorator} = this.props.form;
  const {consultListTopData} = this.props.consultList;
  require = (consultListTopData.length > 0 ? false : true) || this.state.changeRiquire || this.state.changeRiquire1 || this.state.changeRiquire2 ;
  return (
   <div>
    {/*<Search></Search>*/}
    {/*<Navigation preson={true}></Navigation>*/}
     <div className={consult_list}>
       <div className="accurate_Topimg"></div>
      <Breadcrumb separator=">" className='security_nav_bar'>
       <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
       <Breadcrumb.Item>我的询价商品</Breadcrumb.Item>
      </Breadcrumb>

      <div className="orderList_content">
       <Row className="orderList_content_head">
        <Col span={8}>基本信息</Col>
        <Col span={8}>商品属性</Col>
        <Col span={8}>操作</Col>
       </Row>
      </div>
      {!!consultListTopData && consultListTopData.length > 0 ?
       <div>
        {
         <div>
          {
           <ConsultListFloor data={consultListTopData || []}>
           </ConsultListFloor>
          }
         </div>
        }
       </div>
       : <p style={{textAlign: "center", margin: '10px'}}>无数据</p>
      }
      <div>
       <div style={{width: '100%', border: '1px solid #333', margin: '15px auto'}}></div>
       <p style={{paddingBottom: '10px'}}>如果中国试剂网上没有查到您需要的商品，可在下表填写具体产品信息：</p>
       <Form onSubmit={this.handleSubmit}>
        <Row>
         <Col span={3}>序号</Col>
         <Col span={3}>商品名称 <span style={{color: 'red'}}>*</span></Col>
         <Col span={3}>CAS号</Col>
         <Col span={3}>规格纯度</Col>
         <Col span={3}>包装 <span style={{color: 'red'}}>*</span></Col>
         <Col span={3}>购买数量 <span style={{color: 'red'}}>*</span></Col>
         <Col span={3}>备注</Col>
        </Row>
        {this.state.num.map((list, i) => {
         return this.rendRow(getFieldDecorator, list, require,i)
        })}
        <p style={{textAlign: 'center', display: this.state.addBtn ? "block" : "none", marginBottom: '10px'}}><Button
         onClick={this.addRow}>点击新增行</Button></p>
        <FormItem>
         <Button type="primary" htmlType="submit">
          提交询价单
         </Button>
        </FormItem>
       </Form>
      </div>

      <div className="orderList_bottom">
       <p style={{marginTop: '20px'}}>说明</p>
       <p>1.产品名称：请尽可能详细填写所需产品的中文名称或者英文名称。</p>
       <p>CAS号：若所需产品有准确的CAS编号，请提供给我们。</p>
       <p>3.规格纯度：若对试剂的级别或者含量有要求，请注明。</p>
       <p>4.包装：请注明您需要的包装大小。</p>
       <p>5.购买量：请告知我们您需要订购的试剂总量，或者是您需要多大的包装。</p>
       <p>6.备注：若您有其他特殊要求，也请向我们说明。</p>
       <p>7.在“我的账户”中可查看“我的询价单”，我们将会在2-3个工作日内给您回复。</p>
       <p>6.已报价的询价单产品可直接加入购物车进行购买。</p>
      </div>

     </div>

    
   </div>
  )
 }
}

export default connect(({consultList}) => ({consultList}), (dispatch) => {
 return {dispatch}
})(Form.create()(ConsultList))
