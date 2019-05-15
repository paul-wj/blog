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
		}
		dispatch({ type: 'userInfo', payload: {userId: result.id, name: result.name, token: result.token, avatarColor: getRandomColor()}})
	}
};

export const logout = () => {
	return dispatch => {
		localStorage.removeItem('authorization');
		dispatch({ type: 'userInfo', payload: {userId: null, name: null, token: null, avatarColor: null}})
	}
};



