import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row,Col, Icon, Pagination } from 'antd';
import {  Link } from 'dva/router';
import Img from '../../components/Img/Img';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import { new_list } from './NewList.less';


class  NewList extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  }


  render (){
    // let { } =this.props.NewHome;
    //  console.log(1);
    return (
      <div>
        <div><Search></Search></div>
        <div>
          <Navigation>
            <div className={ new_list }>
              <div className="alls_guanggao_img"><Img style={{ width:'100%', height:"100%" }} src="upload/img/lmadv/1508217294561.png" /></div>

              <div className="new_list_title">行业资讯</div>
              <div>
                {
                  [1, 1, 1, 1, 1, 1, 1].map((v, i, a) => (
                    <div key={i} style={{marginTop: '15px'}}>
                      <Link to='/newdetail/123'
                            className="nav_link"
                            activeClassName='actived_link'>
                        关于征求职业病危害因素分类目录（征求意见稿）意见的
                      关于征求职业病危害因素分类目录（征求意见稿）意见的...</Link>
                    </div>
                  ))

                }

              </div>

              <Pagination  style={{ marginTop:'30px' }} showQuickJumper defaultCurrent={2} total={500} onChange={this.onChange} />,
             </div>
          </Navigation>
        </div>

      </div>
    );
  }
}

NewList.propTypes = {

}


export default connect(({newlist})=>({newlist}),(dispatch,own)=>{return {dispatch,own}})(NewList);


