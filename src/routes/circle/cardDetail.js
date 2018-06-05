import React , { Component } from 'react';
import { connect } from 'dva';
import { Carousel,Icon,Button ,Pagination} from 'antd';
import {Link} from 'dva/router';
import CircleSearch from '../../components/circleSearch/circleSearch';
import { card_main,card_content } from './cardDetail.less';
import  CircleList from './circleList';
import Img from '../../components/Img/Img';


class CartDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  }

  onClick = (e) => {
    console.log(e.target);
    e.target.nextSibling.style.display="block";
  }

  render() {


    return (
      <div>
        <div><CircleSearch></CircleSearch></div>
        <div className={card_main}>
          <div className="card_main_title">
            <div className="circle_list">
              <div className="circle_left">
                <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
              </div>
              <div className="circle_center">
                <div className="circle_name">
                  <h3>VR杂谈</h3>
                  <div className="numinfo">帖子：<span>1</span></div>
                  <div className="numinfo">关注：<span>1</span></div>
                </div>
                <div className="circle_tip">圈子说明：心得分享，资讯新闻。分享VR技术，大家交流讨论</div>
              </div>
              <div className="circle_right"> <Button type="primary">关注</Button></div>
            </div>
          </div>
          <div className={`${card_content} clearfix`}>
            <div className="card_content_left">
              <div className="card_content_left_top">
                <div className="card_img">
                  <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                  {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
                </div>
                <div className="card_info">
                  <h3>大朋一体机如何玩《王者荣耀》教程</h3>
                  <div className="card_user">
                    <span className="user">18813035210</span>
                    <span className="filter">只看楼主</span>
                  </div>
                </div>
              </div>
              <div className="card_detail clearfix">
                <div className="card_detail_content"></div>
                <div className="card_detail_bottom">
                  <span>5</span>
                </div>
              </div>
              <div className="card_floor">
                <div className="card_floor_list clearfix">
                  <div className="list_img">
                    <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                    {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
                  </div>
                  <div className="list_content clearfix">
                    <div className="list_content_top">
                      <span style={{marginRight: '15px',color:'#1c4ef2'}}>维她命</span>
                      <span>2017-08-14 16:44:09</span>
                      <span style={{float:'right'}}>1楼</span>
                    </div>
                    <div className="list_content_reply">4444444444444444444444444444444</div>
                    <div className="list_content_reply_btn" onClick={this.onClick}>回复</div>
                    <div className="reply_box" style={{display:'none'}}></div>
                  </div>
                </div>
                <div className="card_floor_list clearfix">
                  <div className="list_img">
                    <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                    {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
                  </div>
                  <div className="list_content clearfix">
                    <div className="list_content_top">
                      <span style={{marginRight: '15px',color:'#1c4ef2'}}>维她命</span>
                      <span>2017-08-14 16:44:09</span>
                      <span style={{float:'right'}}>1楼</span>
                    </div>
                    <div className="list_content_reply">4444444444444444444444444444444</div>
                    <div className="list_content_reply_btn" onClick={this.onClick}>回复</div>
                    <div className="reply_box" style={{display:'none'}}></div>
                  </div>
                </div>
                <div className="pag">
                  <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />
                </div>
              </div>
              <div className="reply_all">
                <div className="reply_all_box"></div>
              </div>
            </div>
            <div className="card_content_right">
              <div className="card_content_right_top">
                <h3>热门讨论帖子</h3>
                <div className="hot_card_list">
                  <a href="" target="_blank">临城</a>
                </div>
                <div className="hot_card_list">
                  <a href="" target="_blank">临城</a>
                </div>
                <div className="hot_card_list">
                  <a href="" target="_blank">临城</a>
                </div>
                <div className="hot_card_list">
                  <a href="" target="_blank">临城</a>
                </div>
              </div>
              <div className="circle_hot">
                <h3>大家都关注的圈子</h3>
                <CircleList style={{marginBottom:'20px'}}/>
                <CircleList style={{marginBottom:'20px'}}/>
                <CircleList style={{marginBottom:'20px'}}/>
                <CircleList style={{marginBottom:'20px'}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(({cartDetail})=>({cartDetail}),(dispatch,own)=>{return {dispatch,own}})(CartDetail);
