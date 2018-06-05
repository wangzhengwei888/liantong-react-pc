/**
 * Created by 10400 on 2017/8/14.
 * 店铺首页页面-头部
 */
import React , { Component } from 'react';
import { Radio, Col, Menu, Tabs, Button, Icon } from 'antd';
import { routerRedux, Link } from 'dva/router';
import {} from '../../routes/store/store.less';
const RadioGroup = Radio.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class  StoreIndexHeader extends Component{
  constructor(props){
    super(props);
    this.state={
      current: 'all_Drug_classification',
    }
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }


  render (){
    let arr = window.location.pathname.split("/").slice(1,3);
    let storePath = arr.join("/");
    return (
      <div className="StoreIndexHeader">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="all_Drug_classification" style={{width:'230px',textAlign:'center',background:'#36a4e1',marginRight:'25px',height:'50px'}}>
            <Link to="javascript:;" rel="noopener noreferrer">全部药品分类</Link>
          </Menu.Item>
          <Menu.Item key="store_index">
            <Link to={`/${storePath}`} activeClassName="active"  rel="noopener noreferrer">店铺首页</Link>
          </Menu.Item>
          <Menu.Item key="store_detail">
            <Link to={`/${storePath}/detail`} activeClassName="active"  rel="noopener noreferrer">店铺详情</Link>
          </Menu.Item>
          <Menu.Item key="store_PlaceOrder">
            <Link to="/quickOrder" activeClassName="active" rel="noopener noreferrer">快速下单</Link>
          </Menu.Item>
          <Menu.Item key="store_information">
            <Link to={`/${storePath}/info`} activeClassName="active"  rel="noopener noreferrer">店铺资讯</Link>
          </Menu.Item>
        </Menu>

      </div>
    )
  }
}
export default StoreIndexHeader;
