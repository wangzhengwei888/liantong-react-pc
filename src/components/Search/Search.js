import React , { Component } from 'react';
import { routerRedux,Link } from 'dva/router';
import { connect } from 'dva';
import {  Button, Icon, Row, Col, Input,Badge,Form,message } from 'antd';
import { search,dropdown_dian } from './Search.less';


class  Search extends Component{
  constructor(props){
    super(props);
    this.state={
      open:false,
    }
  }

  openDian=()=>{
    this.setState({
      open:true
    })
  }

  closeDian=()=>{
    this.setState({
      open:false
    })
  }

  handleSubmit = (keyWord,e) => {
    e.preventDefault();
    console.log(keyWord);
    let val = e.target.firstChild.value;
    console.log(val)
    if(val==''){
      //val = keyWord
     message.warning('请键入关键字进行搜索！');
     return
    }


    this.props.dispatch(routerRedux.push(`/home/PeoductSearch/keywordSearch/${val}`));

    // location.href="/homePeoductSearch";
  }

  //
  componentDidMount(){
   // this.props.dispatch({ type: 'app/getStoreListEFF'});
    //  dispatch({ type: 'getArticleEFF'});

   if(!this.props.app.hotkeywordsData.length>0){
     this.props.dispatch({ type: 'app/getHotkeywordsEFF'});
   }

   // this.props.dispatch({ type: 'app/getcartCountEFF'});
  }
  //
  //
  // componentWillReceiveProps(){
  //   console.log(localStorage.getItem('_cartnum'))
  //   this.setState({
  //     cartCount:localStorage.getItem('_cartnum') || 0
  //   })
  // }



  render (){
    const { open } = this.state;
    let keyWord = "";
    const {cartCountData,hotkeywordsData} = this.props.app;
    hotkeywordsData.length > 0 && hotkeywordsData.forEach((list,index)=>{
      if(list.dictionaryValue == '1'){
        keyWord =  hotkeywordsData[index].dictionaryName
      }
    })
    let SDiansty = open==true ? {marginLeft:'7px'} :{};

    return (
      <Row type="flex" justify="center" className={ search }>
        <Col ><Link className="logo"  to="/customservice?parentId=6&articleId=7d40f9cb584b4fd19ad1b645458b9b84&headImage=/static/head/customService_dynamic_Topimg.jpg"></Link></Col>
        {/*<Col  style={{width:'950px',display:'inline-block',paddingTop:'55px'}}>*/}
        {/*<div className="select_dian">*/}
        {/*<div onClick={this.openDian} style={{height:'100%',paddingTop: '9px', paddingLeft: '7px'}}>*/}
        {/*<span style={{textAlign:'center',...SDiansty}}>{open==false ? '切换店铺' :'选择店铺'}</span>*/}
        {/*{open==false ? <span className="bottom_img"></span>:''}*/}
        {/*</div>*/}

        {/*{open ==true ?<div className={dropdown_dian}>*/}
        {/*<Row style={{ fontSize:'14px',fontWeight:'bold',color:'#000',height:'50px',lineHeight:'50px',padding:'0px 8px',borderBottom:'1px solid #3497CE'}}>*/}
        {/*<Col span={22}>店铺列表</Col>*/}
        {/*<Col span={2} className='close_img' onClick={this.closeDian}></Col>*/}
        {/*</Row>*/}

        {/*<div>*/}
        {/*{storeListData.length > 0 ? storeListData.map((list,index)=>{*/}
        {/*return <Row key={index} className="storeList" style={{ fontSize:'14px',padding:'15px 8px',borderBottom:'1px solid #3497CE'}}>*/}
        {/*<Col span={15}><a style={{color:"#000"}} href={`/store/${list.storeId}`}>{list.storeName}</a></Col>*/}
        {/*<Col span={9}><a style={{color:"#000"}} href={`/store/${list.storeId}`}>在售商品数量：<span style={{fontWeight:'bold',fontSize: '16px',verticalAlign: 'initial',color:'red'}}>{list.storeGoodsCount}</span></a></Col>*/}
        {/*</Row>*/}
        {/*}) : ""}*/}
        {/*</div>*/}
        {/*</div>:''}*/}

        {/*</div>*/}
        <Col  style={{width:'900px',display:'inline-block',paddingTop:'15px'}}>
          <div className="search_input">
           <div style={{overflow:'hidden'}}>
              <Form onSubmit={(e) => this.handleSubmit(keyWord,e)} style={{display:'inlineBlock',float:'left'}}>
                <Input defaultValue={this.props.own.defaultValue || ""} style={{borderRadius:'0px'}} placeholder="中英文名/货号/CAS号/拼首码" />
                {/*<span></span>*/}
                {/*<Button type="primary" htmlType="submit" style={{padding:'0px',border:'0px',fontFamily:'思源黑体'}}>*/}
                {/*搜索*/}
                {/*</Button>*/}
                <Button type="primary" htmlType="submit" style={{padding:'0px',border:'0px',fontFamily:'思源黑体',margin:'0 15px'}}>
                  模糊搜索
                </Button>
              </Form>
              <div  style={{display:'inlineBlock',float:'right',background:'#3497CE'}}>
                <a href={'/product'} style={{padding:'14px 16px 24px 16px',border:'0px',fontFamily:'思源黑体',color:'#fff',fontSize:'16px',
                     display:'block',
                    }}>
                    精确搜索
                </a>
              </div>
            </div>
            <div style={{margin:'10px 0 0 10px',fontSize:'14px',textOverflow: 'ellipsis',overflow: 'hidden', whiteSpace: 'nowrap'}}>
              热门搜索：
              {hotkeywordsData.length > 0 ? hotkeywordsData.map((list,index,a)=>{
                return <Link style={ a.length-1==index ? { borderRight:'none' } : {}} key={index}  to={`/home/PeoductSearch/keywordSearch/${list.dictionaryName}`} >{list.dictionaryName}</Link>
              }) : ""}
            </div>
          </div>

          <div className="go_cart">
            <span className="cart_img"></span>
            <Badge count={cartCountData} style={{backgroundColor:'#FF7719',fontSize:'10px',padding:'0px',height:'14px',lineHeight:'14px',left:'65px'}}>
              {/*<Link to={'/cart'}>购物车{cartCountData > 100 ? "99+" : cartCountData}件</Link>*/}
              <Link to={'/personOrder/cart'}>我的购物车</Link>
            </Badge>
            <span className="cart_goimg">
              >
            </span>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connect(({app})=>({app}),(dispatch,own)=>{return {dispatch,own}})(Search);
//export default Search;
