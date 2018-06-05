import React , { Component } from 'react';
import {header} from './top.less';

class top extends Component{
  constructor(prop){
    super(prop);
  }

  render(){
    return (
      <div className={header}>
        <ul className='clearfix'>
          <li className='float_left logo_img'><a href="/home" style={{width:'100%',height
          :'100%',display:'block'}}></a></li>
          <li className='float_left authen'>{this.props.title}</li>
          <li className='float_right telbox'>
            <div className='telephone'>
              <span>客服电话</span>
            </div>
            <div className='telephone_num'>400-1234-5678</div>
          </li>
        </ul>
      </div>
    )
  }
}
export default top;
