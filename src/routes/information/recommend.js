/**
 * Created by b2b2c on 2017/9/4.
 */
//资讯头尾
import React , { Component } from 'react';
import { Form,Icon,Pagination,Breadcrumb} from 'antd';
import Img from '../../components/Img/Img';
import { routerRedux,Link } from 'dva/router';
import {recommend_content} from './recommend.less';





class Recommend extends Component{
  constructor(props){
    super(props);
  }


  render(){

    return (
      <div>
        <div className={recommend_content}>
          <div>
            <div className="recommend_news_list">
              <div className="news_head">
                A股<span className="news_head_span" >更多<Icon type="right" /></span>
              </div>
              <ul className="news_content">
                <li>人民银行未要求商业银行停止发放个人住房贷款</li>
              </ul>
            </div>
            <div className="recommend_imges_list">
              <div className="imges_head">
                热门推荐<span className="imges_head_span" >更多<Icon type="right" /></span>
              </div>
              <div className="img_waibox">
                <div className="img_box">
                  <img src=""/>
                  <p>超级会员</p>
                </div>
              </div>


            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default Recommend;
