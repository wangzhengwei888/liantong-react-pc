//CMS打印页面
import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, Button, AutoComplete,message } from 'antd';
import {routerRedux,Link} from 'dva/router';
import {getFullUrl} from '../../utils/common';
import PropTypes from 'prop-types';
import {BodyHeadImg} from '../../components/Advertising/Advertising'
import Search from '../../components/Search/Search';
import Navigation from '../../components/Navigation/Navigation'
import Img from '../../components/Img/Img';
import { GoodsRecommed ,bottemDetail} from './api';
import {Print_Content,COA_Content,MSDS_Content} from  './goodsCMSPrint.less'
import {product_left_nav} from "../../components/LeftNav/LeftNav.less";


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class MSDSPrintFrom extends Component {
 constructor(props) {
  super(props)
  this.state = { 
    CSANumber:null,
    productNum:null,
  }

 }

   
 componentDidMount(){
    var iTem= setInterval(
         ()=>{
            
             this.setState({
                CSANumber : this.props.technology&&this.props.technology.detailData&& this.props.technology.detailData[0]&& this.props.technology.detailData[0].casNo? this.props.technology.detailData[0].casNo:''
             });       
         }
         ,1000)
     setInterval(()=>{
           clearInterval(iTem);
     },10000)
 }
  


 handleSearch2 = (e) => {
    e.preventDefault();
  
    this.props.form.validateFields((err, values) => {
      if (!err) {

     

        console.log('Received values of form: ', values);       
        let sampleBh=values.productNumber? values.productNumber:''  ;
        let batchName=values.productBatchNum? values.productBatchNum:''  ; 
        let casindex=values.CSANumber? values.CSANumber:''  ;
        let csdsfilecode=values.productNum? values.productNum:''  ; 
        
            if((!!casindex)||(!!csdsfilecode)){    
                
                let   val = "parentId=4&searchType=exactSearch" +"&sampleBh="+sampleBh+ "&batchName="+ batchName+
                "&casindex="+casindex +"&csdsfilecode="+ csdsfilecode +"";
                this.props.dispatch(routerRedux.push(`/technology/goodsPrintListMSDS?${val}`));
            }else{
                message.warning('请输入查询条件');
            }
      }
    }); 

  }


 render() {
     const { getFieldDecorator } = this.props.form;
     const goodsdetails3=this.props.technology&&this.props.technology.detailData&&this.props.technology.detailData[0]?this.props.technology.detailData[0]:[];   
     const formItemLayout = {
        labelCol: {
         xs: {span: 24},
         sm: {span: 6},
        },
        wrapperCol: {
         xs: {span: 24},
         sm: {span: 14},
        },
       };
       const formItemLayout2 = {
        labelCol: { span: 8 }
      };
      const { CSANumber } = this.state;
  return (    
        <div  className={Print_Content}>
            <div className={MSDS_Content}>  
                    <Form onSubmit={this.handleSearch2}>
                        <p>MSDS(化学品安全说明书)</p>
                            <Row>
                                <Col span={8}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="CAS号"
                                    >
                                        {getFieldDecorator('CSANumber',{setFieldsValue: CSANumber,initialValue:this.state.CSANumber })(
                                        <Input 
                                            placeholder="CAS号"
                                         />
                                        )}
                                    </FormItem>  
                                </Col>
                                <Col  span={8}>
                                    <FormItem
                                    {...formItemLayout}
                                        label="品名"
                                        >
                                        {getFieldDecorator('productNum')(
                                        <Input  
                                           placeholder="品名"
                                         />
                                        )}
                                    </FormItem>
                                </Col> 
                                <Col span={2}>
                                    <FormItem {...formItemLayout2}>
                                    <Button type="primary" htmlType="submit" ghost>搜索</Button>
                                    </FormItem>
                            </Col> 
                            </Row>  
                    </Form>
            </div>    
       </div>

  );
 }
}

export default connect(({technology,goodsDetail, app}) => ({technology,goodsDetail, app}), (dispatch, own) => {
 return {dispatch, own}
})(Form.create()(MSDSPrintFrom));
