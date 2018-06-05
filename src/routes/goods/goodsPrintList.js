//CMS打印页面
import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, Button, AutoComplete,message} from 'antd';
import {routerRedux,Link} from 'dva/router';
import {getFullUrl} from '../../utils/common';
import PropTypes from 'prop-types';
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import Img from '../../components/Img/Img';
import { GoodsRecommed ,bottemDetail} from './api';
import {Print_Content,COA_Content,MSDS_Content} from  './goodsCMSPrint.less'
import {product_left_nav} from "../../components/LeftNav/LeftNav.less";
import { IMAGE_DOMAIN } from '../../utils/common';
import {printCoaPDF} from './api';


class GoodsPrintList extends Component {
 constructor(props) {
  super(props)
  this.state = {

  }

 }


 //打印pdf 函数onPrint
 onPrint = (value) => {
 //  console.log(value)
   const val={
    coaId:value
  }
  let path=window.open('about:blank');
   printCoaPDF(val).then(r => {
     if (r.result == 1) {
     //   console.log(r.url)
         let url=`${IMAGE_DOMAIN}${r.url}`;
    //     console.log(url)
         path.location.href=url
     } else {
      message.error(r.msg, 1.5);
     }
    })
 }



 render() {

    let { coaListData } =this.props.goodsDetail;
   // console.log(this.props.goodsDetail.coaListData)
  //  console.log(coaListData)
  return (
     <div>
       <div><Search></Search></div>
       <Navigation preson={false}>
        <div style={{width:'80%',margin:'20px auto 0',border:'2px solid #000'}}>
         <p style={{background:'#CADBF7',padding:'6px 0 6px 40px'}}>COA</p>
         {
             !!coaListData&&coaListData.length>0
                &&coaListData.map((list,index)=>{
                    return (
                      <Row key={index} style={{margin:'4px 0 4px 40px'}}>
                          <Col span={12}>{list.sampleBh}{list.batchName}</Col>
                          <Col span={10}>更新时间{list.verifierdate}</Col>
                          <Col span={2} style={{color:'red',cursor:'point'}}  onClick={()=>this.onPrint(list.id)}>下载</Col>
                      </Row>
                    )
                })




         }
        <Row>

        </Row>

        </div>
       </Navigation>
    </div>

  );
 }
}

export default connect(({goodsDetail, app}) => ({goodsDetail, app}), (dispatch, own) => {return {dispatch, own}})(GoodsPrintList);
