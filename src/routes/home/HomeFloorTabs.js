import React , { Component } from 'react';
import { routerRedux,Link } from 'dva/router';
import LoginBtn from '../../components/loginBtn/loginBtn'
import { Row, Col, Menu, Tabs, Button, Icon ,Carousel} from 'antd';
import { floor_tabs,pane_goods } from './HomeFloorTabs.less';
import LazyLoad from 'react-lazyload';
import Img from '../../components/Img/Img';

const TabPane = Tabs.TabPane;



class  HomeFloorTabs extends Component{

  render (){
    const data = this.props.floor;
    const index = this.props.index;
    return (
      <div className={floor_tabs}>
        <div>
          <span className="left_title">{index+1}F</span>
          <span className="right_title">{data.floorName}</span>
          <div style={{lineHeight:'32px',float:'right'}}>
            {data.goodsClassList.length > 0 && data.goodsClassList.map((classList,i)=>{
              return (
                <a key={i} href={`/home/PeoductSearch/${classList.searchType}/${classList.gcId}`}><span className="tab_titletxt" >{classList.gcName}</span></a>
              )
            })}
          </div>
        </div>
        <Row className={pane_goods} type="flex" justify="center">
          <Col className='OF_left_goods'>
            <Carousel autoplay className="OF_carousel">
              {data.advPosition.advList && data.advPosition.advList.length > 0 ?
                data.advPosition.advList.map((adv,index)=>{
                  return (
                    <div key={index} className="OF_carousel">
                      <a href={adv.advUrl} className="OF_carousel">
                        <Img src={adv.resUrl} className="OF_th_img" />
                      </a>
                    </div>
                  )
                }) : <div></div>}
            </Carousel>
            {/*<LazyLoad throttle={200} height={300} placeholder={<Icon type="loading" />}>*/}
              {/*<a href="#">*/}
                {/*<Img src={data.advPosition.advList[0].resUrl} className="OF_th_img" />*/}
              {/*</a>*/}
            {/*</LazyLoad>*/}
          </Col>
          <Col className='OF_right_goods'>
            {/*{console.log(data.goodsList)}*/}
            {data.goodsList.map((goods,index)=>{
              if(index > 5){
                return ("")
              }
              return (
                <LazyLoad key={index} throttle={200} height={300} placeholder={<Icon type="loading" />}>
                  <div style={{display:'inline-block'}} className='OF_right_list'>
                    <Link to={'/goodsDetail/' + goods.goodsId}>
                      <p className="OF_right_img">
                        <Img className="imgAnimate" src={goods.goodsImage}/>
                      </p>
                      <p className='goods_name'>{goods.goodsName}</p>
                    </Link>
                    <div style={{paddingLeft:'20px'}}>
                      <LoginBtn goodsId={goods.goodsId} isChannelPrice={goods.isChannelPrice} useClass='smallBtn' title={<p className='goods_price'>￥ {goods.channelPrice}</p>}/>
                    </div>
                  </div>
                </LazyLoad>)
            })}
          </Col>
        </Row>
        {/*<Tabs tabBarExtraContent={<div><span className="left_title">{index+1}F</span><span className="right_title">{data.floorName}</span></div>} tabBarStyle={{color:'red'}} className="HomeFlorr_tab">*/}
          {/*<TabPane*/}
            {/*tab={*/}
              {/*<div style={{height:'18px',lineHeight:'18px'}}>*/}
                {/*<div className="tab_titletxt" >家庭常用</div>*/}
              {/*</div>*/}
            {/*}*/}
            {/*key="1">*/}
            {/*<Row className={pane_goods} type="flex" justify="center">*/}
              {/*<Col className='OF_left_goods'>*/}
                {/*<LazyLoad throttle={200} height={300} placeholder={<Icon type="loading" />}>*/}
                  {/*<a href="#">*/}
                    {/*<Img src={data.advPosition.advList[0].resUrl} className="OF_th_img" />*/}
                  {/*</a>*/}
                {/*</LazyLoad>*/}
              {/*</Col>*/}
              {/*<Col className='OF_right_goods'>*/}
                {/*{data.goodsList.splice(0,6).map((goods,index)=>{*/}
                  {/*return (*/}
                    {/*<LazyLoad key={index} throttle={200} height={300} placeholder={<Icon type="loading" />}>*/}
                      {/*<a href={'/goodsDetail/' + goods.goodsId} className='OF_right_list'>*/}
                        {/*<p className="OF_right_img">*/}
                          {/*<Img src={goods.goodsImage}/>*/}
                        {/*</p>*/}
                        {/*<p className='goods_name'>{goods.goodsName}</p>*/}
                        {/*<p className='goods_price'>￥ {goods.goodsPrice}</p>*/}
                      {/*</a>*/}
                    {/*</LazyLoad>)*/}
                {/*})}*/}
              {/*</Col>*/}
            {/*</Row>*/}
          {/*</TabPane>*/}
        {/*</Tabs>*/}
      </div>
    )
  }
}
export default HomeFloorTabs;
