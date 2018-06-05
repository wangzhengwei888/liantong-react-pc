/**
 * Created by 10400 on 2017/8/9.
 * 支付界面页面
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';
import Img from '../../components/Img/Img';

import { routerRedux, Link } from 'dva/router';
import { Form, Icon, Input, Button, Layout ,Steps, Tooltip, Select, Upload , Radio,AutoComplete,Menu,Dropdown ,Tree ,Checkbox } from 'antd';
import { payment_body,payment_more} from './payment.less'
import {IMAGE_DOMAIN} from '../../utils/common';

const RadioGroup = Radio.Group;
// const FormItem = Form.Item;
// const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;
// const TreeNode = Tree.TreeNode;
// const Step = Steps.Step;
class  Payment extends Component{
  constructor(props){
    super(props);
    this.state={
      value: '',
      current:1,
     orderSn:this.props.params.orderSn,
     payType:this.props.params.payType,
     orderTotalPrice:this.props.params.orderTotalPrice,
     isControlInfo:this.props.params.isControlInfo,
    }
  }
  componentWillUnmount(){

  }

  onChange = (e) => {
   // console.log('radio checked', e.target.value);
   this.setState({
    value: e.target.value,
    current:2,

   });

  }

  render (){
   const { saveOrderDate} = this.props.personOrder;
   return <div>
     <div><Search></Search></div>
      <Navigation preson={true}>
       {saveOrderDate.length > 0 ?  <div>
        <div className="alls_guanggao_img"><Img style={{ width:'100%', height:"100%" }} src="/static/head/my_account_dynamic_Topimg.jpg"/></div>
        <div className={payment_body}>
         <div className="paymentstate">订单提交成功！</div>
         <div className="order_detail">
          <div>您的订单号：<span>{this.props.params.orderSn}</span></div>
          <div>订单总金额：<span>{Number(this.props.params.orderTotalPrice).toFixed(2)}</span>元</div>
          <div>应支付金额：<span>{Number(this.props.params.orderAmount).toFixed(2)}</span>元</div>
          {this.props.params.payType==1?<div>支付方式：在线支付</div>:(this.props.params.payType==2?<div>支付方式：银行汇款</div>:<div>支付方式：货到付款</div>)}
         </div>
         {saveOrderDate.length > 0 && saveOrderDate[0].isControlInfo ?
          <div>
           <p style={{color:'red',padding:'8px 0'}}>订单包括管制类产品，要按照国家规定提交审核后方可购买订单包括管制类产品，要按照国家规定提交审核后方可购买订单包括管制类产品，要按照国家规定提交审核后方可购买</p>
           <div className="payment_link"><a href="/customservice?parentId=6&articleId=513ace30b988496b835227c55a17a473" target="_blank">点击查看管制类产品所需相关购买材料>></a></div>
          </div>
          :''}
         <div className={payment_more}>
          <div className="payment_look">
           <p>现在您还可以</p>
           <div className="btnlists">
            <span><Link to={`/personOrder/orderDetail/${saveOrderDate[0].orderId}`}>查看订单状态</Link></span>
            <span><Link to='/'>继续购物</Link></span>
            <span><Link to='/personIntegral/mall'>积分换礼</Link></span>
            <span><Link to='/presonAccount/intelligentUp'>资质上传</Link></span>
           </div>
          </div>
          {this.props.params.payType == 1 && this.props.params.orderAmount > 0 ?
           <div>
            <div className="paymentWay">
             <p>平台支付</p>
             <div className="waylists">
              <span><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" style={{width:'150px',height:'50px',border:'1px solid #333'}}alt=""/></span>
              <span><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" style={{width:'150px',height:'50px',border:'1px solid #333'}}alt=""/></span>
             </div>
            </div>
            <div className="paymentMethod">
             <p>网银支付</p>
             <div className="paylists">
              <RadioGroup onChange={this.onChange} value={this.state.value}>
               <Radio value={1}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={2}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={3}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={4}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={5}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={6}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={7}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={8}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={9}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={10}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={11}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={12}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={13}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={14}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={15}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
               <Radio value={16}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" /></Radio>
              </RadioGroup>
             </div>
             <div style={{padding:'30px 0',display:'flex',justifyContent: 'space-around'}}>
              <Button type="primary" style={{
               backgroundColor:'#ff0000',
               borderColor:'#ff0000',
               width:'120px',
               height:'40px',fontSize:'18px'}}>立即支付</Button>
             </div>
            </div>
           </div>
           : " "
          }
         </div>
        </div>
       </div> : <p style={{margin:'20px auto',textAlign:'center'}}>请到订单列表查看订单相关信息</p>}

      </Navigation>
   </div>
   // (
      {/*<div className={payment_body}>*/}
        {/*<div className="payment_box">*/}
          {/*<div className="payment_head">*/}
            {/*<div className="payment_head_l">*/}
              {/*<Link className="logo"  to="/home"></Link>*/}
            {/*</div>*/}
            {/*<div className="payment_head_r">*/}
              {/*<Steps current={current}>*/}
                {/*<Step description={<span>确认购物清单</span>} />*/}
                {/*<Step description={<span>填写核对购物信息</span>} />*/}
                {/*<Step description={<span>选择支付方式</span>}/>*/}
                {/*<Step description={<span>购买完成</span>} />*/}
              {/*</Steps>*/}
            {/*</div>*/}
          {/*</div>*/}
          {/*<div className="payment_content">*/}
            {/*<div className="payment_content_orderdetall">*/}
              {/*<div className="orderdetall_title">*/}
                {/*<span>订单编号:{paySn},支付编号:{payId}</span>*/}
                {/*<a href="#">订单详情</a>*/}
                {/*<span style={{color:'#fd0303',float:'right'}}><b style={{fontSize:'14px',fontWeight:'400'}}>￥</b>{orderTotalPrice}</span>*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*支付链接*/}
              {/*/!*<PaymentMethod></PaymentMethod>*!/*/}
            {/*<div className="payment_content_paymentMethod">*/}
              {/*<p>在线支付</p>*/}
              {/*<RadioGroup onChange={this.onChange} value={value}>*/}
                {/*<Radio value={1}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" style={{width:'150px',height:'50px'}}/></Radio>*/}
                {/*<Radio value={2}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489495005682.jpg" style={{width:'150px',height:'50px'}}/></Radio>*/}
                {/*<Radio value={3}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489495015503.png" style={{width:'150px',height:'50px'}}/></Radio>*/}
              {/*</RadioGroup>*/}

            {/*</div>*/}
          {/*</div>*/}

        {/*</div>*/}
      // </div>
    // );
  }
}

Payment.propTypes = {
  form: PropTypes.object,
  Payment: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({payment,personOrder})=>({payment,personOrder}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Payment));
