import React from 'react';
import BannerAnim from 'rc-banner-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import {zoomImg} from '../../../utils/zoomImg'
import {goods_banner_box} from './goodBanner.less'
import { IMAGE_DOMAIN } from '../../../utils/common';
import defaultPhoto from '../../../assets/defaultPhoto.jpeg';
import Img from '../../../components/Img/Img';
const { Element, Arrow, Thumb } = BannerAnim;
const BgElement = Element.BgElement;

/**
 * Author leimingtech-lhm on 2017/8/9.
 * 商品轮播图组件
 */
class GoodsBanner extends React.Component {
 constructor() {
  super(...arguments);
  /*this.imgArray = [
    'http://testbbcimage.leimingtech.com/upload/img/lmadv/1502161242926.jpg',
    'http://testbbcimage.leimingtech.com/upload/img/store/0/1489673013416.jpg_400x400.jpg',
  ];*/
  this.state = {
   intShow: 0,
   prevEnter: false,
   nextEnter: false,
   thumbEnter: false,
   imgShowBox:'',
  };
  [
   'onChange',
   'prevEnter',
   'nextEnter',
  ].forEach((method) => this[method] = this[method].bind(this));
 }

 componentDidMount(){
  this.onMouseEnter(0);
  zoomImg();
 }

 componentWillReceiveProps(nextPro,prePro){
  console.log(nextPro,prePro)
  this.onMouseEnter(0);
  zoomImg();
 }


 onChange(type, int) {
  if (type === 'before') {
   this.setState({
    intShow: int,
   });
  }else {

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

 onMouseEnter=(key)=> {
  const {goodsdetails}=this.props;
   this.setState({
    imgShowBox: `${IMAGE_DOMAIN}${goodsdetails.goodsCallyList[key]}`
   });
 }

 hideImg =(img)=>{
  this.props.hideImg(img)
 }


 render() {
  const {goodsdetails}=this.props;
  let arrCallyList =  new Array(Math.ceil(goodsdetails.goodsCallyList.length/5)).fill(7);
  const thumbChildren = arrCallyList.map((v, i) =>{
    return (
     <Element key={i} prefixCls="banner-user-elem">
      <BgElement key="bg" className="bg">
       {
        goodsdetails.goodsCallyList.slice(i*5,i*5+5).map((img,i,a)=>{

         return (
          <span
           key={i}
           className={this.state.imgShowBox== `${IMAGE_DOMAIN}${img}` ?"active":""}
           onMouseEnter={()=>this.onMouseEnter(i)}>
            <Img style={{width:'44px',height:'39px'}} src={img} onHideImg={() => {this.hideImg(img)}}/>
               </span>
         )
        })
       }
      </BgElement>
     </Element>
    )
   }


  );
  return (
   <div className={goods_banner_box}>
    <div className="banner_show_box">

     <div id="show_box" className="show_one_box">
      <img src={this.state.imgShowBox} className="show_one_img" />
      <div id="move_box" className="show_banner_move"></div>
     </div>
     <div id="img_box" className="show_bigImg_box">
      <img id="bigImg" src={this.state.imgShowBox} className="goods_bigImg"/>
     </div>

     <BannerAnim
      onChange={this.onChange}
      prefixCls="custom-arrow-thumb" type="across" duration={600} arrow={false} thumb={false}>
      {thumbChildren}
      <Arrow arrowType="next" key="next" prefixCls="user-arrow next" component={TweenOne} onMouseEnter={this.nextEnter}><div className="arrow"></div></Arrow>
      <Arrow arrowType="prev" key="prev" prefixCls="user-arrow prev" component={TweenOne} onMouseEnter={this.prevEnter} ><div className="arrow"></div></Arrow>
     </BannerAnim>
    </div>
   </div>
  );
 }
}
export default GoodsBanner
