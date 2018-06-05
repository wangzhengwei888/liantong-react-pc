import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Radio, Table, Row, Col, Pagination ,Tabs,Input,Button } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { order } from './Order.less'
import Img from "../../components/Img/Img"
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import OrderListFloor from './OrderListFloor'
const TabPane = Tabs.TabPane;

class Order extends Component{
  constructor(props){
    super(props);
    this.state={
      dateType:'week',     
    }
  }
  state = {
    value: 0,
    orderListFilterDate: '1m'
  }
  // onChange = (e) => {
  //   this.setState({
  //     value: e.target.value,
  //   });
  // }
  // changeFilter = (val) => {
  //   this.setState({
  //     orderListFilterDate: val
  //   })
  // }

   //切换Tab
   callback = (key) => {
    console.log(key);
     this.setState({
       dateType:key,
     }) 
     this.props.dispatch({ type:'order/getRecentPurGoodsEEF',
       val:{
         pageNo:1,
         pageSize: '10',
         dateType:key,
       }
     });
   }
   
    //分页
 onChangePage = (pageNumber) => {
  this.setState({
   update: true
  },()=>this.props.dispatch({type: 'order/getRecentPurGoodsEEF', val: {pageNo: pageNumber, pageSize: '10',dateType:this.state.dateType }}))
  window.scrollTo(0,0)
 }

   goPage = () => {
    let maxPage = Math.ceil(this.props.order.total/10)
    let pageNo = this.refs.page.getElementsByTagName("input")[0].value;
    pageNo = pageNo > maxPage ? maxPage : pageNo
    console.log(pageNo)
    if(!!pageNo){
     this.setState({
      update: true
     },()=>this.props.dispatch({type: 'order/getRecentPurGoodsEEF', val: {pageNo: pageNo, pageSize: '10',dateType:this.state.dateType }}))
     window.scrollTo(0,0)
     this.refs.page.getElementsByTagName("input")[0].value = ""
    }
   }

   addCart = (goodsId, goodsPrice) => {
    let val = {
     goodsId: goodsId,
     count: 1,
     goodsPrice: goodsPrice,
     saveType: 0
    }
    console.log(val)
    this.props.dispatch({type: 'order/addCart', val});
   }
  

   

