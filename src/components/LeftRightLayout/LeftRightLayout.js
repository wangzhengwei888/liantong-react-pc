import React, { Component } from 'react'
import { left_right_layout } from './LeftRightLayout.less'

class LeftRightLayout extends Component{
  render () {
    return (
      <div className={left_right_layout}>
        <div className='layout_left'>{this.props.leftContext}</div>
        <div className='layout_right'>{this.props.rightContext}</div>
      </div>
    )
  }
}

export default LeftRightLayout
