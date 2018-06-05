/**
 * Created by b2b2c on 2017/9/4.
 */
//资讯头尾
import React , { Component } from 'react';
import { Form,Icon,Pagination,Breadcrumb} from 'antd';
import Img from '../../components/Img/Img';
import { routerRedux,Link } from 'dva/router';
import {connect} from 'dva';
import InformationTop from './informationTop';
import InformationBottom from './informationBottom';
import Recommend from './recommend';
import {informationList_content} from './informationList.less';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';




class InformationList extends Component{
  constructor(props){
    super(props);
  }


  changePage = (page) => {
    this.props.dispatch({ type: 'information/articleListEFF',val:{pageNo:page}});
  }


  render(){
    let {indexData,articleList} = this.props.information
    let { conList = [] } = articleList
    return (
      <div>
         {/*<InformationTop  indexData={indexData} />*/} 
        <div><Search></Search></div>
        <div><Navigation></Navigation></div>
        <div className={informationList_content}>
          <div className="informationList_head">
            <Breadcrumb>
              <Breadcrumb.Item href="/information">
                <Icon style={{color:'#3497CE'}} type="home" />
                <span>新闻中心</span>
              </Breadcrumb.Item>
              {/*
                <Breadcrumb.Item>
                  <span>新闻中心</span>
                </Breadcrumb.Item>
              */}
            </Breadcrumb>

          </div>
          <div className="informationList_list">
            {
              conList.map((img,index) => {
                return(
                    <div key={index}  className="list_box">
                   {/*   <h3 className="list_head">{img.title}<span className="h3_span"><Icon type="message" />评论(0)</span></h3>*/}
                        {
                          img.thumb ? <div className="list_bottom">
                            <div className="list_bottom_img"><Img src={img.thumb}/> </div>
                            <div className="list_bottom_neirong">
                            <p className="p1">{img.digest}<Link to={`/information/informationDetails/${img.id}`}>【查看详情】</Link></p>
                          <p className="p2">发布时间：<span>{img.publishedStr}</span></p>
                          </div>
                            </div>
                            :<div className="list_bottom">
                              {/*<div className="list_bottom_img"><Img src={img.thumb}/> </div>*/}
                              <div className="list_bottom_neirong_wutu">
                                <p className="p1">{img.digest}<Link to={`/information/informationDetails/${img.id}`}>【查看详情】</Link></p>
                                <p className="p2">发布时间：<span>{img.publishedStr}</span></p>
                              </div>
                            </div>

                        }
                    </div>
                )
              })
            } 
            <div className="list_pagination"><Pagination onChange={this.changePage}  defaultCurrent={1} total={articleList && articleList.totalRows} /></div>
          </div>
        
        </div>
       

      </div>
    )
  }
}

// export default InformationList;
export default connect(({information}) => ({information}), (dispatch, own) => { return {dispatch, own}})(InformationList);
