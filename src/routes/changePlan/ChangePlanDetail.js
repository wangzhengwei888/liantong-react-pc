import React, {Component} from 'react';
import {connect} from 'dva';
import {Select, Row, Col,Slider,DatePicker,Button } from 'antd';
import {routerRedux, Link} from 'dva/router';
import Img from '../../components/Img/Img';
import moment from 'moment';
const Option = Select.Option;

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
const zhNow = moment().locale('zh-cn').utcOffset(8 + 4);
let maxZhNow = moment().add(30, 'days').locale('zh-cn').utcOffset(8 + 4);

import {plan_box} from './ChangePlan.less';

const marks = {
 10: '10M',
 50: '50M',
 100: '100M'
};



class ChangePlanDetail extends Component {
 constructor(props) {
  super(props);
  this.state = {
   startValue: zhNow,
   endValue: zhNow,
   timeRing:0,
   endOpen: false,
  }
 }
 handleChange = (value) => {
  console.log(`selected ${value}`);
 }
 stepChange = (value) => {
  console.log(`step ${value}`);
 }


 disabledStartDate = (startValue) => {
  const endValue = this.state.endValue;
  if (!startValue || !endValue) {
   return false;
  }
  return startValue.valueOf() < zhNow;
 }

 disabledEndDate = (endValue) => {
  const startValue = this.state.startValue;
  if (!endValue || !startValue) {
   return false;
  }
  return endValue.valueOf() < startValue.valueOf() || endValue.valueOf() > maxZhNow;
 }


 onStartChange = (startValue) => {
  let timeRing = this.state.timeRing;
  maxZhNow = moment(startValue).add(30, 'days').locale('zh-cn').utcOffset(8 + 4);
  if(startValue.valueOf() > this.state.endValue.valueOf()){
   this.setState({
    endValue:startValue
   });
  }
  if(this.state.endValue){
   timeRing  = Math.ceil(this.state.endValue.diff(startValue, 'days',true))
  }
  this.setState({
   startValue,
   timeRing: timeRing > 0 ? timeRing : 0
  });
 }
 onEndChange = (endValue) => {
  let timeRing = Math.ceil(endValue.diff(this.state.startValue, 'days',true))
  this.setState({
   endValue,
   timeRing
  });
 }


 handleStartOpenChange = (open) => {
  if (!open) {
   this.setState({ endOpen: true });
  }
 }

 handleEndOpenChange = (open) => {
  this.setState({ endOpen: open });
 }

 gotoDetail =() => {
  this.props.dispatch(routerRedux.push('/plan/detail'));
 }
 goBack=()=>{
  this.props.dispatch(routerRedux.goBack())
 }


 render() {
  const { startValue, endValue, endOpen } = this.state;
  return (
   <div className={plan_box}>
    <Row>
     <Col span={3} offset={1}>基础信息</Col>
     <Col span={20} className="baseInfo">
      <Row>
       <Col span={2}>计划编号</Col>
       <Col span={10}>33333333</Col>
       <Col span={2}>计划编号</Col>
       <Col span={10}>33333333</Col>
      </Row>
      <Row>
       <Col span={2}>计划编号</Col>
       <Col span={10}>33333333</Col>
       <Col span={2}>计划编号</Col>
       <Col span={10}>33333333</Col>
      </Row>
      <Row>
       <Col span={2}>计划编号</Col>
       <Col span={10}>33333333</Col>
       <Col span={2}>计划编号</Col>
       <Col span={10}>33333333</Col>
      </Row>
      <Row>
       <Col span={2}>计划编号</Col>
       <Col span={10}>33333333</Col>
       <Col span={2}>计划编号</Col>
       <Col span={10}>33333333</Col>
      </Row>
      <Row>
       <Col span={2}>计划编号</Col>
       <Col span={10}>33333333</Col>
       <Col span={2}>计划编号</Col>
       <Col span={10}>33333333</Col>
      </Row>
     </Col>
    </Row>
    <Row>
     <Col span={3} offset={1}>提速账号</Col>
     <Col span={20}>
      <Select defaultValue="lucy" style={{ width: 180 }} onChange={this.handleChange}>
       <Option value="jack">Jack</Option>
       <Option value="lucy">Lucy</Option>
       <Option value="Yiminghe">yiminghe</Option>
      </Select>
     </Col>
    </Row>
    <Row>
     <Col span={3} offset={1}>提速速率</Col>
     <Col span={20}>
      <Slider marks={marks} defaultValue={30} style={{ width: 480 }} dots={true} step={10}  min={10} onChange={this.stepChange} />
     </Col>
    </Row>
    <Row>
     <Col span={3} offset={1}>预约时间</Col>
     <Col span={20}>
      <div>
       <span>选择开始时间 </span>
       <DatePicker
        disabledDate={this.disabledStartDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={startValue}
        placeholder="开始时间"
        onChange={this.onStartChange}
        onOpenChange={this.handleStartOpenChange}
       />
       <span style={{marginLeft:'40px'}}>选择结束时间 </span>
       <DatePicker
        disabledDate={this.disabledEndDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={endValue}
        placeholder="结束时间"
        onChange={this.onEndChange}
        open={endOpen}
        onOpenChange={this.handleEndOpenChange}
       />
      </div>
     </Col>
    </Row>
    <Row style={{padding:'0px',backgroundColor:'#fff'}}>
     <Col span={24} style={{textAlign:"right"}}>预约时长:{this.state.timeRing}天</Col>
    </Row>
    <Row style={{padding:'0px',backgroundColor:'#fff'}}>
     <Col span={24} style={{textAlign:"right"}}>总价:<span style={{color:"#ff6100"}}>{this.state.timeRing * 300}</span>元</Col>
    </Row>
    <Row style={{padding:'0px',backgroundColor:'#fff'}}>
     <Col span={2} offset={20}  style={{textAlign:"right"}}><Button size="large" onClick={this.goBack} style={{backgroundColor:"#ccc",color:"#fff"}} >取消计划</Button></Col>
     <Col span={2}  style={{textAlign:"right"}}><Button size="large" onClick={this.gotoDetail} style={{backgroundColor:"#ff6100",color:"#fff"}} >立即修改</Button></Col>
    </Row>
   </div>
  );
 }
}


export default connect(({home, app}) => ({home, app}), (dispatch, own) => {
 return {dispatch, own}
})(ChangePlanDetail);
