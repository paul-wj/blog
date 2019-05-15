import webApi from '../../lib/api'
export const getTags = () => {
	return async dispatch => {
		const res = await webApi.getTagAllList();
		let result = [];
		if (res.flags === 'success') {
			result = res.data && res.data.length ? res.data : [];
		}
		dispatch({ type: 'tagList', payload: result })
	}
};

export const getCategories = () => {
	return async dispatch => {
		const res = await webApi.getCategoryAllList();
		let result = [];
		if (res.flags === 'success') {
			result = res.data && res.data.length ? res.data : [];
		}
		dispatch({ type: 'categoryList', payload: result })
	}
};
