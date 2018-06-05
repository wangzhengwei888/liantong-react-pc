/**
 * Created by 10400 on 2017/8/14.
 * 商城首页页面-navleft
 */
import React , { Component } from 'react';
import {Carousel,Icon  } from 'antd';
import { routerRedux, Link } from 'dva/router';
import {fenlei_every} from './Home.less';
import Img from '../../components/Img/Img';
import { connect } from 'dva';


class  StoreIndexHeader extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  componentDidMount(){
    this.props.dispatch({ type: 'app/getGoodsClassEFF'});
  }

  render (){
    const {data} = this.props;

    let newData = data.slice(0,6);
    return (
      <div className="nav_left">
        <div className="fenlei">商品分类</div>
        <div className={ fenlei_every }>

          {
            newData ?
            newData.map((bigClass,index)=>{
            return (
              <div className={`fenlei${index} classification_content`} key={index}>
                <div className="fl_title" style={{minHeight:"80px"}}>
                  <div className="fl_title_top"><a href={`/goodsDetail/relevantGoods/${bigClass.gcId}`}>{bigClass.gcName}</a></div>
                  <div className="fl_title_bottom">
                    {bigClass.classList[0].classList.map((v,i)=>{
                      return (<a key={i} href={`/home/PeoductSearch/gcIdSearch/${v.gcId}`} style={{fontSize:".8rem"}}>{v.gcName}</a>)
                    })}
                  </div>
                </div>
                {/**/}
                <div className="fl_hover_show">
                  <div className="cat_pannel">
                    <div className="hd_sort_list">
                      {bigClass.classList.map((smallClass,index)=>{
                        return(
                          <dl key={index}>
                            <dt style={{width:'95%'}}>
                              <Img src={smallClass.gcpic} style={{height:'24px',width:'24px',verticalAlign: 'top',marginRight:'8px'}}/>
                              <a style={{fontSize:'.9rem',color:'#3497ce'}}>{smallClass.gcName}></a>
                            </dt>
                            <dd style={{width:'100%'}}>
                              {smallClass.classList.map((good,index)=>{
                                return (<a key={index} href={`/home/PeoductSearch/gcIdSearch/${good.gcId}`} className="gc3">{good.gcName}</a>)
                              })}
                            </dd>
                          </dl>
                        )
                      })}
                    </div>
                    <div className="Brands">
                      {bigClass.brandList.slice(0,4).map((brand,index)=>{
                        return (
                          <a href={`/home/PeoductSearch/BrandIdSearch/${brand.brandId}`} className="logo_Brands" key={index}><Img src={brand.brandPic}/></a>
                        )
                      })}
                    </div>
                    <div className="banner_gd">
                      {bigClass.brandList.slice(6,8).map((brand,index)=>{
                        return (
                            <a key={index} href={`/home/PeoductSearch/BrandIdSearch/${brand.brandId}`}><Img src={brand.brandPic}/></a>
                        )
                      })}
                    </div>

                  </div>
                </div>
                {/**/}
              </div>
            )
          })  : null }

        </div>
      </div>
    )
  }
}
export default connect(({app})=>({app}),(dispatch,own)=>{return {dispatch,own}})(StoreIndexHeader);
