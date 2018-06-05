import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Progress, Row, Col, Icon, Table } from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { gift_shopping_cart } from './GiftShoppingCart.less'
import Img from "../../components/Img/Img";
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'

class GiftShoppingCart extends Component{
  constructor(props){
    super(props)
    this.state = {
      columns : [{
        title: '礼品信息',
        dataIndex: 'giftInfo',
        className: 'column-giftInfo',
        width: 370,
        render: (text,record) => <div className='giftInfo'>
          <Img src={text.url}/>
          <div>
            <b>{text.title}</b>
            <p>{text.introduce}</p>
          </div>
        </div>
      }, {
        title: '兑换积分',
        dataIndex: 'integral',
        render: (text) => <span>{text}积分</span>
      }, {
        title: '数量',
        width: 148,
        dataIndex: 'num',
        render: (text,record,index) => (
          <div className='column_num'>
            <div><Icon type="minus" onClick={(e)=>this.onChange(index,e,-1)}/></div>
            <input value={text} style={{textAlign:'center'}} onChange={(e)=>this.onChange(index,e)}/>
            <div><Icon type="plus" onClick={(e)=>this.onChange(index,e,1)} /></div>
          </div>
        )
      }, {
        title: '积分小计',
        width: 148,
        dataIndex: 'subtotal',
        render: (text) => <span>{text}积分</span>
      }, {
        title: '操作',
        dataIndex: 'delete',
        render: (text,record,index) => <span onClick={()=>this.delete(record.goodsId,index)}>删除</span>
      }],
      popup: false
    }
  }
  delete = (goodsId,index) => {
    // this.props.dispatch({type: 'integral/delGiftCarEFF', goodsId, index})
  }
  onChange = (index,e,num) => {
    let giftCart = this.props.integral.giftCart[0].goods.slice()
    let oldSubtotal = Number(giftCart[index].subtotal)
    let newNum = num ? Number(giftCart[index].num)+Number(num) : e.target.value
    let newSubtotal = giftCart[index].integral * newNum
    let subtract = newSubtotal - oldSubtotal
    let re = /^[0-9]{0,7}$/
    if(re.test(newNum)){
      giftCart[index] = {
        ...giftCart[index],
        num:newNum,
        subtotal: newSubtotal
      }
      this.props.dispatch({ type: 'integral/change', giftCart, subtract })
    }
  }
  onSubmit = (total) => {
    let {account} = this.props.integral
    console.log(total)
    if(total<account[0].doIntegral){
      window.location.href = '/personIntegral/giftOrder'
    }else{
      this.setState({popup:true})
    }
  }
  render(){
    let { giftCart,account } = this.props.integral
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={gift_shopping_cart}>
            <div className="my_account_dynamic_Topimg"></div>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="">我的积分</Breadcrumb.Item>
              <Breadcrumb.Item>礼品购物车</Breadcrumb.Item>
            </Breadcrumb>
            <div className='gift_cart_body'>
              <Row className='gift_cart_body_title'>
                <Col span={20}>我的可用积分： <span>{account[0].doIntegral}</span> 分</Col>
                <Col span={4} style={{textAlign:'right'}}><Link to=''>返回继续兑换<Icon type="right" /></Link></Col>
              </Row>
              <Table
                columns={this.state.columns}
                dataSource={giftCart[0].goods}
                bordered
                pagination={false}
                rowKey={(e)=> e.goodsId}
              />
              <div className='gift_cart_settlement'>
                <span>共{giftCart[0].goods.length}件礼品，积分总计 <b>{giftCart[0].total}</b> 分</span>
                <button onClick={()=>this.onSubmit(giftCart[0].total)}>立即结算</button>
              </div>
            </div>
            {this.state.popup ? <div className='gift_cart_shade'>
              <div className='gift_cart_popup'>
                <p>积分不足，请重新选择礼品!</p>
                <button onClick={()=>this.setState({popup:false})}>确定</button>
              </div>
            </div> : ''}
          </div>
        </Navigation>
      </div>
    )
  }
}

export default connect(({integral})=>({integral}),(dispatch)=>{return {dispatch}})(GiftShoppingCart)
