/**
 * Created by 10400 on 2017/8/9.
 * 个人中心消息列表
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Tabs, Table, Button,Card,Col, Row,Checkbox } from 'antd';
import { messageList_body } from './giftExchange.less'
const TabPane = Tabs.TabPane;

class  Collection_goods extends Component{
  constructor(props){
    super(props);
    this.state={
      formLayout: 'inline',

    }
  }
  componentDidMount(){

  }

  render (){
    return (
      <div className={messageList_body}>
        <div className="collection_goods_content" style={{width:'980px',float:'right'}}>
          {/*头部单行条*/}
          <div className="used_nva_bar">
            <a href="#">我的商城 > </a>
            <a href="#">站内信 > </a>
            <span>消息列表</span></div>

          <div className="messageList_table">
            <div style={{  padding: '30px' }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="系统消息" extra={<a href="#">查看详情</a>}>
                    <p className="span_title">欢迎广大用户注册登录欢迎广大用户注册登录欢迎广大用户注册登录欢迎广大用户注册登录</p>
                    <p className="span_time">发送时间： 2017-07-06 09:51:51</p>
                    <p style={{textAlign:'right'}}><Button type="primary">未阅读</Button></p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="系统消息" extra={<a href="#">查看详情</a>}>
                    <p className="span_title">欢迎广大用户注册登录欢迎广大用户注册登录欢迎广大用户注册登录欢迎广大用户注册登录</p>
                    <p className="span_time">发送时间： 2017-07-06 09:51:51</p>
                    <p style={{textAlign:'right'}}><Button type="primary" disabled>已阅读</Button></p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="私人消息" extra={<a href="#">查看详情</a>}>
                    <p className="span_title">欢迎广大用户注册登录欢迎广大用户注册登录欢迎广大用户注册登录欢迎广大用户注册登录</p>
                    <p className="span_time">发送时间： 2017-07-06 09:51:51</p>
                    <p style={{textAlign:'right'}}><Button type="primary">未阅读</Button></p>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="私人消息" extra={<a href="#">查看详情</a>}>
                    <p className="span_title">欢迎广大用户注册登录欢迎广大用户注册登录欢迎广大用户注册登录欢迎广大用户注册登录</p>
                    <p className="span_time">发送时间： 2017-07-06 09:51:51</p>
                    <p style={{textAlign:'right'}}><Button type="primary">未阅读</Button></p>
                  </Card>
                </Col>
              </Row>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Collection_goods.propTypes = {
  form: PropTypes.object,
  Collection_goods: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({Collection_goods})=>({Collection_goods}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Collection_goods));
