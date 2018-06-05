import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { network_info } from './CustomService.less'

class NetworkInfoList extends Component{
  render () {
    let {networkList,defaultPageInfo} = this.props.customService
    return (
      <div>
        <BodyHeadImg headImg={defaultPageInfo[0].headImg}/>
        <div className='title'>客服中心</div>
        <div className={network_info}>
          <div className='network_info_title'>物流提货网店信息</div>
          <ul>
            {
              networkList[0].infoList ? networkList[0].infoList.map((item,index)=>{
                return <li key={index}><Link to={`${window.location.pathname}/${item.infoId}`}>
                  {item.region}： {item.ProvincesCities.map((ProvincesCities,index) => {
                  return <span key={index+420}>{ProvincesCities}{index<item.ProvincesCities.length-1 ? '， ' : null}</span>
                })}
                </Link></li>
              }) : null
            }
          </ul>
          <div className='network_info_footer'>
            <div>总共{networkList[0].num}条记录-当前页： {networkList[0].currentPage}/{networkList[0].totalPage} [{networkList[0].currentPage}]</div>
            <p>您可以点击您所在地区分类，查看当地公路托运提货网点的详细信息。</p>
            <p>中国试剂网将定期更新各地公路托运自提网点的信息，如有疑问，请致电客服热线021-63210123。</p>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(({customService})=>({customService}))(NetworkInfoList)
