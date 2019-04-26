import thunk from 'redux-thunk'
import {compose, createStore, applyMiddleware} from 'redux'
import { composeWithDevTools  } from 'redux-devtools-extension'
import logger from 'redux-logger'
import {IS_PROD} from "../conf";
import rootReducer from './reducer'

let plugins = [];

if (IS_PROD) {
	plugins = compose(applyMiddleware(thunk))
} else {
	plugins = compose(composeWithDevTools(applyMiddleware(thunk, logger)))
}

const store = (initialState = {}) => {
	const store = createStore(rootReducer, initialState, plugins);
	if (module.hot && !IS_PROD) {
		console.log('replacing reducer...');
		const nextRootReducer = require('./reducer').default;
		store.replaceReducer(nextRootReducer);
	}
	return store
};
export default store()
