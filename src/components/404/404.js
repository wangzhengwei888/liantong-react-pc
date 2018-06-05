import React, { Component, PropTypes } from 'react';
import {error_content} from './404.less';

export default function Error() {
  return (<div className={error_content}>
    <div className="error_img"><a href="/home"></a></div>
    {/*<p>抱歉!&nbsp;&nbsp;您访问的页面<span> 失联 </span>啦...</p>*/}
    {/*<span className="error_link">您可以逛逛：&nbsp;&nbsp;<a href="/home">首页</a></span>*/}
  </div>)
}
