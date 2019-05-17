//打开登录/注册全局弹窗
export const openAuthModal  =  type => {
	return dispatch => {
		dispatch({type: 'authModalType', payload: type});
		dispatch({ type: 'authModalVisible', payload: true})
	}
};
//关闭登录/注册全局弹窗
export const closeAuthModal = () => {
	return dispatch => {
		dispatch({type: 'authModalType', payload: null});
		dispatch({ type: 'authModalVisible', payload: false})
	}
};




