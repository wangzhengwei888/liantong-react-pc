import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Table, Icon, Divider ,Form, Input, Row, Col, Checkbox, Button, AutoComplete,Slider ,Radio,message } from 'antd';
import {new_list} from './ImportAgent.less';

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }];
  



class ImportAgent extends React.Component {

  render() {
    
    return (
      <div>
     
          <div className={new_list}>       
            <div className="new_list_title">进口代理业务</div>
            <div>
              {
                [1,1].map((v, i, a) => (
                  <div key={i} style={{marginTop: '15px'}}>
                    <Link to=''>关于征求职业病危害因素分类目录（征求意见稿）意见的...</Link>
                  </div>
                ))
              }
            </div>
             <div>
                <p>Q1：什么是进口代理业务？</p>
                <p>A：进口i代理是指有货物进口需求的客户，由于没有进出口权的企业或有进出口权但没有相关经营资质等原因，委托外贸公司代办理进口的贸易服务型业务。进口代理一般由具有进出口权的外贸代理商操作，在进口的过程中，进口代理商作为发货人和收货人之外的中间人，在操作过程中收取佣金，但一般不承担信用、汇兑和市场风险。</p>
                <p>Q1：什么是进口代理业务？</p>
                <p>A：进口i代理是指有货物进口需求的客户</p> 
             </div>
              <table  className="import_list_table">
               <tbody>
                 <tr style={{backgroundColor:'#108ee9',color:'#fff',fontSize:'14px'}}>
                    <td>监管证件代码</td>
                    <td>监管证件名称</td>
                    <td>说明</td>                  
                 </tr>
                 <tr>
                    <td>2</td>
                    <td>两用物项和技术进口许可证</td>
                    <td>指列入《两用物项和进口许可证管理目录》的商品，进口时由商务部签发两用物项和技术进口许可证。</td>
                 </tr>
                 <tr>
                    <td>S</td>
                    <td>进口农药登记证明</td>
                    <td>根据《农药管理条例》及有关法律法规，《中华人民共和国进口农药登记证明管理名录》和《中华人民共和国进出口列入事先知情同意程序（PIC）农药登记证明管理名录》的商品，进出口时，农药部签发进出口农药登记证明。</td>
                 </tr>
                 <tr>
                    <td>X</td>
                    <td>有毒化学品环境管理放行通知单</td>
                    <td>指列入《中国严格限制的有毒化学品名录》的进出口化学品，又国家环境保护部签发的放行通知单。</td>
                 </tr>
                 <tr>
                    <td>A</td>
                    <td>特殊物品审批单</td>
                    <td>涉及到医用特殊物品（如人体组织等）。最终用户在当地须提前到卫生部和省、自治区、直辖市卫生行政部门办理准出入境证明，持准出入境证明到出入境检验检疫机构申办《出入境特殊物品卫生检疫审批单》。</td>
                 </tr>
                 </tbody>
              </table>
             <p style={{color:'red'}}>注意：所有进口许可证和特殊物品审核单是否能获得均以审批部门批准结果为准。</p>

          </div>
      </div>
    );
  }
}




export default connect(({product})=>({product}))(ImportAgent)