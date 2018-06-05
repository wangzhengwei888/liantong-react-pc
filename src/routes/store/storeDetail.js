import React , { Component } from 'react';
import { connect } from 'dva';
import { Row,Col,Spin } from 'antd';
import Img from '../../components/Img/Img';
import { store_body } from './store.less'
import StoreIndexHeader from '../../components/Store/StoreIndexHeader';
import StoreCarousel from '../../components/Store/StoreCarousel';
import StoreSlider from '../../components/Store/StoreSlider';
import StoreList from '../../components/Store/StoreList';
import StoreMenuList from '../../components/Store/StoreMenuList';
import StoreSearch from '../../components/Store/StoreSearch';
import {detail_content} from './storeDetail.less'
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class StoreDetail extends Component{
  constructor(props){
    super(props);
    this.state={}
  }

  render(){
    const {storeDetailData,storeClassData} = this.props.store;
    const {loading} = this.props;
    console.log(this.props)
    return (
      <div>
        <StoreSearch></StoreSearch>
        <div className={store_body}>
          {/*header*/}
          <div className="header_box">
            <StoreIndexHeader></StoreIndexHeader>
          </div>
          <Spin spinning={loading.global} style={{position:'fixed'}}>
          {storeDetailData.store ?
          <div className="store_content">
            <div className="store_top">
              <StoreMenuList data={storeClassData || []}></StoreMenuList>
              <StoreCarousel imgData={storeDetailData.store || []}></StoreCarousel>
              <StoreSlider data={storeDetailData.store || []}></StoreSlider>
            </div>

            {/*店铺详情*/}
            <div className={detail_content}>
              <p className="detail">店铺详情</p>
              <div className="storeDetail_top">
                <Row>
                  <Col span={12}>
                    <div className="clearfix" style={{paddingLeft: '100px'}}>
                      <div className="store_img">
                        <Img src={storeDetailData.store && storeDetailData.store[0].storeLogo ? `${storeDetailData.store[0].storeLogo}` : "/upload/img/store/0/1504690841511.jpg"} />
                      </div>
                      <div className="store_name">
                        <p>{storeDetailData.store[0].storeName}</p>
                        <p>店铺等级：{`${storeDetailData.store[0].gradename}`}</p>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="store_ewm">
                      <Img src={storeDetailData.store[0].storeCode ? `${storeDetailData.store[0].storeCode}` : "/upload/img/store/0/1504690841511.jpg"} />
                      <p>店铺二维码</p>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="store_info">
                <Row>
                  <Col span={24}>
                    <p className="info_title">基本信息</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>卖家信用：{`${storeDetailData.store[0].storeCredit}`}</Col>
                  <Col span={12}>注册时间：{`${storeDetailData.store[0].createTimeStr}`}</Col>
                </Row>
                <Row>
                  <Col span={12}>创店时间：{`${storeDetailData.store[0].createTimeStr}`}</Col>
                  <Col span={12}>上次登录：{`${moment(storeDetailData.store[0].storeLastLogintime).format("YYYY-MM-DD h:mm:ss")}`}</Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <p className="info_title">联系方式</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>地区：{`${storeDetailData.store[0].areaInfo}`}</Col>
                  <Col span={12}>详细地址：{`${storeDetailData.store[0].storeAddress}`}</Col>
                </Row>
                <Row>
                  <Col span={12}>联系电话：{`${storeDetailData.store[0].storeTel}`}</Col>
                  {/*<Col span={12}>电子邮件：没数据</Col>*/}
                </Row>
              </div>
              <div>
                {/*<p>{storeDetailData.store[0].description}</p>*/}
              </div>

            </div>
          </div>: <div style={{height:"200px"}}></div>}
          </Spin>
        </div>
      </div>
    );

  }

}

export default connect(({store,loading})=>({store,loading}),(dispatch,own)=>{return {dispatch,own}})(StoreDetail);
