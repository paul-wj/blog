import marked from 'marked'
import hljs from 'highlight.js'
import xss from 'xss'
import _redux from '../redux/index'
// 转化 md 语法为 html
export const translateMarkdown = plainText => {
	return marked(xss(plainText), {
		renderer: new marked.Renderer(),
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: true,
		smartLists: true,
		smartypants: true,
		highlight: function(code) {
			return hljs.highlightAuto(code).value
		}
	})
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
	const userInfo = _redux.getState().user;
	if (userInfo.userId) {
		_redux.dispatch({ type: 'userInfo', payload: {userId: null, email: null, nick: null, username: null, token: null, avatarColor: null}});
	}
	localStorage.removeItem('reduxStore');
	localStorage.removeItem('authorization');
};
