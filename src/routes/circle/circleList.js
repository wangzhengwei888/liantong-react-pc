import React , { Component } from 'react';
import { Carousel,Tabs,Icon } from 'antd';
import { routerRedux,Link} from 'dva/router';
import { list } from './circleList.less';
import Img from '../../components/Img/Img';




class CircleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {

    function callback(key) {
      console.log(key);
    }

    const { style }=this.props;

    return (
      <div className={ list } style={{ ...style }}>
        <div className='circle_type_list clearfix'>
          <div className='type_list_left'>
            <a href="" target="_blank">
              <img src="http://bbcimage.leimingtech.com//upload/img/avatar/1502424786475.png" alt=""/>
              {/*<Img src="/upload/img/avatar/1502424786475.png"/>*/}
            </a>
          </div>
          <div className='type_list_right'>
            <div className='right_title'>
              <a href="" target="_blank">音箱音响</a>
            </div>
            <div className='type_num'>
              <span><Icon type="user" style={{color:'#ccc',marginRight:'5px'}} />0</span>
              <span><Icon type="mail" style={{color:'#ccc',marginRight:'5px'}} />1</span>
            </div>
            <p className='type_txt'>音乐你的生活！让音乐围绕在你周围，生活处处是音乐</p>
          </div>
        </div>
      </div>

    );
  }
}


export default CircleList;
