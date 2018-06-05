import React, { Component } from 'react'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { Breadcrumb, Progress } from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { security_home } from './SecurityHome.less'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import { getSecurityInfoAPI} from './api'


class SecurityHome extends Component{
 constructor(props){
  super(props)
  this.state = {
   //data:{}

  }
  }

  render () {
   let datas = this.props.security.data
    let {pathname} = this.props.location
   let spc=datas && datas.data[0] ? datas.data[0] : {}
   console.log(spc)

    return (
      <div>
        <Search></Search>
        <Navigation preson={true}>
          <div className={security_home}>
            <div className="my_account_dynamic_Topimg"></div>
            <Breadcrumb separator=">" className='security_nav_bar'>
              <Breadcrumb.Item href="/presonAccunt/myAccount">我的账户</Breadcrumb.Item>
              <Breadcrumb.Item href="/presonAccount/personalInformation">我的信息</Breadcrumb.Item>
              <Breadcrumb.Item href='/presonAccount/presonAccount' style={{fontSize:'16px', fontWeight:'bold' }}>账户安全性</Breadcrumb.Item>
            </Breadcrumb>
            <div className='security_grade'>
              <b>账户安全等级：</b>&nbsp;&nbsp;<span >{(!spc.memberEmail  && !spc.memberMobile )?'低':(!spc.memberEmail  || !spc.memberMobile  ? '中':'高')}</span>&nbsp;&nbsp;&nbsp;
             <Progress  className={(!spc.memberEmail && !spc.memberMobile )?'bg1':(!spc.memberEmail || !spc.memberMobile)?'bg2':'bg3'} percent={(!spc.memberEmail && !spc.memberMobile )?33:(!spc.memberEmail || !spc.memberMobile)?66:99} showInfo={false} strokeWidth={12} />
              <p>您目前的账户安全级别{(!spc.memberEmail && !spc.memberMobile)?'低等，您可以通过绑定您的邮箱或手机来提高账户安全级别':(!spc.memberEmail  || !spc.memberMobile  ?'中等，您可以通过绑定您的邮箱或手机来提高账户安全级别':'高等')}</p>
            </div>
            <div className='bind_mode_list'>
              <div className='bind_mode'>
                <div className='bind_mode_bg login_img'><div className='success_img'></div></div>
                <b>登录密码</b>
                <div className='bind_state_detail'>
                  <p className='bind_state'>已设置</p>
                  <p>您的密码越复杂越安全，建议您定期更换密码，且设置一个包含数字和字母，并且长度大于6位的密码。</p>
                </div>
                <div className='button'><Link to={`${pathname}/setPassword`}>修改密码</Link></div>
              </div>
              <div className={`bind_mode ${spc.memberEmail ? 'complete' : 'not_completed'}`}>
                <div className='bind_mode_bg email_img'>
                  <div className={ `${spc.memberEmail? 'success_img' : 'not_success_img'}`}></div>
                </div>
                <b>邮&#12288;&#12288;箱</b>
                <div className='bind_state_detail'>
                  <p className='bind_state'>{spc.memberEmail ? '已绑定' : '未绑定'}</p>
                  <p>当您忘记您的账户密码时，我们会根据您的申请，将动态验证码发送到您绑定的邮箱中，帮助您快速重置密码。如未绑定邮箱，可能将无法接受到订单和产品推广的邮件通知。</p>
                </div>
                {spc.memberEmail ? <div className='button'><Link to={`${pathname}/removeEmail`}>解绑</Link></div> : <div className='button bind_button'><Link to={`${pathname}/bindingEmail`}>绑定</Link></div>}
              </div>
              <div className={`bind_mode ${spc.memberMobile ? 'complete' : 'not_completed'}`}>
                <div className='bind_mode_bg phone_img'>
                  <div className={`${spc.memberMobile ? 'success_img' : 'not_success_img'}`}></div>
                </div>
                <b>手&#12288;&#12288;机</b>
                <div className='bind_state_detail'>
                  <p className='bind_state'>{spc.memberMobile ? '已绑定' : '未绑定'}</p>
                  <p>当您忘记您的账户密码时，我们会根据您的申请，将动态验证码发送到您绑定的手机中，帮助您快速重置密码。绑定手机后，您可享受平台为您提供的服务，通过短信验证方式以保证账户安全。</p>
                </div>
                {spc.memberMobile ? <div className='button'><Link to={`${pathname}/removePhone`}>更换</Link></div> : <div className='button bind_button'><Link to={`${pathname}/bindingPhone`}>绑定</Link></div>}
              </div>
            </div>
          </div>
        </Navigation>
      </div>
    )
  }
}
export default connect(({security})=>({security}))(SecurityHome)
