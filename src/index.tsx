import React from 'react';
import ReactDom from 'react-dom';
import {StoreContext} from 'redux-react-hook';
import store from './store';
import App from './app';
import './static/sass/index';
import './lib/plugins/monitor/index';

ReactDom.render(<StoreContext.Provider value={store}><App /></StoreContext.Provider>, document.getElementById("root"));
