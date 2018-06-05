import React, { Component } from 'react'
// import { brand_dynamic } from './Brand.less'
import { BodyHeadImg } from '../../components/Advertising/Advertising'
import { connect } from 'dva'
import { Icon } from 'antd'
import Img from "../../components/Img/Img";
import { featureService_dynamic } from './FeatureService.less'

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
    const { data } = this.props.featureService;
    let { articleContentData} =this.props.app;
    return (
      <div className={featureService_dynamic}>
       {/* <BodyHeadImg headImg={data[0].headImg}/>*/}
        {/* <div className="featureService_dynamic_Topimg"></div>*/}
         {/*<Img src= {this.state.headImage}  style={{width:'960px',height:'70px'}}/>*/}
        {articleContentData&&  articleContentData[0] && articleContentData[0].headImage?
          <Img src= {articleContentData[0].headImage }  style={{width:'960px',height:'70px'}}/>:<div></div>
         }
        <div style={{minHeight:'400px'}}>           
              {
                articleContentData &&  articleContentData[0] && articleContentData[0].articleContent?
                     <div dangerouslySetInnerHTML={{ __html:articleContentData[0].articleContent }}></div>
                     :'无内容'
              }
        </div>
      </div>
    )
  }
}
export default connect(({featureService,app})=>({featureService,app}),(dispatch,own)=>{return {dispatch,own}})(Dynamic)
