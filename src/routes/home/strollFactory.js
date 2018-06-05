import React , { Component } from 'react';
import { connect } from 'dva';
import { Row, Col,Button,Input,Pagination,Carousel} from 'antd';
import { routerRedux, Link } from 'dva/router';
import PropTypes from 'prop-types';

import { strollFactory_Content } from './strollFactory.less';
import Img from '../../components/Img/Img';
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'



const Search1 = Input.Search;


class StrollFactory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue:''
    }
  }


  //分页
  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
    // this.props.dispatch({ type: 'goodsList/goodsListEFF',pageNo:pageNumber});
    this.props.dispatch({ type: 'strollFactory/strollFactoryEFF',pageNo:pageNumber,pageSize:10,brandName:this.state.searchValue});
  }

  onSearchChange =  (e) => {
  this.setState({
    searchValue:e.target.value
  })}


  render() {
    let { searchValue }=this.state;
    const { goodsClass,navList,brand} =this.props.home;
    const {StrollFactory,strollFactoryBanner}  =this.props.strollFactory;
    console.log(this.props);


    return (

      <div>
        <div><Search></Search></div>
        <div><Navigation data={goodsClass} navList ={navList}></Navigation></div>
        <div className={strollFactory_Content} >
          <div className="head_img">
            <Carousel autoplay={true}>
              <div>
                {strollFactoryBanner.length > 0 && strollFactoryBanner[0].advList.map((list,index)=>{
                  console.log(list.resUrl)
                  return (
                    <Img key={index} src={list.resUrl} />
                  )
                })}
              </div>
            </Carousel>
          </div>
          <div className="head_title" >
           <div style={{textAlign:'right'}}>
             <Search1
               size='large'
               placeholder="请输入您要搜索的厂家名称"
               value={ searchValue }
               onChange={this.onSearchChange}
               style={{ width: 400 ,}}
               onSearch={(value) => {
                 this.props.dispatch({ type: 'strollFactory/strollFactoryEFF',pageNo:1,pageSize:10,brandName:value});
               } }
             />
           </div>
            <div className="biaoti_box">
              <p className="biaoti_one1">厂家推荐</p>
            </div>

            <div className="factory_box">
              {
                StrollFactory.length > 0 && StrollFactory[0].recommBrandList.map((img,index)=>{
                  return(
                    <div key={index} className="factory">
                      <div className="factory_img">
                        <Img style={{width:'50%',}} src={img.brandPic} />
                      </div>
                      <div className="factory_you">
                        <div className="factory_you_box">
                          <p style={{fontSize:'1rem',fontWeight:'bold'}}>{img.brandName}</p>
                          <p style={{fontSize:'.9rem'}}>共<span>{img.goodsCount}</span>件商品</p>
                          <p style={{fontSize:'.9rem'}}>共<span>{img.storeCount}</span>个商家</p>
                          <a href={`/home/PeoductSearch/BrandIdSearch/${img.brandId}`}>开始采购</a>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <div className="biaoti_box">
              <p className="biaoti_one2">厂家列表</p>
            </div>
            <div className="factory_box">
              {
                StrollFactory.length > 0 && StrollFactory[0].brandList.map((img,index)=>{
                  return(
                    <div key={index} className="factory">
                      <div className="factory_img">
                        <Img style={{width:'50%',}} src={img.brandPic} />
                      </div>
                      <div className="factory_you">
                        <div className="factory_you_box">
                          <p style={{fontSize:'1rem',fontWeight:'bold'}}>{img.brandName}</p>
                          <p style={{fontSize:'.9rem'}}>共<span>{img.goodsCount}</span>件商品</p>
                          <p style={{fontSize:'.9rem'}}>共<span>{img.storeCount}</span>个商家</p>
                          <a href={`/home/PeoductSearch/BrandIdSearch/${img.brandId}`}>开始采购</a>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

            {/*分页*/}
            <div className="cantent_paging" >
              <Pagination showQuickJumper
                          defaultCurrent={1}
                          defaultPageSize={10}
                          total={StrollFactory.length>0?StrollFactory[0].brandCount:1}
                          onChange={this.onChange}  />
            </div>
          </div>
        </div>

    );
  }
}


export default connect(({home,strollFactory})=>({home,strollFactory}),(dispatch,own)=>{return {dispatch,own}})(StrollFactory);
