import React , { Component } from 'react';
import { Radio, Col, Menu, Tabs, Button, Icon } from 'antd';
import {} from '../../routes/payment/payment.less';
const RadioGroup = Radio.Group;

class  PaymentMethod extends Component{
  constructor(props){
    super(props);
    this.state={
      value: 1,
    }
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render (){
    return (
      <div className="payment_content_paymentMethod">
        <p>在线支付</p>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          <Radio value={1}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489494994460.png" style={{width:'150px',height:'50px'}}/></Radio>
          <Radio value={2}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489495005682.jpg" style={{width:'150px',height:'50px'}}/></Radio>
          <Radio value={3}><img src="http://bbcimage.leimingtech.com/upload/img/paymentlogo/1489495015503.png" style={{width:'150px',height:'50px'}}/></Radio>
        </RadioGroup>
        <div style={{paddingTop:'30px'}}>
          <Button type="primary" style={{
            backgroundColor:'#ff0000',
            borderColor:'#ff0000',
            width:'120px',
            height:'40px',fontSize:'18px'
          }}>确认支付</Button>
        </div>
      </div>
    )
  }
}
export default PaymentMethod;
