import React,{ Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Progress, Row, Col, Tabs, Pagination } from 'antd'
import { connect } from 'dva'
import { integral_mall } from './IntegralMall.less'
import Img from "../../components/Img/Img";
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'

const TabPane = Tabs.TabPane

class IntegralMall extends Component{
  constructor(){
    super()
    this.state={
      default: true,
      selCondition:[],
      ascending: true
    }
  }
  componentWillReceiveProps(nextState){
    let { integralMall } = nextState.integral
    if(integralMall.length && this.state.default){
      let selCondition = []
      integralMall[0].filterList.forEach(item => selCondition.push(-1))
      this.setState({selCondition,default:false})
    }
  }
  onClick = (i,s) => {
    let newSelCondition = [...this.state.selCondition]
    newSelCondition[i] = s
    this.setState({
      selCondition: newSelCondition
    })
  }
  onChange = (pageNumber,pageSizeOptions) => {
    console.log('Page: ', pageNumber,pageSizeOptions);
  }
  addCart = (id) => {
    // this.props.dispatch({ type: 'integral/addCartEFF', id})
  }
  Ascending = () => {
    this.setState({ascending: true})
  }
  Descending = () => {
    this.setState({ascending: false})
  }
  render(){
    let { account,integralMall } = this.props.integral
    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={integral_mall}>
           <div className="my_account_dynamic_Topimg"></div>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="">我的积分</Breadcrumb.Item>
              <Breadcrumb.Item>积分商城</Breadcrumb.Item>
            </Breadcrumb>
            <div className='integral_mall_body'>
              <p className='available_integral'>我的可用积分： <span>{account[0].doIntegral}</span> 分</p>
              <div className='commodity_filter'>
                {
                  integralMall[0] ? integralMall[0].filterList.map((item,index) => {
                    return (
                      <Row key={item.id}>
                        <Col span={2}>{item.filterName}：</Col>
                        <Col span={21}>
                          <p><span className={this.state.selCondition[index]==-1 ? 'sel_condition' : ''} onClick={()=>this.onClick(index,-1)}>全部</span></p>
                          {
                            item.condition.map((i,s) => {
                              return <p key={s}><span className={this.state.selCondition[index]==s ? 'sel_condition' : ''} onClick={()=>this.onClick(index,s)}>{i}</span></p>
                            })
                          }
                        </Col>
                      </Row>
                    )
                  }) : null
                }
              </div>
              <div>
                <div className='integral_commodity_nav'>
                  <div className={this.state.ascending ? 'integral_commodity_sort' : ''} onClick={()=>this.Ascending()}>积分 <span>↑</span></div>
                  <div className={this.state.ascending ? '' : 'integral_commodity_sort'} onClick={()=>this.Descending()}>积分 <span>↓</span></div>
                  <p>总共 <span>{integralMall[0] ? integralMall[0].goodsTotal : 0}</span> 条记录</p>
                </div>
                <Row gutter={16} className='integral_commodity_list'>
                  {
                    integralMall[0] ? integralMall[0].goodsList.map(item => {
                      return (
                        <Col className="gutter-row" span={6} key={item.goodsId}>
                          <div className="gutter-box">
                            <Img src={item.img} onClick={()=>window.location.href=`${window.location.pathname}/${item.goodsId}`}/>
                            <b>{item.title}</b>
                            <p>兑换积分：{item.integral} 分</p>
                            <button onClick={()=>this.addCart(item.goodsId)}>加入购物车</button>
                          </div>
                        </Col>
                      )
                    }) : null
                  }
                </Row>
                <Pagination showQuickJumper defaultCurrent={1} total={500} pageSize={12} onChange={this.onChange} />
              </div>
            </div>
          </div>
        </Navigation>
      </div>
    )
  }
}

export default connect(({integral})=>({integral}),(dispatch)=>{return {dispatch}})(IntegralMall)
