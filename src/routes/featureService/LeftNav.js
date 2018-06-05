import React from 'react'
import { Link } from 'dva/router'
import { custom_service_left_nav } from './LeftNav.less'

export default function LeftNav({data}){
  return (
    <div className={custom_service_left_nav}>
      {
        data.length ? data.map((item,index) => {
          return (
            <ul key={index}>
              <li className={`custom_service_fenlei_title custom_service_fenlei_title${index}`}>{item.classification}</li>
              {
                item.children.length ? item.children.map((list,index) => {
                  return <li key={index}><Link to={list.to}>{list.title}</Link></li>
                }) : null
              }
            </ul>
          )
        }) : null
      }
    </div>
  )
}
