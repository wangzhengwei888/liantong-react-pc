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



class DrugReagent extends Component{
  render () {
    // let { navList } =this.props.home;
    let { leftNav, data } =this.props.drugReagent;
    return (
      <div >
        <div><Search></Search></div>
        <Navigation>{ this.props.children }</Navigation>      
      </div>
    )
  }
}
export default connect(({drugReagent,home})=>({drugReagent,home}))(DrugReagent)
