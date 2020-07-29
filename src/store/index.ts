import {compose, createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducer'
import {IS_PROD, VERSION} from "../conf";
import {getReactStoreStorage, setReactStore, createGUID} from "../lib/utils";

const plugins = compose(IS_PROD ? applyMiddleware(thunk) : composeWithDevTools(applyMiddleware(thunk, logger)));

const reactStore = ((initialState = getReactStoreStorage()) => {
    const store = createStore(rootReducer, initialState, plugins);
    if ((module as any).hot && !IS_PROD) {
        // eslint-disable-next-line
        console.log('replacing reducer...');
        store.replaceReducer(rootReducer);
    }
    // 当页面刷新或关闭时存储state（节省性能）
    window.onbeforeunload = () => {
        const state = store.getState();
        setReactStore({VERSION, data: state, guid: createGUID()});
    };
    return store;
})();

export default reactStore;
