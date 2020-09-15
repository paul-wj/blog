import React from 'react';
import ReactDom from 'react-dom';
import {StoreContext} from 'redux-react-hook';
import store from './store';
import App from './app';
import './static/sass/index';
import './lib/plugins/monitor';

// if (!IS_PROD) {
//     /* eslint-disable */
//     const VConsole = require('vconsole');
//     new VConsole()
//     /* eslint-disable */
// }

ReactDom.render(<StoreContext.Provider value={store}><App /></StoreContext.Provider>, document.getElementById("root"));
