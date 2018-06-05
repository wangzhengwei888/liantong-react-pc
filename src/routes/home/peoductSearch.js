import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Button, Icon, Breadcrumb, Menu, Dropdown, Modal} from 'antd';
import {Pagination, Input, Select} from 'antd';
import {routerRedux} from 'dva/router';
import {getFullUrl} from '../../utils/common';
import PropTypes from 'prop-types';

import {peoductSearch_Content,} from './peoductSearch.less';
import Img from '../../components/Img/Img';
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'
import GoodsShow_one from './goodsShow_one'
import {BodyHeadImg} from '../../components/Advertising/Advertising'


const InputGroup = Input.Group;
const Option = Select.Option;



class PeoductSearch extends Component {
 constructor(props) {
  super(props)
  this.state = {
   ExpandNum1: true,  //下拉菜单
   ExpandNum2: true,  //下拉菜单
   ExpandNum3: true,  //下拉菜单
   ExpandNum4: true,  //下拉菜单
   ExpandNum5: true,  //下拉菜单
   sortField: '',  //搜索排序
   sortOrder: 'asc',//asc
   pageSize: '10',
   count: '1',
   isLoading: true,
   min: '',
   max: '',
   update: false,
   currentNum: 1,
  }

 }

 addCarshop = (goodsId, channelPrice, count) => {
  this.props.dispatch({type: 'goodsList/addCartEFF', goodsId: goodsId, goodsPrice: channelPrice, count: count});
 }


//加入收藏
 addGoodsFavorites = (goodsId) => {
  this.props.dispatch({type: 'goodsList/addGoodsFavoritesEFF', goodsId: {goodsId: goodsId}})
 }

 //加入询价单
 goInquiry = (goodsId, count) => {
  let vals = {
   goodsId: goodsId,
   num: count,
  }
  this.props.dispatch({type: 'goodsList/addInquiryEFF', val: {goodsId: goodsId, num: count}});
 }

 componentWillReceiveProps(nextProps) {
  //当路由切换时
  console.log(this.props.location)
  if (this.props.location !== nextProps.location) {
   this.setState({
    count: '1',
   })
  }
  this.refs.page.getElementsByTagName("input")[0].value = ""
 }


 //分页
 onChange = (pageNumber) => {
  this.setState({
   update: true
  }, () => this.props.dispatch({
   type: 'goodsList/goodsListEFF',
   val: {pageNo: pageNumber}
  }))
  window.scrollTo(0, 0)
 }

 goPage = () => {
  let maxPage = Math.ceil(this.props.goodsList.data[0].totalRows / 10)
  let pageNo = this.refs.page.getElementsByTagName("input")[0].value;
  pageNo = pageNo > maxPage ? maxPage : pageNo
  if (!!pageNo) {
   this.setState({
    update: true
   }, () => this.props.dispatch({
    type: 'goodsList/goodsListEFF',
    val: {pageNo: pageNo}
   }))
   window.scrollTo(0, 0)
   this.refs.page.getElementsByTagName("input")[0].value = ""
  }
 }


 Expand1 = () => {
  this.setState({
   ExpandNum1: !this.state.ExpandNum1
  })
 };
 Expand2 = () => {
  this.setState({
   ExpandNum2: !this.state.ExpandNum2
  })
 };
 Expand3 = () => {
  this.setState({
   ExpandNum3: !this.state.ExpandNum3
  })
 };
 Expand4 = () => {
  this.setState({
   ExpandNum4: !this.state.ExpandNum4
  })
 };

 Expand5 = () => {
  this.setState({
   ExpandNum5: !this.state.ExpandNum5
  })
 };


 goodsSort = (sortField) => {
  if (sortField) {
   this.setState({
    sortField: sortField,
    sortOrder: this.state.sortOrder == 'asc' ? 'desc' : 'asc',
    update: true
   }, () => this.props.dispatch({
    type: 'goodsList/goodsListEFF',
    val: {sortField: sortField, sortOrder: this.state.sortOrder,pageNo:1}
   }))
  } else {
   this.setState({
    sortField: sortField,
    update: true
   }, () => this.props.dispatch({type: 'goodsList/goodsListEFF', val: {sortField: sortField, sortOrder: '',pageNo:1}}))

  }
 }

