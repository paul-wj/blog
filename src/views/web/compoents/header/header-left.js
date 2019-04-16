import React, { Component } from 'react'
import {Icon} from 'antd'
class HeaderLeft extends Component{
	render() {
		return <div className="header-left">
			<Icon type="wechat" style={{color: '#52c41a', fontSize: '24px'}} />
			<span className="header-title">******</span>
		</div>
	}
}
export default HeaderLeft;
