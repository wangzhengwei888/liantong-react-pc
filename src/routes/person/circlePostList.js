/**
 * Created by b2b2c on 2017/8/15.
 */
import React , { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row,Col,Menu, Dropdown,Icon,Form,Breadcrumb,Input,Button,Pagination} from 'antd';
import { circlePostList_body,} from './circlePostList.less';

const FormItem = Form.Item;

function onChange(pageNumber) {
  console.log('Page: ', pageNumber);
}


class CircleList extends Component {
  constructor(props) {
    super(props);

  }
  ondelete = () => {
 console.log("删除")
}
  render(){
    return(
      <div className={circlePostList_body}>
        <div className="orderList_head">
          <Breadcrumb separator=">">
            <Breadcrumb.Item><a href="">我的商城</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">圈子管理</a></Breadcrumb.Item>
            <Breadcrumb.Item><a style={{fontWeight:'bold',fontSize:'14px'}} href="">帖子列表</a></Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="orderList_search">
          <Form layout="inline">
            <FormItem>帖子名称：<Input style={{width:'74%'}} placeholder="帖子名称" /></FormItem>
            <FormItem style={{float:'right',textAlign:'right'}}>
              <Button type="primary" size="large" ghost>搜索</Button>
            </FormItem>
          </Form>
        </div>
        <div className="orderList_content">
          <Row className="orderList_content_head">
            <Col span={11}>帖子信息</Col>
            <Col span={3}></Col>
            <Col span={3}>所属圈子</Col>
            <Col span={3}>创建时间</Col>
            <Col span={4}>状态与操作</Col>
          </Row>
          <div>
            <div className="orderList_content_goods">
              <table className="border_bottom">
                <tbody>
                <tr>
                  <td style={{width:'45.83333333%'}}>
                    <div className="goods_div1">
                      <div style={{margin:'0px 32px'}}>
                        <p style={{lineHeight:'20px',maxHeight:'40px',overflow:'hidden',cursor:'pointer'}}>格列齐特片（达美康）</p>
                      </div>
                    </div>
                  </td>
                  <td style={{width:'12.5%'}}>
                    <p style={{lineHeight:'25px'}} ><Icon type="like" style={{marginRight:'5px'}} />1</p>
                    <p style={{lineHeight:'25px'}}><Icon type="message" style={{marginRight:'5px'}} />1</p>
                  </td>
                  <td className='border_left' style={{width:'12.5%'}} >摄影</td>
                  <td className='border_left' style={{width:'12.5%'}} >2017-08-31 16:58</td>
                  <td className='border_left'>
                    <div className="goods_div2">
                      <div style={{color:'#ff0000',cursor:'pointer'}} onClick={()=>this.ondelete()}>删除</div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>

              <table className="border_bottom">
                <tbody>
                <tr>
                  <td style={{width:'45.83333333%'}}>
                    <div className="goods_div1">
                      <div style={{margin:'0px 32px'}}>
                        <p style={{lineHeight:'20px',maxHeight:'40px',overflow:'hidden',cursor:'pointer'}}>格列齐特片（达美康）</p>
                      </div>
                    </div>
                  </td>
                  <td style={{width:'12.5%'}}>
                    <p style={{lineHeight:'25px'}} ><Icon type="like" style={{marginRight:'5px'}} />1</p>
                    <p style={{lineHeight:'25px'}}><Icon type="message" style={{marginRight:'5px'}} />1</p>
                  </td>
                  <td className='border_left' style={{width:'12.5%'}} >摄影</td>
                  <td className='border_left' style={{width:'12.5%'}} >2017-08-31 16:58</td>
                  <td className='border_left'>
                    <div className="goods_div2">
                      <div style={{color:'#ff0000',cursor:'pointer'}} onClick={()=>this.ondelete()}>删除</div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

          </div>




          <div className="orderList_paging">
            <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
          </div>
        </div>

      </div>
    )
  }
}

// export default CircleList;
export default connect(({CircleList})=>({CircleList}),(dispatch,own)=>{return {dispatch,own}})(CircleList);
