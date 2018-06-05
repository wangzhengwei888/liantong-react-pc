import React, { Component } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { network_details } from './CustomService.less'

class NetworkDetails extends Component{
  render () {
    let {networkDetails,defaultPageInfo} = this.props.customService
    return (
      <div className={network_details}>
        <BodyHeadImg headImg={defaultPageInfo[0].headImg}/>
        <div className='title'>客服中心</div>
        <div className='network_details_title'>{networkDetails[0].area}： {networkDetails[0].ProvincesCities.length ? networkDetails[0].ProvincesCities.map((item,index) => (`${item}${index<networkDetails[0].ProvincesCities.length-1 ? '， ' : ''}`)) : null}</div>
        <div className='network_details_body'>
          <p>{networkDetails[0].area}公路托运自提网点</p>
          <table>
            <thead>
            <tr>
              <td>省市</td>
              <td>区域</td>
              <td>电话/手机</td>
              <td>地址</td>
            </tr>
            </thead>
            <tbody>
            {
              networkDetails[0].region.length ? networkDetails[0].region.map((item,index) => {
                return (
                  <tr key={index}>
                    <td style={{color:'#3497ce',fontWeight:'bold'}}>{item.ProvincesCities}</td>
                    <td style={{fontWeight:'bold'}}>{item.place}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                  </tr>
                )
              }) : null
            }
            </tbody>
          </table>
          <p>中国试剂网将定期更新各地公路托运自提网点的信息，如有疑问，请致电客服热线021-63210123。</p>
          {/*<Button type="primary" onClick={()=>window.location.href=`${window.location.origin}/customservice/networkinfo`}>返回</Button>*/}
          <Button type="primary" onClick={()=> this.props.history.goBack()}>返回</Button>
        </div>
      </div>
    )
  }
}
export default connect(({customService})=>({customService}))(NetworkDetails)
