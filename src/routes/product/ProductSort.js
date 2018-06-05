import React, { Component } from 'react'
import { connect } from 'dva'
import { Link ,routerRedux } from 'dva/router'
import {Breadcrumb, Table, Icon, Divider ,Form, Input, Row, Col, Checkbox, Button, AutoComplete,Slider ,Radio,message } from 'antd';
import {productsort,description_content,description_list,description_list_third,commodity_filter} from './ProductSort.less';
import Search from '../../components/Search/Search'
import Navigation from '../../components/Navigation/Navigation'


class ProductSort extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }


  onClickJumpFirst=(gcId)=>{
    this.props.dispatch(routerRedux.push(`/goodsDetail/relevantGoods/gcFirstIdSearch/${gcId}`));
  }
  onClickJumpSecond=(gcId)=>{
    this.props.dispatch(routerRedux.push(`/goodsDetail/relevantGoods/gcSecondIdSearch/${gcId}`));
  }

  render() {
    // const {data}=this.props;
    const{ goodsClass}=this.props.app;
    // console.log(goodsClass)
    const data=[1,2,3,4,5,6,7,8,9]
    return (
      <div>
          <div className={productsort}>
            <div className={description_content}>
               <div className={commodity_filter}>
                     
               { goodsClass?
                 goodsClass.map((bigClass,index)=>{
                     return(
                   
                          <div key={index}>                        
                                <p style={{border:'1px solid #ccc',padding:'10px',fontSize:'18px',fontWeight:'bold'}}><img src={require('../../assets/search_44.png')}/><b style={{display:'inline-block',paddingLeft:'10px',cursor:'pointer'}}  onClick={() => this.onClickJumpSecond(bigClass.gcId)} >{bigClass.gcName}</b> </p>
                                <div className={description_list_third}>
                                   {/*二级分类*/}
                                   {bigClass.classList?
                                     bigClass.classList.map((secondClass,index2)=>{
                                       return(
                                          <Row key={index2}>
                                             <Col span={4}><i className='secondClass' onClick={() => this.onClickJumpSecond(secondClass.gcId)} >{secondClass.gcName}  ></i></Col>
                                                {/*三级分类*/}
                                             <Col span={20}>              
                                              {  secondClass.classList?
                                                  secondClass.classList.map((smallClass,index3) =>{
                                                    return (                      
                                                            <a key={index3} href={`/goodsDetail/relevantGoods/gcIdSearch/${smallClass.gcId}`}>{smallClass.gcName}</a>  
                                                      )
                                                  }):null
                                                }
                                             </Col>
                                          </Row>
                                        )
                                     }):null

                                   }
                                  
                                  
                                 
                                </div>   
                          
                          </div>
                     )
                 }):null
              }

                {/*data?
                  data.map((list,index)=>{
                       return(
                     
                            <div key={index}>                        
                                  <p style={{border:'1px solid #ccc',padding:'10px',fontSize:'16px'}}><img src={require('../../assets/search_44.png')}/>  化学一</p>
                                  <div className={description_list_third}>
                                   <Row>
                                     <Col span={2}> 二级目录 ></Col>
                                     <Col span={20}>
                                          { [1,1,1,1,1,1,1,1,1,1].map((v,i)=>{
                                            return (           
                                                  <a key={i}>三级目录</a>  
                                            )
                                          })}
                                      </Col>
                                    </Row>
                                  </div>   
                            
                            </div>
                       )
                   }):null
                  */ }
                  
               </div>
                        
            </div>       
          </div>  
             
      </div>
    )
  }  
}

export default connect(({product,app})=>({product,app}),(dispatch,own)=>{return{ dispatch,own }})(ProductSort)