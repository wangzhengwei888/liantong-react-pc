import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import LeftNav from './LeftNav'
import Search from '../../components/Search/Search';
import LeftRightLayout from '../../components/LeftRightLayout/LeftRightLayout';
import Img from "../../components/Img/Img"
import Navigation from '../../components/Navigation/Navigation'
import { product } from './Product.less'

// function Children ({children,headImg}) {
//   return (
//     <div className='product_body'>
//       <Link to={`${headImg.id}`}><Img src={headImg.url} className='head_img'/></Link>
//       {children}
//     </div>
//   )
// }

class Product extends Component{
  render () {
    // let { data } =this.props.product;
    return (
      <div className={product}>
        <div><Search></Search></div>

        <Navigation>{ this.props.children }</Navigation>
        {/*<LeftRightLayout leftContext={<ProductLeftNav />} rightContext={<Children children={this.props.children} headImg={data[0].headImg}/>}/>*/}

      </div>
    )
  }
}

Product.propTypes = {

}

export default connect(({product})=>({product}))(Product)
