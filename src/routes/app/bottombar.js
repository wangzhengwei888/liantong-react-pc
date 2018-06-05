import React , { Component } from 'react';
import { headers,footers,col_f,col_f2,logo_botton} from './bottombar.less';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import Img from '../../components/Img/Img';

class  Bottombar extends Component{

  componentDidMount(){
    this.props.dispatch({ type: 'app/getArticleEFF'});
   // this.props.dispatch({ type: 'app/getLinkUrlEFF'});
  }

  render (){
    let {articleData,linkUrlData,advList} = this.props.app;
    // let{ }=this.props.home;
  //  console.log(articleData)
  //  console.log(this.props.app)
  //  console.log(advList)
    return (
      <div>
        <div className={footers}>
              {advList.length > 0 && advList[0].indexBottom[0].advList.length > 0 ?
                advList[0].indexBottom[0].advList.map((item,index)=>{
                  return (
                    <div style={{height:'110px'}}  key={index}>
                      <div style={{margin:'0 5%',width:'1200px',margin:'0px auto'}}>

                          <Img src={item.resUrl} style={{width:'100%',height:'100%'}} />
                      </div>
                    </div>
                  )
                }):<div></div>
              }
          <div style={{width:'1200px',margin:'20px auto 7px'}}>
            <Row style={{width:'960px',display:'inline-block',textAlign:'center'}}>
              <Col span={4} className={col_f2}>
                <h4 className='help1'> {advList.length > 0 && advList[0].noviceRecommends? advList[0].noviceRecommends[0].apName:'' }</h4>
                {advList.length > 0 && advList[0].noviceRecommends && advList[0].noviceRecommends.length>0 && advList[0].noviceRecommends[0].advList.length > 0 ?
                  advList[0].noviceRecommends[0].advList.map((adv,index)=>{
                  return (
                        <div key={index}>
                           <a style={{color:adv.advTitle == "危化品购买" ? "red" : ""}} href={adv.advUrl}>{adv.advTitle}</a>
                        </div>
                  )
                  }) : <div style={{ height:"370px",width: '234px', marginRight:'20px'}}></div>
                }

              </Col>
              <Col span={4} className={col_f2}>
                <h4 className='help2'> {advList.length > 0 && advList[0].shopDirectory? advList[0].shopDirectory[0].apName:'' }</h4>
                  {advList.length > 0 && advList[0].shopDirectory && advList[0].shopDirectory.length>0 && advList[0].shopDirectory[0].advList.length > 0 ?
                    advList[0].shopDirectory[0].advList.map((adv,index)=>{
                    return (
                          <div key={index}>
                             <a href={adv.advUrl}>{adv.advTitle}</a>
                          </div>
                    )
                    }) : <div style={{ height:"370px",width: '234px', marginRight:'20px'}}></div>
                  }
              </Col>
              <Col span={4} className={col_f2}>
              <h4 className='help3'> {advList.length > 0 && advList[0].paymentMethod? advList[0].paymentMethod[0].apName:'' }</h4>
                  {advList.length > 0 && advList[0].paymentMethod && advList[0].paymentMethod.length>0 && advList[0].paymentMethod[0].advList.length > 0 ?
                    advList[0].paymentMethod[0].advList.map((adv,index)=>{
                    return (
                          <div key={index}>
                              <a href={adv.advUrl}>{adv.advTitle}</a>
                          </div>
                    )
                    }) : <div style={{ height:"370px",width: '234px', marginRight:'20px'}}></div>
                  }
              </Col>
              <Col span={4} className={col_f2}>
                  <h4 className='help4'> {advList.length > 0 && advList[0].distributionMode? advList[0].distributionMode[0].apName:'' }</h4>
                  {advList.length > 0 && advList[0].distributionMode && advList[0].distributionMode.length>0 && advList[0].distributionMode[0].advList.length > 0 ?
                    advList[0].distributionMode[0].advList.map((adv,index)=>{
                    return (
                          <div key={index}>
                              <a href={adv.advUrl}>{adv.advTitle}</a>
                          </div>
                    )
                    }) : <div style={{ height:"370px",width: '234px', marginRight:'20px'}}></div>
                  }
              </Col>
              <Col span={4} className={col_f2}>
                  <h4 className='help5'> {advList.length > 0 && advList[0].afterSaleService? advList[0].afterSaleService[0].apName:'' }</h4>
                  {advList.length > 0 && advList[0].afterSaleService && advList[0].afterSaleService.length>0 && advList[0].afterSaleService[0].advList.length > 0 ?
                    advList[0].afterSaleService[0].advList.map((adv,index)=>{
                    return (
                          <div key={index}>
                             <a href={adv.advUrl}>{adv.advTitle}</a>
                          </div>
                    )
                    }) : <div style={{ height:"370px",width: '234px', marginRight:'20px'}}></div>
                  }
              </Col>
              <Col span={4} className={col_f2}>
                  <h4 className='help6'> {advList.length > 0 && advList[0].noviceRecommends? advList[0].specialService[0].apName:'' }</h4>
                  {advList.length > 0 && advList[0].specialService && advList[0].specialService.length>0 && advList[0].specialService[0].advList.length > 0 ?
                    advList[0].specialService[0].advList.map((adv,index)=>{
                    return (
                          <div key={index}>
                              <a href={adv.advUrl}>{adv.advTitle}</a>
                          </div>
                    )
                    }) : <div style={{ height:"370px",width: '234px', marginRight:'20px'}}></div>
                  }
              </Col>
            </Row>
            <Row style={{width:'240px',display:'inline-block'}}>
              <Col span={16} className={col_f2}>
                <div className='help7' style={{textAlign:'center',fontSize:'14px',color:'#C7A774',fontWeight:'bold',marginTop:'35px',marginLeft:'0px'}}>交流平台</div>
                <div className='micro-blog' style={{textAlign:'center',marginBottom:'0px',color:'#999',marginLeft:'0px'}}>官方微博</div>
                <div className='wechat' style={{textAlign:'center',color:'#999',marginLeft:'0px'}}>官方微信</div>
                <div style={{textAlign:'center',fontSize:'14px',color:'#C7A774',fontWeight:'bold',marginLeft:'0px'}}>扫一扫，加入我们哦~</div>
              </Col>
              <Col span={8} className={col_f2}>
                <a className="guoyao_erwerima" target="_blank"  style={{marginTop:'45px'}} href="https://weibo.com/scrc63210123?is_hot=1"></a>
              </Col>
            </Row>
          </div>
          {/*
          <div className={logo_botton}></div>
          <div  className="xinxi">

            地址：上海市宁波路52号&nbsp;&nbsp;&nbsp;邮编：2000002&nbsp;&nbsp;&nbsp;电话：86-21-63210123&nbsp;&nbsp;&nbsp;传真：86-21-63290778&nbsp;&nbsp;&nbsp;Mail：sj_scrx@sinopharm.com
          </div>
          <div style={{width:'1125px',margin:'9px auto 10px',textAlign:'center'}} >
            Copyright 2007-2017 国药集团化学试剂有限公司版权所有&nbsp;&nbsp;&nbsp; | 沪ICP备05053157号 <span></span>
          </div>
          <div  style={{width:'1125px',margin:'10px auto 30px',textAlign:'center'}} className="guo_img">
            <div className="guo_img1">上海工商</div>
            <div className="guo_img2">沪公网安备&nbsp;&nbsp;&nbsp;31010102002105号</div>
            <div className="guo_img3">危险化学品经营许可证</div>
            <div className="guo_img4">营业执照（三证合一）</div>
          </div>
          */}
           <div className='hot_spots' style={{margin:'0 auto',width:'1200px'}}>
              <div className='hot_spots_content ' style={{position:'relative'}}>
                <img src={require('../../assets/hotspots.jpg')} alt=""/>
                     <a href='https://www.baidu.com'  target="_blank"  style={{position:'absolute',width:'565px',height:'32px',left:'315px',top:'114px',cursor:'point'}}></a>
                     <a href='http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&entyId=20120314093548171'  target="_blank" style={{position:'absolute',width:'92px',height:'32px',left:'258px',top:'146px',cursor:'point'}}></a>
                     <a href='https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010102002105'  target="_blank" style={{position:'absolute',width:'244px',height:'32px',left:'356px',top:'146px',cursor:'point'}}></a>
                     <a href='http://www.sinoreagent.com/gsjs/images/zzzm/wxhxpxkz.pdf'  target="_blank" style={{position:'absolute',width:'191px',height:'32px',left:'602px',top:'146px',cursor:'point'}}></a>
                     <a href='http://www.sinoreagent.com/gsjs/images/zzzm/qyfryyzz31.pdf'  target="_blank" style={{position:'absolute',width:'160px',height:'32px',left:'796px',top:'146px',cursor:'point'}}></a>

              </div>
           </div>
        </div>
      </div>
    )
  }
}

;
export default connect(({app})=>({app}),(dispatch,own)=>{return {dispatch,own}})(Bottombar);

