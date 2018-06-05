/**
 * Created by b2b2c on 2017/9/4.
 */
//资讯头尾
import React , { Component } from 'react';
import { Form,Icon,Button,Carousel,message} from 'antd';
import {connect} from 'dva';
import Img from '../../components/Img/Img';
import { routerRedux,Link } from 'dva/router';
import InformationTop from './informationTop'
import InformationBottom from './informationBottom';
import {information_content} from './information.less';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';


class Information extends Component{
  constructor(props){
    super(props);
  }


  render(){
    const {indexData}=this.props.information;
    let { advlist=[] } = indexData;
    let { defaultClassList=[] } = indexData;
   // console.log(indexData)
    // console.log(this.props)
    return (
      <div>   {/*
              <Carousel autoplay>
                {
                  advlist.map((img,index) => {
                    return <div key={index}><a href={`information/informationDetails/${img.id}`}><Img style={{Width:'100%',height:'100%'}} src={img.thumb}/></a></div>
                  })
                }
              </Carousel>
            */}
       {/*<InformationTop indexData={indexData} /> */}
        <div><Search></Search></div>
        <div><Navigation></Navigation></div>
        <div className={information_content}>

          <div className="home_carousel">
            {/*<Img src='' style={{width:'100%',height:'100%'}}/>*/}
            <div className="carousel_Topimg"></div>
          </div>
            {
              defaultClassList.map((img,index) =>{
                return (
                  <div key={index} className="home_news_list_one">
                    <div className="news_head">
                      {img.acName}<Link to={`/information/informationList/${img.acId}`} className="news_head_span">更多<Icon type="right"/></Link>
                    </div>
                    <ul className="news_content">
                      {
                        img.contentList.map((img,index)=>{
                          return(
                            <li key={index}><Link style={{color:img.isHeadline == 1 ? "red" : ""}} to={`/information/informationDetails/${img.id}`} dangerouslySetInnerHTML={{ __html: img.title }}></Link></li>
                          )
                        })
                      }
                    </ul>
                  </div>
                )
              })
            }
        </div>



      </div>
    )
  }
}

export default connect(( {information,app})=>({information,app}),(dispatch,own)=>{return{dispatch,own}})(Information);
