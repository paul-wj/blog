import {Dispatch} from 'redux';
import {AppTypeEnum} from '../types';

export const toggleCollapsed = (collapsed: boolean) => {
    return (dispatch: Dispatch): void => {
        dispatch({type: AppTypeEnum.APP_SET_COLLAPSED, payload: {collapsed}});
    }
};

export const setMenuOpenKeys = (menuOpenKeys: string[]) => {
    return (dispatch: Dispatch): void => {
        dispatch({type: AppTypeEnum.APP_SET_MENU_OPEN_KEYS, payload: {menuOpenKeys}});
    }
};

export const setMenuSelectedKeys= (menuSelectedKeys: string[]) => {
    return (dispatch: Dispatch): void => {
        dispatch({type: AppTypeEnum.APP_SET_MENU_SELECTED_KEYS, payload: {menuSelectedKeys}});
    }
};
