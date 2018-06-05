import React from 'react';
import { drop_down } from './DropDown.less';

export function DropDownMy({ dropDownName, children , className, ...others }) {
const clas = className ? className : '';


  return (
    <div className={`${drop_down} ${clas}`} {...others}>
      { dropDownName }
      <div className="drop_down_list">
        { children }
      </div>
    </div>
  )
}


{/*<DropDownMy
 dropDownName={<div><Icon type="user" style={{marginRight:'5px'}}/>{own.location.state.user.memberName}</div>}
 style={{backgroundColor:'red'}}
 className="fff"
 // dropDownList={ dropUser() }
 >
 <ul>
 <li>修改密码</li>
 <li>退出</li>
 </ul>
 </DropDownMy>*/}
