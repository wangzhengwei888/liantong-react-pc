import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row,Col } from 'antd';
import {  Link } from 'dva/router';
import Img from '../../components/Img/Img';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import { new_Detail } from './NewDetail.less';


class  NewList extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }




  render (){
    // let { } =this.props.NewHome;
    //  console.log(1);
    const html = "<p><span>北京雷铭智信科技有限公司（简称：雷铭科技），是领先的企业级信息化产品及解决方案提供商。公司是一家注重研发高效、易用、优质的企业信息化产品，其中主推“雷铭内容管理系统”、“B2B2C电子商务系统”、Android &amp; IOS移动客户端解决方案，是专业的电子商务解决方案提供商和多媒体全网内容管理提供商。为众多客户提供优质的信息服务。公司拥有一批年轻而富有激情的员工以及良好的工作环境，开放、创新、高效、服务是我们一贯秉承的公司理念。公司研发人员具备多年的产品研发经验并拥有多项成熟、领先的业界技术，这使我们能在激烈的市场竞争中做出快速反应并适时推出高效、易用、优质的产品，并根据客户的需求，为客户提供了先进、实用、可靠的信息化产品及技术服务，深获客户好评。同时公司注重年轻员工的培养及发展，为新员工提供多种培训和提升的发展机会。</span></p>";

    return (
      <div>
        <div><Search></Search></div>
        <div>
          <Navigation>
            <div className={ new_Detail }>
              <div className="alls_guanggao_img"><Img style={{ width:'100%', height:"100%" }} src="upload/img/lmadv/1508217294561.png" /></div>

              <div className="new_Detail_title">2017年中科院院士增选最新名单网络版，目前56人入选!</div>
              <div className="new_Detail_time">发表于：2017-11-22 16:56:36.003</div>
              <div style={{ margin:'20px 0px 30px 0px' }} dangerouslySetInnerHTML={{__html:html}}></div>

            </div>
          </Navigation>
        </div>

      </div>
    );
  }
}

NewList.propTypes = {

}


export default connect(({newdetail})=>({newdetail}),(dispatch,own)=>{return {dispatch,own}})(NewList);


