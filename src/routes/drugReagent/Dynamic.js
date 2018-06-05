import React, { Component } from 'react'
// import { brand_dynamic } from './Brand.less'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { connect } from 'dva'
import { Icon } from 'antd'
import Img from "../../components/Img/Img";

class Dynamic extends Component{
  render () {
    const { data } = this.props.drugReagent
    return (
      <div >
        <BodyHeadImg headImg={data[0].headImg}/>
        <div>
           <span>国药试剂</span>          
        </div>  
        <div>      
            <p>活数据</p>
            <p>活数据</p>
            <p>这是动态页面</p>
        </div>   
      </div>
    )
  }
}
export default connect(({drugReagent})=>({drugReagent}),(dispatch)=>{return {dispatch}})(Dynamic)
