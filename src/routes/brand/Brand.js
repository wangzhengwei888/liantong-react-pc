import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search';
import { brand } from './Brand.less'
import Img from "../../components/Img/Img"
import LeftNav from './LeftNav'
import LeftRightLayout from '../../components/LeftRightLayout/LeftRightLayout';
import { Icon } from 'antd'

// function Children ({children,data}) {
//   return (
//     <div className='brand_body'>
//       <Link to={data[0].headImg.id}><Img src={data[0].headImg.url} className='head_img'/></Link>
//       <div className='retrieval_location'>
//         {
//           data[0].currentLocation ? data[0].currentLocation.map((item,index) => {
//             return <span key={index}>{item}{index < data[0].currentLocation.length-1 ? <Icon type="right" /> : ''}</span>
//           }) : <span>品牌中心</span>
//         }
//       </div>
//       {children}
//     </div>
//   )
// }

class Brand extends Component{
  render () {
    // let { navList } =this.props.home;
    let { leftNav, data } =this.props.brand;
    return (
      <div >
        <div><Search></Search></div>
        <Navigation >{ this.props.children }</Navigation>

      </div>
    )
  }
}
export default connect(({brand,home})=>({brand,home}))(Brand)
