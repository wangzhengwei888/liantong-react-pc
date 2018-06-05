/**
 * 个人中心个人信息
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import {Upload ,Button,Radio,Cascader,Form} from 'antd';
import Img from '../../components/Img/Img';
import { myLevel_body } from './myLevel.less';






class  Mylevel extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render (){

    return (
      <div className={myLevel_body}>
          <div className="myLevel_info">
            <p className="myLevel_title"><b>我的级别</b></p>
            <ul className="myLevel_content">
              <li>您的会员级别是:<img className="myLevel_img" src="upload/img/store/0/1489674355000.jpg"/><b style={{color:'#fe8415'}}>555555</b></li>
              <li>会员级别有效期:<span>永久</span></li>
              <li>您目前的等级积分为&nbsp;<b style={{color:'#fe8415'}}>10000</b></li>
              <li>获得积分的办法: 登录、购物、评价、晒单、查看详情</li>
              <li><Link to="/person/integral">查看我的积分明细</Link></li>
            </ul>
          </div>
          {/*列表*/}
          <div className="record">
            <p className="record_title"><b>会员级别变动记录</b></p>
            <ul className="record_content">
              <li></li>
            </ul>
          </div>

      </div>
    );
  }
}


export default connect(({mylevel})=>({mylevel}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Mylevel));

