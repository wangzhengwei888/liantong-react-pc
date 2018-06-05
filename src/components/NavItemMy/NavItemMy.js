import React from 'react';
import { Nav_Item } from './NavItemMy.less';
import { Icon } from 'antd';

export function NavItemMy({ navName,navClick,navXClick,sty,cla }) {
  const clas = cla ? cla : '';


  return (
    <div className={`${Nav_Item} ${clas}`} style={{...sty}}
         onClick={()=>{
            navClick&&navClick();
         }}
    >
      {navName=='home'? <Icon type="home" />: navName}

      { navXClick&& <Icon type="close" className="icon" onClick={(e) => {
        e.stopPropagation();
             navXClick();
      }}/>
      }
    </div>
  )
}
