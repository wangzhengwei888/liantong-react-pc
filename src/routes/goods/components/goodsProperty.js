import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table,Button,Radio,message,Tabs, Row, Col } from 'antd'
import { shuoming } from  '../goodsDetail.less'
import Img from '../../../components/Img/Img';
import { addCart ,getSpecByGoodsIdAndSpecIds} from '../api';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
/**
 * Created by leimingtech-lhm on 2017/8/10.
 * 商品详情组件
 */
class GoodsProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsNmae: `${this.props.goodsName}`,
      goodsPrice: "",
    }
  }
  componentDidMount() {
/*    let { data } =this.props.goodsDetail;
    const {goodsdetails}=this.props;
    /!*商品推荐*!/
    GoodsRecommed().then(result => {
      if (result.result == 1) {
        // console.log(result.data)
        this.setState({
          goodsRecommed:result.data
        })
        // 同步购物车数量

      } else {

      }
    });*/
  }

  columns = [
    {
      title: '编号',
      dataIndex: 'name1',
      //render: text => <a href="#">{text}</a>,
    },
    {
      title: '容量',
      dataIndex: 'name2',
    },
    {
      title: '数量',
      dataIndex: 'name3',
    },
    {
      title: 'RMB（含税）',
      dataIndex: 'name4',
      //render: text => <a href="#">{text}</a>,
    }
    // {
    //   title: '包装',
    //   dataIndex: 'name5',
    // },
    // {
    //   title: '市场价',
    //   dataIndex: 'name6',
    // },
    // {
    //   title: '成交价',
    //   dataIndex: 'name7',
    //   //render: text => <a href="#">{text}</a>,
    // },
    // {
    //   title: '操作',
    //   dataIndex: 'name8',
    //   render: (text, record, index) => {
    //     return (
    //       <Row type="flex" justify="space-around">
    //         <Link style={{ color:'#3497ce' }} to="/d">查看详情</Link>
    //         <Link style={{ color:'#2EB6AA' }} to="/g">购买</Link>
    //         {/*<Link style={{ color:'#2EB6AA' }} to="/g">询价</Link>*/}
    //       </Row>
    //     )
    //   }
    // }
  ];

  data = [
    {
      key: '1',
      name1: 'John Brown',
      name2: 'John Brown',
      name3: 'John Brown',
      name4: 'John Brown',
    },
    {
      key: '2',
      name1: 'John Brown',
      name2: 'John Brown',
      name3: 'John Brown',
      name4: 'John Brown',
    },
  ];

  render() {
    const {goodsdetails}=this.props;
    let ghsImages = goodsdetails.ghsImages ? goodsdetails.ghsImages.split(",") : []
   // console.log(goodsdetails)
   //console.log(goodsdetails.goodsBody=='NULL' || goodsdetails.goodsBody===undefined);
   //  isReagent
    return <div className="card_container">
      { goodsdetails&&goodsdetails.isReagent==1 ?
        <Tabs type="card">
            <TabPane tab="商品属性" key="1" className={ shuoming }>
              <table className="table">
                <tbody>
                {(goodsdetails.goodsCommName=='null'||goodsdetails.goodsCommName==undefined||goodsdetails.goodsCommName=='')?'':(<tr><th className="th_left">中文别名</th><th className="th_right">{goodsdetails.goodsCommName}</th></tr>)}
                {(goodsdetails.goodsEname==undefined||goodsdetails.goodsEname=='null'||goodsdetails.goodsEname=='') && (goodsdetails.goodsEnickname==undefined||goodsdetails.goodsEnickname==''||goodsdetails.goodsEnickname=='null')?'':
                <tr>
                  <th className="th_left">英文名称</th>
                  <th className="th_right">
                   {(goodsdetails.goodsEname=='null'||goodsdetails.goodsEname==undefined||goodsdetails.goodsEname=='')?'':goodsdetails.goodsEname+'；'}
                   {(goodsdetails.goodsEnickname=='null'||goodsdetails.goodsEnickname==undefined||goodsdetails.goodsEnickname=='')?'':goodsdetails.goodsEnickname}
                  </th>
                </tr>}


                {(goodsdetails.chemicalFormula==undefined||goodsdetails.chemicalFormula=='null'||goodsdetails.chemicalFormula=='')?'':(<tr><th className="th_left">化学式</th>
                   <th className="th_right">{goodsdetails.chemicalFormula}</th>
                  </tr>)}
                {(goodsdetails.molecularFormula=='null'||goodsdetails.molecularFormula==undefined||goodsdetails.molecularFormula=='')?'':<tr><th className="th_left">分子式</th>
                <th className="th_right">{goodsdetails.molecularFormula} </th></tr>}
                {(goodsdetails.linearMolecularFormula=='null'||goodsdetails.linearMolecularFormula==undefined||goodsdetails.linearMolecularFormula=='')?'':<tr><th className="th_left">线性分子式</th>
                 <th className="th_right">{goodsdetails.linearMolecularFormula} </th></tr>}
                {(goodsdetails.molecularWeight=='null'||goodsdetails.molecularWeight==undefined||goodsdetails.molecularWeight=='')?'':  <tr><th className="th_left">分子量</th>
                 <th className="th_right">{goodsdetails.molecularWeight }</th></tr>}
                 {(goodsdetails.casNo=='null'||goodsdetails.casNo==undefined||goodsdetails.casNo=='')?'':<tr>
                  <th className="th_left">CAS号</th>
                  <th className="th_right" style={{color:'red'}}>{goodsdetails.casNo}</th>
                   </tr>}
                   {(goodsdetails.ecNumber=='null'||goodsdetails.ecNumber==undefined||goodsdetails.ecNumber=='')?'':<tr>
                    <th className="th_left">EC Number</th>
                    <th className="th_right"><div dangerouslySetInnerHTML={{ __html: goodsdetails.ecNumber }}></div></th>
                   </tr>}
                   {(goodsdetails.unNo=='null'||goodsdetails.unNo==undefined||goodsdetails.unNo=='')?'':<tr>
                   <th className="th_left">UN号</th>
                   <th className="th_right"><div dangerouslySetInnerHTML={{ __html: goodsdetails.unNo}}></div>  </th>
                  </tr>}
                  {(goodsdetails.controlInfo=='null'||goodsdetails.controlInfo==undefined||goodsdetails.controlInfo=='')?'':<tr>
                    <th className="th_left">管制信息</th>
                    <th className="th_right"><div style={{color:'red'}} dangerouslySetInnerHTML={{ __html: goodsdetails.controlInfo }}></div> </th>
                   </tr>}
                   {(goodsdetails.dangerousNature=='null'||goodsdetails.dangerousNature==undefined||goodsdetails.dangerousNature=='')?'':<tr>
                   <th className="th_left">危险性质</th>
                   <th className="th_right"><div dangerouslySetInnerHTML={{ __html: goodsdetails.dangerousNature }}></div> </th>
                  </tr>}
                  <tr>
                  {ghsImages&&ghsImages.length>0?
                    <th className="th_left">GHS图标</th>:<div></div>
                  }
                   {/* <th className="th_left">GHS图标</th>*/}
                  <th className="th_right" >
                   {
                    ghsImages.map((item,index) => {
                     return <Img src={item} alt="" key={index} />
                    })
                   }
                   {/*<img src={require('../../../assets/GHS111.jpg')} alt="" />*/}
                   {/*<img src={require('../../../assets/GHS111.jpg')} alt="" />*/}

                   {/*{(goodsdetails.controlInfo =='NULL')?'': <div dangerouslySetInnerHTML={{ __html: goodsdetails.controlInfo }}></div>}*/}
                  </th>
                </tr>


                </tbody>
              </table>

            </TabPane>
            <TabPane tab="基本信息" key="2" className={ shuoming } style={{ fontSize:'14px',color:'#636363' }}>

              <table className="table">
                <tbody>
                   {(goodsdetails.indication =='null'||goodsdetails.indication ==undefined||goodsdetails.indication =='')?'': <tr>
                    <th className="th_left">性状</th>
                    <th className="th_right"><div dangerouslySetInnerHTML={{ __html: goodsdetails.indication }}></div> </th>
                   </tr>}
                   {(goodsdetails.usageDosage=='null'||goodsdetails.usageDosage==undefined||goodsdetails.usageDosage=='')?'':<tr>
                    <th className="th_left">用途</th>
                    <th className="th_right"> <div dangerouslySetInnerHTML={{ __html: goodsdetails.usageDosage }}></div> </th>
                   </tr>}
                   {(goodsdetails.storageConditionName=='null'||goodsdetails.storageConditionName==undefined||goodsdetails.storageConditionName=='')?'':<tr>
                    <th className="th_left">存储条件</th>
                    <th className="th_right"> <div dangerouslySetInnerHTML={{ __html: goodsdetails.storageConditionName }}></div> </th>
                   </tr>}
                   {(goodsdetails.contraindication=='null'||goodsdetails.contraindication==undefined||goodsdetails.contraindication=='')?'':<tr>
                    <th className="th_left">安全措施</th>
                    <th className="th_right"> <div dangerouslySetInnerHTML={{ __html: goodsdetails.contraindication }}></div></th>
                   </tr>}
                   {(goodsdetails.mattersAttention =='null'||goodsdetails.mattersAttention ==undefined||goodsdetails.mattersAttention =='')?'':<tr>
                    <th className="th_left">急救</th>
                    <th className="th_right"> <div dangerouslySetInnerHTML={{ __html: goodsdetails.mattersAttention }}></div></th>
                   </tr>}
                   {(goodsdetails.untowardEffect =='null'||goodsdetails.untowardEffect ==undefined||goodsdetails.untowardEffect =='')?'': <tr>
                    <th className="th_left">灭活方法</th>
                    <th className="th_right"><div dangerouslySetInnerHTML={{ __html: goodsdetails.untowardEffect }}></div></th>
                   </tr>}

                </tbody>
              </table>

            </TabPane>
            <TabPane tab="质检信息" key="3" className={shuoming} style={{ fontSize:'14px',color:'#636363' }}>
             <table className="table">
              <tbody>

                {(goodsdetails.countryStandard=='null'||goodsdetails.countryStandard==undefined||goodsdetails.countryStandard=='')?'':<tr>
                 <th className="th_left" style={{width:'15%'}}>产品标准</th>
                 <th className="th_right"> {goodsdetails.countryStandard}</th>
                </tr>}

                {(goodsdetails.goodsQualityList=='null'||goodsdetails.goodsQualityList==undefined||goodsdetails.goodsQualityList=='')?'':
              <tr>
               <th className="th_left" style={{width:'20%'}}>质检项目</th>
               <th className="th_right">
                指标值
               </th>
              </tr>}
              {
               goodsdetails.goodsQualityList.map((i,s) => {
                return <tr key={s}>
                 <th className="th_left"style={{width:'15%'}} >{goodsdetails.goodsQualityList[s].analysisName}</th>
                 <th className="th_right">
                 {(goodsdetails.goodsQualityList[s].ctCoaMlp=='NULL')?'': goodsdetails.goodsQualityList[s].ctCoaMlp}
                 </th>
                </tr>
               })
              }
              {/*<tr>*/}
               {/*<th className="th_left" >结晶点/℃</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.contraindication=='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}

              {/*<tr>*/}
               {/*<th className="th_left" >与水混合试验</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.mattersAttention =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}

              {/*<tr>*/}
               {/*<th className="th_left" >氯化物(Cl)，％</th>*/}
               {/*<th className="th_right">*/}
                {/*{( goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              {/*<tr>*/}
               {/*<th className="th_left" >硫酸盐(SO4)，％</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              {/*<tr>*/}
               {/*<th className="th_left" >乙酸酐[(CH3CO)2O]，％</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              {/*<tr>*/}
               {/*<th className="th_left" >蒸发残渣，％</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              {/*<tr>*/}
               {/*<th className="th_left" >铁(Fe),％</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              {/*<tr>*/}
               {/*<th className="th_left" >铜(Cu),％</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              {/*<tr>*/}
               {/*<th className="th_left" >锌(Zn),％</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              {/*<tr>*/}
               {/*<th className="th_left" >铅(Pb),％</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              {/*<tr>*/}
               {/*<th className="th_left" >还原重铬酸盐物质(以O计),％</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              {/*<tr>*/}
               {/*<th className="th_left" >含量，％</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              {/*<tr>*/}
               {/*<th className="th_left" >结晶点/℃</th>*/}
               {/*<th className="th_right">*/}
                {/*{(goodsdetails.untowardEffect =='NULL')?'': '100'}*/}
               {/*</th>*/}
              {/*</tr>*/}
              </tbody>
             </table>
            </TabPane>
        </Tabs>
        :
        <Tabs type="card">
            <TabPane tab="基本描述" key="1" className={ shuoming }>
                <table className="table">
                  <tbody>

                     {(goodsdetails.goodsDescription=="NULL"||goodsdetails.goodsDescription==''||goodsdetails.goodsDescription==undefined)?'': <tr>
                      <th className="th_left">描述</th>
                      <th className="th_right"><div dangerouslySetInnerHTML={{ __html: goodsdetails.goodsDescription }}></div>
                      </th>
                     </tr>}


                  </tbody>
                </table>
            </TabPane>
            <TabPane tab="详细描述" key="2" style={{ fontSize:'14px',color:'#636363' }}>
              {/*<Row gutter={16}>*/}
                {/*<Col span={8}>*/}
                  {/*<Img src="/upload/img/store/0/1504690459125.jpg" style={{ width:'100%', height:'auto' }}/>*/}
                {/*</Col>*/}
                {/*<Col span={16}>*/}
                  {/*<div style={{ fontWeight:'bold' }}>名字</div>*/}
                 {/*{(goodsdetails.goodsName=="NULL")?'': <div dangerouslySetInnerHTML={{ __html: goodsdetails.goodsName }}></div>}*/}
                 {/*</Col>*/}
              {/*</Row>*/}
             {/*<div dangerouslySetInnerHTML={{ __html: goodsdetails.goodsBody}}></div>*/}
              {/*<Table bordered pagination={false} className="goodsDetail_tuijian" dataSource={this.data} rowKey={record => record.key} columns={this.columns} />*/}
             {((goodsdetails.goodsBody=='NULL') || (goodsdetails.goodsBody===undefined)||(goodsdetails.goodsBody==''))?'':<div> {goodsdetails.goodsBody.split(';').map((i,s)=>{
              return <div key={s}>
               <img  style={{width:'900px',height:'550px'}}src={'http://hsimg.sinopharmgroup.net/'+goodsdetails.goodsBody.split(';')[s]}/>
              </div>
             })
             }</div>}


              </TabPane>
        </Tabs>
      }
    </div>
  }
}

GoodsProfile.propTypes = {
  dispatch: PropTypes.func,
}


export default GoodsProfile
