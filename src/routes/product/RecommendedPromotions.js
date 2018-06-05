import Reacat, {Component} from 'react'
import Img from "../../components/Img/Img"
import {connect} from 'dva'
import {Pagination, Icon} from 'antd'
import {Link} from 'dva/router'
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import {product_recommendedpromotions} from './Product.less'

class RecommendedPromotions extends Component {
 onChange = (pageNumber) => {
  // this.props.dispatch({ type: 'product/getEnrollmentEFF', page:{pageSize:10, pageNo:pageNumber}})
 }

 render() {
  let {pageinfo, data} = this.props.product;
  console.log(pageinfo)
  return (
   <div className={product_recommendedpromotions}>
    {pageinfo.sel ? pageinfo.sel === 1 ?
     <div>
      <div className="accurate_Topimg"></div>
      {/*<div className="recommend_Topimg">*/}
       {/*<Img src="/static/head/促销清仓.jpg"/>*/}
      {/*</div>*/}
      <div className={`${pageinfo.classname}`}>{pageinfo.title}</div>
      <ul className='product_recommend_body'>
       {
        data.length ? data[0].list.map((item, index) => {
         return <li key={index}>
          <Img src={item.imgUrl}/>
          <div>
           <b>{item.goodsName}</b>
           <p>{item.goodsProfile}</p>
           <Link to={item.goodsId}>查看详情<Icon type="right"/></Link>
          </div>
         </li>
        }) : null
       }
      </ul>
     </div> : pageinfo.sel === 2 ?
      <div>
       <div className="recommend_Topimg">
        <Img src="/static/head/促销清仓.jpg"/>
       </div>
       <div className={`${pageinfo.classname}`}>{pageinfo.title}</div>
       <ul className='product_promotions_body'>
        {
         data.length ? data[0].list.map((item, index) => {
          return <li key={index}>
           <Img src={item.imgUrl}/>
           <div>
            <b><span
             style={{color: item.clearing === 1 ? '#ff0000' : ''}}>{item.clearing === 1 ? '[清仓]' : '[促销]'}</span> {item.goodsName}
            </b>
            <p>{item.goodsProfile}</p>
            <Link to={item.goodsId}>查看详情<Icon type="right"/></Link>
           </div>
          </li>
         }) : null
        }
       </ul>
      </div> : pageinfo.sel === 3 ?
       <div>
        <div className="recommend_Topimg">
         <Img src="/static/head/活动报名.jpg"/>
        </div>
        <div className={`${pageinfo.classname}`}>{pageinfo.title}</div>
        <ul className='product_enrollment_body'>
         {
          data.length ? data[0].list.map((item, index) => {
           return <li key={index}>
            <Img src={item.imgUrl}/>
            <div>
             <b>{item.activityName}</b>
             <p>{item.activityContent}</p>
             <Link to={`/product/enrollment/${item.activityId}`}>查看详情<Icon type="right"/></Link>
            </div>
           </li>
          }) : null
         }
        </ul>
       </div> : null : null
    }
    <Pagination showQuickJumper defaultCurrent={1} total={500} onChange={this.onChange}/>
   </div>
  )
 }
}

export default connect(({product}) => ({product}))(RecommendedPromotions)
