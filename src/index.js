import React from 'react';
import ReactDOM from 'react-dom';
import webApi from './lib/api.js'
import  {LazyLoadingCssCdn} from './lib/utils'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux'

import './static/css/index.css';
import './static/less/index.less'
import './static/scss/index.scss'

import App from './App';
import * as serviceWorker from './serviceWorker';
import { message } from 'antd'

//延迟加载antd css cdn
LazyLoadingCssCdn('https://cdn.bootcss.com/antd/3.20.5/antd.min.css');


// 绑定 全局方法$http
React.Component.prototype.$webApi = webApi;
React.Component.prototype.$toast = message;
export default ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
