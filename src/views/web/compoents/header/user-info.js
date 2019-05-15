import React, {Component, Fragment} from 'react'
import {withRouter} from "react-router-dom";
import {Button, Dropdown, Avatar, Menu} from 'antd'

import {connect} from 'react-redux'
import {logout} from '../../../../redux/user/actions'

@connect(state => ({userInfo: state.user.userInfo}), {logout})
@withRouter
class UserInfo extends Component {

	renderDropDownMenu = () => {
		return (
			<Menu>
				<Menu.Item>
		          <span className="user-logout">
		            修改账户信息
		          </span>
				</Menu.Item>
				<Menu.Item>
		          <span className="user-logout" onClick={this.props.logout}>
		            退出登录
		          </span>
				</Menu.Item>
			</Menu>
		)
	};

	render() {
		const {userInfo} = this.props;
		return <div className="user-info">
			{userInfo.name ? (<Dropdown placement="bottomCenter" overlay={this.renderDropDownMenu()} trigger={['click', 'hover']}>
				<Avatar className="user-avatar" size="large" style={{backgroundColor: userInfo.avatarColor}}>{userInfo.name}</Avatar>
			</Dropdown>) : (<Fragment>
				<Button
					ghost
					type="primary"
					size="small"
					style={{marginRight: 20}}>
					登录
				</Button>
				<Button ghost type="danger" size="small">
					注册
				</Button></Fragment>)}
		</div>
	}
}

export default UserInfo;
