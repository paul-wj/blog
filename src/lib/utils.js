import marked from 'marked'
import hljs from 'highlight.js'
import xss from 'xss'

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

export const getRandomColor = () => '0123456789abcdef'.split('').reduce((startValue, currentValue, currentIndex, targetArr) => currentIndex > 5 ? startValue : startValue + targetArr[Math.floor(Math.random()*16)], '#');
