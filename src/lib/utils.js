import marked from 'marked'
// import hljs from 'highlight.js'
import xss from 'xss'
import dayJs from 'dayjs'
import store from '../redux/index'
// 转化 md 语法为 html
export const translateMarkdown = (plainText, isMarkDown = true) => {
	return marked(isMarkDown ? plainText : xss(plainText), {
		renderer: new marked.Renderer(),
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: true,
		smartLists: true,
		smartypants: true,
		highlight: function(code) {
			return window.hljs.highlightAuto(code).value
		}
	});
};

export const decodeQuery = url => {
	let params = {};
	const paramsStr = url.replace(/\.*\?/, ''); // a=1&b=2&c=&d=xxx&e
	paramsStr.split('&').forEach(v => {
		const d = v.split('=');
		if (d[1] && d[0]) params[d[0]] = d[1]
	});
	return params
};

export const getRandomColor = () => '0123456789abcdef'.split('').reduce((startValue, currentValue, currentIndex, targetArr) => currentIndex > 5 ? startValue : startValue + targetArr[Math.floor(Math.random()*16)], '#');

export const clearGlobalLocalData = () => {
	const userInfo = store.getState().user.userInfo;
	if (userInfo.userId) {
		store.dispatch({ type: 'userInfo', payload: {userId: null, email: null, nick: null, username: null, token: null, avatarColor: null}});
	}
	localStorage.removeItem('authorization');
};

export const formatDate = (time, timeFormat = 'YYYY/MM/DD HH:mm') => {
	if (!time) {
		return ''
	}
	return dayJs(time).format(timeFormat);
};

export const firstLetterUppercase = (val) => {
	if (!val) {
		return ''
	}
	return val.substring(0, 1).toUpperCase() + val.substring(1);
};
