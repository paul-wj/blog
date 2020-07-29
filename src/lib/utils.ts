import marked from 'marked';
import hljs from 'highlight.js'
// import xss from 'xss';
import dayJs from 'dayjs'
import {REACT_STORE_KEY, VERSION} from '../conf';
import {IAnyData} from "../types/global";
import store from '../store';
import {loginOut} from "../store/user/actions";

/**
 * 转化 md 语法为 html
 */
export const translateMarkdown = (plainText: string): string => {
    // @ts-ignore
    return marked(plainText, {
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight(code) {
            return hljs.highlightAuto(code).value
        }
    });
};

/**
 * 创建唯一标识
 * @returns {string}
 */
export const createGUID = (): string => {
    let d = new Date().getTime();
    /* eslint-disable */
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
    /* eslint-disable */
};

/**
 * 向 localStorage 设置 reactStorage
 * @param reactStoreValue
 */
export const setReactStore = (reactStoreValue: IAnyData): void => {
    localStorage.setItem(REACT_STORE_KEY, JSON.stringify(reactStoreValue));
};

/**
 * 从 localStorage 获取 reduxStorage
 * @returns IAnyData
 */
export const getReactStoreStorage = (): IAnyData => {
    const reactLocalStore = window.localStorage.getItem(REACT_STORE_KEY);
    if (reactLocalStore) {
        const reactStorage = JSON.parse(reactLocalStore);
        // 当前本地缓存版本号与当前代码版本号一致时取缓存数据
        return reactStorage.VERSION === VERSION ? reactStorage.data : {};
    }
    return {};
};

/**
 * 生成随机颜色
 */
export const getRandomColor = () => '0123456789abcdef'.split('').reduce((startValue, currentValue, currentIndex, targetArr) => currentIndex > 5 ? startValue : startValue + targetArr[Math.floor(Math.random()*16)], '#');

/**
 * 清除用户信息
 */
export const clearUserInfo = () => {
    // @ts-ignore
    store.dispatch(loginOut());
};

/**
 * 格式化时间
 * @param time
 * @param timeFormat
 */
export const formatDate = (time: string | Date, timeFormat = 'YYYY/MM/DD HH:mm') => {
    if (!time) {
        return ''
    }
    return dayJs(time).format(timeFormat);
};

/**
 * 首字母大写
 * @param val
 */
export const firstLetterUppercase = (val: string): string => {
    if (!val) {
        return ''
    }
    return val.substring(0, 1).toUpperCase() + val.substring(1);
};

/**
 * 格式化query
 * @param url
 */
export const decodeQuery = <T>(url: string) => {
    let params = {} as T;
    const paramsStr = url.replace(/\.*\?/, ''); // a=1&b=2&c=&d=xxx&e
    paramsStr.split('&').forEach(v => {
        const d = v.split('=');
        // @ts-ignore
        if (d[1] && d[0]) params[d[0]] = d[1]
    });
    return params
};
