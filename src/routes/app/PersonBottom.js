import React , { Component } from 'react';
import {footers} from './PersonBottom.less';
import { Row, Col } from 'antd';


//import { getFullUrl } from '../../utils/common';
class  PersonBottom extends Component{

  componentDidMount(){
    this.props.dispatch({ type: 'app/getLinkUrlEFF'});
  }
  render (){
    const {linkUrlData} = this.props;
    return (
      <div>
        <div className={footers}>
          <div  className="xinxi">
            {linkUrlData.length > 0 && linkUrlData.map((list,index)=>{
              if(index < linkUrlData.length-1){
                return <span key={index}><a href={list.dictionaryValue} target="_blank">{list.dictionaryName}</a>&nbsp;|&nbsp;</span>
              }else{
                return <span key={index}><a href={list.dictionaryValue} target="_blank">{list.dictionaryName}</a></span>
              }

            })}
          </div>

          <div style={{width:'1125px',margin:'18px auto',textAlign:'center'}} >
            Copying 2011-2015 国药集团版权所有 Inc All rights reserved <span></span>
          </div>

          <div  style={{width:'1125px',margin:'18px auto',textAlign:'center'}} className="guo_img">
            <div className="guo_img1"></div>
            <div className="guo_img2"></div>
            <div className="guo_img3"></div>
          </div>
        </div>
      </div>
    )
  }
}
export default PersonBottom;

