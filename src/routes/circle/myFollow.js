import React , { Component } from 'react';
import { connect } from 'dva';
import { Carousel,Tabs,Icon } from 'antd';
import { routerRedux,Link} from 'dva/router';
import CircleSearch from '../../components/circleSearch/circleSearch';
import { myFollow_content } from './myFollow.less';
import  CircleList from './circleList';
import Img from '../../components/Img/Img';

class MyFollow extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {


    return (

      <div>
        <div><CircleSearch></CircleSearch></div>
        <div className={myFollow_content}>
          <div className='myFollow_main clearfix'>
            <div className='myFollow_left'>
              <h3>已关注的圈子</h3>
              <CircleList style={{margin:'8px'}}/>
              <CircleList style={{margin:'8px'}}/>
              <CircleList style={{margin:'8px'}}/>
              <CircleList style={{margin:'8px'}}/>
            </div>
            <div className='myFollow_right'>
              <div className='right_top clearfix'>
                <div className='user_img'>
                  <Link to="/person/personalInformation">
                    <Img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
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


export default connect(({myFollow})=>({myFollow}),(dispatch,own)=>{return {dispatch,own}})(MyFollow);