 componentDidMount() {
  // this.setState({
  //   currentNum: this.props.goodsList
  // })
  var iTem = setInterval(
   () => {
    // console.log('1111')
    // console.log(this.props.goodsList)
    //  this.setState({ currentNum : this.props.goodsList? this.props.goodsList:'11111'});
   }
   , 1000)

  //  console.log(this.state.currentNum)
  // console.log(this.state.CSANumber);
  // clearInterval(iTem);
  setInterval(() => {
   clearInterval(iTem);
  }, 10000)
 }


 componentWillReceiveProps(nextProps) {
  if (this.state.update) {
   this.setState({
    update: false
   })
  } else {
   this.setState({
    sortField: '',
    sortOrder: 'desc',
    min: '',
    max: ''
   })
  }

 }

 deleteGoodsFavorites = (goodsId) => {
  Modal.confirm({
   title: '确定要取消收藏吗？',
   content: '',
   onOk: () => {
    this.props.dispatch({type: 'goodsList/deleteGoodsFavoritesEFF', goodsId: {goodsId: goodsId}});
   },
   onCancel() {

   },
  })
 }

 onKeyDown1 = (e) => {
  let val = e.target.value
  this.setState({
   min: val
  })
 }

 onKeyDown2 = (e) => {
  let val = e.target.value
  this.setState({
   max: val
  })
 }

 onPriceIndex = () => {
  this.setState({
   update: true
  }, () => this.props.dispatch({
   type: 'goodsList/goodsListEFF',
   val: {minimumPrice: (this.state.min || ''), maximumPrice: (this.state.max || ''),pageNo:1}
  }))

 }

 //
 onFilter1 = (specs) => {

  if (this.props.goodsList.filter.brandName == specs) {
   specs = ''
  }

   this.props.dispatch({type: 'goodsList/goodsListEFF', val: {brandName: specs, pageNo: 1}})
   this.props.dispatch({type: 'goodsList/goodsfilterEFF', val: {brandName: specs}})
 }

 onFilter2 = (specs) => {
  if (this.props.goodsList.filter.secondGcId == specs) {
   specs = ''
  }
   this.props.dispatch({type: 'goodsList/goodsListEFF', val: {gcSecondId: specs,pageNo: 1}})
   this.props.dispatch({type: 'goodsList/goodsfilterEFF', val: {secondGcId: specs}})
 }

 onFilter3 = (specs) => {
  if (this.props.goodsList.filter.thirdGcId == specs) {
   specs = ''
  }
   this.props.dispatch({
    type: 'goodsList/goodsListEFF',
    val: {gcId: specs, pageNo: 1}
   })
   this.props.dispatch({
    type: 'goodsList/goodsfilterEFF',
    val: {thirdGcId: specs}
   })
 }


 onFilter4 = (specs) => {
  if (this.props.goodsList.filter.goodsSpec == specs) {
   specs = ''
  }
  this.props.dispatch({
   type: 'goodsList/goodsListEFF',
   val: {goodsSpec: specs,pageNo: 1}
  })
  this.props.dispatch({
   type: 'goodsList/goodsfilterEFF',
   val: {goodsSpec: specs}
  })
 }

 onFilter5 = (specs) => {
  if (this.props.goodsList.filter.arrivalCycle == specs) {
   specs = ''
  }
  this.props.dispatch({
   type: 'goodsList/goodsListEFF',
   val: {arrivalCycle: specs,pageNo: 1}
  })
  this.props.dispatch({
   type: 'goodsList/goodsfilterEFF',
   val: {arrivalCycle: specs}
  })
 }

 componentWillReceiveProps(nextProps) {
  //当路由切换时
  if (this.props.location !== nextProps.location) {
   window.scrollTo(0, 0)
  }
 }


