import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import './index.scss'
import logo from './logo.svg'
import { Button, Input, Icon } from 'antd'

import { connect } from 'react-redux'
import { login } from '../../../../redux/user/actions'


@connect(state => ({userInfo: state.user.userInfo}),{ login })
@withRouter
class Login extends Component {
	state = {
		email: 'paul@qq.com',
		password: '123456'
	};

	handleChange = e => {
		if (e.target) {
			this.setState({[e.target.name]: e.target.value })
		}
	};

	login = async () => {
		await this.props.login(this.state);
		if (this.props.userInfo.userId) {
			this.props.history.push('/admin');
		}
	};


	render() {
		return <div className="login-container">
			<div className="login-content">
				<img src={logo} alt="" className="react-logo"/>
				<Input
					size="large"
					style={{ marginBottom: 25 }}
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="email"
					placeholder="email"
					value={this.state.email}
					onChange={this.handleChange}/>
				<Input
					size="large"
					style={{ marginBottom: 25 }}
					prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
					type="password"
					name="password"
					placeholder="Password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
				<Button style={{ width: '100%' }} size="large" type="primary" onClick={this.login}>
					登录
				</Button>
			</div>
		</div>
	}
}
export default Login;
