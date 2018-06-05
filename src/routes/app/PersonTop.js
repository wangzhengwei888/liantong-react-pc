//个人中心左侧导航
import React , { Component } from 'react';
import { connect } from 'dva';
import { Form,Icon,Button,Menu, Dropdown,Badge} from 'antd';
import { routerRedux,Link } from 'dva/router';
import {DropDownMy} from '../../components/DropDown/DropDown';
import Navigation from '../../components/Navigation/Navigation';
import Search from '../../components/Search/Search';
import TopBar from './topBar';
import { person,person_content} from './PersonTop.less';


const navListLeft = [
  {
  title:'我的订单',
  txt:["订单列表","订单审批","评价晒单"],
  link:['/person/orderList','/person/orderForm','/person/evaluateBask'],
  className:'item0'
  },
  {
    title:'收藏中心',
    txt:["收藏商品","收藏店铺"],
    link:['/person/collection_goods/1','/person/collection_store/2'],
    className:'item1'
  },
  {
    title:'资产中心',
    txt:["余额","优惠券","积分"],
    link:['/person/predepositIndex','/person/urserCoupon','/person/integral'],
    className:'item2'
  },
  {
    title:'客户服务',
    txt:["退款记录","退货记录","我的咨询"],
    link:['/person/backMoney','/person/backGoods','/person/myconsult'],
    className:'item3'
  },
  {
    title:'我的积分',
    txt:["兑换礼品"],
    link:['/person/giftExchange'],
    className:'item4'
  },
  {
    title:'设置',
    txt:["个人信息","修改密码","我的级别","账户安全","采购关系查询","采购模板维护"],
    link:['/person/personalInformation','/person/setPassword','/person/myLevel','/person/setSecurity',"/person/queryChannel","/person/purchaseTemplet"],
    className:'item5'
  },
  // {
  //   title:'设置',
  //   txt:["个人信息","收货地址","修改密码","我的级别","账户安全","采购关系查询","采购模板维护"],
  //   link:['/person/personalInformation','/person/myAddress','/person/setPassword','/person/myLevel','/person/setSecurity',"/person/queryChannel","/person/purchaseTemplet"],
  //   className:'item5'
  // },
  {
    title:'站内信',
    txt:["消息列表"],
    link:['/person/messageList'],
    className:'item6'
  },
  {
    title:'圈子',
    txt:["圈子列表","帖子列表"],
    link:['/person/circleList','/person/circlePostList'],
    className:'item7'
  },
  {
    title:'我的群组',
    txt:["群组管理","项目管理"],
    link:['/person/groupManagement','/home'],
    className:'item8'
  },
]


class PersonTop extends Component{
  constructor(props){
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(e);
    let val = e.target.firstChild.value;
    console.log(val)
    if(val==''){
      val=='';
    }
    window.location.href = `/home/PeoductSearch/keywordSearch/${val}`;
  }
  componentDidMount(){

    this.props.dispatch({ type: 'app/getGoodsClassEFF'});
    this.props.dispatch({ type: 'app/getNavEFF'});
    this.props.dispatch({ type: 'app/getcartCountEFF'});

    this.props.onReady(this.refs.content.scrollHeight);

  }
  onClick = (e) => {
    let eles = e.target.parentNode.parentNode.parentNode.getElementsByTagName("a");
    // eles.map((ele)=>{
    //   ele.style.color = '#666';
    // })
    for(let i = 0; i < eles.length; i++){
      eles[i].style.color = '#666';
    }
    e.target.style.color = '#3497CE';

  }
  logout = () => {
    this.props.logout();
  }

  render(){
    const {goodsClass,navList,cartCountData} = this.props;
     console.log(navList)
    return (
      <div className={person}>
        <div className='nav_top'>
          <TopBar logout={this.logout} />
        </div>
        <div><Search></Search></div>
        <div className='sub_nav'>
          <Navigation data={goodsClass} navList={navList}/>
        </div>
        <div className={person_content} ref='content'>
          <div style={{width:'1200px',margin:'0 auto'}}>
            <div style={{width:'200px',borderBottom:'1px solid #eee'}} className='clearfix'>
              {navListLeft.map((list)=>{
                return(
                  <div className='nav_list' key={list['className']}>
                    <div className={`item ${list['className']}`}>{list['title']}</div>
                    {list['txt'].map((v,i) => {
                      return (
                        <div className='list' key={i} >
                        <Link activeStyle={{ color:"#3497CE" }} to={list['link'][i]}>{v}</Link>
                        </div>
                    )
                  })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default connect(({app})=>({app}),(dispatch,own)=>{return {dispatch,own}})(PersonTop);
