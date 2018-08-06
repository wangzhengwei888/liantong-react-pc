import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Table, Icon, Modal, Carousel, message, Tabs, Row, Col, Tooltip} from 'antd';
import {routerRedux, Link} from 'dva/router';
import Img from '../../components/Img/Img';

import {plan_detail_box} from './myPlan.less';


class PlantDetail extends Component {
 constructor(props) {
  super(props);
  this.state = {}
 }


 render() {
  const {orderInfo} = this.props.myPlan
  let status = orderInfo.status;
  let statusStr = status == 1 ? "未处理" : status == 2 ? "预约中"  : status == 3 ? "提速中" : status == 4 ? "完成" : "取消"
  return (
   <div className={plan_detail_box}>
    <h3 className="title">订单详情</h3>
    <div className="tableBox">
     <Row>
      <Col span={4}>计划编号</Col>
      <Col span={18}>{orderInfo.plan_num}</Col>
     </Row>
     <Row>
      <Col span={4}>专线号码</Col>
      <Col span={18}>{orderInfo.plan_num}</Col>
     </Row>
     <Row>
      <Col span={4}>创建时间</Col>
      <Col span={18}>{new Date(orderInfo.create_at).toLocaleString()}</Col>
     </Row>
     <Row>
      <Col span={4}>生效时间</Col>
      <Col span={18}>{new Date(orderInfo.stime).toLocaleString()}</Col>
     </Row>
     <Row>
     <Col span={4}>失效时间</Col>
     <Col span={18}>{new Date(orderInfo.etime).toLocaleString()}</Col>
    </Row>
     <Row>
      <Col span={4}>签约速率</Col>
      <Col span={18}>{orderInfo.select_speed}</Col>
     </Row>
     <Row>
      <Col span={4}>预约速率</Col>
      <Col span={18}>{orderInfo.sub_speed}</Col>
     </Row>
     <Row>
      <Col span={4}>当前状态</Col>
      <Col span={18}>{statusStr}</Col>
     </Row>
     <Row>
      <Col span={4}>计划总价</Col>
      <Col span={18}>{orderInfo.total_price}</Col>
     </Row>
     <Row>
      <Col span={4}>购买人员</Col>
      <Col span={18}>{orderInfo.plan_num}</Col>
     </Row>
    </div>
   </div>
  );
 }
}


export default connect(({myPlan, app}) => ({myPlan, app}), (dispatch, own) => {
 return {dispatch, own}
})(PlantDetail);
