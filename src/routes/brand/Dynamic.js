import React, { Component } from 'react'
 import { brand_dynamic } from './Brand.less'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { connect } from 'dva'
import { Icon } from 'antd'
import Img from "../../components/Img/Img";



class Dynamic extends Component{

  constructor(props){
    super(props)
    this.state = {
      headImage:'',
    }
  }


  // componentWillMount(){
  //   var obj={};
  //   var name,value;
  //   var str=window.location.href;
  //   var num=str.indexOf("?");
  //   str=str.substr(num+1);
  //   var arr={};
  //   arr=str.split("&");
  //   for(var i=0;i<arr.length;i++){
  //     var Cstr=arr[i]
  //     var Barr=Cstr.split("=")
  //     obj[Barr[0]]=decodeURI(Barr[1])
  //   }
  //   // console.log(obj.headImage)
  //   this.setState({
  //     headImage:obj.headImage
  //   })
  // }

  // componentWillReceiveProps(nextPro,prePro){
  //   var obj={};
  //   var name,value;
  //   var str=window.location.href;
  //   var num=str.indexOf("?");
  //   str=str.substr(num+1);
  //   var arr={};
  //   arr=str.split("&");
  //   for(var i=0;i<arr.length;i++){
  //     var Cstr=arr[i]
  //     var Barr=Cstr.split("=")
  //     obj[Barr[0]]=decodeURI(Barr[1])
  //   }
  //   // console.log(obj.headImage)
  //   this.setState({
  //     headImage:obj.headImage
  //   })
  //  }

  render () {
    const { data } = this.props.brand
    let { articleContentData} =this.props.app;
    console.log(articleContentData)
    return (
      <div className={brand_dynamic}>
       {/* <BodyHeadImg headImg={data[0].headImg}/>  */}
       {articleContentData&&  articleContentData[0] && articleContentData[0].headImage?
        <Img src= {articleContentData[0].headImage }  style={{width:'960px',height:'70px'}}/>:<div></div>
       }
         {/* <Img src= {this.state.headImage}  style={{width:'960px',height:'70px'}}/>*/}
       {/*  <div className="brand_dynamic_Topimg"></div> */}
        <div style={{minHeight:'400px'}}>
              {
                articleContentData&&  articleContentData[0] && articleContentData[0].articleContent?
                     <div dangerouslySetInnerHTML={{ __html:articleContentData[0].articleContent }}></div>
                     :'无内容'
              }
        </div>
        {/*
          <div dangerouslySetInnerHTML={{ __html: goodsdetails.ecNumber }}></div>
        <div className='retrieval_location'>
          {
            data.length ? data[0].currentLocation.map((item,index) => {
              return <span key={index}>{item}{index < data[0].currentLocation.length-1 ? <Icon type="right" /> : ''}</span>
            }) : <span>品牌中心</span>
          }
        </div>
        <div className='brand_profile_agency'>
          <div className='brand_introduction'><Img src={data[0].brandIntroduction.img}/></div>
          <div className='authorise_agency'><Img src={data[0].authoriseAgency.img}/></div>
        </div>
        <ul className='brand_menu'>
          {
            data.length ? data[0].fourLevel.map((item,index) => {
              return <li key={index} className={item.current===1 ? 'current_menu' : 'other_menu'}>{item.title}</li>
            }) : null
          }
        </ul>
        <div className='product_introduction'>
          <Img src={data[0].productIntroduction.img}/>
        </div>
        <div className='brand_download'>
          {
            data.length ? data[0].download_data.map((item,index) => {
              // return <a key={index} href={item.url} download>{item.title}</a>
              return <div key={index}>
                <span onClick={() => this.props.dispatch({ type: 'brand/downloadEFF', payload:item.url})}>{item.title}</span>
              </div>
            }) : null
          }
        </div>
        <div className='brand_others'>
          <Img src={data[0].others.img}/>
        </div>
        */}
      </div>
    )
  }
}
export default connect(({brand,app})=>({brand,app}),(dispatch,own)=>{return {dispatch,own}})(Dynamic)
