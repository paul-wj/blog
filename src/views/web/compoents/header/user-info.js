import React, {Component, Fragment} from 'react'
import {withRouter} from "react-router-dom";
import {Button, Dropdown, Avatar, Menu} from 'antd'
import AuthModal from '../base/auth-modal'

import {connect} from 'react-redux'
import {logout} from '../../../../redux/user/actions'
import {openAuthModal} from "../../../../redux/common/actions";

@connect(state => ({userInfo: state.user.userInfo}), {logout, openAuthModal})
@withRouter
class UserInfo extends Component {

	renderDropDownMenu = () => {
		return (
			<Menu>
				<Menu.Item>
		          <span className="user-logout" onClick={() => {this.props.openAuthModal('editUser')}}>
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
		const {userId, profilePicture} = userInfo;
		const token = localStorage.getItem('authorization');
		return <div className="user-info">
			<AuthModal/>
			{userId && token ? (<Dropdown placement="bottomCenter" overlay={this.renderDropDownMenu()} trigger={['click', 'hover']}>
				{ profilePicture ?
					<Avatar className="user-avatar" size="large" src={profilePicture}/> :
					<Avatar className="user-avatar" size="large" style={{backgroundColor: userInfo.avatarColor}}>{userInfo.username}</Avatar>
				}
			</Dropdown>) : (<Fragment>
				<Button
					ghost
					type="primary"
					size="small"
					onClick={() => {this.props.openAuthModal('login')}}
					style={{marginRight: 20}}>
					登录
				</Button>
				<Button
					ghost type="danger"
					onClick={() => {this.props.openAuthModal('register')}}
					size="small">
					注册
				</Button></Fragment>)}
		</div>
	}
}

export default UserInfo;
