import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {  Button,Table,Icon, Modal,Carousel,message, Tabs,Row,Col,Tooltip } from 'antd';
import { routerRedux, Link } from 'dva/router';
import Img from '../../components/Img/Img';
import Search from '../../components/Search/Search';
import HomeFloorTabs from './HomeFloorTabs';
import HomeNavLeft from './HomeNavLeft';
import LazyLoad from 'react-lazyload';

import ScrollSpy from '../../components/ScrollSpy/ScrollSpy';
import Navigation from '../../components/Navigation/Navigation'


const TabPane = Tabs.TabPane;

import { home_nav, fenlei_every , home_carousel, home_recommend, home_blogroll, re_goods, pinbai_cal, pinbai_cal_all, fix_scrollFix} from './Home.less';


// import { getFullUrl } from '../../utils/common';
const confirm = Modal.confirm;

function SampleNextArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      // style={{...style}}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      // style={{...style}}
      onClick={onClick}
    ></div>
  );
}



class  Home extends Component{
  constructor(props){
    super(props);
    this.state={
      bg:''
    }
  }

  onBgChange = (from, to) => {
    const {advList} =this.props.home;
    this.setState({bg:advList[0].topBanner[0].advList[to].advBgColor})
  }

  render (){
    let { data,tagList,navList,advList,brand,jia,indexAdvGg,sideNewsData} =this.props.home;
    let { defaultClassList=[] } = sideNewsData;
    let { marketList=[] } = sideNewsData;
    let { bg } = this.state;
    let idArr = [];
    let listArr = [];

    data.length > 0 ?
      data.map((list,index)=>{
        idArr.push("id" + index);
        listArr.push(list.floorName.substring(0,2));
      }) : null
    return (
      <div>
        <div><Search></Search></div>
        <div><Navigation visiable={true} isPreson={false}></Navigation></div>
        <div style={{paddingBottom:'18px'}}>

          <div className={home_nav}>
            <div className="nav_right">
              {[].map((list,index)=>{
                let path = list.navUrl;
                let newpath = path.replace("http://bbc.leimingtech.com","");
                return (
                  <Link to={newpath} className="nav_link" activeClassName='actived_link' key={index}>{list.navTitle}</Link>
                )
              })}
            </div>
            <div className="nav_right_gongao">
              <Tabs defaultActiveKey="1">
                <TabPane tab="公告通知" key="1">
                  <ul className="gongao_list">
                  {defaultClassList && defaultClassList.length > 0 && defaultClassList[4].contentList&& defaultClassList[4].contentList.length>0 && defaultClassList[4].contentList.slice(0,5).map((list,index)=>{
                    return (
                      <li key={index}>
                        <Tooltip placement="bottom" title={list.title}  overlayStyle={{maxWidth:'350px',overflow:"hidden"}}>
                          <a target='_blank' style={{color:list.isTop == 1 ? "red" : ""}} href={`/information/informationDetails/${list.id}`}   dangerouslySetInnerHTML={{ __html: list.title }}></a>
                        </Tooltip>
                      </li>
                    )
                  })}
                  </ul>
                  {defaultClassList && defaultClassList.length > 0 && defaultClassList[4] ?
                      <div style={{ textAlign:'right', paddingRight:"10px" }}><span><a style={{ color:'#3497ce' }} href={` /information/informationList/${defaultClassList[4].acId} `}>更多>></a></span></div>
                    :null
                  }

                </TabPane>
                <TabPane tab="市场动态" key="2">
                  <ul className="gongao_list">
                    {marketList.length > 0 && marketList.slice(0,5).map((list,index)=>{
                      return (
                        <li key={index}>
                          <Tooltip placement="bottom" title={list.title} overlayStyle={{maxWidth:'350px',overflow:"hidden"}}>
                            <a target='_blank'  href={`/information/informationDetails/${list.id}`}>{list.title}</a>
                          </Tooltip>
                        </li>
                      )
                    })}
                  </ul>
                 <div style={{ textAlign:'right', paddtopBanneringRight:"10px" }}><span><Link style={{ color:'#3497ce' }} to="/information?parentId=5&articleId=35fa8556deb84324b0815f90cd9cb13a">更多>></Link></span></div>
                </TabPane>
              </Tabs>
              <div className='buttons'>
                <div><Link to='/login'>快捷登录</Link></div>
                <div><Link to='/product/quickorderdescription'>极速下单</Link></div>
                <div><Link target="_blank" to='/customservice?parentId=0ca7d45702794846aac94ea4b583b9a1&articleId=aac88cb73fa44835a820a6ab048182ea&headImage=/static/head/customService_dynamic_Topimg.jpg'>下载中心</Link></div>
              </div>
            </div>
          </div>

          {advList.length > 0 && advList[0].topBanner[0].advList.length > 0 ?
            <div style={{ backgroundColor:bg=='' ? advList[0].topBanner[0].advList[0].advBgColor :bg }}>
              <div className={home_carousel}>
                <div className='home_carousel_box'>
                  <Carousel autoplay beforeChange={this.onBgChange}>
                    {advList.length > 0 && advList[0].topBanner[0].advList.length > 0 ?
                      advList[0].topBanner[0].advList.map((adv,index)=>{
                        return (
                          <div className='carousel' key={index}>
                            <Link to={adv.advUrl}  target='_blank' >
                              <Img src= {adv.resUrl} style={{width:'100%',height:'100%'}}/>
                            </Link>
                          </div>
                        )
                      }) : <div></div>}
                  </Carousel>
                  <div className='home_carousel_box_go'>
                    <div>
                      <div className='home_carousel_box_go_new'></div>
                      <p>新品上新</p>
                      <button><Link to='/product/new'>去看看</Link></button>
                    </div>
                    <div>
                      <div className='home_carousel_box_go_activity'></div>
                      <p>活动报名</p>
                      <button><Link to='/product/enrollment'>去看看</Link></button>
                    </div>
                    <div>
                      <div className='home_carousel_box_go_promotions'></div>
                      <p>促销清仓</p>
                      <button><Link to='/product/promotions'>去看看</Link></button>
                    </div>
                  </div>
                </div>
              </div>
            </div> : <div style={{ height:"394px" }}></div>}


          <div className={home_recommend}>
            {advList.length > 0 && advList[0].indexAdvGg[0].advList.length > 0 ?
               advList[0].indexAdvGg[0].advList.map((adv,index)=>{
               return (
                   <div className='recommend_left'  key={index}>
                      <Link target='_blank' to={adv.advUrl}><Img src={adv.resUrl}/></Link>
                    </div>
               )
               }) : <div style={{ height:"370px",width: '234px', marginRight:'20px'}}></div>
            }


            <div className='recommend_middle'>
              <Tabs defaultActiveKey="1" tabBarStyle={{borderBottom:'none',marginBottom:'0'}}>

               { <TabPane tab="推荐产品" key="1">
                   {advList.length>0 &&  !!(advList[0].recomProducts )&& advList[0].recomProducts.length>0 ? advList[0].recomProducts[0].advList.slice(0,6).map((item,ind) => {
                              return <div style={ ind==0||ind==1||ind==2 ? { borderBottom:"1px solid #f0f3ef" }: {}} className={ ind==1||ind==2||ind==4||ind==5 ? "heome_good_item":'' } key={ind}>
                              <LazyLoad throttle={200} height={300} placeholder={<Icon type="loading" />} >
                                  <Link target='_blank' to={item.advUrl} style={{ display:'inline-block', width:"100%", height:"100%", color:'#666'}}>
                                      <Img src={item.resUrl}/>
                                      <p>{item.advTitle}</p>
                                  </Link>
                              </LazyLoad>
                              </div>
                    }):null}
                </TabPane>}
                { <TabPane tab="热门活动" key="2" className='heome_good_item_22' >
                  {advList.length>0 &&  !!(advList[0].hotActivity )&& advList[0].hotActivity.length>0 ? advList[0].hotActivity[0].advList.slice(0,4).map((item,ind) => {
                              return <div style={ ind==0||ind==1 ? { borderBottom:"1px solid #f0f3ef" }: {} } className={ ind==0||ind==3? "heome_good_item_two ":'' } key={ind}>
                              <LazyLoad throttle={200} height={300} placeholder={<Icon type="loading" />} >
                                  <Link  target='_blank' to={item.advUrl} style={{ display:'inline-block', width:"100%", height:"100%", color:'#666'}}>
                                      <Img src={item.resUrl}/>
                                      <p>{item.advTitle}</p>
                                  </Link>
                              </LazyLoad>
                              </div>
                    }):null}
                 </TabPane>}
             { <TabPane tab="电子目录" key="3">
             {advList.length>0 &&  !!(advList[0].eleCatalogues )&& advList[0].eleCatalogues.length>0 ? advList[0].eleCatalogues[0].advList.slice(0,6).map((item,ind) => {
                        return <div style={ ind==0||ind==1||ind==2 ? { borderBottom:"1px solid #f0f3ef" }: {}} className={ ind==1||ind==2||ind==4||ind==5 ? "heome_good_item":'' } key={ind}>
                        <LazyLoad throttle={200} height={300} placeholder={<Icon type="loading" />} >
                            <Link  target='_blank'  to={item.advUrl} style={{ display:'inline-block', width:"100%", height:"100%", color:'#666'}}>
                                <Img src={item.resUrl}/>
                                <p>{item.advTitle}</p>
                            </Link>
                        </LazyLoad>
                        </div>
              }):null}
          </TabPane>}



              </Tabs>
            </div>




            <div className='recommend_right'>
              <div className='recommend-list'>
                <div>品牌推荐</div>
                <ul>
                      {advList.length>0 &&  !!(advList[0].recomProducts )&&advList[0].indexBrand.length>0 ? advList[0].indexBrand[0].advList.map((item,index) => {
                        return <li key={index}>
                          <span className="img_link_a" to=''><Img src={item.resUrl}/></span>
                          {advList[0].indexBrand[0].apIntro ? <div><p>{advList[0].indexBrand[0].apIntro.substr(0,16) + "..."}</p><span><Link to={item.advUrl}>进入品牌专区 <Icon type="double-right" /></Link></span></div> : null}
                        </li>
                      }) : null}
                </ul>
              </div>
              <div className='hot-selling'>
                <div>热销商品</div>
                <ol className='hot-selling_list' >
                  {advList.length > 0 && advList[0].hotGoods[0]&&advList[0].hotGoods[0].goodsRecommendList &&advList[0].hotGoods[0].goodsRecommendList.length > 0 ?
                      advList[0].hotGoods[0].goodsRecommendList.map((item,index)=>{
                      return (
                        <li key={index}>

                          <Link  to={`/goodsDetail/${item.goods.goodsId}`} className="nav_link" activeClassName='actived_link'> {item.goods.goodsName}</Link>
                        </li>
                      )
                      }) : null
                  }
                </ol>
              </div>
            </div>
          </div>
          {/*<ScrollSpy*/}
          {/*className={fix_scrollFix}*/}
          {/*idArr={idArr}*/}
          {/*list={listArr}*/}
          {/*selectCla="99"*/}
          {/*>*/}
          {/*</ScrollSpy>*/}

        </div>
        <div className={home_blogroll}>

          {advList.length > 0 && advList[0].indexAdvRx01[0].advList.length > 0 ?
            advList[0].indexAdvRx01[0].advList.map((adv,index)=>{
            return (
                   <Link target="_blank " to={adv.advUrl}  key={index}><Img src={adv.resUrl} /></Link>
            )
            }) : <div style={{ height:"100px",width: '100px', marginRight:'20px'}}></div>
         }
         {advList.length > 0 && advList[0].indexAdvRx02[0].advList.length > 0 ?
              advList[0].indexAdvRx02[0].advList.map((adv,index)=>{
              return (
                <Link target="_blank " to={adv.advUrl}  key={index}><Img src={adv.resUrl} /></Link>
              )
              }) : <div style={{ height:"100px",width: '100px', marginRight:'20px'}}></div>
          }
          {advList.length > 0 && advList[0].indexAdvRx03[0].advList.length > 0 ?
              advList[0].indexAdvRx03[0].advList.map((adv,index)=>{
              return (
                <Link target="_blank " to={adv.advUrl}  key={index}><Img src={adv.resUrl} /></Link>
              )
              }) : <div style={{ height:"100px",width: '100px', marginRight:'20px'}}></div>
          }
          {advList.length > 0 && advList[0].indexAdvRx04[0].advList.length > 0 ?
                advList[0].indexAdvRx04[0].advList.map((adv,index)=>{
                return (
                  <Link target="_blank " to={adv.advUrl}  key={index}><Img src={adv.resUrl} /></Link>
                )
                }) : <div style={{ height:"100px",width: '100px', marginRight:'20px'}}></div>
            }
            {advList.length > 0 && advList[0].indexAdvRx05[0].advList.length > 0 ?
                advList[0].indexAdvRx05[0].advList.map((adv,index)=>{
                return (
                  <Link target="_blank " to={adv.advUrl}  key={index}><Img src={adv.resUrl} /></Link>
                )
                }) : <div style={{ height:"100px",width: '100px', marginRight:'20px'}}></div>
            }
            {advList.length > 0 && advList[0].indexAdvRx06[0].advList.length > 0 ?
                  advList[0].indexAdvRx06[0].advList.map((adv,index)=>{
                  return (
                    <Link target="_blank " to={adv.advUrl}   key={index}><Img src={adv.resUrl} /></Link>
                  )
                  }) : <div style={{ height:"100px",width: '100px', marginRight:'20px'}}></div>
              }
        </div>
      </div>
    );
  }
}

Home.propTypes = {

}


export default connect(({home,app})=>({home,app}),(dispatch,own)=>{return {dispatch,own}})(Home);


