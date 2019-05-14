import React, { Component } from 'react'
import { Button } from 'antd'
class UserInfo extends Component{
	render() {
		return <div className="user-info">
			<Button
				ghost
				type="primary"
				size="small"
				style={{ marginRight: 20 }}>
				登录
			</Button>
			<Button ghost type="danger" size="small">
				注册
			</Button>
		</div>
	}
}
export default UserInfo;
