import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Menu, Icon, Spin} from 'antd';
import {app_all, person} from './App.less';
import DevTools from '../../utils/DevTools';
import Bottombar from './bottombar';
import TopBar from './topBar';
import {routerRedux} from 'dva/router';
//个人中心的头部和底部
import PersonTop from './PersonTop';
import PersonBottom from './PersonBottom';
import {HeadAdvertising} from '../../components/Advertising/Advertising'
import CustomRight from '../../components/CustomRight/CustomRight';
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
  // console.log(this.props)
  const {havTop = true, havBottom = true, preson = false, havHeadAdvertising = false} = this.props.children.props.route;
  //const advListImgUrl= app.advList[0].indexTop[0].advList[0].resUrl
  //  advList.length > 0 && advList[0].topbanner[0].advList.length > 0 ?
  //   console.log(app.advList.indextop
  //const advList= app.advList[0].indexTop[0]
  //  console.log(advList)
  // console.log(app.navList)
  return (
   <div>
    {preson == false ?
     <div className={app_all}>
      {havTop == true ? <div className="app_top"><TopBar logout={this.logout}/></div> : ''}
      {
       havHeadAdvertising ? this.state.advertising ?
        <HeadAdvertising shutDown={this.shutDown} imgUrl={app.advList}/> : null : null
      }
      {/*    {this.state.advertising ? <HeadAdvertising shutDown={this.shutDown} imgUrl={app.advList} /> : null}  */}
      <div className="app_body">
       <Spin spinning={loading.global} style={{position: 'fixed'}}>
        <div style={{
         // overflow:"hidden",
         width: '100%'
        }}>{this.props.children}</div>
       </Spin>
                { TOOL==="DEV" ? <DevTools/> :""}

      </div>

      {havBottom == true ? <div className="app_bottom">
       <div><Bottombar/></div>
      </div> : ''}
     </div>
     :
     <div className={person}>
      {havTop == true ?
       <div><PersonTop goodsClass={app.goodsClass} navList={app.navList} cartCountData={app.cartCountData}
                       onReady={this.ChangePosition} logout={this.logout}/></div> : ''}

      <div className='person_body'>
       <div className='person_right' style={{top: this.state.positionH}}>
        <Spin spinning={loading.global} style={{position: 'fixed'}}>
         {this.props.children}
        </Spin>
        {havBottom == true ?
         <div style={{position: 'absolute', bottom: '-180px'}}><PersonBottom linkUrlData={app.linkUrlData}/></div> : ''}
       </div>
            {/*   { TOOL==="DEV" ? <DevTools/> :""}  */}
      </div>
     </div>
    }

    <CustomRight/>
   </div>
  )
 }
}

App.propTypes = {};

export default connect(({loading, app, home}) => ({loading, app, home}), (dispatch, own) => {
 return {dispatch, own}
})(App);


