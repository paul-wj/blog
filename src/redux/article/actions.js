import webApi from '../../lib/api'
export const getTags = () => {
	return dispatch =>
		webApi.getTagAllList().then(res => {
			let result = [];
			if (res.flags === 'success') {
				result = res.data && res.data.length ? res.data : [];
			}
			dispatch({ type: 'tagList', payload: result })
		})
};

export const getCategories = () => {
	return dispatch =>
		webApi.getCategoryAllList().then(res => {
			let result = [];
			if (res.flags === 'success') {
				result = res.data && res.data.length ? res.data : [];
			}
			dispatch({ type: 'categoryList', payload: result })
		})
};