  render () {
    const {getRecentPurGoodsData,personOrderListData, orderListTotal, orderListFilterDate} = this.props.order
    const filterList = [ {
        text: '最近一周', val: '1w'},{
        text: '最近一月',val: '1m'},{
        text: '最近三月',val: '3m'},{
        text: '最近一年',val: '1y'}]
    const { selectedRowKeys, dateType, selectedRows } = this.state;
     console.log(getRecentPurGoodsData);
    return (
      <div>
       <Search></Search>
       <Navigation preson={true}>
          <div className={order}>
            <div className="my_account_dynamic_Topimg"></div>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="/personOrder/order" style={{fontSize:'16px', fontWeight:'bold' }}>常购清单</Breadcrumb.Item>
            </Breadcrumb>
           {/* <div className="filter_bar">
              <ul>
                {filterList.map((item, index) => {
                  return (
                    <li className={item.val == this.state.orderListFilterDate ? 'active' : ''} onClick={() => this.changeFilter(item.val)} key={index}>{item.text}</li>
                  )
                })}
              </ul>
            </div>*/}
            <Tabs defaultActiveKey="1" activeKey={ dateType }  onChange={this.callback}>
              <TabPane tab="最近一周" key="week">
      
                  <div className="orderList_content">
                    <Row className="orderList_content_head">
                      <Col span={10}>基本信息</Col>
                      <Col span={4}>商品属性</Col>
                      <Col span={5}>历史成交价</Col>
                      <Col span={5}>操作</Col>
                    </Row>
                  </div>
                  {!!getRecentPurGoodsData&&getRecentPurGoodsData.length>0 ?
                    <div>
                      {getRecentPurGoodsData.map((list,index)=>{
                        return (  
                          <OrderListFloor data={list || [] } key={index}   addCart={this.addCart} ></OrderListFloor>
                        )
                      })}   
                    </div>  
                    :<p style={{textAlign:"center",margin:'10px'}}>无数据</p>
                  }
                  {
                    !!getRecentPurGoodsData&&getRecentPurGoodsData.length>0 ?
                     <div  ref="page" key={this.props.order.pageNo}  style={{width:'90%',textAlign:'right',margin:'30px 0 100px 0px',position:'relative'}}>
                      <Pagination showQuickJumper
                                  defaultCurrent={1}
                                  defaultPageSize={10}   
                                  total={this.props.order.total}
                                  current={this.props.order.pageNo}
                                  onChange={this.onChangePage}/>
                      <Button onClick={this.goPage} style={{position:'absolute',top:'0px'}}>确定</Button>
            
                     </div> : <p style={{textAlign: 'center', marginTop: '40px', color: '#ccc'}}>没有查找到您要的商品</p>
            
                   }
              </TabPane>
              <TabPane tab="最近一月" key="month">
                 
                  <div className="orderList_content">
                    <Row className="orderList_content_head">
                      <Col span={10}>基本信息</Col>
                      <Col span={4}>商品属性</Col>
                      <Col span={5}>历史成交价</Col>
                      <Col span={5}>操作</Col>
                    </Row>
                  </div>
                  {!!getRecentPurGoodsData&&getRecentPurGoodsData.length>0 ?
                    <div>
                      {getRecentPurGoodsData.map((list,index)=>{
                        return (  
                          <OrderListFloor data={list || [] } key={index}></OrderListFloor>
                        )
                      })}   
                    </div>  
                    :<p style={{textAlign:"center",margin:'10px'}}>无数据</p>
                  }
                  {
                    !!getRecentPurGoodsData&&getRecentPurGoodsData.length>0 ?
                     <div  ref="page" key={this.props.order.pageNo}  style={{width:'90%',textAlign:'right',margin:'30px 0 100px 0px',position:'relative'}}>
                      <Pagination showQuickJumper
                                  defaultCurrent={1}
                                  defaultPageSize={10}   
                                  total={this.props.order.total}
                                  current={this.props.order.pageNo}
                                  onChange={this.onChangePage}/>
                      <Button onClick={this.goPage} style={{position:'absolute',top:'0px'}}>确定</Button>
            
                     </div> : <p style={{textAlign: 'center', marginTop: '40px', color: '#ccc'}}>没有查找到您要的商品</p>
            
                   }
      

              </TabPane>
              <TabPane tab="最近三月" key="3month">
                    <div className="orderList_content">
                      <Row className="orderList_content_head">
                        <Col span={10}>基本信息</Col>
                        <Col span={4}>商品属性</Col>
                        <Col span={5}>历史成交价</Col>
                        <Col span={5}>操作</Col>
                      </Row>
                    </div>
                    {!!getRecentPurGoodsData&&getRecentPurGoodsData.length>0 ?
                      <div>
                        {getRecentPurGoodsData.map((list,index)=>{
                          return (  
                            <OrderListFloor data={list || [] } key={index}></OrderListFloor>
                          )
                        })}   
                      </div>  
                      :<p style={{textAlign:"center",margin:'10px'}}>无数据</p>
                    }
                    {
                      !!getRecentPurGoodsData&&getRecentPurGoodsData.length>0 ?
                       <div  ref="page" key={this.props.order.pageNo}  style={{width:'90%',textAlign:'right',margin:'30px 0 100px 0px',position:'relative'}}>
                        <Pagination showQuickJumper
                                    defaultCurrent={1}
                                    defaultPageSize={10}   
                                    total={this.props.order.total}
                                    current={this.props.order.pageNo}
                                    onChange={this.onChangePage}/>
                        <Button onClick={this.goPage} style={{position:'absolute',top:'0px'}}>确定</Button>
              
                       </div> : <p style={{textAlign: 'center', marginTop: '40px', color: '#ccc'}}>没有查找到您要的商品</p>
              
                     }
              </TabPane>
              <TabPane tab="最近一年" key="year">
                    <div className="orderList_content">
                      <Row className="orderList_content_head">
                        <Col span={10}>基本信息</Col>
                        <Col span={4}>商品属性</Col>
                        <Col span={5}>历史成交价</Col>
                        <Col span={5}>操作</Col>
                      </Row>
                    </div>
                    {!!getRecentPurGoodsData&&getRecentPurGoodsData.length>0 ?
                      <div>
                        {getRecentPurGoodsData.map((list,index)=>{
                          return (  
                            <OrderListFloor data={list || [] } key={index}></OrderListFloor>
                          )
                        })}   
                      </div>  
                      :<p style={{textAlign:"center",margin:'10px'}}>无数据</p>
                    }
                    {
                      !!getRecentPurGoodsData&&getRecentPurGoodsData.length>0 ?
                       <div  ref="page" key={this.props.order.pageNo}  style={{width:'90%',textAlign:'right',margin:'30px 0 100px 0px',position:'relative'}}>
                        <Pagination showQuickJumper
                                    defaultCurrent={1}
                                    defaultPageSize={10}   
                                    total={this.props.order.total}
                                    current={this.props.order.pageNo}
                                    onChange={this.onChangePage}/>
                        <Button onClick={this.goPage} style={{position:'absolute',top:'0px'}}>确定</Button>
              
                       </div> : <p style={{textAlign: 'center', marginTop: '40px', color: '#ccc'}}>没有查找到您要的商品</p>
              
                     }
              </TabPane>
              
            </Tabs>
          </div>
       </Navigation>
      </div>
    )
  }
}

export default connect(({order})=>({order}),(dispatch)=>{return {dispatch}})(Order)
