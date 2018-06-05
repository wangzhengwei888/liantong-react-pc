import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
//import {  Link } from 'dva/router';
import { Row,Col, Icon } from 'antd';
import {  Link } from 'dva/router';
import Img from '../../components/Img/Img';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import { new_home, others_link } from './Newhome.less';


class  NewHome extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }


  render (){
   // let { } =this.props.NewHome;
 //  console.log(1);
    return (
      <div>
        <div><Search></Search></div>
        <div>
          <Navigation>
            <div className={ new_home }>
              <div className="alls_guanggao_img"><Img style={{ width:'100%', height:"100%" }} src="upload/img/lmadv/1508217294561.png" /></div>
              <Row type="flex" justify="space-between">


                <Col span={10} style={{ marginBottom:"20px" }}>
                  <Row type="flex" justify="space-between">
                    <Col className="new_title">行业信息</Col>
                    <Col className="new_more"><Link to="/kk" style={{ color:'#3497ce' }}>更多></Link></Col>
                  </Row>
                  <div style={{ borderBottom:"2px solid #E5E5E5", marginTop:"-1.5px" }}></div>
                  <div style={{ width:'80%' }}>
                    <ul className="new_list">
                      {
                        [1, 1, 1, 1, 1, 1, 1].map((v, i, a) => (
                          <li key={i} className="show_ellipsis" style={{ marginTop:"10px" }}>
                            <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                            <Link to="/newdetail/123">到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </Col>


                <Col span={10}>
                  <Row type="flex" justify="space-between">
                    <Col className="new_title">行业信息</Col>
                    <Col className="new_more">更多></Col>
                  </Row>
                  <div style={{ borderBottom:"2px solid #E5E5E5", marginTop:"-1.5px" }}></div>
                  <div style={{ width:'80%' }}>
                    <ul className="new_list">
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                    </ul>
                  </div>
                </Col>
                <Col span={10}>
                  <Row type="flex" justify="space-between">
                    <Col className="new_title">行业信息</Col>
                    <Col className="new_more">更多></Col>
                  </Row>
                  <div style={{ borderBottom:"2px solid #E5E5E5", marginTop:"-1.5px" }}></div>
                  <div style={{ width:'80%' }}>
                    <ul className="new_list">
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                    </ul>
                  </div>
                </Col>
                <Col span={10}>
                  <Row type="flex" justify="space-between">
                    <Col className="new_title">行业信息</Col>
                    <Col className="new_more">更多></Col>
                  </Row>
                  <div style={{ borderBottom:"2px solid #E5E5E5", marginTop:"-1.5px" }}></div>
                  <div style={{ width:'80%' }}>
                    <ul className="new_list">
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                      <li className="show_ellipsis" style={{ marginTop:"10px" }}>
                        <span className="new_decs"><Icon style={{ fontSize:'26px', height:'18px', lineHeight:"18px" }} type="ellipsis" /></span>
                        到2024年，亚太区色谱溶剂市场规模将超过5.55到2024年，亚太区色谱溶剂市场规模将超过5.55...</li>
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row className={others_link}>
                <Col span={6}>
                  <div className="others_link_title"><span className="others_link_border"></span>政府、协会网站</div>
                  <div style={{ paddingLeft:'10px' }}>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="others_link_title"><span className="others_link_border"></span>专业期刊网站</div>
                  <div style={{ paddingLeft:'10px' }}>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="others_link_title"><span className="others_link_border"></span>尤其链接网站</div>
                  <div style={{ paddingLeft:'10px' }}>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="others_link_title" style={{ fontWeight:'normal', textAlign:'right' }}><Link style={{ margin:"0px 50px" }} to="/k">更多></Link></div>
                  <div style={{ paddingLeft:'10px' }}>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                    <a href="444">国家安全生产监督管理总局</a>
                  </div>
                </Col>
              </Row>

            </div>
          </Navigation>
        </div>

      </div>
    );
  }
}

NewHome.propTypes = {

}


export default connect(({newhome})=>({newhome}),(dispatch,own)=>{return {dispatch,own}})(NewHome);


