import React, { Component } from 'react'
import { Link } from 'dva/router'
import {product_left_nav} from './LeftNav.less'

export function ProductLeftNav({data}) {
  return (
    <ul className={product_left_nav}>
      {
        data.length ? data.map((item,index) => {
          return <li key={index}><Link to={item.to}>{item.title}</Link></li>
        }) : null
      }
    </ul>
  )
}
