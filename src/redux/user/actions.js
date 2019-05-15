import webApi from '../../lib/api'
export const login = params => {
	return dispatch =>
		webApi.login(params).then(res => {
			if (res.flags === 'success') {
				let result = res.data;
				dispatch({ type: 'userInfo', payload: {userId: result.id, name: result.name, token: result.token, avatarColor: '#52c41a'}})
			}
		})
};

