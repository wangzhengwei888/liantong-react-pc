import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Menu, Icon, Spin} from 'antd';
import {app_all, person} from './App.less';
import DevTools from '../../utils/DevTools';
import TopBar from './topBar';
import {routerRedux} from 'dva/router';
//个人中心的头部和底部
import Img from '../../components/Img/Img';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   positionH: 0,
   advertising: true
  }
 }

 componentDidMount() {
  let winH = document.documentElement.clientHeight || document.body.clientHeight;
  localStorage.setItem("winH",winH)
 }

 ChangePosition = (h) => {
  this.setState({
   positionH: -h
  })
 }
 logout = () => {
  this.props.dispatch({type: 'app/logout'})
 }
 shutDown = () => {
  this.setState({
   advertising: false
  })
 }

 componentWillReceiveProps(nextProps){
  //当路由切换时
  if(this.props.location  !== nextProps.location ){
   window.scrollTo(0,0)
  }
 }

 render() {
  const {
   loading,
   app,
   own,
   dispatch,
  } = this.props;
  const {havTop = true} = this.props.children.props.route;
  return (
   <div>
     <div className={app_all}>
      {havTop == true ? <div className="app_top"><TopBar logout={this.logout} data = {app.data}/></div> : ''}
      <div className="app_body">
       <Spin spinning={loading.global} style={{position: 'fixed'}}>
        <div style={{
         width: '100%'
        }}>{this.props.children}</div>
       </Spin>
                {/*{ TOOL==="DEV" ? <DevTools/> :""}*/}

      </div>
     </div>
   </div>
  )
 }
}

App.propTypes = {};

export default connect(({loading, app, home}) => ({loading, app, home}), (dispatch, own) => {
 return {dispatch, own}
})(App);


