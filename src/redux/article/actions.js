import webApi from '../../lib/api'
const a = 'tagList';
export const getTags = () => {
	return dispatch => {
		return webApi.getTagAllList().then(res => {
			let result = [];
			if (res.flags === 'success') {
				result = res.data && res.data.length ? res.data : [];
			}
			dispatch({ type: a, payload: result })
		})
	}
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
