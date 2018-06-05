import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Button, Table, Row, Col, Pagination } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { consult_detail } from './ConsultDetail.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import ConsultDetailFloor from './ConsultDetailFloor'

class ConsultDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

 //加入询价单
 goInquiry = (val) => {
  this.props.dispatch({ type:'ConsultDetail/addInquiryEFF' , val});
 }
 addCart = (val) => {
  this.props.dispatch({type: 'ConsultDetail/addCartEFF', val})
 }

  render() {
    const { personConsultDetail } = this.props.ConsultDetail;
    console.log(personConsultDetail)
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={consult_detail}>
            <BodyHeadImg headImg={{url:'/upload/img/lmadv/1508217294561.png',id:'234'}}/>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="/personOrder/myConsultList" style={{fontSize:'16px', fontWeight:'bold' }}>我的询价单</Breadcrumb.Item>
              <Breadcrumb.Item>询价单详情</Breadcrumb.Item>
            </Breadcrumb>
            <div className="list_area">
              <p className="content_title">询价单信息：</p>
             {personConsultDetail.length>0 ?
              <div className="list_detail">
               <p>询价单编号：{personConsultDetail[0].quoteSn}</p>
               <p>询价单提交时间：{personConsultDetail[0].createTimeStr}</p>
               <p>询价单状态：<span style={{color: '#3599BB'}}>{personConsultDetail[0].quoteStatus == 0 ? "未报价" : personConsultDetail[0].quoteStatus == 1 ? "已报价" : "已取消"}</span></p>
               <p style={{color: 'red'}}>以下报价均为产品不含运费价格，产品运输费用需另行计算，点击查看详情>></p>
              </div>
              : <p style={{textAlign:'center'}}>无信息</p>
             }

            </div>
            <div className="list_area">
              <p className="content_title">询价清单：</p>
              <div className="orderList_content">
                <Row className="orderList_content_head">
                  <Col span={1}>行号</Col>
                  <Col span={7}>商品信息</Col>
                  <Col span={4}>商品属性</Col>
                  <Col span={2}>成交单价（元）</Col>
                  <Col span={2}>数量</Col>
                  <Col span={2}>小计</Col>
                  <Col span={2}>有效期</Col>
                 <Col span={2}>备注</Col>
                  <Col span={2}>操作</Col>
                </Row>
              </div>
              <div>
               {personConsultDetail.length > 0 && personConsultDetail[0].enquiryList && personConsultDetail[0].enquiryList.length > 0 ?
                <ConsultDetailFloor addCart={(val) => {this.addCart(val)}} goInquiry={(val)=>{this.goInquiry(val)}} data={personConsultDetail[0].enquiryList || [] } isQuote={false}></ConsultDetailFloor> :
                <p style={{textAlign:'center'}}>无数据</p>
               }

              </div>
            </div>
           {personConsultDetail.length > 0 && personConsultDetail[0].quoteList && personConsultDetail[0].quoteList.length > 0 ?
           <div className="list_area">
             <p className="content_title">报价清单：</p>
             <div className="orderList_content">
              <Row className="orderList_content_head">
               <Col span={1}>行号</Col>
               <Col span={7}>商品信息</Col>
               <Col span={4}>商品属性</Col>
               <Col span={2}>成交单价（元）</Col>
               <Col span={2}>数量</Col>
               <Col span={2}>小计</Col>
               <Col span={2}>有效期</Col>
               <Col span={2}>备注</Col>
               <Col span={2}>操作</Col>
              </Row>
             </div>
             <div>
              {personConsultDetail.length > 0 && personConsultDetail[0].quoteList && personConsultDetail[0].quoteList.length > 0 ?
               <ConsultDetailFloor addCart={(val) => {this.addCart(val)}} goInquiry={(val)=>{this.goInquiry(val)}} data={personConsultDetail[0].quoteList || [] } isQuote={true}></ConsultDetailFloor> :
               <p style={{textAlign:'center'}}>无数据</p>
              }
             </div>
            </div>
            : ""
           }
          </div>
        </Navigation>
      </div>
    )
  }
}

export default connect(({ ConsultDetail }) => ({ ConsultDetail }), (dispatch) => { return { dispatch } })(ConsultDetail)
