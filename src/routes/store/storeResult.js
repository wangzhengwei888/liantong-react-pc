/**
 * Created by 10400 on 2017/8/9.
 * 店铺首页页面
 */
import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col,Button,Icon,Breadcrumb ,Pagination} from 'antd';
import { store_body } from './store.less';
import { storeResult_body } from './storeResult.less';
import { routerRedux, Link } from 'dva/router';
import StoreIndexHeader from '../../components/Store/StoreIndexHeader';
import StoreCarousel from '../../components/Store/StoreCarousel';
import StoreSlider from '../../components/Store/StoreSlider';
import StoreMenuList from '../../components/Store/StoreMenuList';
import StoreSearch from '../../components/Store/StoreSearch';
import GoodsShow_one from './goodsShow_one'
import GoodsShow_two from './goodsShow_two'



class  StoreResult extends Component{
  constructor(props){
    super(props);
    this.state={
      ExpandNum1:true,  //下拉菜单
      ExpandNum2:true,  //下拉菜单
      ExpandNum3:true,  //下拉菜单
      Switch:2,
      sortField:'',  //搜索排序
      createTimeSortOrder:'desc',//asc
      salenumSortOrder:'desc',//asc
      goodsMarketPriceSortOrder:'desc',//asc
      pageSize:'12',
      count:'0',
      isLoading:true,
      goodsClassId:props.storegoodsList.shopListObj.storeClassId
    }
  }
  //分页
  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
    this.props.dispatch({ type: 'storegoodsList/goodsListEFF',val:{pageNo:pageNumber,pageSize:'12'}});
  }

  Expand1 = () => {
    this.setState({
      ExpandNum1:!this.state.ExpandNum1
    })
  };
  Expand2 = () => {
    this.setState({
      ExpandNum2:!this.state.ExpandNum2
    })
  };
  Expand3 = () => {
    this.setState({
      ExpandNum3:!this.state.ExpandNum3
    })
  };
  SwitchList2 = () => {
    this.setState({
      Switch:2
    })
  };

  gotogoodsdetailed = () => {
    location.href="/home"
  }


  switch2 = () => {

    return (
      this.props.storegoodsList.data.length?
        <GoodsShow_one goodsList={this.props.storegoodsList} />:<div></div>
    )
  }

  goodsSort = (sortField) => {
    console.log(sortField)
    if(sortField != ""){
      this.setState({
        sortField:sortField,
        [`${sortField}SortOrder`]:this.state[`${sortField}SortOrder`] == 'desc' ? 'asc' : 'desc'
      })
      let val = {
        sortField:sortField,
        orderBy:this.state[`${sortField}SortOrder`],
        pageNo:'1'
      }
      this.props.dispatch({ type: 'storegoodsList/goodsListEFF',val});
    }else{
      this.setState({
        sortField:sortField
      })
      let val = {
        sortField:sortField,
        pageNo:'1'
      }
      this.props.dispatch({ type: 'storegoodsList/goodsListEFF',val});
    }

  }



  SwitchList1 = () => {
    this.setState({
      Switch:1
    })
  };

  switch1 = () => {
    return (
      this.props.storegoodsList.data.length?
        <GoodsShow_two goodsList={this.props.storegoodsList} />:<div></div>
    )
  }
  onChangeClassList =(e)=> {
    console.log(e.target.id)
    let values = {
      storeClassId:e.target.id || ""
    }
    this.props.dispatch({type:'storegoodsList/goodsListEFF',val:values})
    this.props.dispatch({type:'storegoodsList/goodsfilterEFF',val:values})
  }

  onChangeBrandId = (e) => {
    let values = {
      brandId: e.target.id || ""
    }
    console.log(values)
    this.props.dispatch({type:'storegoodsList/goodsListEFF',val:values})
    this.props.dispatch({type:'storegoodsList/goodsfilterEFF',val:values})
  }

  onChangedosageForm = (e) => {
    let values = {
      dosageForm: e.target.id || ""
    }
    console.log(values)
    this.props.dispatch({type:'storegoodsList/goodsListEFF',val:values})
    this.props.dispatch({type:'storegoodsList/goodsfilterEFF',val:values})
  }


  render(){
    let num = 0;
    let arr = window.location.pathname.split("/").slice(1,3);
    let storePath = arr.join("/");
    const {storeDetailData,storeClassData} = this.props.store;
    const { storegoodsList} =this.props;
    if(storegoodsList.isLoading){
      return null
    }
    return (
      <div>
        <StoreSearch></StoreSearch>
        <div className={store_body}>
          {/*header*/}
          <div className="header_box">
            <StoreIndexHeader></StoreIndexHeader>
          </div>
          <div className="store_content">
            <div className="store_top">
              <StoreMenuList data={storeClassData} classId={storegoodsList.shopListObj.storeClassId}></StoreMenuList>
              <StoreCarousel imgData={storeDetailData.store || []}></StoreCarousel>
              <StoreSlider data={storeDetailData.store || []}></StoreSlider>
            </div>
            {/*列表内容*/}
            <div className={storeResult_body} >
              <div className="head_title" >
                <Breadcrumb>
                  <Breadcrumb.Item><Link className="bg_one" to={`/${storePath}`}>{storeDetailData.store ? storeDetailData.store[0].storeName : ""}</Link></Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="head_navigation">
                <Row type="flex" justify="start" style={{borderBottom:'1px solid #ddd'}}>
                  <Col span={2}>一级分类：</Col>
                  {storegoodsList.shopListObj.storeClassId != "" ?
                    (storeClassData.length > 0 && storeClassData.map((v,i)=>{
                      if(storegoodsList.shopListObj.storeClassId == v.stcId){
                        return <Col key={i} span={4}><a onClick={this.onChangeClassList} className="activedLink">{v.stcName}</a></Col>
                      }else{
                        return (
                          v.classList.map((list)=>{
                            if(list.stcId == storegoodsList.shopListObj.storeClassId){
                              return <Col key={i} span={4}><a onClick={this.onChangeClassList} className="activedLink">{v.stcName}</a></Col>
                            }
                          })
                        )
                      }
                    })) : (storeClassData.length > 0 && storeClassData.map((v,i)=>{
                        return <Col key={i} span={4}><a id={v.stcId} onClick={this.onChangeClassList}>{v.stcName}</a></Col>
                    }))
                  }
                </Row>
                <div className={this.state.ExpandNum1 ?'styleSExpand1':'styleSExpand2'} >
                  <Row type="flex" justify="start" >
                    <Col span={2}>二级分类：</Col>
                    {storegoodsList.shopListObj.storeClassId != "" ?
                      (storeClassData.length > 0 && storeClassData.map((val,index)=>{
                        if(storegoodsList.shopListObj.storeClassId == val.stcId){
                          return (
                            val.classList.map((v,i)=>{
                              num++;
                              return <Col key={i} span={4}><a id={v.stcId} onClick={this.onChangeClassList}>{v.stcName}</a></Col>
                            })
                          )
                        }else{
                          return (
                            val.classList.map((list,i)=>{
                              if(list.stcId == storegoodsList.shopListObj.storeClassId){
                                num++;
                                return <Col key={i} span={4}><a id={list.stcParentId}  onClick={this.onChangeClassList} className="activedLink">{list.stcName}</a></Col>
                              }
                            })
                          )
                        }
                      })) : <div></div>



                    }

                    <Col span={2} className={storeClassData.length > 0 && num < 6 ?'styleSExpand_anniu_none':'styleSExpand_anniu'}>
                      <Button onClick={this.Expand1}>
                        {this.state.ExpandNum1 ? '展开' : '收缩'}
                        <Icon type={this.state.ExpandNum1?'down':'up'} />
                      </Button>
                    </Col>
                  </Row>
                </div>

                <div className={this.state.ExpandNum2 ?'styleSExpand1':'styleSExpand2'} >
                  <Row type="flex" justify="start" style={{borderBottom:'1px solid #ddd'}}>
                    <Col span={2}>生产厂家：</Col>

                    {
                      storegoodsList.ScreenList.length > 0 && storegoodsList.ScreenList[0].brandList && storegoodsList.ScreenList[0].brandList.length > 0 &&
                      storegoodsList.ScreenList[0].brandList.map((img,index)=>{
                        if(storegoodsList.shopListObj.brandId != ""){
                          if(storegoodsList.shopListObj.brandId == img.brandId){
                            return (
                              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink" onClick={this.onChangeBrandId}>{img.brandName}</a></Col>
                            )
                          }else{
                            return (
                              <Col className='styleSExpand_store' key={index} span={4}><a id={img.brandId} onClick={this.onChangeBrandId}>{img.brandName}</a></Col>
                            )
                          }
                        }else{
                          return (
                             <Col className='styleSExpand_store' key={index} span={4}><a id={img.brandId} onClick={this.onChangeBrandId}>{img.brandName}</a></Col>
                          )
                        }

                      })
                    }
                    <Col span={2} className={storegoodsList.ScreenList.length > 0 && storegoodsList.ScreenList[0].brandList && storegoodsList.ScreenList[0].brandList.length <  6 ?'styleSExpand_anniu_none':'styleSExpand_anniu'}>
                      <Button onClick={this.Expand2}>
                        {this.state.ExpandNum2 ? '展开' : '收缩'}
                        <Icon type={this.state.ExpandNum2?'down':'up'} />
                      </Button>
                    </Col>

                  </Row>
                </div>
                <div className={this.state.ExpandNum3 ?'styleSExpand1':'styleSExpand2'} style={{borderBottom:'none'}}>
                  <Row type="flex" justify="start">
                    <Col span={2}>剂型分类：</Col>
                    {
                      storegoodsList.ScreenList.length > 0 && storegoodsList.ScreenList[0].dosageFormList && storegoodsList.ScreenList[0].dosageFormList.length > 0 &&
                      storegoodsList.ScreenList[0].dosageFormList.map((img,index)=>{
                        if(storegoodsList.shopListObj.dosageForm != ""){
                          if(storegoodsList.shopListObj.dosageForm == img.dosageForm){
                            return (
                              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink" onClick={this.onChangedosageForm}>{img.dosageFormName}</a></Col>
                            )
                          }else{
                            return (
                              <Col className='styleSExpand_store' key={index} span={4}><a id={img.dosageForm} onClick={this.onChangedosageForm} >{img.dosageFormName}</a></Col>
                            )
                          }
                        }else{
                          return (
                            <Col className='styleSExpand_store' key={index} span={4}><a id={img.dosageForm} onClick={this.onChangedosageForm} >{img.dosageFormName}</a></Col>
                          )
                        }

                       })
                    }
                    <Col span={2} className={storegoodsList.ScreenList.length > 0 && storegoodsList.ScreenList[0].dosageFormList && storegoodsList.ScreenList[0].dosageFormList.length < 6 ? 'styleSExpand_anniu_none':'styleSExpand_anniu'}>
                      <Button onClick={this.Expand3}>
                        {this.state.ExpandNum3 ? '展开' : '收缩'}
                        <Icon type={this.state.ExpandNum3?'down':'up'} />
                      </Button>
                    </Col>

                  </Row>
                </div>
              </div>
              <div className="sizer">
                <div className="div1">排序方式：</div>
                <div className={this.state.sortField==''?'active div1':' div1' } onClick={()=>this.goodsSort("")}>
                  默认</div>
                <div className={this.state.sortField=='createTime'?'active div1':' div1' } onClick={()=>this.goodsSort('createTime')}>
                  上架时间<Icon type={this.state.createTimeSortOrder == 'desc'&& this.state.sortField=='createTime' ?'arrow-up':'arrow-down'} /></div>
                <div className={this.state.sortField=='salenum'?'active div1':' div1' } onClick={()=>this.goodsSort('salenum')}>
                  销量<Icon type={this.state.salenumSortOrder == 'desc'&& this.state.sortField=='salenum' ?'arrow-up':'arrow-down'} /></div>
                {/*<div className={this.state.sortField=='goodsClick'?'active div1':' div1' } onClick={()=>this.goodsSort('goodsClick')}>*/}
                  {/*人气<Icon type={this.state.sortOrder == 'desc'&& this.state.sortField=='goodsClick' ?'arrow-up':'arrow-down'} /></div>*/}
                <div className={this.state.sortField=='goodsMarketPrice'?'active div1':' div1' } onClick={()=>this.goodsSort('goodsMarketPrice')}>
                  价格<Icon type={this.state.goodsMarketPriceSortOrder == 'desc'&& this.state.sortField=='goodsMarketPrice' ?'arrow-up':'arrow-down'} /></div>
                <div className="div2">
                  <div style={{float:'right',height:'100%'}}>
                    <div className={this.state.Switch== 1 ?'Switch_img11':' Switch_img1' }  onClick={this.SwitchList2}></div>
                    <div className={this.state.Switch== 2 ?'Switch_img2':' Switch_img22' } onClick={this.SwitchList1}></div>
                  </div>
                </div>
              </div>
              <div>

                <div style={{"flexWrap":"wrap",display:'flex'}}>
                  {this.state.Switch == 1?this.switch1():this.switch2()}
                </div>
                {/*分页*/}
                {this.props.storegoodsList.data[0] && this.props.storegoodsList.data[0].goodsCount > 0 ?
                  <div className="cantent_paging" >
                    <Pagination showQuickJumper
                                defaultCurrent={1}
                                defaultPageSize={12}
                                total={this.props.storegoodsList.data[0] ? this.props.storegoodsList.data[0].goodsCount : 0}
                                onChange={this.onChange}  />
                  </div> : <p style={{textAlign:'center',marginTop:'40px',color:'#ccc'}}>没有查找到您要的商品</p>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({storegoodsList,app,store})=>({storegoodsList,app,store}),(dispatch,own)=>{return {dispatch,own}})(StoreResult);
