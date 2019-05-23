import webApi from '../../lib/api'
import {getRandomColor} from '../../lib/utils'
import {message} from 'antd'
export const login =  params => {
	return async dispatch => {
		const res = await webApi.login(params);
		let result = res.data;
		if (res.flags === 'success') {
			message.success('登录成功');
			localStorage.setItem('authorization', result.token);
			dispatch({ type: 'userInfo', payload: {userId: result.id, email: result.email, username: result.username, token: result.token, avatarColor: getRandomColor()}})
		}
		return res;
	}
};

export const register = params => {
	return async dispatch => {
		const res = await webApi.registerUser(params);
		if (res.flags === 'success') {
			message.success('注册成功');
		}
		return res;
	}
};
export const editUser = (id, params) => {
	return async dispatch => {
		const res = await webApi.updateUser(id, params);
		if (res.flags === 'success') {
			let result = res.data;
			message.success('修改成功');
			localStorage.setItem('authorization', result.token);
			dispatch({ type: 'userInfo', payload: {userId: result.id, email: result.email, username: result.username, token: result.token, avatarColor: getRandomColor()}})
		}
		return res;
	}
};

export const logout = () => {
	return dispatch => {
		localStorage.removeItem('authorization');
		dispatch({ type: 'userInfo', payload: {userId: null, email: null, username: null, token: null, avatarColor: null}})
	}
};



