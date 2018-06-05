import React , { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Pagination } from 'antd';
import { routerRedux,Link} from 'dva/router';
import PropTypes from 'prop-types';
import CircleSearch from '../../components/circleSearch/circleSearch';

import Img from '../../components/Img/Img';
import { circleDetails, details_list } from './circleDetails.less'


class CircleDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {



    return (

      <div>
        <div><CircleSearch></CircleSearch></div>


        <Row type="flex" justify="start" className={ circleDetails }>
          <Col className='circleD_img'><Img src="/upload/img/avatar/1502424786475.png" style={{ width:'100%', height:'100%' }}></Img></Col>
          <Col style={{ width:'940px' }}>
            <Row type="flex" justify="start" className='detaile_title'>
              <Col className='details_name'>视频圈</Col>
              <Col>  <Button className='details_btn' type="primary">关注</Button></Col>
              <Col style={{ marginRight:'10px' }}>帖子：<span style={{ color:'#f00' }}>1</span></Col>
              <Col>关注：<span style={{ color:'#f00' }}>1</span></Col>
            </Row>

            <Row type="flex" justify="start" align="top">
              <Col style={{  paddingLeft: '20px', fontSize:'14px' ,width:'120px' }}>圈子说明:</Col>
              <Col className="details_info">影视、视频作品分享交流圈。欢迎大家参与讨论分享影视、视频作品分享交流圈。欢迎大家参与讨论分享影视、视频作
                品分享交流圈。欢迎大家参与讨论分享影视、视频作品分享交流圈。欢迎大家参与讨论分享
                影视
              </Col>
            </Row>

            <Row type="flex" justify="start" align="top">
              <Col style={{  paddingLeft: '20px', fontSize:'14px',height:'35px',lineHeight:'35px' }} span={2}>圈主:</Col>
              <Col>
                <span className="circle_preson_img"><Img src="/upload/img/avatar/1502424786475.png" style={{ width:'20px', height:'20px' }} /></span>
                <span className="circle_preson_name" >18813035210</span>
              </Col>
            </Row>
          </Col>

          <Col style={{ width:'145px' }}>
            <div className="tie_btn">
              <Button type="primary" className='details_btn'>我要发帖</Button>
            </div>
            <div className="details_cla">所属分类：摄影</div>
          </Col>

        </Row>

        <div className={details_list}>
          <Row className='list_top'>
            <Col span={3}><div style={{ backgroundColor:'#c40000', color:'#fff',textAlign:'center' }}>全部</div></Col>
            <Col span={21}></Col>
          </Row>

          <div className="list_all">

            <Row className="list_item">
              <Col span={16}><div className="list_item_name">TG-5高速视频对比</div></Col>
              <Col span={8}>
                <Row type="flex" justify="end" align="middle">
                  <Col  className="circle_goos_up"></Col>
                  <Col style={{ marginRight:'20px' }}>0</Col>
                  <Col  className='circle_goos_message'></Col>
                  <Col style={{ marginRight:'20px' }}>0</Col>
                  <Col style={{ marginRight:'5px' }}>2017-08-11 12:05:01</Col>
                </Row>
              </Col>
            </Row>

            <div className="list_page">
              <Pagination showQuickJumper defaultCurrent={2} total={500}  />
            </div>


          </div>

        </div>
      </div>

    );
  }
}


export default connect(({addcircle})=>({addcircle}),(dispatch,own)=>{return {dispatch,own}})(CircleDetails);
