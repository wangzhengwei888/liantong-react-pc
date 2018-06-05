import React , { Component } from 'react';
import { Link } from 'dva/router';
import {  Icon,Tooltip } from 'antd';
import { app_server_fix } from './CustomRight.less';

function offsetTop(element){
  let top = element.offsetTop; // 得到第一层距离
  let parent = element.offsetParent; // 得到第一个父元素
  while (parent !== null) { // 如果还有上一层父元素
    top += parent.offsetTop; // 把本层的距离累加
    parent = parent.offsetParent; // 得到本层的父元素
  } //然后继续循环
  return top;
}

class  CustomRight extends Component{
  constructor(props){
    super(props);
    this.state={
      left:0
    }
  }


  getScroollHieght = () =>{
    // console.log(document.body.scrollTop);
    let offset=this.props.offset||200;
    let ElescrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    // console.log(index);
    let arr = this.props.idArr||[];                              //['id1','id2','id3','id4'];
    let arr1=arr.map((i,index)=>{
      return offsetTop(document.getElementById(i));
    });


    let index=-1;

    for(let i=0;i<arr1.length;i++){
      if(ElescrollTop+offset>arr1[i]){
        index=i;
      }
    }

    //console.log(arr1);
    //console.log(index);

    this.setState({
      arr1:arr1,
      index:index
    });

  }

  getLeft=()=>{
    this.setState({
      left:parseInt(document.body.clientWidth||document.documentElement.clientWidth)>1280+40 ? (parseInt(document.body.clientWidth||document.documentElement.clientWidth)-1280)/2-20:0
    })
  }

  componentDidMount(){
    // let arr = ['id1','id2','id3'];
    //   let arr1=arr.map((i,index)=>{
    //     return offsetTop(document.getElementById(i));
    //   });
    //   console.log(arr1);
    //   this.setState({
    //     arr1:arr1
    //   });
    //   console.log(document.body.clientHeight );
    //   console.log(document.body.scrollTop );

    // document.addEventListener("scroll",this.getScroollHieght,false);
    window.addEventListener('resize',this.getLeft,false);
    this.getLeft();

  }

  componentWillUnmount(){
    // document.removeEventListener("scroll",this.getScroollHieght,false);
    window.removeEventListener('resize',this.getLeft,false);
  }

  // onClick = (e) => {
  //   window.scrollTo(0, 0);
  //   e.target.style.display = "none";
  // }

  scrollTOFloor = (index) => {
    let timer = null;
    clearTimeout(timer);
    let _this = this;
    timer = setInterval(function(){
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let step = scrollTop > _this.state.arr1[index] ? -20 : 20;
      let target = scrollTop + step;
      window.scrollTo(0, target);
      if(step > 0){
        if(target >= _this.state.arr1[index]){
          window.scrollTo(0, _this.state.arr1[index]);
          clearTimeout(timer);
        }
      }else{
        if(target <= _this.state.arr1[index]){
          window.scrollTo(0, _this.state.arr1[index]);
          clearTimeout(timer);
        }
      }
    },16)
    // window.scrollTo(0, this.state.arr1[index]);
  }


  render (){
     let { left } = this.state;

    return (
        <div
          style={{
            right:`${left}px`
          }}
          className={app_server_fix}>
          <Tooltip placement="left" title={'我的账户'}>          
              <Link to="/presonAccunt/myAccount" className="server_preson"><Icon style={{  fontSize:'20px'  }} type="user" /></Link>      
          </Tooltip>        
          <Tooltip placement="left" title={'在线客服'}>
            <div  style={{ borderTop:'none' }} className="server_preson custom" >
            <a style={{ height:'100%',width:'100%',display:'inline-block' }}   target="_blank"  href='http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAxNzc3Ml8xNjM4MDVfODAwODIwNTE0N18yXw'></a>
            </div>
          </Tooltip>
          <Tooltip placement="left" title={'我的购物车'}>          
              <Link to="/personOrder/cart" className="server_preson"><Icon style={{  fontSize:'20px'  }} type="shopping-cart" /></Link>   
          </Tooltip>             
          <div  style={{ borderTop:'none' }} className="server_preson er_wei_mafather">   
               <Icon type="qrcode" style={{  fontSize:'20px'  }} />  
               <div  className="er_wei_ma_tanchuang">                              
               </div>         
          </div>    
          <div onClick={()=>{ window.scrollTo(0, 0) }}  style={{ borderTop:'none' }}  className="server_preson">
               <Icon style={{  fontSize:'20px'  }} type="up" />
          </div>
        </div>
     )
  }
}
export default CustomRight;



{/*<ScrollSpy*/}
{/*className={fix_scrollFix}*/}
{/*idArr={['id1','id2','id3','id4']}*/}
{/*list={['西药',"中药",'器具','保健']}*/}
{/*selectCla="99"*/}
{/*>*/}
{/*</ScrollSpy>*/}
