import React, { Component } from 'react'
import { connect } from 'dva'
import Img from "../../components/Img/Img";
import { advanced_search_form_row } from './Product.less'
import { routerRedux,Link } from 'dva/router';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;


const formContent = [
  {label:'中文名称',placeholder:'',name:'goodsName'},
  {label:'英文名称',placeholder:'',name:'goodsEname'},
  {label:'产品编号（SCRC）',placeholder:'',name:'sinopharmGoodsCode'},
  {label:'拼音代码',placeholder:'（例：冰乙酸为bys）',name:'goodsFirstCode'},
  {label:'CAS号',placeholder:'',name:'casNo'},
  {label:'UN号',placeholder:'',name:'unNo'},
  {label:'分子式',placeholder:'',name:'molecularFormula'},
  {label:'分子量',placeholder:'',name:'molecularWeight'},
  {label:'规格',placeholder:'',name:'specName'},
  {label:'包装',placeholder:'',name:'goodsSpec'},
  {label:'品牌',placeholder:'',name:'brandName'}
]

class AdvancedSearchForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pathLink:[],
    }
  
   }
  



  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, val) => {
    if(!err){
      // let values= {
      //   searchType:'exactSearch',
      //   goodsName: val.goodsName,
      //   goodsEname: val.goodsEname,
      //   sinopharmGoodsCode: val.sinopharmGoodsCode,
      //   goodsFirstCode: val.goodsFirstCode,
      //   casNo: val.casNo,
      //   unNo: val.unNo,
      //   molecularFormula:val.molecularFormula,
      //   molecularWeight: val.molecularWeight,
      //   specName: val.specName,
      //   goodsSpec: val.goodsSpec,
      //   brandName: val.brandName
        // if( val.goodsEname==''||val.goodsEname==undefined){
        //   val.goodsEname==''
        //   console.log(val.goodsEname)
        // }
        let goodsName=val.goodsName? val.goodsName:''  ;
        let goodsEname=val.goodsEname? val.goodsEname:''  ;
        let sinopharmGoodsCode=val.sinopharmGoodsCode? val.sinopharmGoodsCode:''  ;
        let goodsFirstCode=val.goodsFirstCode? val.goodsFirstCode:''  ;
        let casNo=val.casNo? val.casNo:''  ;
        let unNo=val.unNo? val.unNo:''  ;
        let molecularFormula=val.molecularFormula? val.molecularFormula:''  ;
        let molecularWeight=val.molecularWeight? val.molecularWeight:''  ;
        let specName=val.specName? val.specName:''  ;
        let goodsSpec=val.goodsSpec? val.goodsSpec:''  ;
        let brandName=val.brandName? val.brandName:''  ;
        // let brandId=val.brandName? val.brandName:''  ;
      
   
       let values = "searchType=exactSearch&goodsName=" + goodsName +"&goodsEname="
        + goodsEname +"&sinopharmGoodsCode="+ sinopharmGoodsCode+"&goodsFirstCode="
        +goodsFirstCode+"&casNo="+casNo +"&unNo="+unNo+"&molecularFormula="
        +molecularFormula+ "&molecularWeight=" + molecularWeight+"&specName="
        +specName+"&goodsSpec="+goodsSpec+ "&brandId="+ brandName+"";
      //  console.log(values)
    
        this.props.dispatch(routerRedux.push(`/home/PeoductSearchTwo?${values}`));
    }
       
  });
  }

 
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
    const children = [];
    for (let i = 0; i < formContent.length; i++) {
      children.push(
        <Col span={12} key={i}>
          <FormItem {...formItemLayout} label={formContent[i].label}>
            {getFieldDecorator(`${formContent[i].name}`)(
              <Input placeholder={`${formContent[i].placeholder}`} />
            )}
          </FormItem>
        </Col>
      );
    }
    return children;
  }

  render() {
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch }
      >
        <Row gutter={40} style={{paddingTop:'10px'}} className={advanced_search_form_row}>{this.getFields()}</Row>
        <Row style={{marginBottom:'20px'}}>
          <Col span={13} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" style={{width:'110px',borderRadius:0}}>搜索</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm)

//export default connect(({product,goodsListTwo})=>(product,goodsListTwo),(dispatch,own)=>{return {dispatch,own}})(WrappedAdvancedSearchForm)
export default connect(({product,goodsListTwo})=>({product,goodsListTwo}),(dispatch,own)=>{return {dispatch,own}})(WrappedAdvancedSearchForm);


