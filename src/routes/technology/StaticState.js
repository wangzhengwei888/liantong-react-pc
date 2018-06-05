import React, { Component } from 'react'
import { connect } from 'dva'
// import { static_state } from './Brand.less'
import { Icon } from 'antd'
import { BodyHeadImg } from '../../components/Advertising/Advertising'

class StaticState extends Component{
  render () {
    const { data } = this.props.brand
    return (
      <div className={static_state}>
        <BodyHeadImg headImg={data[0].headImg}/>
        <div className='retrieval_location'>
          {
            data.length ? data[0].currentLocation.map((item,index) => {
              return <span key={index}>{item}{index < data[0].currentLocation.length-1 ? <Icon type="right" /> : ''}</span>
            }) : <span>品牌中心</span>
          }
        </div>
        <ul className='brand_menu'>
          {
            data.length ? data[0].fourLevel.map((item,index) => {
              return <li key={index} className={item.current===1 ? 'current_menu' : 'other_menu'}>{item.title}</li>
            }) : null
          }
        </ul>
      </div>
    )
  }
}
export default connect(({brand})=>({brand}))(StaticState)
