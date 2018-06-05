import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';
import {my_account} from './MyAccount.less'
const FormItem = Form.Item;


class MyAccount extends Component {
 constructor (props) {
  super(props);
  this.state = {
   type: 1,
  }
 }

 render () {
  const { type } = this.state;
 // let { dataz } = this.props.security
  let data = this.props.security.data;
  let info=data && data.data[0] ? data.data[0] : {}
  let starO = info.memberGradeId == '4a580e21232b4095acb5e6ea72dcb278' ? [1] : info.memberGradeId == 'cbaa2a6d5a134bb6b053148ecd01bbbf' ? [1,1] :info.memberGradeId == '3f7961618e1645148af600ebba6b075c' ? [1,1,1] :info.memberGradeId == 'b4930da8fc6745d8b0810f6303937119' ? [1,1,1,1] : []
  console.log(info)
  return (
   <div>
    <Search></Search>
    <Navigation preson={true}>
     <div className={my_account}>
     <div className="my_account_dynamic_Topimg"></div>
     {/* <BodyHeadImg headImg={{url:'/upload/img/lmadv/1508217294561.png',id:'234'}}/>*/}
      <div>
       <div className='account_info'>
        <div className="welcome">欢迎您，<span>{info.memberName}</span></div>
        <div className="last_login_time">上次登录时间：<span>{info.memberOldLoginTimeStr}</span></div>
        <div className="company_name">公司名称：<span>{info.sinoOrgName}</span></div>
        <div className="membership_grade">会员等级：{type == 1 ? <div>{
         starO.map((item,index) => {
          return <i key={index}></i>
         })
        }<a href="/customservice?parentId=6&articleId=9f64d668b45e4fb7b801f7eceb0dd8e0&headImage=/static/head/customService_dynamic_Topimg.jpg">查看会员等级说明</a></div> : <span>{info.memberGradeName}</span>}</div>
        <div className="available_points">可用积分：<span>{info.memberConsumePoints}</span></div>
        {/*{type == 3 ? <div className="group">所属群组：<span>国药集团化学试剂有限公司</span></div> : null}*/}
       </div>
       <ul className="remind_list">
        <li>
         <div>账户安全性提醒：</div>
         <div><a href="/presonAccount/presonAccount">立即前往</a></div>
         {(info.memberEmail==''&&info.memberMobile=='')? <p>您的账户安全等级较低，请尽快绑定您的手机和邮箱，确保您的账户安全。</p>:(info.memberEmail==undefined || info.memberMobile==undefined?<p>您的账户安全等级中等，您可以通过绑定您的邮箱或手机来提高账户安全级别</p>:<p>您的账户安全等级高</p>)}

        </li>
        <li>
         <div>资质更新提醒：</div>
         <div><a href="/presonAccount/intelligentUp">立即前往</a></div>
         <p>{info.attachmentIsEnd && info.attachmentIsEnd == "1" ? "您有部分资质已经过期，请尽快更新，否则可能会影响您的订单处理进程。" : "暂没有快过期资质" }</p>
        </li>
       </ul>
      </div>
     </div>
    </Navigation>
   </div>
  )
 }
}

export default connect(({security})=>({security}),(dispatch)=>{return {dispatch}})(Form.create()(MyAccount))
