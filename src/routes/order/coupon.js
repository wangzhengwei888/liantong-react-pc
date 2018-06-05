//优惠券
import React , { Component } from 'react';
import { Checkbox } from 'antd';
import {item} from './coupon.less';

const CheckboxGroup = Checkbox.Group;

class Coupon extends Component{
  constructor(props){
    super(props)
    this.state={
      num:0
    }
  }

  onClick = (e) => {
    console.log(e.target.parentNode.parentNode.parentNode.getElementsByTagName('input'));
    let eles = e.target.parentNode.parentNode.parentNode.getElementsByTagName('input');
    let n = 0;
    let money = 0;
    for(var i=0;i<eles.length;i++){
      if(eles[i].checked){
        console.log(eles[i].dataset.price);
        money += parseInt(eles[i].dataset.price);
        n++;
      }
    }
    console.log(money)
    this.props.onChange(n,money);

  }
  render(){
    return (
      <div className={item}>
        <div className='float_left list'>
          <div>
            <input  type="checkbox" data-price='30' onClick={this.onClick}/>
            <span className='price_rang'>188-30元</span>
          </div>
          <div>平台自营</div>
          <div>2016-02-12 --- 2017-02-12</div>
        </div>
        <div className='float_left list'>
          <div>
            <input  type="checkbox" data-price='30' onClick={this.onClick}/>
            <span className='price_rang'>188-30元</span>
          </div>
          <div>平台自营</div>
          <div>2016-02-12 --- 2017-02-12</div>
        </div>
        <div className='float_left list'>
          <div>
            <input  type="checkbox" data-price='30' onClick={this.onClick}/>
            <span className='price_rang'>188-30元</span>
          </div>
          <div>平台自营</div>
          <div>2016-02-12 --- 2017-02-12</div>
        </div>
      </div>

    )
  }
}

export default Coupon;


