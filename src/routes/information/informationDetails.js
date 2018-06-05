/**
 * Created by b2b2c on 2017/9/4.
 */
//资讯头尾
import React , { Component } from 'react';
import { Form,Icon,Pagination,Breadcrumb,Button,Input} from 'antd';
import Img from '../../components/Img/Img';
import { routerRedux,Link } from 'dva/router';
import {connect} from 'dva';
import InformationTop from './informationTop'
import InformationBottom from './informationBottom';
import Recommend from './recommend';
import {informationDetails_content} from './informationDetails.less';
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation';

const FormItem = Form.Item;
const { TextArea } = Input;



class InformationDetails extends Component{
  constructor(props){
    super(props);
  }

  render(){

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 14 },
      },
    };
    let {informationDetailed,indexData} = this.props.information;
    let { contentEntity } = informationDetailed;

    return (
      <div>
        {/*<InformationTop   indexData={indexData} />*/} 
        <div><Search></Search></div>
        <div><Navigation></Navigation></div>
        <div className={informationDetails_content}>
          <div className="informationDetails_head">
            <Breadcrumb>
              <Breadcrumb.Item href="/information">
                <Icon style={{color:'#3497CE'}} type="home" />
                <span>新闻中心</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                 <Link to={`/information/informationList/${contentEntity && contentEntity[0].catid}`} >{informationDetailed && informationDetailed.acName }</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="informationDetails_list">
            <div className="Details_box">
              <h1 className="Details_head">{contentEntity && contentEntity[0].title}</h1>
              <h6 className="Details_head_bottom">
                 {contentEntity && contentEntity[0].source ? <span>文章来源：{contentEntity && contentEntity[0].source} </span>:null}
                 
                 {contentEntity && contentEntity[0].author ?  <span> 作者：{contentEntity && contentEntity[0].author} </span>:null  }
               
                  发布时间：<span>{contentEntity && contentEntity[0].createTimeStr}</span>
              </h6>
              
              <div className="Details_zhenwen" dangerouslySetInnerHTML={{__html: contentEntity && contentEntity[0].content}}/>

              <div className="Details_next">
                {informationDetailed.prvContent ? <h3><Link to={`/information/informationDetails/${informationDetailed.prvContent && informationDetailed.prvContent[0].id}`}>上一篇：<span>{informationDetailed.prvContent[0].title}</span></Link></h3> : <div></div>}
                {informationDetailed.nextContent ? <h3><Link to={`/information/informationDetails/${informationDetailed.nextContent && informationDetailed.nextContent[0].id}`}>下一篇：<span>{informationDetailed.nextContent[0].title}</span></Link></h3> : <div></div>}
              </div>
              <div className="Details_comment" style={{display:'none'}}>
                <Form>
                  <FormItem onSubmit={this.handleSubmit} >
                    <h2 className="my_comment">我要评价<span className="my_comment_span">已有<b style={{color:'#e4393c'}}>0</b>人评价</span></h2>
                  </FormItem>
                  <FormItem>
                    <TextArea rows={8} />
                  </FormItem>
                  <FormItem>
                    <span><em style={{color:'#e4393c'}}>*</em>不超过500字</span>
                    <Button style={{float:'right',}} type="primary" htmlType="submit">评论</Button>
                  </FormItem>
                </Form>

              </div>
              
            </div>

          </div>
          
        </div>

      </div>
    )
  }
}

// export default InformationDetails;
export default connect(({information,app}) => ({information,app}), (dispatch, own) => {
  return {dispatch, own}
})(InformationDetails);