 render() {
  let num1 = 0;
  let num2 = 0;
  const {goodsClass} = this.props.app;
  console.log(goodsClass)
  const {goodsList} = this.props;
  let {shopListObj} = goodsList;
  return (

   <div>
    <div><Search key={shopListObj.keyword}
                 defaultValue={shopListObj.searchType == 'keywordSearch' ? shopListObj.keyword : ''}></Search></div>
    <Navigation preson={false}>
     <div className={peoductSearch_Content}>
      <div className="accurate_Topimg"></div>
      <div className="head_title">
       <div className='head_title_box'>
        <a className="bg_one" href='/'>商品采购首页></a>
        {
         goodsList.ScreenList && goodsList.ScreenList.length > 0 &&
         goodsList.ScreenList[0].brandList && goodsList.ScreenList[0].brandList.length > 0 &&
         goodsList.ScreenList[0].brandList.map((img, index) => {
          if (goodsList.shopListObj.brandName) {
           if (goodsList.shopListObj.brandName == img.brandName) {
            return (
             <a className="activedLink_top" onClick={() => this.onFilter1(img.brandName)}>品牌：{img.brandName}</a>
            )
           }
          }
         })
        }
        {
         goodsList.ScreenList && goodsList.ScreenList.length > 0 &&
         goodsList.ScreenList[0].twoGoodsClass && goodsList.ScreenList[0].twoGoodsClass.map((img, index) => {
          if (goodsList.filter.secondGcId != "") {
           if (goodsList.filter.secondGcId == img.gcId) {
            return (
             <a className="activedLink_top" onClick={() => this.onFilter2(img.gcId, goodsList.ScreenList[0].brandName)}>二级分类：{img.gcName}</a>
            )
           }
          }
         })
        }
        {
         goodsList.ScreenList && goodsList.ScreenList.length > 0 &&
         goodsList.ScreenList[0].thirdGoodsClass && goodsList.ScreenList[0].thirdGoodsClass.map((img, index) => {
          if (goodsList.filter.thirdGcId != "") {
           if (goodsList.filter.thirdGcId == img.gcId) {
            return (
             <a className="activedLink_top"
                onClick={() => this.onFilter3(
                 img.gcId,
                 goodsList.ScreenList[0].brandName,
                 goodsList.ScreenList[0].secondGcId
                )}>三级分类：{img.gcName}</a>
            )
           }
          }
         })
        }
        {
         goodsList.ScreenList && goodsList.ScreenList.length > 0 &&
         goodsList.ScreenList[0].goodsSpecList && goodsList.ScreenList[0].goodsSpecList.map((img, index) => {
          if (goodsList.filter.goodsSpec == img) {
           return (
            <a className="activedLink_top" onClick={() => this.onFilter4(
             img,
             goodsList.ScreenList[0].brandName,
             goodsList.ScreenList[0].secondGcId,
             goodsList.ScreenList[0].gcId
            )}>包装：{img}</a>
           )
          }
         })
        }
        {
         goodsList.ScreenList && goodsList.ScreenList.length > 0 &&
         goodsList.ScreenList[0].arrivalCycleList && goodsList.ScreenList[0].arrivalCycleList.map((img, index) => {
          if (goodsList.filter.arrivalCycle != "") {
           if (goodsList.filter.arrivalCycle == img.code) {
            return (
             <a className="activedLink_top" onClick={() => this.onFilter5(
              img.code,
              goodsList.ScreenList[0].brandName,
              goodsList.ScreenList[0].secondGcId,
              goodsList.ScreenList[0].gcId,
              goodsList.ScreenList[0].goodsSpec,
             )}>到货期：{img.msg}</a>
            )
           }
          }
         })
        }
        <a>"{shopListObj.keyword != '' ? shopListObj.keyword : '无关键字'}"</a>
       </div>

      </div>
      <div className="head_navigation">
       <div className={this.state.ExpandNum1 ? 'styleSExpand1' : 'styleSExpand2'}>
        <Row type="flex" justify="start"
        >
         <Col span={2}>品牌：</Col>
         {
          goodsList.ScreenList && goodsList.ScreenList.length > 0 &&
          goodsList.ScreenList[0].brandList.map((img, index) => {
           if (goodsList.filter.brandName != "" && goodsList.filter.brandName != 'undefined') {
            if (goodsList.filter.brandName == img.brandName) {
             return (
              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink"
                                                                          onClick={() => this.onFilter1(img.brandName)}>{img.brandName}</a></Col>
             )
            } else {
             return (
              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink"
                                                                          onClick={() => this.onFilter1(img.brandName)}>{img.brandName}</a></Col>
             )
            }
           } else {
            return (
             <Col className='styleSExpand_store' key={index} span={4}><a
              onClick={() => this.onFilter1(img.brandName)}>{img.brandName}</a></Col>
            )
           }
          })
         }
         <Col span={2}
              className={goodsList.ScreenList.length > 0 && goodsList.ScreenList[0].brandList.length < 6 ? 'styleSExpand_anniu_none' : 'styleSExpand_anniu'}>
          <Button onClick={this.Expand1}>
           {this.state.ExpandNum1 ? '展开' : '收缩'}
           <Icon type={this.state.ExpandNum1 ? 'down' : 'up'}/>
          </Button>
         </Col>
        </Row>
       </div>
       <div className={this.state.ExpandNum2 ? 'styleSExpand1' : 'styleSExpand2'} style={{display:'none'}}>
        <Row type="flex" justify="start">
         <Col span={2}>二级分类：</Col>
         {
          goodsList.ScreenList && goodsList.ScreenList.length > 0 &&
          goodsList.ScreenList[0].twoGoodsClass.map((img, index) => {
           if (goodsList.filter.secondGcId != "" && goodsList.filter.secondGcId != 'undefined') {
            if (goodsList.filter.secondGcId == img.gcId) {
             num1++
             return (
              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink"
                                                                          onClick={() => this.onFilter2(img.gcId, goodsList.ScreenList[0].brandName)}>{img.gcName}</a></Col>
             )
            } else {
             num1++
             return (
              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink"
                                                                          onClick={() => this.onFilter2(img.gcId, goodsList.ScreenList[0].brandName)}>{img.gcName}</a></Col>
             )
            }
           } else {
            num1++
            return (
             <Col className='styleSExpand_store' key={index} span={4}><a
              onClick={() => this.onFilter2(img.gcId, goodsList.ScreenList[0].brandName)}>{img.gcName}</a></Col>
            )

           }
          })
         }
         <Col span={2} className={goodsClass.length > 0 && num1 < 6 ? 'styleSExpand_anniu_none' : 'styleSExpand_anniu'}>
          <Button onClick={this.Expand2}>
           {this.state.ExpandNum2 ? '展开' : '收缩'}
           <Icon type={this.state.ExpandNum2 ? 'down' : 'up'}/>
          </Button>
         </Col>
        </Row>
       </div>
       <div className={this.state.ExpandNum3 ? 'styleSExpand1' : 'styleSExpand2'}  style={{display:'none'}}>
        <Row type="flex" justify="start">
         <Col span={2}>三级分类：</Col>
         {
          goodsList.ScreenList && goodsList.ScreenList.length > 0 &&
          goodsList.ScreenList[0].thirdGoodsClass &&
          goodsList.ScreenList[0].thirdGoodsClass.map((img, index) => {
           if (goodsList.filter.thirdGcId != "" && goodsList.filter.thirdGcId != 'undefined') {
            if (goodsList.filter.thirdGcId == img.gcId) {
             return (
              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink"
                                                                          onClick={() => this.onFilter3(img.gcId, goodsList.ScreenList[0].brandName, goodsList.ScreenList[0].secondGcId)}>{img.gcName}</a></Col>
             )
            } else {
             return (
              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink"
                                                                          onClick={() => this.onFilter3(img.gcId, goodsList.ScreenList[0].brandName, goodsList.ScreenList[0].secondGcId)}>{img.gcName}</a></Col>
             )
            }
           } else {
            return (
             <Col className='styleSExpand_store' key={index} span={4}><a
              onClick={() => this.onFilter3(img.gcId, goodsList.ScreenList[0].brandName, goodsList.ScreenList[0].secondGcId)}>{img.gcName}</a></Col>
            )

           }
          })
         }
         <Col span={2}
              className={goodsClass && goodsClass.length > 0 && num2 < 6 ? 'styleSExpand_anniu_none' : 'styleSExpand_anniu'}>
          <Button onClick={this.Expand3}>
           {this.state.ExpandNum3 ? '展开' : '收缩'}
           <Icon type={this.state.ExpandNum3 ? 'down' : 'up'}/>
          </Button>
         </Col>
        </Row>
       </div>
       <div className={this.state.ExpandNum4 ? 'styleSExpand1' : 'styleSExpand2'}>
        <Row type="flex" justify="start" style={{borderBottom: '1px solid #ddd'}}>
         <Col span={2}>包装：</Col>
         {
          goodsList.ScreenList && goodsList.ScreenList.length > 0 &&
          goodsList.ScreenList[0].goodsSpecList &&
          goodsList.ScreenList[0].goodsSpecList.map((img, index) => {
           if (goodsList.filter.goodsSpec != "" && goodsList.filter.goodsSpec != 'undefined') {
            if (goodsList.filter.goodsSpec == img) {
             console.log(goodsList.filter.goodsSpec)
             return (
              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink"
                                                                          onClick={() => this.onFilter4(
                                                                           img,
                                                                           goodsList.ScreenList[0].brandName,
                                                                          //  goodsList.ScreenList[0].secondGcId,
                                                                          //  goodsList.ScreenList[0].gcId
                                                                          )}>{img}</a></Col>
             )
            } else {
             // console.log('55555')
             console.log(img)
             return (

              <Col className='styleSExpand_store' key={index} span={4}><a
               onClick={() => this.onFilter4(
                img,
                goodsList.ScreenList[0].brandName,
                // goodsList.ScreenList[0].secondGcId,
                // goodsList.ScreenList[0].gcId
               )}>{img}</a></Col>
             )
            }
           } else {
            // console.log('44444')
            return (
             <Col className='styleSExpand_store' key={index} span={4}><a
              onClick={() => this.onFilter4(
               img,
               goodsList.ScreenList[0].brandName,
              //  goodsList.ScreenList[0].secondGcId,
              //  goodsList.ScreenList[0].gcId
              )}>{img}</a></Col>
            )
           }
          })
         }
         <Col span={2}
              className={goodsList.ScreenList.length > 0 && goodsList.ScreenList[0].goodsSpecList.length < 6 ? 'styleSExpand_anniu_none' : 'styleSExpand_anniu'}>
          <Button onClick={this.Expand4}>
           {this.state.ExpandNum4 ? '展开' : '收缩'}
           <Icon type={this.state.ExpandNum4 ? 'down' : 'up'}/>
          </Button>
         </Col>

        </Row>
       </div>
       <div className={this.state.ExpandNum5 ? 'styleSExpand3' : 'styleSExpand4'}>
        <Row type="flex"
        >
         <Col span={2}>到货期：</Col>
         {
          goodsList.ScreenList && goodsList.ScreenList.length > 0 && goodsList.ScreenList[0].arrivalCycleList &&
          goodsList.ScreenList[0].arrivalCycleList.map((img, index) => {
           if (goodsList.filter.arrivalCycle != "" && goodsList.filter.arrivalCycle != 'undefined') {
            if (goodsList.filter.arrivalCycle == img.code) {
             return (
              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink"
                                                                          onClick={() => this.onFilter5(
                                                                           img.code,
                                                                           goodsList.ScreenList[0].brandName,
                                                                          //  goodsList.ScreenList[0].secondGcId,
                                                                          //  goodsList.ScreenList[0].gcId,
                                                                           goodsList.ScreenList[0].goodsSpec,
                                                                          )}>{img.msg}</a></Col>
             )
            } else {
             return (
              <Col className='styleSExpand_store' key={index} span={4}><a className="activedLink"
                                                                          onClick={() => this.onFilter5(
                                                                           img.code,
                                                                           goodsList.ScreenList[0].brandName,
                                                                          //  goodsList.ScreenList[0].secondGcId,
                                                                          //  goodsList.ScreenList[0].gcId,
                                                                           goodsList.ScreenList[0].goodsSpec,
                                                                          )}>{img.msg}</a></Col>
             )
            }
           } else {
            // console.log(img)
            return (
             <Col className='styleSExpand_store' key={index} span={4}><a
              onClick={() => this.onFilter5(
               img.code,
               goodsList.ScreenList[0].brandName,
              //  goodsList.ScreenList[0].secondGcId,
              //  goodsList.ScreenList[0].gcId,
               goodsList.ScreenList[0].goodsSpec,
              )}>{img.msg}</a></Col>
            )
           }
          })}
         <Col span={2}
              className={goodsList.ScreenList.length > 0 && goodsList.ScreenList[0].arrivalCycleList.length < 6 ? 'styleSExpand_anniu_none' : 'styleSExpand_anniu'}>
          <Button onClick={this.Expand5}>
           {this.state.ExpandNum5 ? '展开' : '收缩'}
           <Icon type={this.state.ExpandNum5 ? 'down' : 'up'}/>
          </Button>
         </Col>

        </Row>
       </div>
      </div>
      <div className="sizer">
       <div className="div1" style={{width: '8%'}}>排序方式：</div>
       <div className={this.state.sortField == '' ? 'active div1' : ' div1'} onClick={() => this.goodsSort('')}>
        默认
       </div>
       <div className={this.state.sortField == 'goodsStorePrice' ? 'active div1' : ' div1'}
            onClick={() => this.goodsSort('goodsStorePrice')}>
        价格<Icon
        type={this.state.sortOrder == 'asc' && this.state.sortField == 'goodsStorePrice' ? 'arrow-up' : 'arrow-down'}/>
       </div>
       <div className='div3'>
        <div className='div3_box'>
         <InputGroup compact>
          <Input onChange={(e) => {
           this.onKeyDown1(e)
          }} style={{width: 100, textAlign: 'center'}} value={this.state.min} placeholder="最低价"/>
          <Input style={{width: 24, borderLeft: 0, margin: '0px 0px', pointerEvents: 'none', backgroundColor: '#fff'}}
                 placeholder="--" disabled/>
          <Input onChange={(e) => {
           this.onKeyDown2(e)
          }} value={this.state.max} style={{width: 100, textAlign: 'center', borderLeft: 0}} placeholder="最高价"/>
         </InputGroup>
        </div>
        <Button onClick={this.onPriceIndex}>确认</Button>
       </div>
       <div className="div2">
        <div style={{float: 'right', height: '100%', margin: '0px 6px'}}>
         <div>总共<span style={{
          color: '#3497CE',
          margin: '0px 6px'
         }}>{goodsList.data && goodsList.data.length ? goodsList.data[0].totalRows : 0}</span>条记录
         </div>
        </div>
       </div>
      </div>
      <div>
       <div style={{"flexWrap": "wrap", display: 'flex'}}>
        <div style={{borderBottom: '1px solid #ddd', width: '100%', height: '20px'}}></div>
        {
         goodsList.data && goodsList.data.length && goodsList.data[0].listApiGoods ?
          goodsList.data[0].listApiGoods.map((list, index) => {
           return <GoodsShow_one key={list.goodsId} index={index} img={list}
                                 addCart={(goodsId, goodsPrice, count) => {
                                  this.addCarshop(goodsId, goodsPrice, count)
                                 }}
                                 addGoodsFavorites={this.addGoodsFavorites}
                                 deleteGoodsFavorites={this.deleteGoodsFavorites}
                                 goInquiry={(goodsId, count) => {
                                  this.goInquiry(goodsId, count)
                                 }}
                                 init={goodsList.init}
           />
          }) : <div></div>
        }
       </div>
       {/*分页*/}
       {
        goodsList.data.length > 0 && goodsList.data[0].totalRows ?
         <div className="cantent_paging" ref="page" key={this.props.goodsList.pageNo} style={{width: '96%'}}>
          <Pagination showQuickJumper
                      defaultCurrent={1}
                      defaultPageSize={10}
                      current={this.props.goodsList.pageNo}
                      total={this.props.goodsList.data.length > 0 && this.props.goodsList.data[0].totalRows ? this.props.goodsList.data[0].totalRows : 0}
                      onChange={this.onChange}/>
          <Button onClick={this.goPage}>确定</Button>

         </div> : <p style={{textAlign: 'center', marginTop: '40px', color: '#ccc'}}>没有查找到您要的商品</p>

       }
      </div>
     </div>
    </Navigation>
   </div>

  );
 }
}


export default connect(({goodsList, app}) => ({goodsList, app}), (dispatch, own) => {
 return {dispatch, own}
})(PeoductSearch);
