/**
 * Created by 10400 on 2017/8/14.
 * 店铺首页页面-头部
 */
import React , { Component } from 'react';
import {Carousel,Icon  } from 'antd';
import { routerRedux, Link } from 'dva/router';
import {} from '../../routes/store/store.less';
import Img from '../../components/Img/Img';
class  StoreIndexHeader extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render (){
    const {data,classId} = this.props;
    let arr = window.location.pathname.split("/").slice(1,3);
    let storePath = arr.join("/");
    return (
      <div className="store_top_l">
        <ul className="store_top_ul">
          {data.length > 0  && data.map((list,index)=>{
            return (
              <li key={index}>
                {classId && classId == list.stcId ?
                  <Link to={`/${storePath}/result/storeClassId/${list.stcId}`}>
                    <span style={{color:'#3497ce'}}>{list.stcName}</span>
                  </Link> :
                  <Link to={`/${storePath}/result/storeClassId/${list.stcId}`}>
                    <span>{list.stcName}</span>
                  </Link>
                }
                <div className="classification_ulList">
                  <h3>{list.stcName}</h3>
                  <div className="classification_link">
                    {list.classList.length > 0 && list.classList.map((val,i)=>{
                      if(classId && classId == val.stcId){
                        return (<Link key={i} style={{color:'#3497ce'}} to={`/${storePath}/result/storeClassId/${val.stcId}`}>{val.stcName}</Link>)
                      }else{
                        return (<Link key={i} to={`/${storePath}/result/storeClassId/${val.stcId}`}>{val.stcName}</Link>)
                      }
                    })}
                  </div>
                </div>
              </li>
              )
          })}
        </ul>
      </div>
    )
  }
}
export default StoreIndexHeader;
