export const getAppLayoutWidth = () => {
	return dispatch => {
		const bodyWidth = document.getElementsByTagName('body')[0].clientWidth;
		dispatch({type: 'appLayoutWidth', payload: bodyWidth})
	}
};

export const toggleCollapsed  =  (collapsed = true) => {
	return dispatch => {
		dispatch({ type: 'collapsed', payload: collapsed})
	}
};

export const setOpenKes  =  openKeys => {
	return dispatch => {
		dispatch({ type: 'openKeys', payload: openKeys})
	}
};

export const setSelectedKeys  =  selectedKeys => {
	return dispatch => {
		dispatch({ type: 'selectedKeys', payload: selectedKeys})
	}
};

