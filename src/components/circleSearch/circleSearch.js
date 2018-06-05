import React , { Component } from 'react';
import { routerRedux,Link } from 'dva/router';
import { connect } from 'dva';
import {  Button, Icon, Row, Col, Input,Badge,Form } from 'antd';
import { search,dropdown_dian } from './circleSearch.less';


class  CircleSearch extends Component{
  constructor(props){
    super(props);
    this.state={
      txt:false
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.parentNode)
    this.setState({txt:!this.state.txt})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(e);
    let val = e.target.firstChild.value;
    console.log(val)
    if(val==''){
      val=='';
    }
    // this.props.dispatch(routerRedux.push(`/home/PeoductSearch/keywordSearch/${val}`));
    location.href="/home/PeoductSearch/keywordSearch/${val}";
  }




  render (){
    const { open } = this.state;

    let SDiansty = open==true ? {marginLeft:'7px'} :{};

    return (
      <Row type="flex" justify="center" className={ search }>
        <Col ><Link className="logo"  to="/home"></Link></Col>
        <Col  style={{width:'950px',display:'inline-block',paddingTop:'35px'}}>
          <ul className="select_dian">
            <li className='showList'>{this.state.txt ? '搜圈子' : '搜帖子' }</li>
            <li className='hideList' onClick={this.handleClick}>{this.state.txt ? '搜帖子' : '搜圈子' }</li>
          </ul>
          <div className="search_input">
            <Form onSubmit={this.handleSubmit}>
              <input placeholder="搜索喜欢的..." />
              <Button type="primary" htmlType="submit" style={{padding:'0px',border:'0px'}}>
                搜索
              </Button>
            </Form>

          </div>

          <div className="right_img">
            <img src={require('../../assets/circlr_img.gif')} alt=""/>
          </div>
        </Col>
      </Row>
    )
  }
}

export default CircleSearch;
