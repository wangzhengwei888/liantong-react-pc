/**
 * Created by 10400 on 2017/8/14.
 * 商城首页页面-navleft
 */
import React , { Component } from 'react';
import { Carousel, Icon, Menu, Dropdown, Popover, Button} from 'antd';
import { fenlei_every, navigation, nav, left_right_layout, preson_my_nav } from './Navigation.less';
import Img from '../../components/Img/Img';
import { routerRedux, Link } from 'dva/router';
//import Sidebar from '../Sidebar/Sidebar';
import { connect ,Row, Col,} from 'dva';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



class  Navigation extends Component{
  constructor(props){
    super(props);
    this.state={
      open:false,
      openKeys:[ '0' ],
      // openKeys:['0','1','2','3','4','5','6','7','8','9','10','20' ],
      openKeys2:['0','1','2','3','4','5','6','7','8','9','10','20' ],

      data:[],
     ifShow:false,

    }
  }


  rootSubmenuKeys = ['0','1','2','3','4','5','6','7'];
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  rootSubmenuKeys2 = ['10','11','12','13','14','15','16','17'];
  onOpenChange2 = (openKeys2) => {
    const latestOpenKey = openKeys2.find(key => this.state.openKeys2.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys2 });
    } else {
      this.setState({
        openKeys2: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }


  //点击调取侧边导航
  onClickName=(parentId,ppppp)=>{

      this.props.dispatch({type:'app/getNavSideEFF',val:parentId})
      // dispatch({ type: 'getArticleContentEFF',articleId});
  }

  onClickJump=(type,parentId,path,inputPath,articleId,headImage)=>{
    //  console.log(headImage)

   if(parentId=='1'){
      parentId='';
   }

   if(type=='-1'){
    // if(articleId==''||articleId=='undefined'){
    //   console.log('文章没有articleId')
    // }else{
    //  // console.log(parentId)
    //     let values = "parentId=" + parentId +"&articleId=" + '90aeafefa5cb4320865f9bb387724dec'  +"";
    //     this.props.dispatch(routerRedux.push(`${path}?${values}`));
    //     var obj={};
    //     var name,value;
    //     var str=window.location.href;
    //     var num=str.indexOf("?");
    //     str=str.substr(num+1);
    //     var arr={};
    //     arr=str.split("&");
    //     for(var i=0;i<arr.length;i++){
    //       var Cstr=arr[i]
    //       var Barr=Cstr.split("=")
    //       obj[Barr[0]]=decodeURI(Barr[1])
    //     }
    // //    console.log(obj)
    //     this.props.dispatch({type:'app/getNavSideEFF',val: obj})
    //     this.props.dispatch({ type: 'app/getArticleContentEFF',val: obj});
    // }

    //  if(!!path&&path!=''){
    //     let values = "parentId=" + parentId+"";
    //     this.props.dispatch(routerRedux.push(`${path}?${values}`));
    //     var obj={};
    //     var name,value;
    //     var str=window.location.href;
    //     var num=str.indexOf("?");
    //     str=str.substr(num+1);
    //     var arr={};
    //     arr=str.split("&");
    //     for(var i=0;i<arr.length;i++){
    //       var Cstr=arr[i]
    //       var Barr=Cstr.split("=")
    //       obj[Barr[0]]=decodeURI(Barr[1])
    //     }
    // //  console.log(obj)
    //   this.props.dispatch({type:'app/getNavSideEFF',val: obj})

    //  }else{
    //    console.log('不跳转');
    //  }
     if(path=='/'){
      // window.location.href = '/';
      this.props.dispatch(routerRedux.push(`/`));
     }
     console.log('不跳转');
      // this.props.dispatch({ type: 'getArticleContentEFF',val: obj});
         //内部跳转navUrl
      if(!!path&&path!=''){
          console.log(path);
            let values = "parentId=" + parentId+"";
           this.props.dispatch(routerRedux.push(`${path}?${values}`));
      }else{
        console.log('不跳转')
      }
   }else if(type=='0'){
      //  let outlinkPath=window.open('about:blank');
      // if(!!path&&path!=''){
      //   console.log('跳转url');
      //   console.log(path);
      //   outlinkPath.location.href=path;
      // }
      //  跳转外部
      let outlinkPath=window.open('about:blank');
      console.log('跳转url');
       if(!!inputPath&&inputPath!=''){
         console.log(inputPath);
         outlinkPath.location.href=inputPath
       }
      //跳转url动态页面
        // if(!!path&&path!=''){
        // let values = "parentId=" + parentId+"";
        // this.props.dispatch(routerRedux.push(`${path}?${values}`));
        // var obj={};
        // var name,value;
        // var str=window.location.href;
        // var num=str.indexOf("?");
        // str=str.substr(num+1);
        // var arr={};
        // arr=str.split("&");
        // for(var i=0;i<arr.length;i++){
        //   var Cstr=arr[i]
        //   var Barr=Cstr.split("=")
        //   obj[Barr[0]]=decodeURI(Barr[1])
        // }
    //  console.log(obj)
    //   this.props.dispatch({type:'app/getNavSideEFF',val: obj})
    //  }else{
    //    console.log('不跳转');
    //  }

   }else if(type=='1'){
    console.log('跳转图片');
   }else if(type=='2'){
      if(articleId==''||articleId=='undefined'){
        console.log('文章没有articleId')
      }else{
       // console.log(parentId)
       console.log(headImage)
      //  let values=''

      //  if(headImage!=='undefined'){
      //     //换头图
      //     values = "parentId=" + parentId +"&articleId=" + articleId+"&headImage=" +headImage +"";
      //   }else{
      //      //不用换头图
      //      values = "parentId=" + parentId +"&articleId=" + articleId+"";

      //   }

        //  if(headImage==undefined||headImage==''){
        //    //不用换头图
        //     values = "parentId=" + parentId +"&articleId=" + articleId+"";
        //  }else{
        //    //换头图
        //     values = "parentId=" + parentId +"&articleId=" + articleId+"&headImage=" +headImage +"";
        //  }

          let values = "parentId=" + parentId +"&articleId=" + articleId+"";
          this.props.dispatch(routerRedux.push(`${path}?${values}`));
          var obj={};
          var name,value;
          var str=window.location.href;
          var num=str.indexOf("?");
          str=str.substr(num+1);
          var arr={};
          arr=str.split("&");
          for(var i=0;i<arr.length;i++){
            var Cstr=arr[i]
            var Barr=Cstr.split("=")
            obj[Barr[0]]=decodeURI(Barr[1])
          }
      //    console.log(obj)
          this.props.dispatch({type:'app/getNavSideEFF',val: obj})
          this.props.dispatch({ type: 'app/getArticleContentEFF',val: obj});
      }
   }

  }

  onClickJump2=(parentId,type,path,inputPath,articleId,headImage)=>{

    if(parentId=='1'){
      parentId='';
   }

   if(type=='-1'){
     //什么都不跳
     console.log("什么都不跳转")

     if(!!path&&path!=''){
      console.log(path);
        let values = "parentId=" + parentId+"";
       this.props.dispatch(routerRedux.push(`${path}?${values}`));
     }

   }else if(type=='0'){
       let outlinkPath=window.open('about:blank');

       console.log('跳转url');
        if(!!inputPath&&inputPath!=''){
          console.log(inputPath);
          outlinkPath.location.href=inputPath
        }

         //跳转url动态页面
      //  if(!!path&&path!=''){
      //  //   let values = "parentId=" + parentId+"";
      //     this.props.dispatch(routerRedux.push(`${path}?`));
      //     var obj={};
      //     var name,value;
      //     var str=window.location.href;
      //     var num=str.indexOf("?");
      //     str=str.substr(num+1);
      //     var arr={};
      //     arr=str.split("&");
      //     for(var i=0;i<arr.length;i++){
      //       var Cstr=arr[i]
      //       var Barr=Cstr.split("=")
      //       obj[Barr[0]]=decodeURI(Barr[1])
      //     }
      // //  console.log(obj)
      //   this.props.dispatch({type:'app/getNavSideEFF',val: obj})
      //  }else{
      //    console.log('不跳转');
      //  }

   }else if(type=='1'){
      console.log('跳转图片');
   } else if(type=='2'){
      if(articleId==''||articleId=='undefined'){
          console.log('文章没有articleId')
      }else{
            // let values=''
            // if(headImage==undefined||headImage==''){
            //   //不用换头图
            //   values = "parentId=" + parentId +"&articleId=" + articleId+"";
            // }else{
            //   //换头图
            //   values = "parentId=" + parentId +"&articleId=" + articleId+"&headImage=" +headImage +"";
            // }
            let values = "parentId=" + parentId +"&articleId=" + articleId+"";
          this.props.dispatch(routerRedux.push(`${path}?${values}`));
          var obj={};
          var name,value;
          var str=window.location.href;
          var num=str.indexOf("?");
          str=str.substr(num+1);
          var arr={};
          arr=str.split("&");
          for(var i=0;i<arr.length;i++){
            var Cstr=arr[i]
            var Barr=Cstr.split("=")
            obj[Barr[0]]=decodeURI(Barr[1])
          }
          this.props.dispatch({ type: 'app/getArticleContentEFF',val: obj});
      }
   }

  }

 //跳转到静态页面
  goArticleDetail=(articleId)=>{
   // console.log(articleId)
   // console.log(e.target);
   this.props.dispatch({ type: 'app/getArticleContentEFF',val:articleId});
  }


  componentDidMount(){
    if(!this.props.app.navList.length>0){
     this.props.dispatch({ type: 'app/getNavEFF'});
    }
   if(!this.props.app.goodsClass.length>0){
    this.props.dispatch({ type: 'app/getGoodsClassEFF'});
   }


  //  this.props.dispatch({type:'app/getNavSideEFF',val: obj})
  //  this.props.dispatch({ type: 'app/getArticleContentEFF',val: obj});



  }

  Expand = () => {
    this.setState({
      open:!this.state.open
    })
  };

  navmap=(arr)=>{

  let mewArr = arr.map((v,i,a)=>{
    if(v.nextArr){
      return <SubMenu style={{ padding:'0px' }} key={v.id} title={
        <Link to={v.navUrl} className="nav_link" activeClassName='actived_link' >{v.title} <Icon type="down" /></Link>
      }>
        {this.navmap(v.nextArr)}
      </SubMenu>
    }
      return <Menu.Item style={{ padding:'0px' }} key={v.id}>
        <Link to={v.navUrl} className="nav_link" activeClassName='actived_link' >{v.title}</Link>
        </Menu.Item>
    })
    return mewArr
  }



 onVisiable = () => {
  this.props.dispatch(routerRedux.push(`/product/productsort`));
  const {visiable=false } =this.props;

  if(!visiable){
   console.log(visiable)
   if(this.state.ifShow){
    this.setState({
     ifShow:false
    })
   }else {
    this.setState({
     ifShow:true
    })
   }
  }
 }


  render (){
    const { goodsClass:data, navList, classId, navStaticList, navStaticListLeft=[],navlistSide } = this.props.app;
    const { leftComponent, preson=false, leftComponentPreson, visiable=false ,isPreson=true } =this.props;

  //  console.log(this.props.navlistSide);
    const rootSubmenuKeys = ['0','1','2','3','4','5','6','7'];

    let newData =  data.slice(0,6);
    return (
      <div
        //style={{borderBottom:"2px solid #3497ce"}}
      >
        <div className={ navigation }>
          <div className="nav_left">
            <div className="fenlei" onClick={this.onVisiable}  >商品分类</div>
            <div className={ `${ visiable==true ? "visiable" :this.state.ifShow ?'hover_block' :'hover' } ${fenlei_every}` } >

              {
                newData ?
                  newData.map((bigClass,index)=>{
                    return (
                      <div className={`fenlei${index} classification_content`} key={index}>
                        <div to={`/home/PeoductSearch/gcIdSearch/${bigClass.gcId}`}>
                          <div className="fl_title">
                            <div className="fl_title_top"><a href={`/goodsDetail/relevantGoods/gcFirstIdSearch/${bigClass.gcId}`}>{bigClass.gcName}</a></div>
                            <div className="fl_title_bottom">
                              {bigClass.classList.map((v,i)=>{
                                return (<a key={i} href={`/goodsDetail/relevantGoods/gcSecondIdSearch/${v.gcId}`}>{v.gcName}</a>)
                              })}
                            </div>
                          </div>
                        </div>


                        <div className="fl_hover_show">
                          <div className="cat_pannel">
                            <div className="hd_sort_list">
                              {bigClass.classList.map((smallClass,index)=>{
                                return(
                                  <dl key={index}>
                                    <dt><a className='hd_sort_list_erji' href={`/goodsDetail/relevantGoods/gcSecondIdSearch/${smallClass.gcId}`}>{smallClass.gcName}></a> </dt>
                                    <dd>

                                        {smallClass.classList.map((good,index)=>{
                                          if(classId && classId == good.gcName){
                                            return (<a key={index} style={{color:'#3497ce'}} href={`/goodsDetail/relevantGoods/gcIdSearch/${good.gcId}`}>{good.gcName}</a>)
                                          }else{
                                            return (<a key={index} href={`/goodsDetail/relevantGoods/gcIdSearch/${good.gcId}`} className="gc3">{good.gcName}</a>)
                                          }
                                        })}
                                    </dd>
                                  </dl>
                                )
                              })}
                            </div>
                            {/*
                            <div className="Brands">
                              {bigClass.brandList.slice(0,6).map((brand,index)=>{
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
                            */}
                          </div>
                        </div>

                      </div>
                    )
                  })  : null }

            </div>
          </div>
          <div className="nav_right">

            <Menu  mode="horizontal"
                   openKeys={this.state.openKeys}
                  // defaultOpenKeys={['0','1' ,'2','3','4','5','6','7','8','9','10']}
                   onOpenChange={this.onOpenChange}
                   >
              { !!navList&&navList.length>0 && navList.map((list,index)=>{
                let path = list.navUrl;
                let inputPath = list.url;
                let type = list.type;
             //   let newpath = path.replace("http://10.37.1.101","");
                let tiaoNavTitle=list.navTitle
                let parentId=list.navId
                let articleId=list.articleId;
                let headImage1=list.headImage
             //   console.log(path)
                  return (
                      <SubMenu key={index}
                            title={
                                <i  className='title_nav'
                                  onClick={()=>this.onClickJump(type,parentId,path,inputPath,articleId,headImage1)}>
                                      <span>{list.navTitle}
                                        {
                                          list.childrenList.length>0 ?
                                          <Icon type="down"/>:null
                                        }
                                      </span>
                                  </i>
                                  }
                       >
                      { !!list && list.childrenList.length>0 ? list.childrenList.map((item,ind2)=>{
                        let path = item.navUrl;
                        let inputPath = item.url;
                        let type = item.type;
                        let articleId=item.articleId;
                        let headImage2=item.headImage
                        return(
                        <SubMenu key={ind2+10}
                            title={
                              <i
                                onClick={()=>this.onClickJump(type,parentId,path,inputPath,articleId,headImage2)}
                                className='title_nav_two'
                                style={{margin:'0',padding:'0',fontStyle:'normal'}}
                               >
                                {item.navTitle}
                              </i>
                             } >
                             { !!item && item.childrenList.length>0 ? item.childrenList.map((goods,ind3)=>{
                                let path = goods.navUrl;
                                let inputPath = goods.url;
                                let type = goods.type;
                                let articleId=goods.articleId;
                                let headImage3=goods.headImage
                                return(
                                  <SubMenu key={ind3+100}
                                      title={
                                        <i
                                          onClick={()=>this.onClickJump(type,parentId,path,inputPath,articleId,headImage3)}
                                          style={{margin:'0',padding:'0',fontStyle:'normal',minWidth:'136px',display:'inline-block'}}
                                        >
                                          {goods.navTitle}
                                        </i>
                                      } >
                                        { !!goods&&goods.childrenList ? goods.childrenList.map((nav,indx4)=>{
                                          let path = nav.navUrl;
                                          let inputPath = nav.url;
                                          let type = nav.type;
                                          let articleId=nav.articleId;
                                          let headImage4=nav.headImage
                                                return (
                                                  <Menu.Item key={indx4+200} >
                                                    <i
                                                      onClick={()=>this.onClickJump(type,parentId,path,inputPath,articleId,headImage4)}
                                                      style={{margin:'0',padding:'0',fontStyle:'normal',minWidth:'136px',display:'inline-block'}}
                                                      >{nav.navTitle}</i>
                                                  </Menu.Item>
                                                  )

                                            }) :null
                                        }
                                  </SubMenu>
                                )
                               }) :null
                            }

                                 {/* !!item&&item.childrenList ? item.childrenList.map((nav,indx)=>{
                                  let path = nav.navUrl;
                                  let inputPath = nav.url;
                                  let type = nav.type;
                                  let articleId=nav.articleId;
                               //   let newpath = path.replace("http://10.37.1.101","");
                                        return (
                                          <Menu.Item key={indx+100} >
                                            <i
                                              onClick={()=>this.onClickJump(type,parentId,path,inputPath,articleId)}
                                              // onClick={()=>this.onClickName({parentId})}
                                              style={{margin:'0',padding:'0',fontStyle:'normal'}}
                                              // to={ `/brand/${parentId}`}
                                              className='title_nav_last'
                                              >{nav.navTitle}</i>
                                          </Menu.Item>
                                          )

                                     }) :null
                                    */ }
                          </SubMenu>)
                        }) :null
                      }
                    </SubMenu>
                  )
              })
              }
           </Menu>
          </div>
        </div>
        <div style={{ width:'1366px', border:'1px solid #3497ce', margin:'-1px auto 0px auto' , position:"relative", zIndex:'100'}}></div>
        <div style={{display:isPreson ==true ? 'flex' : 'none'}} className={left_right_layout}>
          {
            preson==false ?
              <div className='layout_left'>
                  {
                    leftComponent ? leftComponent :
                    <div className='layout_navLeft'>
                      <Menu
                       mode="inline"
                       openKeys={this.state.openKeys2}
                      //  onOpenChange={this.onOpenChange2}
                       defaultOpenKeys={['0','1' ,'2','3','4','5','6','7','8','9','10']}
                       >
                        {navlistSide.map((list,index)=>{
                          let path = list.navUrl;
                          let parentId=list.navId
                          let inputPath = list.url;
                          let type = list.type;
                          let tiaoNavTitle=list.navTitle
                          let articleId=list.articleId;
                          let headImage1=list.headImage
                            return (
                                <SubMenu
                                   key={index}
                                      title={
                                            <i
                                             style={{margin:'0',padding:'0',fontStyle:'normal'}}
                                              onClick={()=>this.onClickJump2(parentId,type,path,inputPath,articleId,headImage1)}
                                              >
                                                <span>{list.navTitle}</span>
                                            </i>
                                            }
                                      >
                            { list.childrenList.length>0 ? list.childrenList.map((item,ind2)=>{
                              let path = item.navUrl;
                              let inputPath = item.url;
                              let type = item.type;
                              let articleId=item.articleId;
                              let headImage2=item.headImage;
                              return(
                              <SubMenu key={ind2}
                                  title={
                                    <i
                                  //  onClick={()=>this.goArticleDetail({articleId})}
                                    onClick={()=>this.onClickJump2(parentId,type,path,inputPath,articleId,headImage2)}
                                     className='title_nav_two' style={{margin:'0',padding:'0',fontStyle:'normal'}}>
                                    {item.navTitle}
                                    </i>
                                  }
                                  >
                                  { !!item && item.childrenList.length>0 ? item.childrenList.map((goods,ind3)=>{
                                      let path = goods.navUrl;
                                      let inputPath = goods.url;
                                      let type = goods.type;
                                      let articleId=goods.articleId;
                                      let headImage3=goods.headImage
                                      return(
                                        <SubMenu key={ind3}
                                            title={
                                              // <Popover title="Title">
                                                <i
                                                title={goods.navTitle}
                                                  onClick={()=>this.onClickJump2(parentId,type,path,inputPath,articleId,headImage3)}
                                                  style={{margin:'0',padding:'0',fontStyle:'normal'}}
                                                >
                                                  {goods.navTitle}
                                                </i>
                                              // </Popover>
                                            }
                                        >
                                          { !!goods&&goods.childrenList ? goods.childrenList.map((nav,ind4)=>{
                                            let path = nav.navUrl;
                                            let inputPath = nav.url;
                                            let type = nav.type;
                                            let articleId=nav.articleId;
                                            let headImage4=nav.headImage
                                                  return (
                                                    <Menu.Item key={ind4} >
                                                        <i
                                                          onClick={()=>this.onClickJump2(parentId,type,path,inputPath,articleId,headImage4)}
                                                          style={{margin:'0',padding:'0',fontStyle:'normal'}}
                                                          >{nav.navTitle}</i>
                                                    </Menu.Item>
                                                  )
                                              }) :null
                                          }
                                        </SubMenu>
                                      )
                                      }) :null
                                    }
                                      {/*item.childrenList ? item.childrenList.map((nav,indx3)=>{
                                        // let path = item.navUrl;
                                        let path = nav.navUrl;
                                        let inputPath = nav.url;
                                        let type = nav.type;
                                        let articleId=nav.articleId
                                              return (
                                                <Menu.Item key={indx3+100} >
                                                  <i
                                                  // onClick={()=>this.goArticleDetail({articleId})}
                                                  style={{margin:'0',padding:'0',fontStyle:'normal'}}
                                                  // to={ `/brand/${parentId}`}
                                                  onClick={()=>this.onClickJump2(type,path,inputPath,articleId)}
                                                    className='title_nav_last'>

                                                  {nav.navTitle}</i>
                                                </Menu.Item>
                                                )

                                          }) :null
                                        */}
                              </SubMenu>)
                              }) :null
                            }
                          </SubMenu>
                         )
                        })
                        }
                      </Menu>
                    </div>
                   }
              </div> :
              <div className='layout_left_preson'>
                {
                  leftComponentPreson ? leftComponentPreson :
                    <div className={preson_my_nav}>
                      <div className="my_account">
                        <div><Link activeClassName='actived_link' to="/presonAccunt/myAccount">我的账户</Link></div>
                      </div>

                      <div className="my_nav_list_all">

                        <div className="my_nav_list">
                          <div className="my_nav_title">
                            <div className="my_nav_title_img order_img"></div><div>我的交易</div>
                          </div>
                          <div className="my_nav_link_list">
                            <Link activeClassName='actived_link' to="/personOrder/myOrder">我的订单</Link>
                            <Link activeClassName='actived_link' to="/personOrder/myConsultList">我的询价单</Link>
                            {/*  询价单列表
                              <Link activeClassName='actived_link' to="/personOrder/consultList">我的询价单</Link>
                            */}
                            <Link activeClassName='actived_link' to="/personOrder/cart">我的购物车</Link>
                            <Link activeClassName='actived_link' to="/personOrder/favList">我的收藏夹</Link>
                            
                                  {/*    <Link activeClassName='actived_link' to="/personOrder/order">常购清单</Link>
                              <Link activeClassName='actived_link' to="/personOrder/refundList">售后申请</Link>*/}
                          </div>
                        </div>
                        {/*
                        <div className="my_nav_list">
                          <div className="my_nav_title">
                            <div className="my_nav_title_img Integral_img"></div><div>我的积分</div>
                          </div>
                          <div className="my_nav_link_list">
                          <Link activeClassName='actived_link' to="/pe888">兑换说明</Link>
                            <Link activeClassName='actived_link' to="/personIntegral/mall">积分商城</Link>
                            <Link activeClassName='actived_link' to="/personIntegral/giftShoppingCart">礼品购物车</Link>
                            <Link activeClassName='actived_link' to="/pe888">历史兑换</Link>
                          </div>
                        </div>
                        */}
                        <div className="my_nav_list">
                          <div className="my_nav_title">
                            <div className="my_nav_title_img Info_img"></div><div>我的信息</div>
                          </div>
                          <div className="my_nav_link_list">
                            <Link activeClassName='actived_link' to="/presonAccount/personalInformation">基本信息</Link>
                            <Link activeClassName='actived_link' to="/presonAccount/addressList">收货信息</Link>
                            <Link activeClassName='actived_link' to="/presonInvoice/invoiceInfo">开票信息</Link>
                           <Link activeClassName='actived_link' to="/presonAccount/deposit">预存款信息</Link>
                           <Link activeClassName='actived_link' to="/presonAccount/intelligentUp">资质上传</Link>
                            {/*    <Link activeClassName='actived_link' to="/presonAccount/managerTemplates">采购模板管理</Link>*/}
                           <Link activeClassName='actived_link' to="/presonAccount/presonAccount">账户安全性</Link>

                          </div>
                        </div>
                       {/*
                        <div className="my_nav_list">
                          <div className="my_nav_title">
                            <div className="my_nav_title_img group_img"></div><div>我的群组</div>
                          </div>
                          <div className="my_nav_link_list">
                            <Link activeClassName='actived_link' to="/pe888">群组审批订单</Link>
                            <Link activeClassName='actived_link' to="/group/fav">群组收藏夹</Link>
                            <Link activeClassName='actived_link' to="/group/fund">群组经费管理</Link>
                          </div>
                        </div>
                       */}
                      </div>
                      <div className="my_saler">
                        <div><span style={{ color:'#000' }}>销售员：</span>中国试剂网</div>
                        <div><span style={{ color:'#000' }}>会员热线：</span>021-63210123</div>
                        <div><span style={{ color:'#000' }}>联系传真：</span>021-63290778</div>
                      </div>
                    </div>
                }
              </div>
          }
          <div className={ preson==false ? 'layout_right': 'layout_right_preson' }>{ this.props.children }</div>
        </div>


      </div>


    )
  }
}
export default connect(({app})=>({app}),(dispatch,own)=>{return {dispatch,own}})(Navigation);
