/**
 * Created by b2b2c on 2017/9/8.
 */
import React , { Component } from 'react';
import { connect } from 'dva';
import { Row, Col,Button,Icon,Breadcrumb,Menu, Dropdown } from 'antd';
import { Pagination, } from 'antd';
import { routerRedux } from 'dva/router';
import { getFullUrl } from '../../utils/common';
import Stepper from '../../components/Stepper/Stepper';
import Img from '../../components/Img/Img';
import LoginBtn from '../../components/loginBtn/loginBtn';
import GoodsShowOneList from "./goodsShow_onelist";
import PropTypes from 'prop-types';


const DemoBox = props => <div className="demoBox">{props.children}</div>

class GoodsShow_one extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  addCarshop = (goodsId,channelPrice,count) => {
    console.log(goodsId,channelPrice,count);
    this.props.dispatch({ type: 'storegoodsList/addCartEFF',goodsId:goodsId,goodsPrice:channelPrice,count:count});
    this.props.dispatch({type:'app/getcartCountEFF'});
  }



  render() {
    const {data =[]} = this.props.goodsList;
    return (
      <div  style={{"flexWrap":"wrap",display:'flex',width:'100%'}}>
        {
          data.length > 0 && data[0].goodsList.map((list,index)=>{
            return <GoodsShowOneList key={index} img={list} addCartshop={(goodsId,goodsPrice,count)=> {this.addCarshop(goodsId,goodsPrice,count)}}/>
        })
        }
      </div>
    );
  }
}

export default connect(({storegoodsList})=>({storegoodsList}),(dispatch,own)=>{return {dispatch,own}})(GoodsShow_one);
