import React from 'react';
import BannerAnim from 'rc-banner-anim';
import TweenOne, {TweenOneGroup} from 'rc-tween-one';
import LoginBtn from '../../../components/loginBtn/loginBtn'
import {classGoods} from './classGoods.less'
import { IMAGE_DOMAIN } from '../../../utils/common';

import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const {Element, Arrow, Thumb} = BannerAnim;
const BgElement = Element.BgElement;

/**
 * Author leimingtech-lhm on 2017/8/9.
 * 商品轮播图组件
 */
class ClassGoods extends React.Component {
  constructor() {
    super(...arguments);
    // this.imgArray = [
    //   'http://testbbcimage.leimingtech.com/upload/img/store/0/1489673013316.jpg_400x400.jpg',
    //   'http://testbbcimage.leimingtech.com/upload/img/store/0/1489673013416.jpg_400x400.jpg',
    // ];
    this.state = {
      intShow: 0,
      prevEnter: false,
      nextEnter: false,
      thumbEnter: false,
      arrow:false,
      imgShowBox: "http://testbbcimage.leimingtech.com/upload/img/store/0/1489673013316.jpg_400x400.jpg",
    };
    [
      'onChange',
      'prevEnter',
      'nextEnter',
      'onMouseEnter',
      'onMouseLeave',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onChange(type, int) {
    if (type === 'before') {
      this.setState({
        intShow: int,
      });
    } else {

    }
  }

  prevEnter() {
    this.setState({
      prevEnter: true,
    });
  }

  nextEnter() {
    this.setState({
      nextEnter: true,
    });
  }

  onMouseEnter(){
    this.setState({
      arrow: true,
    });
  }

  onMouseLeave(){
    this.setState({
      arrow: false,
    });
  }
  render() {
    const {goodsRecommed}=this.props;
   // console.log(goodsRecommed)
    let arrCallyList =  new Array(Math.ceil(goodsRecommed.length/5)).fill(7);
    const thumbChildren = arrCallyList.map((v, i) =>{
      return (
      <Element prefixCls="banner-user-elem" key={i}>
        <div style={{width:'1225px',overflow:'hidden'}}>
          <BgElement key="1" className="bg">
            {
              goodsRecommed.slice(i*5,i*5+5).map((img,index,a)=>{
               // console.log(img.goodsMarketPrice)
                return (
                  <div key={index} onClick={()=>{this.props.dispatch(routerRedux.push(`/goodsDetail/${img.goodsId}`));}}>
                    <i style={{backgroundImage: `url(${IMAGE_DOMAIN}${img.goodsImage})`}}/>
                    <div>
                      <div className="class_goodsName">
                        {img.goodsName}
                      </div>
                      <div className="class_goods_markPrice">
                        零售价：￥{img.goodsMarketPrice}
                      </div>
                      <div className="class_goodsPrice">
                        <span>采购价：</span>
                         {/*<LoginBtn useClass='mostSmallBtn' title={`￥${img.channelPrice}`}/>*/}
                        <LoginBtn
                          goodsId={img.goodsId}
                          isChannelPrice={img.isChannelPrice}
                          useClass='smallBtn'
                          title={<p className='goods_price'>￥ {img.channelPrice}</p>}
                        />
                      </div>
                      <div className="class_storeName">
                        {img.storeName}
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </BgElement>
        </div>
      </Element>
      )
    }
    );
    return (
      <div className={classGoods}>
      <BannerAnim prefixCls="banner-user"  type="across"  arrow={this.state.arrow} thumb={false} onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter}>
        {thumbChildren}
        {/*<Element prefixCls="banner-user-elem" key="0">
          <div style={{width:'1225px'}}>
          <BgElement key="1" className="bg">
              {thumbChildren}
          </BgElement>
          </div>
        </Element>*/}
        {/*<Element prefixCls="banner-user-elem" key="1">
         <div style={{width:'1225px'}}>
          <BgElement key="bg" className="bg" style={{background: '#64CBCC',}}>
            {thumbChildren}
          </BgElement>
         </div>
        </Element>*/}
      </BannerAnim>
      </div>
    );
  }
}
// export default ClassGoods
export default connect(({ClassGoods})=>({ClassGoods}),(dispatch,own)=>{return {dispatch,own}})(ClassGoods);
