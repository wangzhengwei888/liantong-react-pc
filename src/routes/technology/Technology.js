import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search';
// import { brand } from './Brand.less'
import Img from "../../components/Img/Img"
import LeftNav from './LeftNav'
import LeftRightLayout from '../../components/LeftRightLayout/LeftRightLayout';
import { Icon } from 'antd'



class Technology extends Component{
  render () {
    let { leftNav, data } =this.props.technology;
    return (
      <div >
        <div><Search></Search></div>
        <Navigation>{ this.props.children }</Navigation>
      </div>
    )
  }
}
export default connect(({technology,home})=>({technology,home}))(Technology)
