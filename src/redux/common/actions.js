//打开登录/注册全局弹窗
import webApi from "../../lib/api";

export const openAuthModal  = type => {
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

//获取未读通知列表
export const getUnreadMessageList = () => {
	const token = localStorage.getItem('authorization');
	if (!token) {
		return
	}
	return async dispatch => {
		const res = await webApi.getUnreadMessageList();
		let unreadMessageList = [];
		if (res.flags === 'success') {
			const result = res.data;
			if (result && result.length) {
				unreadMessageList = result;
			}
		}
		dispatch({ type: 'unreadMessageList', payload: unreadMessageList });
		return unreadMessageList;
	}
};




