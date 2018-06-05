import React, { Component } from 'react'
import { connect } from 'dva'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { customService_dynamic } from './CustomService.less'
import Img from "../../components/Img/Img";

class CustomServiceDefault extends Component{


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
    let { defaultPageInfo } = this.props.customService;
    let { articleContentData} =this.props.app;
    return (
      <div className={customService_dynamic}>
        {/* <BodyHeadImg headImg={defaultPageInfo[0].headImg}/>*/}
        {/* <div className="customService_dynamic_Topimg"></div>*/}
       {/*   <Img src= {this.state.headImage}  style={{width:'960px',height:'70px'}}/>*/}
       {articleContentData&&  articleContentData[0] && articleContentData[0].headImage?
        <Img src= {articleContentData[0].headImage }  style={{width:'960px',height:'70px'}}/>:<div></div>
       } 
       <div style={{minHeight:'400px'}}>           
        {
          articleContentData&&  articleContentData[0] && articleContentData[0].articleContent?
               <div dangerouslySetInnerHTML={{ __html:articleContentData[0].articleContent }}></div>
               :'无内容'
        }
        </div>
            
      </div>
    )
  }
}

export default connect(({customService,app})=>({customService,app}),(dispatch,own)=>{return {dispatch,own}})(CustomServiceDefault)