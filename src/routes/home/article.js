//网站资讯文章
import React , { Component } from 'react';
import { connect } from 'dva';
import { Row, Col,Button,Input} from 'antd';
import { routerRedux } from 'dva/router';

import { article_Content } from './article.less';
import Img from '../../components/Img/Img';
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'



class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    const { goodsClass,navList,articleContentData} =this.props.home;
    console.log(articleContentData)
    return (

      <div>
        <div><Search></Search></div>
        <div><Navigation data={goodsClass} navList ={navList}></Navigation></div>
        <div className={article_Content} >
          {articleContentData.length > 0 ?
            <div>
              <h3>{articleContentData[0].articleTitle}</h3>
              <div className="detail" dangerouslySetInnerHTML={{ __html: articleContentData[0].articleContent }}></div>
            </div>
            : ""}
        </div>
      </div>

    );
  }
}


export default connect(({home})=>({home}),(dispatch,own)=>{return {dispatch,own}})(Article);

