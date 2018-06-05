import React , { Component } from 'react';
import { routerRedux,Link } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Menu, Dropdown, Button, Icon,message } from 'antd';
import { top_bar } from './topBar.less'
import { getCookie} from '../../utils/common';


const menu = (
  <Menu style={{ top:'-4px' }}>
    <Menu.Item key="1"><Link to="/personOrder/favList">商品收藏</Link></Menu.Item>
    {/*<Menu.Item key="2"><Link to="/person/collection_store/2">店铺收藏</Link></Menu.Item>*/}
    {/*<Menu.Item key="3">3d menu item</Menu.Item>*/}
  </Menu>
);




class  TopBar extends Component{
  constructor(props){
    super(props);
  }
  logout = () => {
    this.props.logout()
  }


  render (){
    const userName = localStorage.getItem('userName');
   const toke = localStorage.getItem('token');
   // console.log(toke)
    return (
      <div className={top_bar}>
        <Row>
          <Col span={6} className='bar_left'>您好！欢迎来到国药集团化学试剂有限公司</Col>
          <Col span={18}>
            <Row type="flex" justify="end">
              <Col span={12} style={{textAlign:'right'}}>
                {userName && toke!=null ? <div className="sc_con huanyi"> 欢迎 <b>{userName}</b> 光临本店<span className='logout' onClick={this.logout}>【退出】</span></div> :
                  <div className="sc_con huanyi"> <Link to={'/login'} style={{color:'#264a94'}}>【请登录】</Link><Link to={'/loginRegister'} style={{color:'#264a94'}} className='sc_may'>【注册】</Link></div>}
              </Col>
              <Col span={3} className="hover_dorp" style={{width:'12%'}}>
                <div className="sc_con" >
                  <div className="sc_may">
                    <Link to="/personOrder/cart"><Icon type="shopping-cart" />{' '}我的购物车</Link>
                  </div>
                </div>
              </Col>
              <Col span={3} className="hover_dorp" style={{width:'10%'}}>
                <div className="sc_con" >
                  <div className="sc_may">
                    <Link to="/personOrder/myOrder">
                      <Icon type="edit" />{' '}我的订单{' '}
                    </Link>
                  </div>
                </div>
              </Col>
              <Col span={3} className="hover_dorp">
                <Dropdown overlay={menu}>
                  <div className="sc_con" >
                    <div className="sc_may">
                      <Icon type="star-o" />{''}<span style={{margin:'0px 2px'}}>收藏夹</span>
                    </div>
                  </div>
                </Dropdown>
              </Col>
              <Col span={3} className="hover_dorp">
                <div className="sc_con" >
                  <div className="sc_may">
                    <span style={{margin:'0px 2px',cursor:'pointer'}}>
                        <a href='http://en.reagent.com.cn/'  target="_blank" style={{cursor:'point'}}>英语版</a>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
export default TopBar;
