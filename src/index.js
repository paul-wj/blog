import React from 'react';
import ReactDOM from 'react-dom';
import webApi from './lib/api.js'
import { BrowserRouter } from 'react-router-dom';
import './static/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// markdown 高亮
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-light.css'

hljs.registerLanguage('javascript', javascript);

// 绑定 全局方法$http
React.Component.prototype.$webApi = webApi;

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
