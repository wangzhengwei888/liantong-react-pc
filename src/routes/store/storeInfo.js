import React , { Component } from 'react';
import { connect } from 'dva';
import { Row,Col,Tabs  } from 'antd';
import Img from '../../components/Img/Img';
import { store_body } from './store.less'
import StoreIndexHeader from '../../components/Store/StoreIndexHeader';
import StoreCarousel from '../../components/Store/StoreCarousel';
import StoreSlider from '../../components/Store/StoreSlider';
import StoreList from '../../components/Store/StoreList';
import StoreMenuList from '../../components/Store/StoreMenuList';
import StoreSearch from '../../components/Store/StoreSearch';
import {info_content} from './storeInfo.less';
const TabPane = Tabs.TabPane;

class StoreInfo extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  callback = (key) => {
    console.log(key);
  }
  render(){
    const {storeDetailData,storeClassData} = this.props.store;
    return (
      storeDetailData.store ?
        <div>
          <StoreSearch></StoreSearch>
          <div className={store_body}>
            {/*header*/}
            <div className="header_box">
              <StoreIndexHeader></StoreIndexHeader>
            </div>
            <div className="store_content">
              <div className="store_top">
                <StoreMenuList data={storeClassData}></StoreMenuList>
                <StoreCarousel imgData={storeDetailData.store || []}></StoreCarousel>
                <StoreSlider data={storeDetailData.store}></StoreSlider>
              </div>

              {/*店铺资讯*/}
              <div className={info_content}>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                  <TabPane tab="热门资讯" key="1">正在开发中，敬请期待</TabPane>
                  <TabPane tab="最新资讯" key="2">正在开发中，敬请期待</TabPane>
                </Tabs>
              </div>

            </div>
          </div>
        </div> : <div></div>
    );

  }

}

export default connect(({store})=>({store}),(dispatch,own)=>{return {dispatch,own}})(StoreInfo);
