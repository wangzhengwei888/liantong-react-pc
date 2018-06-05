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
import LoginBtn from '../../components/loginBtn/loginBtn'
import PropTypes from 'prop-types';


const DemoBox = props => <div className="demoBox">{props.children}</div>;

class GoodsShow_two extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ExpandNum:true,  //下拉菜单
    }
  }

  addCarshop = (goodsId,goodsPrice,isSellpiece,minNum) => {
    let num =isSellpiece == 0 ? minNum : 1;
    this.props.dispatch({ type: 'storegoodsList/addCartEFF',goodsId:goodsId,goodsPrice:goodsPrice,count:num});
    this.props.dispatch({type:'app/getcartCountEFF'});
  }



  render() {
    const {data =[]} = this.props.goodsList;
    console.log(data);
    return (
      <div style={{"flexWrap":"wrap",display:'flex',width:'100%'}}>
        {
          data.length > 0 && data[0].goodsList.map((img,index)=>{
          return (<div key={index}
                       style={{
                         width:'25%',
                         alignItems:'center',
                         textAlign:'center',
                         paddingTop:'2rem',
                         padding:'32px 16px 0'
                       }}>
            <a href={`/goodsDetail/${img.goodsId}`}><Img style={{width:"8rem",height:'8rem',cursor:'pointer'}} src={img.goodsImage}/></a>
            <div style={{fontWeight:'600',fontSize:'1rem',cursor:'pointer'}}><a href={`/goodsDetail/${img.goodsId}`}><p className="goodsName_ycyy">{img.goodsName}</p></a></div>
            <div>规格：{img.specName}</div>
            <div style={{width:'100%',position:'relative',lineHeight:'22px',height:'24px'}}>
              <div style={{position:'absolute',left:'-50px',marginLeft:'45%'}}>采购价:<div style={{float:'right'}}>
                <LoginBtn isChannelPrice={img.isChannelPrice} useClass='smallBtn' title={<span style={{verticalAlign: 'inherit',padding: '3px'}}>{img.channelPrice}</span>}/>
              </div></div></div>
            <div style={{width:'100%',position:'relative',height:'24px'}}><div style={{position:'absolute',left:'-50px',marginLeft:'50%'}}><LoginBtn goodsId={img.goodsId} isChannelPrice={img.isChannelPrice} useClass='priceBtn' clickHandle={()=>this.addCarshop(img.goodsId,img.channelPrice,img.isSellpiece,img.packTotal)} title={<Button type="primary">加入购物车</Button>}/></div></div>
          </div>)
        })
        }

      </div>    );
  }
}

export default connect(({storegoodsList})=>({storegoodsList}),(dispatch,own)=>{return {dispatch,own}})(GoodsShow_two);

