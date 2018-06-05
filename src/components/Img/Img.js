import React, {Component, PropTypes} from 'react';
import {IMAGE_DOMAIN} from '../../utils/common';

// let i = 0;
// let isAbled = true;
// const imgError = (i) => {
//  i++;
//  isAbled = false;
//  console.log("这是错误的路径" + i)
// }
//
//
// export default function Img({...props}) {
//  let imgArr = !!props.src && props.src.split(",");
//  if (imgArr && imgArr.length > 0) {
//   for (; i < imgArr.length;) {
//    console.log("这是循环")
//    return <img {...props} src={`${IMAGE_DOMAIN}${imgArr[i]}`} onError={() => {imgError(i)}}/>
//   }
//
//  }
//
// }




class Img extends Component{

 constructor(props){
  super(props);
  this.state={
   imgUrlIndex:0,
   // isUser:true
  }
 }

 imgError = (i) => {
  let imgArr = !!this.props.src && this.props.src.split(",");
  if(imgArr.length > 1){
   this.setState({
    imgUrlIndex:i+1
   })
  }else{
   this.props.onHideImg ? this.props.onHideImg() : null
  }
 }

 render(){
  let imgArr = !!this.props.src && this.props.src.split(",");
  return(
   <img {...this.props} src={`${IMAGE_DOMAIN}${imgArr[this.state.imgUrlIndex]}`} onError={() => {this.imgError(this.state.imgUrlIndex)}}/>
  )
 }
}
export default Img;

