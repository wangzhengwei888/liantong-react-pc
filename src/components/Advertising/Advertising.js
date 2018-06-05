import React from 'react';
import Img from '../Img/Img'
import { Icon } from 'antd';
import { Link } from 'dva/router'
import { headadvertising,body_headimg } from './advertising.less';

export function HeadAdvertising ({imgUrl,shutDown}) {
  const advList= imgUrl
//  console.log(advList)
  return (
    <div className={`${headadvertising}`}>
        {advList.length > 0 && advList[0].indexTop[0].advList.length > 0 ?
          advList[0].indexTop[0].advList.map((adv,index)=>{
            return (
              <div  key={index} >
                <Img onClick={()=>{window.open( `${adv.advUrl}`)}}  src={adv.resUrl} style={{width:'100%',height:'100%'}}/>
                <div className='shut-down' onClick={() => shutDown()}><Icon type="close" /></div>

              </div>
            )
          }) : <div></div>}
      </div>
  )
  // <div className={`${headadvertising}`}>
  //   <Img  src={imgUrl} style={{width:'100%',height:'100%'}}/>
  //   <div className='shut-down' onClick={() => shutDown()}><Icon type="close" /></div>
  // </div>
}

export function BodyHeadImg ({headImg}) {
  return <div className={body_headimg}><Link to={`${headImg.id}`}><Img src={headImg.url} className='head_img'/></Link></div>
}
