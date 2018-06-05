/**
 * Created by b2b2c on 2017/9/4.
 */
/**
 * Created by b2b2c on 2017/9/4.
 */
//资讯头尾
import React , { Component } from 'react';
import { Input,Form,Button,Menu,Icon} from 'antd';
import { routerRedux,Link } from 'dva/router';
import {isLogin} from '../../utils/request'
import { information_top} from './informationTop.less';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;



class InformationTop extends Component{
  constructor(props){
    super(props);
    current: 'mail'
  }
  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(e);
    let val = e.target.firstChild.value;
    console.log(val)
    if(val==''){
      val=='';
    }
    this.props.dispatch(routerRedux.push(`/home/PeoductSearch/keywordSearch/${val}`));
    // location.href="/homePeoductSearch";
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }



  render(){
        let {indexData} = this.props;
    let { classList=[] } = indexData;

    return (
      <div className={information_top}>
          <div className="head">
            <Link className="logo"  to="/home"></Link>
            <div className="search_input">
              <Form onSubmit={this.handleSubmit}>
                <input placeholder='搜索文章名称' />
                {/*<span></span>*/}
                <Button type="primary" htmlType="submit" style={{padding:'0px',border:'0px'}}>
                  搜索
                </Button>
              </Form>
            </div>
        </div>

          <div className="navigation_box">
            <div className="navigation_content">
              {/*<div className="content_li">资讯首页</div>*/}
              <Menu
                onClick={this.handleClick}
                // selectedKeys={[this.state.current]}
                mode="horizontal"
                // theme="#3497CE"
                theme="white"
              >
                <Menu.Item key="mail">
                 新闻中心
                </Menu.Item>
                {
                  !!classList&&classList.length &&classList.map((img,index) => {
                    // console.log(img);
                      if(img.sectionClassVoList.length > 0){
                        return(
                          <SubMenu key={index} title={<span>{img.acName}</span>}>
                            {
                              img.sectionClassVoList.map((img,index)=>{
                                return(<Menu.Item key={index}><a href={`/information/informationList/${img.acId}`}>{img.acName}</a></Menu.Item>)
                              })
                            }
                          </SubMenu>
                        )
                      }else{
                        return(
                          <Menu.Item key={index}>
                            <a href={`/information/informationList/${img.acId}`}>{img.acName}</a>
                          </Menu.Item>
                        )
                      }
                  })
                }
                
                
                
              </Menu>
            </div>

          </div>
      </div>

    )
  }
}

export default InformationTop;
