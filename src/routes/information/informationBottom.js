import React , { Component } from 'react';
import {footers} from './informationBottom.less';
import { Row, Col } from 'antd';

//import { getFullUrl } from '../../utils/common';
class  InformationBottom extends Component{
  render (){


    return (
      <div>
        <div className={footers}>
          <div  className="xinxi">
            <a href="http://mall.vitaqin.com/admin/login" target="_blank">诚征英才</a>&nbsp;|&nbsp;
            <a href="https://itunes.apple.com/cn/app/lei-ming-dian-shang/id1036114012?mt=8" target="_blank">直营药店</a>&nbsp;|&nbsp;
            <a href="https://www.pgyer.com/hY7y" target="_blank">广告合作</a>&nbsp;|&nbsp;
            <a href="http://mall.vitaqin.com/seller/login" target="_blank">经营认证</a>&nbsp;|&nbsp;
            <a href="http://mall.vitaqin.com/admin/login" target="_blank">药品经营许可证</a>&nbsp;|&nbsp;
            <a href="https://itunes.apple.com/cn/app/lei-ming-dian-shang/id1036114012?mt=8" target="_blank">互联网药品信息服务资格</a>&nbsp;|&nbsp;
            <a href="https://www.pgyer.com/hY7y" target="_blank">医疗器械许可证</a>
          </div>

          <div style={{width:'1125px',margin:'18px auto',textAlign:'center'}} >
            Copying 2011-2015 国药集团版权所有 Inc All rights reserved <span></span>
          </div>

          <div  style={{width:'1125px',margin:'18px auto',textAlign:'center'}} className="guo_img">
            <div className="guo_img1"></div>
            <div className="guo_img2"></div>
            <div className="guo_img3"></div>
          </div>
        </div>
      </div>
    )
  }
}
export default InformationBottom;

