// 客服中心
import  React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search';
import Img from "../../components/Img/Img"
import LeftNav from './LeftNav'
import LeftRightLayout from '../../components/LeftRightLayout/LeftRightLayout';
import { custom_service } from './CustomService.less'

function Children({children,headImg}) {
  return (
    <div className='custom_service_body'>
      <Link to={headImg.id}><Img src={headImg.url} className='head_img'/></Link>
      <div className='title'>客服中心</div>
      {children}
    </div>
  )
}

class CustomService extends Component{
  render () {
    let { navList } =this.props.home;
    let { leftNav, defaultPageInfo } =this.props.customService;
    return (
      <div className={custom_service}>
        <div><Search></Search></div>
        <Navigation>{ this.props.children }</Navigation>
        {/*<Navigation navList ={navList}></Navigation>*/}
        {/*<LeftRightLayout leftContext={<LeftNav data={leftNav}/>} rightContext={<Children children={this.props.children} headImg={defaultPageInfo[0].headImg}/>}/>*/}
      </div>
    )
  }
}

export default connect(({customService,home})=>({customService,home}))(CustomService)
