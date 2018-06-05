/**
 * Created by 10400 on 2017/8/14.
 * 店铺首页页面-头部
 */
import React , { Component } from 'react';
import {Carousel, } from 'antd';
import { connect } from 'dva';
import {} from '../../routes/store/store.less';
import Img from '../../components/Img/Img';
class  StoreIndexHeader extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render (){
    let {imgData} =this.props;
    let imgArr = [];
    let urlArr = [];
    if(imgData.length > 0 && imgData[0].storeSlide){
      imgArr = imgData[0].storeSlide.split(",")
      urlArr = imgData[0].storeSlideUrl.split(",")
    }
    return (
      <div className="store_top_c">
        <Carousel effect="fade" autoplay>
          {imgArr.length > 0 ?
            imgArr.map((list,index)=>{
              return (
                <div key={index}><a href={urlArr[index]}><Img src= {list} className="OF_right_img" style={{width:'774px',height:'392px'}} /></a></div>
              )
            }) : <div></div>}
        </Carousel>

      </div>
    )
  }
}

export default StoreIndexHeader;
