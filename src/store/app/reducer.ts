import {AppTypeEnum} from '../types';
import {IReduxAction} from '../../types/global';

interface AppState {
    collapsed: boolean;
    menuOpenKeys: string[];
    menuSelectedKeys: string[];
}

/**
 * state
 */
const defaultState: AppState = {
    collapsed: false,
    menuOpenKeys: [],
    menuSelectedKeys: []
};


/**
 * app Reducer
 */
export default function articleReducer(state = defaultState, action: IReduxAction<AppState>): AppState {
    const { type, payload } = action;
    return Object.keys(AppTypeEnum).includes(type) ? { ...state, ...payload } : state;
}
