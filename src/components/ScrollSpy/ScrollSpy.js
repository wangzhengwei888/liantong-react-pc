import React , { Component } from 'react';
//import { routerRedux,Link } from 'dva/router';
import { Row, Col, Menu, Dropdown, Button, Icon } from 'antd';

function offsetTop(element){
  let top = element.offsetTop; // 得到第一层距离
  let parent = element.offsetParent; // 得到第一个父元素
  while (parent !== null) { // 如果还有上一层父元素
    top += parent.offsetTop; // 把本层的距离累加
    parent = parent.offsetParent; // 得到本层的父元素
  } //然后继续循环
  return top;
}

class  ScrollSpy extends Component{
  constructor(props){
    super(props);
    this.state={
      arr1:[],
      index:-1,
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

     // let index=arr1.findIndex((i,index,arr)=>{
     //   if(arr.length<index){
     //     return ElescrollTop+offset>i&&ElescrollTop+offset<arr[index+1]
     //   }else {
     //     //return ElescrollTop+offset>arr[index]
     //   }
     //
     // });

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

     document.addEventListener("scroll",this.getScroollHieght,false);
     window.addEventListener('resize',this.getLeft,false);
     this.getLeft();

    }

  componentWillUnmount(){
    document.removeEventListener("scroll",this.getScroollHieght,false);
    window.removeEventListener('resize',this.getLeft,false);
  }

  onClick = (e) => {
    window.scrollTo(0, 0);
    e.target.style.display = "none";
  }

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

    addFloor=(list,index,selectCla)=>{
      return list.map((i,indexarr,arr)=>{
         if(index==indexarr){
           return <div key={indexarr} className="itemfloor selectCla" onClick={()=>this.scrollTOFloor(indexarr)}>
              <div className="num_floor">{indexarr+1}F</div>
              <div className="name_floor">{i}</div>
             </div>
         }else {
           return <div key={indexarr}className="itemfloor" onClick={()=>this.scrollTOFloor(indexarr)}>
             <div className="num_floor">{indexarr+1}F</div>
             <div className="name_floor">{i}</div>
           </div>
         }

      })
   }

  render (){
    const { list,selectCla,idArr ,...others } =this.props;
    let { left,arr1,index }=this.state;

    return (
      <div style={{
         left:`${left}px`
      }}
           {...others}
      >
        { index!=-1 ? this.addFloor(list,index,selectCla) : '' }
        {index!=-1 ? <div className="fold" style={{
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            lineHeight: '46px',
            textAlign: 'center'
        }} onClick={this.onClick}>回顶部</div>: ""}
          </div>

    )
  }
}
export default ScrollSpy;



{/*<ScrollSpy*/}
{/*className={fix_scrollFix}*/}
{/*idArr={['id1','id2','id3','id4']}*/}
{/*list={['西药',"中药",'器具','保健']}*/}
{/*selectCla="99"*/}
{/*>*/}
{/*</ScrollSpy>*/}
