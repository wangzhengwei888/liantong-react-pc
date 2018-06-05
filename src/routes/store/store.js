/**
 * Created by 10400 on 2017/8/9.
 * 店铺首页页面
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Steps, Tooltip, Select, Upload , Radio,AutoComplete,Menu,Dropdown ,Tree ,Checkbox } from 'antd';
import { store_body } from './store.less'
import StoreIndexHeader from '../../components/Store/StoreIndexHeader';
import StoreCarousel from '../../components/Store/StoreCarousel';
import StoreSlider from '../../components/Store/StoreSlider';
import StoreList from '../../components/Store/StoreList';
import StoreMenuList from '../../components/Store/StoreMenuList';
import StoreSearch from '../../components/Store/StoreSearch';



class  StoreIndex extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  componentWillUnmount(){

  }

  render (){
    const {storeDetailData,storeClassData} = this.props.store;
    return (
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
              <StoreSlider data={storeDetailData.store || []}></StoreSlider>
            </div>
            {/*列表内容*/}
            <StoreList goodsNewList={storeDetailData.goodsNewList || []} goodsSaleList={storeDetailData.goodsSaleList || []}></StoreList>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({store})=>({store}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(StoreIndex));
