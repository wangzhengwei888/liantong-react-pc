import React , { Component } from 'react';
import { routerRedux,Link } from 'dva/router';
import { connect } from 'dva';
import {  Button, Icon, Row, Col, Input,Badge,Form } from 'antd';
import { search,dropdown_dian } from './StoreSearch.less';
const FormItem = Form.Item;

class  Search extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let arr = window.location.pathname.split("/").slice(1,3);
    let storePath = arr.join("/");
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values.keyWord);
        let keyWord = values.keyWord == "undefined" ? "" : values.keyWord ;
        console.log(keyWord)
        this.props.dispatch(routerRedux.push(`/${storePath}/result/goodsName/${keyWord}`));
      }
    });
  }

  allhandleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values.keyWord);
        let keyWord = values.keyWord == "undefined" ? "" : values.keyWord ;
        this.props.dispatch(routerRedux.push(`/home/PeoductSearch/keywordSearch/${keyWord}`));
      }
    });

  }

  render (){
    const {cartCountData} = this.props.app;
    console.log(cartCountData)
    const { getFieldDecorator } = this.props.form;
    const { shopListObj } = this.props.storegoodsList;
    return (
      <Row type="flex" justify="center" className={ search }>
        <Col ><Link className="logo"  to="/home"></Link></Col>
        <Col  style={{width:'950px',display:'inline-block',paddingTop:'55px'}}>

          <div className="search_input">
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('keyWord',{
                  initialValue:shopListObj.goodsName != "" && shopListObj.goodsName != "undefined" ? shopListObj.goodsName : ""
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" style={{padding:'0px',border:'0px',fontFamily:'思源黑体',lineHeight:'30px',fontSize:'16px'}}>
                 搜索
                </Button>
              </FormItem>
              <FormItem className="line">
                <span></span>
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" onClick={this.allhandleSubmit}
                className="allSearchBtn">
                  搜全站
                </Button>
              </FormItem>
            </Form>
          </div>
          <div className="go_cart">
            <span className="cart_img"></span>
            <Badge count={cartCountData} style={{backgroundColor:'#FF7719',fontSize:'10px',padding:'0px',height:'14px',lineHeight:'14px',left:'65px'}}>
              <Link to={'/cart'}>购物车{cartCountData > 100 ? "99+" : cartCountData}件</Link>
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
export default connect(({storegoodsList,app})=>({storegoodsList,app}),(dispatch,own)=>{return {dispatch,own}})(Form.create()(Search));
