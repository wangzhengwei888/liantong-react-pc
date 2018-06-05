import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {  Link } from 'dva/router';
import {Button, Table, Icon, Modal, Tabs , message,Breadcrumb, Row, Col} from 'antd';

import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import Img from '../../components/Img/Img';
import LeftNav from '../../components/LeftNav/LeftNav';

// import { GoodsRecommed ,bottemDetail} from './api';
import {tableList} from "../brand/BrandSta.less";



const TabPane = Tabs.TabPane;
function callback(key) {
 // console.log(key);
}

class BrandSta extends Component {
 constructor(props) {
  super(props);
  this.state = {
   goodsRecommed: []
  }
 }


 componentDidMount() {
  // console.log(data.goodsId)
  /*商品推荐*/
  // GoodsRecommed().then(result => {
  //   if (result.result == 1) {
  //     // console.log(result.data)
  //     this.setState({
  //       goodsRecommed:result.data
  //     })
  //   }
  // });
 }



 render() {
  return <div>
   <div><Search></Search></div>
   <div>
    <Navigation>
     <div className="alls_guanggao_img"><Img style={{width: '100%', height: "100%"}}src="upload/img/lmadv/1502347639097.jpg"/></div>
     <div className={tableList}>
      <Breadcrumb separator=">" className='security_nav_bar'>
       <Breadcrumb.Item href="">品牌中心</Breadcrumb.Item>
       <Breadcrumb.Item>一级分类</Breadcrumb.Item>
       <Breadcrumb.Item>二级分类</Breadcrumb.Item>
       <Breadcrumb.Item>三级分类</Breadcrumb.Item>
       <Breadcrumb.Item>品牌名称专区</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs defaultActiveKey="1" onChange={callback}>
       <TabPane tab="APSC专区" key="1">
        <div className="Brand_detail">
         <h1>数码产品检测机构</h1>
         <p>       码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构</p>

        </div>
       </TabPane>
       <TabPane tab="APSC专区" key="2">
        <div className="Brand_detail">
         <h1>数码产品检测机构</h1>
         <p>       码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构</p>

        </div>
       </TabPane>
       <TabPane tab="APSC专区" key="3">
        <div className="Brand_detail">
         <h1>数码产品检测机构</h1>
         <p>       码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构</p>

        </div>
       </TabPane>
       <TabPane tab="APSC专区" key="4">
        <div className="Brand_detail">
         <h1>数码产品检测机构</h1>
         <p>       码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构</p>

        </div>
       </TabPane>
       <TabPane tab="APSC专区" key="5">
        <div className="Brand_detail">
         <h1>数码产品检测机构</h1>
         <p>       码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构</p>

        </div>
       </TabPane>
       <TabPane tab="APSC专区" key="6">
        <div className="Brand_detail">
         <h1>数码产品检测机构</h1>
         <p>       码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构</p>

        </div>
       </TabPane>
       <TabPane tab="APSC专区" key="7">
        <div className="Brand_detail">
         <h1>数码产品检测机构</h1>
         <p>       码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构</p>

        </div>
       </TabPane>
       <TabPane tab="APSC专区" key="8">
        <div className="Brand_detail">
         <h1>数码产品检测机构</h1>
         <p>       码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构
          数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构数码产品检测机构</p>

        </div>
       </TabPane>
      </Tabs>




      {/*<div className="Brand_intro" onChange={callback}>*/}
       {/*/!*<Table bordered pagination={false} className="intelligentUp_Detail" dataSource={this.data} columns={this.columns}rowKey={record => record.key}/>*!/*/}
       {/*<span key="1">APSC专区</span>*/}
       {/*<span key="2">APSC专区</span>*/}
       {/*<span key="3">APSC专区</span>*/}
       {/*<span key="4">APSC专区</span>*/}
       {/*<span key="5">APSC专区</span>*/}
       {/*<span key="6">APSC专区</span>*/}
       {/*<span key="7">APSC专区</span>*/}
       {/*<span key="8">APSC专区</span>*/}
      {/*</div>*/}

     </div>
    </Navigation>
   </div>
  </div>
 }
 }
 export default connect(({brand,home})=>({brand,home}))(BrandSta)
