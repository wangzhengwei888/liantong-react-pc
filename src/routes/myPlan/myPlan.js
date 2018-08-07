import React, {Component} from 'react';
import {connect} from 'dva';
import {Select, Row, Col, Slider, DatePicker, Button,message} from 'antd';
import {routerRedux, Link} from 'dva/router';
import Img from '../../components/Img/Img';
import moment from 'moment';

const Option = Select.Option;

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';

const zhNow = moment().locale('zh-cn').utcOffset(8 + 4);
let maxZhNow = moment().add(30, 'days').locale('zh-cn').utcOffset(8 + 4);

import {plan_box} from './myPlan.less';


class MyPlan extends Component {
 constructor(props) {
  super(props);
  this.state = {
   startValue: zhNow,
   endValue: zhNow,
   timeRing: 0,
   endOpen: false,
   hlwLineNo: "",
   minCurrSpeed: 10,
   currSpeed: 10,
   lineId: ""
  }
 }

 marks = () => {
  let minCurrSpeed = this.state.minCurrSpeed
  let obj = {}
  obj[minCurrSpeed] = minCurrSpeed+"M";
  obj[100] = "100M";
  return obj
 }

 handleChange = (value) => {
  this.setState({
   lineId: value
  })
 }
 stepChange = (value) => {
  this.setState({
   currSpeed:value
  })
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
  if (startValue.valueOf() > this.state.endValue.valueOf()) {
   this.setState({
    endValue: startValue
   });
  }
  if (this.state.endValue) {
   timeRing = Math.ceil(this.state.endValue.diff(startValue, 'days', true))
  }
  this.setState({
   startValue,
   timeRing: timeRing > 0 ? timeRing : 0
  });
 }
 onEndChange = (endValue) => {
  let timeRing = Math.ceil(endValue.diff(this.state.startValue, 'days', true))
  this.setState({
   endValue,
   timeRing
  });
 }


 handleStartOpenChange = (open) => {
  if (!open) {
   this.setState({endOpen: true});
  }
 }

 handleEndOpenChange = (open) => {
  this.setState({endOpen: open});
 }
//立即提速
 gotoDetail = () => {
  let obj = {
   select_speed: this.state.currSpeed,
   increase_time: moment(this.state.startValue).format('YYYY-MM-DD HH:mm:ss'),
   end_time: moment(this.state.endValue).format('YYYY-MM-DD HH:mm:ss'),
   curr_time: Date.parse(new Date()),
   line_id: this.state.lineId,
   user_id:sessionStorage.getItem("userInfo") && JSON.parse(sessionStorage.getItem("userInfo")).user_id || 1,
   day:this.state.timeRing,
   price:this.props.app.ruleData.price,
  }
  console.log(obj)
  if(obj.line_id == ""){
   message.info("请选择提速专线")
   return
  }
  if(obj.select_speed == ""){
   message.info("请选择提速专线速率")
   return
  }
  if(obj.increase_time == ""){
   message.info("请选择开始时间")
   return
  }
  if(obj.end_time == ""){
   message.info("请选择结束时间")
   return
  }

  if(this.state.timeRing <= 0){
   message.info("请选择时长")
   return
  }
  this.props.dispatch({type:"myPlan/setOrderEstimateEFF",obj});
 }

 componentDidMount() {
  // 当前url参数 专线ID 当前速率 专线号码
  const lineId = sessionStorage.getItem("line_id");
  const minCurrSpeed = Number(sessionStorage.getItem("curr_speed")) + 10;
  const currSpeed = Number(sessionStorage.getItem("curr_speed")) + 10;
  const hlwLineNo = sessionStorage.getItem("hlwLineNo");
  if(lineId && minCurrSpeed && currSpeed && hlwLineNo){
   this.setState({
    lineId,
    minCurrSpeed,
    currSpeed,
    hlwLineNo
   })
  }

 }

 render() {
  const {startValue, endValue, endOpen, minCurrSpeed, lineId, currSpeed} = this.state;
  let ruleData = this.props.app.ruleData
  console.log(ruleData)
  const lineArr = JSON.parse(sessionStorage.getItem("lineArr"))
  return (
   <div className={plan_box}>
    <Row>
     <Col span={3} offset={1}>提速账号</Col>
     <Col span={20}>
      <Select defaultValue={lineId} value={lineId} style={{width: 180}} onChange={this.handleChange}>
       {lineArr.length > 0 ? lineArr.map((list, index) => {
        return (<Option key={index * 10} value={list.line_id.toString()}>{list.hlwLineNo}</Option>)
       }) : ""}
      </Select>
     </Col>
    </Row>
    <Row>
     <Col span={3} offset={1}>提速速率</Col>
     <Col span={15}>
      <Slider marks={this.marks()} defaultValue={minCurrSpeed} style={{width: 480}} dots={true} step={10} min={minCurrSpeed}
              onChange={this.stepChange}/>
     </Col>
     <Col span={3}>已选择带宽 {currSpeed}M</Col>
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
       <span style={{marginLeft: '40px'}}>选择结束时间 </span>
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
    <Row>
     <Col span={3} offset={1}>提速规则</Col>
     <Col span={20} style={{lineHeight: '30px'}}>
      <p>1 按天批价，升速计划不能重叠;</p>
      <p>2 提前4小时预约当天，不足一个自然天按自然天计费;</p>
      <p>3 一次计划选择不能超过30天（含)</p>
      <p>4 预约升速计划需在30(含)自然天内</p>
      <p>5 前后预约计划必须间隔4小时</p>
     </Col>
    </Row>
    <Row style={{padding: '0px', backgroundColor: '#fff'}}>
     <Col span={24} style={{textAlign: "right"}}>预约时长:{this.state.timeRing}天</Col>
    </Row>
    <Row style={{padding: '0px'}}>
     <Col span={24} style={{textAlign: "right"}}>总价:<span style={{color: "#ff6100"}}>{this.state.timeRing * currSpeed * ruleData.price/ruleData.bandwidth}</span>元</Col>
    </Row>
    <Row style={{padding: '0px', backgroundColor: '#fff'}}>
     <Col span={24} style={{textAlign: "right"}}><Button size="large" onClick={this.gotoDetail} style={{
      backgroundColor: "#ff6100",
      color: "#fff"
     }}>立即提速</Button></Col>
    </Row>
   </div>
  );
 }
}


export default connect(({myPlan, app}) => ({myPlan, app}), (dispatch, own) => {
 return {dispatch, own}
})(MyPlan);
