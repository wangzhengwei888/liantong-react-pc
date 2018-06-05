import React , { Component } from 'react';
import { connect } from 'dva';
import { Carousel,Tabs,Icon } from 'antd';
import { routerRedux,Link} from 'dva/router';
import CircleSearch from '../../components/circleSearch/circleSearch';
import { circle_content } from './circle.less';
import  CircleList from './circleList';
import Img from '../../components/Img/Img';
const TabPane = Tabs.TabPane

class Circle extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {

    function callback(key) {
      console.log(key);
    }

    return (

      <div>
        <div><CircleSearch></CircleSearch></div>
        <div className={circle_content}>
          <div className='circle_main clearfix'>
            <div className='circle_left'>
              <div className="playBox">
                <Carousel autoplay={true}>
                  <div><h3>1</h3></div>
                  <div><h3>2</h3></div>
                  <div><h3>3</h3></div>
                  <div><h3>4</h3></div>
                </Carousel>
              </div>
              <div className='hot_circle'>
                <h3>热门圈子</h3>
                <div className='hot_circle_item clearfix'>
                  <div className='hot_circle_list'>
                    <div className='circle_list_left'>
                      <Link to="">
                        <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                        {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
                      </Link>
                    </div>
                    <div className="circle_list_right">
                      <h4><Link to="">风景摄影</Link></h4>
                      <div className="hot_num">
                        <span>帖子（1）</span>
                        <span>关注（2）</span>
                      </div>
                      <p className='hot_circle_info'>风景摄影讨论交流圈，欢迎广大志同道合的爱好者</p>
                    </div>
                  </div>
                  <div className='hot_circle_list'>
                    <div className='circle_list_left'>
                      <Link to="">
                        <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                        {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
                      </Link>
                    </div>
                    <div className="circle_list_right">
                      <h4><Link to="">风景摄影</Link></h4>
                      <div className="hot_num">
                        <span>帖子（1）</span>
                        <span>关注（2）</span>
                      </div>
                      <p className='hot_circle_info'>风景摄影讨论交流圈，欢迎广大志同道合的爱好者</p>
                    </div>
                  </div>
                  <div className='hot_circle_list'>
                    <div className='circle_list_left'>
                      <Link to="">
                        <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                        {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
                      </Link>
                    </div>
                    <div className="circle_list_right">
                      <h4><Link to="">风景摄影</Link></h4>
                      <div className="hot_num">
                        <span>帖子（1）</span>
                        <span>关注（2）</span>
                      </div>
                      <p className='hot_circle_info'>风景摄影讨论交流圈，欢迎广大志同道合的爱好者</p>
                    </div>
                  </div>
                  <div className='hot_circle_list'>
                    <div className='circle_list_left'>
                      <Link to="">
                        <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                        {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
                      </Link>
                    </div>
                    <div className="circle_list_right">
                      <h4><Link to="">风景摄影</Link></h4>
                      <div className="hot_num">
                        <span>帖子（1）</span>
                        <span>关注（2）</span>
                      </div>
                      <p className='hot_circle_info'>风景摄影讨论交流圈，欢迎广大志同道合的爱好者</p>
                    </div>
                  </div><div className='hot_circle_list'>
                  <div className='circle_list_left'>
                    <Link to="">
                      <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                      {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
                    </Link>
                  </div>
                  <div className="circle_list_right">
                    <h4><Link to="">风景摄影</Link></h4>
                    <div className="hot_num">
                      <span>帖子（1）</span>
                      <span>关注（2）</span>
                    </div>
                    <p className='hot_circle_info'>风景摄影讨论交流圈，欢迎广大志同道合的爱好者</p>
                  </div>
                </div>
                  <div className='hot_circle_list'>
                    <div className='circle_list_left'>
                      <Link to="">
                        <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                        {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
                      </Link>
                    </div>
                    <div className="circle_list_right">
                      <h4><Link to="">风景摄影</Link></h4>
                      <div className="hot_num">
                        <span>帖子（1）</span>
                        <span>关注（2）</span>
                      </div>
                      <p className='hot_circle_info'>风景摄影讨论交流圈，欢迎广大志同道合的爱好者</p>
                    </div>
                  </div>

                </div>
              </div>
              <div className='hot_cart'>
                <h3>热门帖子</h3>
                <div className='hot_cart_item'>
                  <div className='hot_cart_list clearfix'>
                    <span>
                      <a href="/circle/cardDetail" target='_blank' style={{display:'block'}}>临城</a>
                    </span>
                    <i>2017-08-31</i>
                    <b>From</b>
                    <strong>风景摄影</strong>
                  </div>
                  <div className='hot_cart_list clearfix'>
                    <span>
                      <a href="/circle/cardDetail" target='_blank' style={{display:'block'}}>临城</a>
                    </span>
                    <i>2017-08-31</i>
                    <b>From</b>
                    <strong>风景摄影</strong>
                  </div>
                  <div className='hot_cart_list clearfix'>
                    <span>
                      <a href="/circle/cardDetail" target='_blank' style={{display:'block'}}>临城</a>
                    </span>
                    <i>2017-08-31</i>
                    <b>From</b>
                    <strong>风景摄影</strong>
                  </div>
                  <div className='hot_cart_list clearfix'>
                    <span>
                      <a href="/circle/cardDetail" target='_blank' style={{display:'block'}}>临城</a>
                    </span>
                  <i>2017-08-31</i>
                  <b>From</b>
                  <strong>风景摄影</strong>
                </div>
                </div>
              </div>
              <div className='circle_type'>
                <h3>圈子分类</h3>
                <Tabs defaultActiveKey="1" type="card" onChange={callback}>
                  <TabPane tab="摄影" key="1">
                    <CircleList style={{margin:'8px 12px'}}/>
                    <CircleList style={{margin:'8px 12px'}}/>
                    <CircleList style={{margin:'8px 12px'}}/>
                  </TabPane>
                  <TabPane tab="智能" key="2">Content of Tab Pane 2</TabPane>
                  <TabPane tab="娱乐" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
              </div>
            </div>
            <div className='circle_right'>
              <div className='right_top clearfix'>
                <div className='user_img'>
                  <Link to="/person/personalInformation">
                    <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
                    {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
                  </Link>
                </div>

                {/*未登录*/}
                {/*<div className='user_info'>*/}
                  {/*<div className="welcom">欢迎来到&nbsp;&nbsp;<a href="/login">LMShop</a></div>*/}
                  {/*<p style={{marginTop:'5px'}}>若是会员？请<a href="/login" style={{color:'red'}}>[登录]</a>后进行操作！</p>*/}
                  {/*<p style={{marginTop:'5px'}}>若您不是会员请<a href="/loginRegister" style={{color:'red'}}>[注册]</a>成为会员！</p>*/}
                {/*</div>*/}

                {/*登录*/}
                <div className='user_info'>
                  <div>
                    <b>Hi <a href="/person/personalInformation">18813035210</a></b>
                    <a href="/login">退出</a>
                  </div>
                  <div className='user_num'>
                    <span>
                      <strong><a href="/postingsManage/postingsList" target="_blank">8</a></strong>
                      <a className='txt' href="/person/circlePostList" target="_blank">我的帖子</a>
                    </span>
                    <span style={{borderRight:'none'}}>
                      <strong><a href="/postingsManage/postingsList" target="_blank">8</a></strong>
                      <a className='txt' href="/circle/myFollow" target="_blank">我的关注</a>
                    </span>
                  </div>
                </div>
              </div>
              <div className='circle_creat'>
                <a href="" className='list1'><span>创建我的圈子</span></a>
                <a href="" className='list2'><span>发布我的帖子</span></a>
                <a href="" className='list3'><span>管理我的圈子</span></a>
              </div>
              <div className='circle_tj'>
                <h3>可能感兴趣的圈子</h3>
                <CircleList style={{margin:'0 0 20px 0'}}/>
                <CircleList style={{margin:'0 0 20px 0'}}/>
                <CircleList style={{margin:'0 0 20px 0'}}/>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


export default connect(({circle})=>({circle}),(dispatch,own)=>{return {dispatch,own}})(Circle);
