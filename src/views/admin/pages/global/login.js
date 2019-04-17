import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import './index.scss'
import logo from './logo.svg'

import { Button, Input, Icon } from 'antd'
@withRouter
class Login extends Component {
	state = {
		username: 'paul',
		password: 123456
	};

	handleChange = e => {
		if (e.target) {
			this.setState({[e.target.name]: e.target.value })
		}
	};

	login = async () => {
		let res = await this.$webApi.login(this.state);
		if (res.flags === 'success') {
			this.$toast.success('登录成功');
			localStorage.setItem('authorization', res.data.token);
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
					name="username"
					placeholder="username"
					value={this.state.username}
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
