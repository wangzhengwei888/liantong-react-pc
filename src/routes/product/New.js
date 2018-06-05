import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Pagination } from 'antd'
import { product_new } from './Product.less'
import Img from "../../components/Img/Img";
import { BodyHeadImg } from '../../components/Advertising/Advertising'

class New extends Component{
  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  }
  render () {
    let {pageinfo, data} = this.props.product
    return (
      <div className={product_new}>
       {/* <BodyHeadImg headImg={data[0].headImg}/>*/}
        <div className="new_Topimg">
         <Img src="/static/head/新品上市.jpg"/>
        </div>
        <div className={`${pageinfo.classname}`}>{pageinfo.title}</div>
        <div className='product_new_body'>
          {
            data.length ? data[0].list.map((item,index) => {
              return <div key={index}>
                <Link to={item.goodsId}>
                  <Img src={item.imgUrl}/>
                  <p>{item.goodsName}</p>
                </Link>
              </div>
            }) : null
          }
        </div>
        <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={this.onChange} />
      </div>
    )
  }
}
export default connect(({product})=>({product}))(New)
