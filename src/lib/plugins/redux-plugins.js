import {cloneDeep, merge} from 'lodash';
import {VERSION} from "../../conf";
const REDUX_STORE_KEY = 'reduxStore';

//redux默认action key 或 defaultState不存在key的时候返回默认值
export const changeState = (state, [key, value]) => {
	return JSON.parse(JSON.stringify(key.indexOf('@@redux') === -1 && Object.keys(state).includes(key) ? {...state, [key]: value} : state))
};

/**
 * 创建唯一标识
 * @returns {string}
 */
export const createGUID = () => {
	let d = new Date().getTime();
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = (d + Math.random() * 16) % 16 | 0;
		d     = Math.floor(d / 16);
		return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
	});
};

/**
 * 从 localStorage 获取 reduxStorage
 * @returns {boolean}
 */
export const getReduxStoreStorage = () => {
	let reduxStore = window.localStorage.getItem(REDUX_STORE_KEY);
	if (reduxStore) {
		const reduxStorage = JSON.parse(reduxStore);
		//当前本地缓存版本号与当前代码版本号一致时取缓存数据
		return reduxStorage.VERSION === VERSION ? reduxStorage.data : {};
	}
	return {};
};

/**
 * 同步更新redux状态到localStorage的redux插件
 * @param store
 */
export const syncStoreDataToWebStorage = store => {
	// 当 store 初始化后调用
	store.subscribe(() => {
		const state = store.getState();
		setReduxStore({VERSION, data: state});
	});
};

/**
 * 向 localStorage 设置 reduxStorage
 * @param reduxStoreValue
 */
export const setReduxStore = (reduxStoreValue) => {
	// window.onbeforeunload = (e) => {
	// 	window.localStorage.setItem(REDUX_STORE_KEY, JSON.stringify(reduxStoreValue));
	// };
	window.localStorage.setItem(REDUX_STORE_KEY, JSON.stringify(reduxStoreValue));
};

export const setReduxDataForLocal = (store, needLocal = true) => {
	if (!needLocal) return;
	let localVuexStore = getReduxStoreStorage();
	if (localVuexStore) {
		store.replaceReducer( state => {
			let copyNewStore = cloneDeep(state);
			return merge(copyNewStore, localVuexStore.data)
		});
	}
};
