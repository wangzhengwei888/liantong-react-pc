import React , { Component } from 'react';
import { stepper } from './Stepper.less';
import {Input,message} from 'antd';
let timer = null;
//num:初始值
//min:最小值
//max:最大值
//step:步长
//onUpdate():回调函数，数值变化后，会返回当前的数值
//disabled:是否可用
//key:异步请求用来刷新数据
//nowNum:库存
//<Stepper key={goods.goodsNum + init} nowNum={9} num={1} min={1} max={10} step={1} onUpdate={this.onUpdate} disabled={false}/>


class Stepper extends Component{

  constructor(props){
    super(props);
    this.state={
      value:props.num,
     isOnBlur:props.isOnBlur ? props.isOnBlur : false

    }
  }


  numdowm = () => {
    let num = parseInt(this.state.value) <= parseInt(this.props.min) ? parseInt(this.props.min) : parseInt(this.state.value);
    let step = parseInt(this.props.step);
    if(num - step <= parseInt(this.props.min)){
      num = parseInt(this.props.min);
    }else{
      num = num - step;
    }
    if(parseInt(num)%parseInt(this.props.step) != 0){
      num = this.props.step * Math.round(parseInt(num)/parseInt(this.props.step));
    }
    this.setState({value:num});
    let _this = this;
    clearTimeout(timer);
    timer = setTimeout(function(){
      if(typeof(_this.props.onUpdate) == "function"){
        _this.props.onUpdate(num);
      }
    },600)
  }

  numup = () => {
    let num = parseInt(this.state.value) >= parseInt(this.props.max) ? parseInt(this.props.max) : parseInt(this.state.value);
    let step = parseInt(this.props.step);
    if(num + step > parseInt(this.props.nowNum)){
      message.info('库存不足',1);
      return
    }else if(num + step > parseInt(this.props.max)){
      message.info(`每人限购${this.props.max}件`,1);
      return
    }else{
      num = num + step;
    }
    if(parseInt(num)%parseInt(this.props.step) != 0){
      num = this.props.step * Math.round(parseInt(num)/parseInt(this.props.step));
    }
    this.setState({value:num});
    let _this = this;
    clearTimeout(timer);
    timer = setTimeout(function(){
      if(typeof(_this.props.onUpdate) == "function"){
        _this.props.onUpdate(num);
      }
    },600)

  }

  onChange = (e) => {
      let val =e.target.value.replace(/[^0-9-]+/,'');
      this.setState({value:val});
      console.log(val);
   if(this.state.isOnBlur){
    return
   }
   if(typeof(this.props.onUpdate) == "function"){
    this.props.onUpdate(val);
   }

  }

  onBlur = (e) => {
    let val =e.target.value.replace(/[^0-9-]+/,'');
    if(parseInt(val)%parseInt(this.props.step) != 0){
      val = this.props.step * Math.round(parseInt(val)/parseInt(this.props.step));
    }
    if(parseInt(val) > parseInt(this.props.nowNum)){
      message.info('库存不足',1);
      return
    }else if(parseInt(val) > parseInt(this.props.max)){
      message.info(`每人限购${this.props.max}件`,1);
      return
    }
    if(parseInt(val) < parseInt(this.props.min)){
      val = this.props.min;
    }
    this.setState({value:val});
    let _this = this;
    clearTimeout(timer);
    timer = setTimeout(function(){
      if(typeof(_this.props.onUpdate) == "function"){
        _this.props.onUpdate(val);
      }
    },300)

  }
  render(){
    const {btnClassName = "",inputClassName = "",styleCss} = this.props;
      return(
        <div className={stepper} style={{...styleCss}}>
          <button className={`${btnClassName}`} onClick={this.numdowm} disabled={this.props.disabled}>-</button>
          <Input className={`${inputClassName}`} type="text" disabled={this.props.disabled} value={this.state.value} onChange={this.onChange} onBlur={this.onBlur}/>
          <button className={`${btnClassName}`} type="button" onClick={this.numup} disabled={this.props.disabled}>+</button>
        </div>
      )
  }
}
export default Stepper;

