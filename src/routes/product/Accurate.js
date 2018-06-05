import React, { Component } from 'react'
import { connect } from 'dva'
import { accurate_search } from './Product.less'
import { Row, Col } from 'antd'
import WrappedAdvancedSearchForm from './WrappedAdvancedSearchForm'
import { BodyHeadImg } from '../../components/Advertising/Advertising';
import Img from "../../components/Img/Img"

import {routerRedux} from 'dva/router';



class Accurate extends Component{
  constructor(props) {
    super(props);
    this.state = {
     moveToTop: false,
   
    }
   }

  goSearch = (goodsName) =>{

    let values ="filterName="+goodsName+''
    this.props.dispatch(routerRedux.push(`/home/PeoductSearchTwo?${values}`));
     //  this.props.dispatch({type: 'product/getGoodsListExactEFF', val:{filterName:goodsName}});
 }



  render () {
    let {pinyin,data} = this.props.product
    return (
      <div className={accurate_search}>
       {/*<BodyHeadImg headImg={data[0].headImg}/>*/} 
        <div className="accurate_Topimg"></div>
     
        <div className='search_title'>精确搜索</div>
        <WrappedAdvancedSearchForm/>
        <div className='pinyin_detection'>
          <div className='pinyin_title'>试剂品名中文字尾——拼音检测表</div>
          <div>
            <Row type="flex" justify="start">
             
              {
                pinyin.length ? pinyin.map((val,index) => {
                  return <Col span={3} key={index}>
                             <li  onClick={() => this.goSearch(val.goodsName)}  style={{color:'#000'}} >   
                               <a style={{color:'#000',cursor:'pointer'}}>{val.goodsName}</a>  
                             </li>
                                       
                  </Col>
                }) : null
              }
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({product})=>({product}))(Accurate)
